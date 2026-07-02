import { useEffect, useMemo, useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { AppButton, Card } from '@/components/ui';
import { BottomTabInset, MaxContentWidth, Spacing, TopContentInset } from '@/constants/theme';
import type { Word } from '@/data/types';
import { WORDS } from '@/data/words';
import { speak } from '@/lib/speech';
import { isDue, newCardState, review, todayStr, type Grade } from '@/lib/srs';
import {
  bumpDaily,
  loadCustomWords,
  loadProgress,
  recordStudy,
  saveCustomWords,
  saveProgress,
  type CustomWord,
  type ProgressMap,
} from '@/lib/storage';

/** 1セッションで出す新規カードの上限 */
const NEW_PER_SESSION = 10;

const toWord = (c: CustomWord): Word => ({
  id: c.id,
  word: c.word,
  pos: '自作',
  meaning: c.meaning,
  example: c.example ?? '',
  exampleJa: c.exampleJa ?? '',
});

function buildQueue(progress: ProgressMap, words: Word[], today: string): Word[] {
  const dueReview = words.filter((w) => progress[w.id] && isDue(progress[w.id], today));
  const fresh = words.filter((w) => !progress[w.id]);
  return [...dueReview, ...fresh.slice(0, NEW_PER_SESSION)];
}

export default function FlashcardsScreen() {
  const today = todayStr();
  const [ready, setReady] = useState(false);
  const [progress, setProgress] = useState<ProgressMap>({});
  const [customWords, setCustomWords] = useState<CustomWord[]>([]);
  const [queue, setQueue] = useState<Word[]>([]);
  const [flipped, setFlipped] = useState(false);
  const [doneCount, setDoneCount] = useState(0);
  const [showAdd, setShowAdd] = useState(false);

  const allWords = useMemo(() => [...WORDS, ...customWords.map(toWord)], [customWords]);

  useEffect(() => {
    (async () => {
      const [p, cw] = await Promise.all([loadProgress(), loadCustomWords()]);
      setProgress(p);
      setCustomWords(cw);
      setQueue(buildQueue(p, [...WORDS, ...cw.map(toWord)], today));
      setReady(true);
    })();
    // 初回マウント時のみ読み込む
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const current = queue[0];

  const onGrade = (grade: Grade) => {
    if (!current) return;
    const state = progress[current.id] ?? newCardState(today);
    const next = review(state, grade, today);
    const updated = { ...progress, [current.id]: next };
    setProgress(updated);
    saveProgress(updated);
    recordStudy(today);
    bumpDaily(today, 'cards');
    setFlipped(false);
    setDoneCount((d) => d + 1);
    // 「もう一度」は列の後ろに回して同セッション内で再出題
    setQueue((q) => (grade === 'again' ? [...q.slice(1), current] : q.slice(1)));
  };

  const startMore = () => {
    setQueue(buildQueue(progress, allWords, today));
  };

  const onAddWord = (word: CustomWord) => {
    const updated = [...customWords, word];
    setCustomWords(updated);
    saveCustomWords(updated);
    setQueue((q) => [...q, toWord(word)]);
    setShowAdd(false);
  };

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <ThemedText type="subtitle">単語カード</ThemedText>
          <AppButton label="＋ 単語追加" variant="ghost" onPress={() => setShowAdd(true)} />
        </View>
        <ThemedText type="small" themeColor="textSecondary">
          残り {queue.length} 枚 ・ 今日 {doneCount} 枚学習
        </ThemedText>

        {!ready ? null : current ? (
          <>
            <Pressable style={styles.cardWrap} onPress={() => setFlipped((f) => !f)}>
              <Card style={styles.card}>
                <View style={styles.wordRow}>
                  <ThemedText type="subtitle">{current.word}</ThemedText>
                  <SpeakButton text={current.word} />
                </View>
                {flipped ? (
                  <View style={styles.back}>
                    <ThemedText type="smallBold" style={styles.pos}>
                      【{current.pos}】
                    </ThemedText>
                    <ThemedText type="default">{current.meaning}</ThemedText>
                    {!!current.example && (
                      <View style={styles.exampleBlock}>
                        <View style={styles.wordRow}>
                          <ThemedText type="small" style={styles.example}>
                            {current.example}
                          </ThemedText>
                          <SpeakButton text={current.example} />
                        </View>
                        <ThemedText type="small" themeColor="textSecondary">
                          {current.exampleJa}
                        </ThemedText>
                      </View>
                    )}
                  </View>
                ) : (
                  <ThemedText type="small" themeColor="textSecondary">
                    タップして意味を表示
                  </ThemedText>
                )}
              </Card>
            </Pressable>

            {flipped ? (
              <View style={styles.gradeRow}>
                <GradeButton label="もう一度" color="#e5484d" onPress={() => onGrade('again')} />
                <GradeButton label="難しい" color="#e08b1e" onPress={() => onGrade('hard')} />
                <GradeButton label="普通" color="#3c87f7" onPress={() => onGrade('good')} />
                <GradeButton label="簡単" color="#2fa96c" onPress={() => onGrade('easy')} />
              </View>
            ) : (
              <ThemedText type="small" themeColor="textSecondary" style={styles.hint}>
                思い出してからカードをタップ →「もう一度〜簡単」で自己評価すると、忘却曲線に合わせて次回の出題日が決まります
              </ThemedText>
            )}
          </>
        ) : (
          <Card style={styles.doneCard}>
            <ThemedText type="subtitle">🎉 今日の分は完了！</ThemedText>
            <ThemedText type="small" themeColor="textSecondary">
              復習カードはすべて消化しました。余力があれば新規カードを追加で学習できます。
            </ThemedText>
            <AppButton label={`新規カードをあと${NEW_PER_SESSION}枚`} onPress={startMore} />
          </Card>
        )}
      </SafeAreaView>

      <AddWordModal visible={showAdd} onClose={() => setShowAdd(false)} onSave={onAddWord} />
    </ThemedView>
  );
}

function SpeakButton({ text }: { text: string }) {
  return (
    <Pressable onPress={() => speak(text)} style={({ pressed }) => pressed && styles.pressed}>
      <ThemedText type="default">🔊</ThemedText>
    </Pressable>
  );
}

function GradeButton({
  label,
  color,
  onPress,
}: {
  label: string;
  color: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.gradeButton, { backgroundColor: color }, pressed && styles.pressed]}>
      <ThemedText type="smallBold" style={styles.gradeLabel}>
        {label}
      </ThemedText>
    </Pressable>
  );
}

