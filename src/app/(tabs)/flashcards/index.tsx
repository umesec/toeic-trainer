import { useRouter } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  Extrapolation,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { Modal, Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { SpeakButton } from '@/components/speak-button';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { AppButton, Card } from '@/components/ui';
import { BottomTabInset, MaxContentWidth, Radius, Spacing, TopContentInset } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import type { Word } from '@/data/types';
import { WORDS } from '@/data/words';
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

const NEW_PER_SESSION = 10;
const SWIPE_THRESHOLD = 80;

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
  const router = useRouter();
  const theme = useTheme();
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const current = queue[0];
  // 「今日の分は完了」カードで新規カードの残数を出すために使う
  const freshRemaining = allWords.filter((w) => !progress[w.id]).length;
  // キュー内訳（復習=学習履歴のあるカード / 新規=初見カード）
  const reviewInQueue = queue.filter((w) => progress[w.id]).length;
  const newInQueue = queue.length - reviewInQueue;

  // 単語が切り替わったら必ず表を表示に戻す
  useEffect(() => {
    setFlipped(false);
  }, [current?.id]);

  const translateX = useSharedValue(0);

  const gradeAndReset = (grade: Grade) => {
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
    // again/hard は当日中に再挑戦できるようキュー末尾へ回す
    setQueue((q) => (grade === 'hard' || grade === 'again' ? [...q.slice(1), current] : q.slice(1)));
  };

  const pan = Gesture.Pan()
    .enabled(flipped)
    .onUpdate((e) => {
      translateX.value = e.translationX;
    })
    .onEnd((e) => {
      if (e.translationX > SWIPE_THRESHOLD) {
        runOnJS(gradeAndReset)('easy');
        translateX.value = withSpring(0);
      } else if (e.translationX < -SWIPE_THRESHOLD) {
        runOnJS(gradeAndReset)('hard');
        translateX.value = withSpring(0);
      } else {
        translateX.value = withSpring(0);
      }
    });

  const cardAnimStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      {
        rotate:
          interpolate(translateX.value, [-160, 160], [-12, 12], Extrapolation.CLAMP) + 'deg',
      },
    ],
  }));

  const rightLabelStyle = useAnimatedStyle(() => ({
    opacity: interpolate(translateX.value, [20, SWIPE_THRESHOLD], [0, 1], Extrapolation.CLAMP),
  }));
  const leftLabelStyle = useAnimatedStyle(() => ({
    opacity: interpolate(translateX.value, [-20, -SWIPE_THRESHOLD], [0, 1], Extrapolation.CLAMP),
  }));
  const rightTintStyle = useAnimatedStyle(() => ({
    opacity: interpolate(translateX.value, [20, SWIPE_THRESHOLD], [0, 0.18], Extrapolation.CLAMP),
  }));
  const leftTintStyle = useAnimatedStyle(() => ({
    opacity: interpolate(translateX.value, [-20, -SWIPE_THRESHOLD], [0, 0.18], Extrapolation.CLAMP),
  }));

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
          🕒 復習 {reviewInQueue} 枚 ・ ✨ 新規 {newInQueue} 枚 ・ 今日 {doneCount} 枚学習
        </ThemedText>
        <ThemedText type="small" themeColor="textSecondary">
          期限が来た復習カードから優先的に出題されます（SRS間隔反復）
        </ThemedText>

        <View style={styles.navRow}>
          <AppButton label="🔤 単語テスト" variant="ghost" onPress={() => router.push('/flashcards/test')} style={styles.navButton} />
          <AppButton label="📖 単語一覧" variant="ghost" onPress={() => router.push('/flashcards/list')} style={styles.navButton} />
        </View>

        {!ready ? null : current ? (
          <View style={styles.cardArea}>
            <GestureDetector gesture={pan}>
              <Animated.View style={[styles.cardWrap, cardAnimStyle]}>
                {/* 色オーバーレイ */}
                <Animated.View
                  style={[styles.tintOverlay, { backgroundColor: theme.success }, rightTintStyle]}
                  pointerEvents="none"
                />
                <Animated.View
                  style={[styles.tintOverlay, { backgroundColor: theme.danger }, leftTintStyle]}
                  pointerEvents="none"
                />

                {/* スワイプラベル */}
                <Animated.View style={[styles.swipeLabel, styles.swipeLabelRight, rightLabelStyle]}>
                  <ThemedText type="smallBold" style={{ color: theme.success }}>簡単 ✓</ThemedText>
                </Animated.View>
                <Animated.View style={[styles.swipeLabel, styles.swipeLabelLeft, leftLabelStyle]}>
                  <ThemedText type="smallBold" style={{ color: theme.danger }}>✗ 難しい</ThemedText>
                </Animated.View>

                <Pressable style={styles.cardPressable} onPress={() => setFlipped((f) => !f)}>
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
              </Animated.View>
            </GestureDetector>

            {flipped ? (
              <View style={styles.gradeArea}>
                <ThemedText type="small" themeColor="textSecondary" style={styles.swipeHint}>
                  スワイプ: ← 難しい / 簡単 →
                </ThemedText>
                <View style={styles.gradeRow}>
                  <AppButton
                    label="もう一度"
                    variant="ghost"
                    onPress={() => gradeAndReset('again')}
                    style={styles.gradeButton}
                  />
                  <AppButton
                    label="普通"
                    variant="ghost"
                    onPress={() => gradeAndReset('good')}
                    style={styles.gradeButton}
                  />
                </View>
              </View>
            ) : (
              <ThemedText type="small" themeColor="textSecondary" style={styles.swipeHint}>
                思い出してからタップして確認
              </ThemedText>
            )}
          </View>
        ) : (
          <Card style={styles.doneCard}>
            <ThemedText type="subtitle">🎉 今日の分は完了！</ThemedText>
            {freshRemaining > 0 ? (
              <>
                <ThemedText type="small" themeColor="textSecondary">
                  復習カードはすべて消化しました。余力があれば新規カードを追加で学習できます。
                </ThemedText>
                <AppButton
                  label={`新規カードをあと${Math.min(NEW_PER_SESSION, freshRemaining)}枚`}
                  onPress={startMore}
                />
              </>
            ) : (
              <ThemedText type="small" themeColor="textSecondary">
                収録されている単語はすべて学習済みです。おつかれさまでした！
                復習カードが貯まったらまたここに表示されます。
              </ThemedText>
            )}
          </Card>
        )}
      </SafeAreaView>

      <AddWordModal visible={showAdd} onClose={() => setShowAdd(false)} onSave={onAddWord} />
    </ThemedView>
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
  const theme = useTheme();
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
          placeholderTextColor={theme.textSecondary}
          style={[styles.input, { color: theme.text }]}
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
  navRow: {
    flexDirection: 'row',
    gap: Spacing.two,
  },
  navButton: {
    flex: 1,
  },
  cardArea: {
    flex: 1,
    justifyContent: 'center',
    gap: Spacing.three,
  },
  cardWrap: {
    position: 'relative',
  },
  cardPressable: {
    borderRadius: Radius.lg,
    overflow: 'hidden',
  },
  tintOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: Radius.lg,
    zIndex: 1,
  },
  swipeLabel: {
    position: 'absolute',
    top: Spacing.four,
    zIndex: 2,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    borderRadius: Radius.sm,
    borderWidth: 2,
  },
  swipeLabelRight: {
    right: Spacing.three,
    borderColor: 'transparent',
  },
  swipeLabelLeft: {
    left: Spacing.three,
    borderColor: 'transparent',
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
  swipeHint: {
    textAlign: 'center',
  },
  gradeArea: {
    gap: Spacing.two,
  },
  gradeRow: {
    flexDirection: 'row',
    gap: Spacing.two,
    justifyContent: 'center',
  },
  gradeButton: {
    flex: 1,
  },
  doneCard: {
    alignItems: 'center',
    gap: Spacing.three,
    padding: Spacing.four,
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
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: Spacing.two,
    marginTop: Spacing.two,
  },
});
