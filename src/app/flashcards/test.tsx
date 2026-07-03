import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { SpeakButton } from '@/components/speak-button';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { AppButton, Card, Chip } from '@/components/ui';
import { BottomTabInset, MaxContentWidth, Spacing, TopContentInset } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import type { Word } from '@/data/types';
import { WORDS } from '@/data/words';
import { newCardState, review, todayStr } from '@/lib/srs';
import { bumpDaily, loadProgress, recordStudy, saveProgress, type ProgressMap } from '@/lib/storage';
import { shuffle } from '@/lib/util';

const SESSION_SIZE = 10;

type Mode = 'e2j' | 'j2e';

interface TestQuestion {
  word: Word;
  /** 表示する選択肢（modeに応じて訳 or 英単語） */
  choices: string[];
  answer: number;
}

/** 同品詞の単語を優先して誤答選択肢を3つ抽選する */
function buildQuestion(word: Word, pool: Word[], mode: Mode): TestQuestion {
  const others = pool.filter((w) => w.id !== word.id);
  const samePos = shuffle(others.filter((w) => w.pos === word.pos));
  const rest = shuffle(others.filter((w) => w.pos !== word.pos));
  const distractors = [...samePos, ...rest].slice(0, 3);
  const toLabel = (w: Word) => (mode === 'e2j' ? w.meaning : w.word);
  const choices = shuffle([toLabel(word), ...distractors.map(toLabel)]);
  return { word, choices, answer: choices.indexOf(toLabel(word)) };
}