function AddWordModal({
  visible,
  onClose,
  onSave,
}: {
  visible: boolean;
  onClose: () => void;
  onSave: (w: CustomWord) => void;
}) {
  const [word, setWord] = useState('');
  const [meaning, setMeaning] = useState('');
  const [example, setExample] = useState('');
  const [exampleJa, setExampleJa] = useState('');

  const save = () => {
    if (!word.trim() || !meaning.trim()) return;
    onSave({
      id: 'u' + Date.now(),
      word: word.trim(),
      meaning: meaning.trim(),
      example: example.trim() || undefined,
      exampleJa: exampleJa.trim() || undefined,
    });
    setWord('');
    setMeaning('');
    setExample('');
    setExampleJa('');
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.modalBackdrop}>
        <ThemedView style={styles.modalBody}>
          <ScrollView contentContainerStyle={styles.modalScroll}>
            <ThemedText type="subtitle">単語を追加</ThemedText>
            <Field label="英単語（必須）" value={word} onChange={setWord} placeholder="proficiency" />
            <Field label="意味（必須）" value={meaning} onChange={setMeaning} placeholder="熟達・堪能" />
            <Field label="例文" value={example} onChange={setExample} placeholder="She has a high proficiency in English." />
            <Field label="例文の訳" value={exampleJa} onChange={setExampleJa} placeholder="彼女は英語に非常に堪能です。" />
            <View style={styles.modalButtons}>
              <AppButton label="キャンセル" variant="ghost" onPress={onClose} />
              <AppButton label="追加する" onPress={save} disabled={!word.trim() || !meaning.trim()} />
            </View>
          </ScrollView>
        </ThemedView>
      </View>
    </Modal>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
}) {
  return (
    <View style={styles.field}>
      <ThemedText type="small" themeColor="textSecondary">
        {label}
      </ThemedText>
      <ThemedView type="backgroundElement" style={styles.inputWrap}>
        <TextInput
          value={value}
          onChangeText={onChange}
          placeholder={placeholder}
          placeholderTextColor="#8b93a5"
          style={styles.input}
        />
      </ThemedView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  safeArea: {
    flex: 1,
    maxWidth: MaxContentWidth,
    paddingHorizontal: Spacing.four,
    paddingTop: TopContentInset,
    paddingBottom: BottomTabInset + Spacing.three,
    gap: Spacing.three,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardWrap: {
    flexGrow: 0,
  },
  card: {
    minHeight: 260,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.three,
    padding: Spacing.four,
  },
  wordRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    flexShrink: 1,
  },
  back: {
    alignItems: 'center',
    gap: Spacing.two,
  },
  pos: {
    opacity: 0.7,
  },
  exampleBlock: {
    marginTop: Spacing.two,
    gap: Spacing.one,
    alignItems: 'center',
  },
  example: {
    fontStyle: 'italic',
    flexShrink: 1,
  },
  gradeRow: {
    flexDirection: 'row',
    gap: Spacing.two,
    justifyContent: 'center',
  },
  gradeButton: {
    flex: 1,
    maxWidth: 110,
    paddingVertical: Spacing.three - 4,
    borderRadius: Spacing.three,
    alignItems: 'center',
  },
  gradeLabel: {
    color: '#ffffff',
  },
  hint: {
    textAlign: 'center',
  },
  doneCard: {
    alignItems: 'center',
    gap: Spacing.three,
    padding: Spacing.four,
  },
  pressed: {
    opacity: 0.6,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.four,
  },
  modalBody: {
    borderRadius: Spacing.three,
    width: '100%',
    maxWidth: 480,
    maxHeight: '85%',
  },
  modalScroll: {
    padding: Spacing.four,
    gap: Spacing.three,
  },
  field: {
    gap: Spacing.one,
  },
  inputWrap: {
    borderRadius: Spacing.two,
  },
  input: {
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two + 2,
    fontSize: 15,
    color: '#888f9c',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: Spacing.two,
    marginTop: Spacing.two,
  },
});
