import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { AppButton, Card } from '@/components/ui';
import { BottomTabInset, MaxContentWidth, Spacing, TopContentInset } from '@/constants/theme';
import { PART2_ITEMS } from '@/data/part2';
import { QUIZZES } from '@/data/quizzes';
import type { Part2Item, QuizQuestion } from '@/data/types';
import { speak, stopSpeech } from '@/lib/speech';
import { todayStr } from '@/lib/srs';
import {
  addMockResult,
  bumpDaily,
  loadMockHistory,
  recordStudy,
  recordTagAnswer,
  type MockResult,
} from '@/lib/storage';
import { shuffle } from '@/lib/util';

const P2_COUNT = 5;
const P5_COUNT = 10;
const TIME_LIMIT = 10 * 60; // 秒

const P2_LABELS = ['A', 'B', 'C'] as const;

type Phase = 'intro' | 'part2' | 'part5' | 'result';

export default function MockTestScreen() {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>('intro');
  const [p2Items, setP2Items] = useState<Part2Item[]>([]);
  const [p5Items, setP5Items] = useState<QuizQuestion[]>([]);
  const [p2Answers, setP2Answers] = useState<(number | null)[]>([]);
  const [p5Answers, setP5Answers] = useState<(number | null)[]>([]);
  const [idx, setIdx] = useState(0);
  const [remaining, setRemaining] = useState(TIME_LIMIT);
  const [history, setHistory] = useState<MockResult[]>([]);

  useEffect(() => {
    loadMockHistory().then(setHistory);
  }, [phase]);

  // タイマー
  useEffect(() => {
    if (phase !== 'part2' && phase !== 'part5') return;
    const timer = setInterval(() => setRemaining((r) => r - 1), 1000);
    return () => clearInterval(timer);
  }, [phase]);

  // 時間切れで自動終了（未回答は不正解扱い）
  useEffect(() => {
    if (remaining <= 0 && (phase === 'part2' || phase === 'part5')) {
      finish(p2Answers, p5Answers);
    }
    // finish は state から組み立てるためこの依存で十分
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [remaining]);

  // Part 2 は設問が変わるたびに自動再生（本番同様、耳だけで解く）
  useEffect(() => {
    if (phase === 'part2' && p2Items[idx]) {
      const it = p2Items[idx];
      speak(
        `Number ${idx + 1}. ${it.question} ... A. ${it.choices[0]} ... B. ${it.choices[1]} ... C. ${it.choices[2]}`
      );
    }
  }, [phase, idx, p2Items]);

  const start = () => {
    setP2Items(shuffle(PART2_ITEMS).slice(0, P2_COUNT));
    setP5Items(shuffle(QUIZZES).slice(0, P5_COUNT));
    setP2Answers(Array(P2_COUNT).fill(null));
    setP5Answers(Array(P5_COUNT).fill(null));
    setIdx(0);
    setRemaining(TIME_LIMIT);
    setPhase('part2');
  };

  const finish = async (p2A: (number | null)[], p5A: (number | null)[]) => {
    stopSpeech();
    setPhase('result');
    const listening = p2Items.filter((it, i) => p2A[i] === it.answer).length;
    const reading = p5Items.filter((it, i) => p5A[i] === it.answer).length;
    const today = todayStr();
    // recordTagAnswer は read-modify-write のため直列に実行する
    for (let i = 0; i < p5Items.length; i++) {
      await recordTagAnswer(p5Items[i].tag, p5A[i] === p5Items[i].answer);
    }
    await bumpDaily(today, 'listening', p2Items.length);
    await bumpDaily(today, 'quiz', p5Items.length);
    await recordStudy(today);
    await addMockResult({
      date: today,
      listening,
      listeningTotal: p2Items.length,
      reading,
      readingTotal: p5Items.length,
    });
  };

  const answerP2 = (i: number) => {
    const a = [...p2Answers];
    a[idx] = i;
    setP2Answers(a);
    stopSpeech();
    if (idx + 1 < p2Items.length) {
      setIdx(idx + 1);
    } else {
      setIdx(0);
      setPhase('part5');
    }
  };

  const answerP5 = (i: number) => {
    const a = [...p5Answers];
    a[idx] = i;
    setP5Answers(a);
    if (idx + 1 < p5Items.length) {
      setIdx(idx + 1);
    } else {
      finish(p2Answers, a);
    }
  };

  const mmss = `${String(Math.floor(Math.max(0, remaining) / 60)).padStart(2, '0')}:${String(
    Math.max(0, remaining) % 60
  ).padStart(2, '0')}`;

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          {phase === 'intro' && (
            <>
              <Pressable onPress={() => router.back()} style={({ pressed }) => pressed && styles.pressed}>
                <ThemedText type="linkPrimary">← クイズに戻る</ThemedText>
              </Pressable>
              <ThemedText type="subtitle">⏱ ミニ模試</ThemedText>
              <Card>
                <ThemedText type="small">
                  ・Part 2（応答問題）{P2_COUNT}問 → Part 5（文法・語彙）{P5_COUNT}問{'\n'}
                  ・制限時間 {TIME_LIMIT / 60} 分。時間切れで自動終了{'\n'}
                  ・本番同様、回答中に正誤は表示されません{'\n'}
                  ・Part 2 は問題文が自動で読み上げられます（音が出ます）
                </ThemedText>
              </Card>
              {history.length > 0 && (
                <Card>
                  <ThemedText type="smallBold">過去の結果</ThemedText>
                  {history.slice(-3).reverse().map((h, i) => (
                    <View key={`${h.date}-${i}`} style={styles.historyRow}>
                      <ThemedText type="small" themeColor="textSecondary">
                        {h.date}
                      </ThemedText>
                      <ThemedText type="small">
                        L {h.listening}/{h.listeningTotal}・R {h.reading}/{h.readingTotal}
                      </ThemedText>
                    </View>
                  ))}
                </Card>
              )}
              <AppButton label="模試をはじめる" onPress={start} />
            </>
          )}

          {(phase === 'part2' || phase === 'part5') && (
            <View style={styles.testHeader}>
              <ThemedText type="smallBold">
                {phase === 'part2' ? `Part 2 — 第 ${idx + 1}/${p2Items.length} 問` : `Part 5 — 第 ${idx + 1}/${p5Items.length} 問`}
              </ThemedText>
              <ThemedText type="smallBold" style={remaining < 60 ? styles.timeWarning : styles.accent}>
                ⏱ {mmss}
              </ThemedText>
            </View>
          )}

          {phase === 'part2' && p2Items[idx] && (
            <>
              <ThemedText type="small" themeColor="textSecondary">
                最も適切な応答を選んでください。
              </ThemedText>
              <AppButton
                label="🔊 もう一度再生"
                variant="ghost"
                onPress={() => {
                  const it = p2Items[idx];
                  speak(`${it.question} ... A. ${it.choices[0]} ... B. ${it.choices[1]} ... C. ${it.choices[2]}`);
                }}
              />
              <View style={styles.choices}>
                {P2_LABELS.map((label, i) => (
                  <Pressable key={label} onPress={() => answerP2(i)} style={({ pressed }) => pressed && styles.pressed}>
                    <ThemedView type="backgroundElement" style={styles.choiceInner}>
                      <ThemedText type="default">({label})</ThemedText>
                    </ThemedView>
                  </Pressable>
                ))}
              </View>
            </>
          )}

          {phase === 'part5' && p5Items[idx] && (
            <>
              <Card>
                <ThemedText type="default">{p5Items[idx].sentence}</ThemedText>
              </Card>
              <View style={styles.choices}>
                {p5Items[idx].choices.map((choice, i) => (
                  <Pressable key={choice} onPress={() => answerP5(i)} style={({ pressed }) => pressed && styles.pressed}>
                    <ThemedView type="backgroundElement" style={styles.choiceInner}>
                      <ThemedText type="default">
                        ({String.fromCharCode(65 + i)}) {choice}
                      </ThemedText>
                    </ThemedView>
                  </Pressable>
                ))}
              </View>
            </>
          )}

          {phase === 'result' && (
            <MockResultView
              p2Items={p2Items}
              p5Items={p5Items}
              p2Answers={p2Answers}
              p5Answers={p5Answers}
              onRetry={start}
              onBack={() => router.back()}
            />
          )}
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

function MockResultView({
  p2Items,
  p5Items,
  p2Answers,
  p5Answers,
  onRetry,
  onBack,
}: {
  p2Items: Part2Item[];
  p5Items: QuizQuestion[];
  p2Answers: (number | null)[];
  p5Answers: (number | null)[];
  onRetry: () => void;
  onBack: () => void;
}) {
  const listening = p2Items.filter((it, i) => p2Answers[i] === it.answer).length;
  const reading = p5Items.filter((it, i) => p5Answers[i] === it.answer).length;
  const total = listening + reading;
  const totalCount = p2Items.length + p5Items.length;

  const wrongP2 = p2Items.map((it, i) => ({ it, picked: p2Answers[i] })).filter((x) => x.picked !== x.it.answer);
  const wrongP5 = p5Items.map((it, i) => ({ it, picked: p5Answers[i] })).filter((x) => x.picked !== x.it.answer);

  return (
    <>
      <ThemedText type="subtitle">結果</ThemedText>
      <Card style={styles.resultCard}>
        <ThemedText type="subtitle">
          {total} / {totalCount}
        </ThemedText>
        <View style={styles.historyRow}>
          <ThemedText type="small">🎧 リスニング（Part 2）</ThemedText>
          <ThemedText type="smallBold">
            {listening} / {p2Items.length}
          </ThemedText>
        </View>
        <View style={styles.historyRow}>
          <ThemedText type="small">📖 リーディング（Part 5）</ThemedText>
          <ThemedText type="smallBold">
            {reading} / {p5Items.length}
          </ThemedText>
        </View>
      </Card>

      {(wrongP2.length > 0 || wrongP5.length > 0) && (
        <ThemedText type="smallBold">間違えた問題の復習</ThemedText>
      )}
      {wrongP2.map(({ it, picked }) => (
        <Card key={it.id}>
          <ThemedText type="small" themeColor="textSecondary">
            Part 2{picked === null ? '（時間切れ）' : ''}
          </ThemedText>
          <ThemedText type="small">
            Q: {it.question}（{it.questionJa}）
          </ThemedText>
          <ThemedText type="small">
            正解: ({P2_LABELS[it.answer]}) {it.choices[it.answer]}
          </ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            💡 {it.explanation}
          </ThemedText>
        </Card>
      ))}
      {wrongP5.map(({ it, picked }) => (
        <Card key={it.id}>
          <ThemedText type="small" themeColor="textSecondary">
            Part 5［{it.tag}］{picked === null ? '（時間切れ）' : ''}
          </ThemedText>
          <ThemedText type="small">{it.sentence}</ThemedText>
          <ThemedText type="small">
            正解: ({String.fromCharCode(65 + it.answer)}) {it.choices[it.answer]}
          </ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            💡 {it.explanation}
          </ThemedText>
        </Card>
      ))}

      <View style={styles.resultButtons}>
        <AppButton label="もう一度" onPress={onRetry} />
        <AppButton label="クイズに戻る" variant="ghost" onPress={onBack} />
      </View>
    </>
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
  testHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  accent: {
    color: '#3c87f7',
  },
  timeWarning: {
    color: '#e5484d',
  },
  choices: {
    gap: Spacing.two,
  },
  choiceInner: {
    borderRadius: Spacing.two,
    paddingVertical: Spacing.two + 2,
    paddingHorizontal: Spacing.three,
  },
  historyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  resultCard: {
    alignItems: 'center',
    gap: Spacing.two,
    padding: Spacing.four,
  },
  resultButtons: {
    flexDirection: 'row',
    gap: Spacing.two,
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.6,
  },
});