export default function WordTestScreen() {
  const router = useRouter();
  const theme = useTheme();
  const today = todayStr();
  const [mode, setMode] = useState<Mode>('e2j');
  const [session, setSession] = useState<TestQuestion[] | null>(null);
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [progress, setProgress] = useState<ProgressMap>({});

  const start = async () => {
    const p = await loadProgress();
    setProgress(p);
    // 学習済みの単語を優先し、足りなければ未学習から補充
    const seen = shuffle(WORDS.filter((w) => p[w.id]));
    const fresh = shuffle(WORDS.filter((w) => !p[w.id]));
    const targets = [...seen, ...fresh].slice(0, SESSION_SIZE);
    setSession(targets.map((w) => buildQuestion(w, WORDS, mode)));
    setIndex(0);
    setScore(0);
    setPicked(null);
  };

  const question = session?.[index];

  const pick = (i: number) => {
    if (picked !== null || !question) return;
    setPicked(i);
    const correct = i === question.answer;
    if (correct) setScore((s) => s + 1);
    // テストの結果をSRSにも反映する（正解=普通 / 不正解=もう一度）
    const state = progress[question.word.id] ?? newCardState(today);
    const updated = { ...progress, [question.word.id]: review(state, correct ? 'good' : 'again', today) };
    setProgress(updated);
    saveProgress(updated);
    bumpDaily(today, 'cards');
    recordStudy(today);
  };

  const next = () => {
    setIndex((i) => i + 1);
    setPicked(null);
  };

  const finished = session !== null && index >= session.length;

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          <Pressable onPress={() => router.back()} style={({ pressed }) => pressed && styles.pressed}>
            <ThemedText type="linkPrimary">← 単語カードに戻る</ThemedText>
          </Pressable>
          <ThemedText type="subtitle">単語テスト</ThemedText>

          {session === null && (
            <>
              <ThemedText type="small" themeColor="textSecondary">
                4択で単語の定着度をチェックします。結果は単語カードの復習スケジュールにも反映されます。
              </ThemedText>
              <View style={styles.chipRow}>
                <Chip label="英語 → 訳" selected={mode === 'e2j'} onPress={() => setMode('e2j')} />
                <Chip label="訳 → 英語" selected={mode === 'j2e'} onPress={() => setMode('j2e')} />
              </View>
              <AppButton label={`スタート（${SESSION_SIZE}問）`} onPress={start} />
            </>
          )}

          {question && !finished && (
            <>
              <ThemedText type="small" themeColor="textSecondary">
                第 {index + 1} 問 / {session.length}　正解 {score}
              </ThemedText>
              <Card style={styles.promptCard}>
                <View style={styles.promptRow}>
                  <ThemedText type="subtitle">
                    {mode === 'e2j' ? question.word.word : question.word.meaning}
                  </ThemedText>
                  {mode === 'e2j' && (
                    <SpeakButton text={question.word.word} />
                  )}
                </View>
                {mode === 'e2j' && (
                  <ThemedText type="small" themeColor="textSecondary">
                    【{question.word.pos}】
                  </ThemedText>
                )}
              </Card>

              <View style={styles.choices}>
                {question.choices.map((choice, i) => {
                  const done = picked !== null;
                  const isAnswer = i === question.answer;
                  const isPicked = i === picked;
                  const showCorrect = done && isAnswer;
                  const showWrong = done && isPicked && !isAnswer;
                  return (
                    <Pressable
                      key={choice}
                      onPress={() => pick(i)}
                      style={({ pressed }) => [
                        styles.choice,
                        showCorrect && [styles.choiceMark, { borderColor: theme.success }],
                        showWrong && [styles.choiceMark, { borderColor: theme.danger }],
                        pressed && !done && styles.pressed,
                      ]}>
                      <ThemedView
                        type="backgroundElement"
                        style={[
                          styles.choiceInner,
                          showCorrect && { backgroundColor: theme.successBg },
                          showWrong && { backgroundColor: theme.dangerBg },
                        ]}>
                        <ThemedText type="default">{choice}</ThemedText>
                      </ThemedView>
                    </Pressable>
                  );
                })}
              </View>

              {picked !== null && (
                <>
                  <Card>
                    <ThemedText type="smallBold">
                      {picked === question.answer ? '⭕ 正解！' : '❌ 不正解…'}
                    </ThemedText>
                    <ThemedText type="small">
                      {question.word.word}【{question.word.pos}】= {question.word.meaning}
                    </ThemedText>
                    {!!question.word.example && (
                      <ThemedText type="small" themeColor="textSecondary">
                        {question.word.example}（{question.word.exampleJa}）
                      </ThemedText>
                    )}
                  </Card>
                  <AppButton label={index + 1 < session.length ? '次の問題へ' : '結果を見る'} onPress={next} />
                </>
              )}
            </>
          )}

          {finished && session && (
            <Card style={styles.resultCard}>
              <ThemedText type="subtitle">
                {score} / {session.length} 問正解
              </ThemedText>
              <ThemedText type="small" themeColor="textSecondary">
                間違えた単語は「もう一度」扱いで復習キューに戻りました。
              </ThemedText>
              <View style={styles.resultButtons}>
                <AppButton label="もう一度" onPress={start} />
                <AppButton label="モード選択に戻る" variant="ghost" onPress={() => setSession(null)} />
              </View>
            </Card>
          )}
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
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
  },
  scroll: {
    paddingTop: TopContentInset,
    paddingBottom: BottomTabInset + Spacing.four,
    gap: Spacing.three,
  },
  chipRow: {
    flexDirection: 'row',
    gap: Spacing.two,
  },
  promptCard: {
    alignItems: 'center',
    padding: Spacing.four,
  },
  promptRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  choices: {
    gap: Spacing.two,
  },
  choice: {
    borderRadius: Spacing.two,
  },
  choiceInner: {
    borderRadius: Spacing.two,
    paddingVertical: Spacing.two + 2,
    paddingHorizontal: Spacing.three,
  },
  choiceMark: {
    borderWidth: 2,
  },
  resultCard: {
    alignItems: 'center',
    gap: Spacing.three,
    padding: Spacing.four,
  },
  resultButtons: {
    flexDirection: 'row',
    gap: Spacing.two,
  },
  pressed: {
    opacity: 0.6,
  },
});
