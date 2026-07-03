import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Pressable, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { AppButton, Card, Chip } from '@/components/ui';
import { BottomTabInset, MaxContentWidth, Spacing, TopContentInset } from '@/constants/theme';
import { QUIZZES } from '@/data/quizzes';
import type { QuizQuestion, QuizTag } from '@/data/types';
import { todayStr } from '@/lib/srs';
import {
  bumpDaily,
  loadQuizStats,
  loadTagStats,
  loadWrongIds,
  recordStudy,
  recordTagAnswer,
  saveQuizStats,
  saveWrongIds,
  type TagStatsMap,
} from '@/lib/storage';
import { shuffle } from '@/lib/util';

const SESSION_SIZE = 10;
const TAGS = ['全部', '品詞', '時制', '前置詞', '語彙'] as const;
type TagFilter = (typeof TAGS)[number];

type Phase = 'setup' | 'playing' | 'result';

export default function QuizScreen() {
  const router = useRouter();
  const today = todayStr();
  const [phase, setPhase] = useState<Phase>('setup');
  const [tag, setTag] = useState<TagFilter>('全部');
  const [session, setSession] = useState<QuizQuestion[]>([]);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [wrongIds, setWrongIds] = useState<Set<string>>(new Set());
  const [tagStats, setTagStats] = useState<TagStatsMap>({});

  // 設定画面に戻るたびに弱点分析を最新化
  useEffect(() => {
    if (phase === 'setup') loadTagStats().then(setTagStats);
  }, [phase]);

  const start = async () => {
    const pool = tag === '全部' ? QUIZZES : QUIZZES.filter((q) => q.tag === (tag as QuizTag));
    const wrong = new Set(await loadWrongIds());
    // 過去に間違えた問題を優先して出題する
    const prioritized = [
      ...shuffle(pool.filter((q) => wrong.has(q.id))),
      ...shuffle(pool.filter((q) => !wrong.has(q.id))),
    ].slice(0, SESSION_SIZE);
    setSession(prioritized);
    setWrongIds(wrong);
    setIndex(0);
    setScore(0);
    setSelected(null);
    setPhase('playing');
  };

  const question = session[index];

  const pick = (i: number) => {
    if (selected !== null || !question) return;
    setSelected(i);
    const correct = i === question.answer;
    if (correct) setScore((s) => s + 1);
    setWrongIds((prev) => {
      const next = new Set(prev);
      if (correct) next.delete(question.id);
      else next.add(question.id);
      return next;
    });
    recordTagAnswer(question.tag, correct);
    bumpDaily(today, 'quiz');
    recordStudy(today);
  };

  const next = async () => {
    if (index + 1 < session.length) {
      setIndex(index + 1);
      setSelected(null);
      return;
    }
    // セッション終了: 成績と復習リストを保存
    const stats = await loadQuizStats();
    await saveQuizStats({ answered: stats.answered + session.length, correct: stats.correct + score });
    await saveWrongIds([...wrongIds]);
    setPhase('result');
  };

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          <ThemedText type="subtitle">文法・語彙クイズ</ThemedText>

          {phase === 'setup' && (
            <>
              <ThemedText type="small" themeColor="textSecondary">
                TOEIC Part 5 形式の4択問題です。分野を選んでスタート。間違えた問題は次回優先的に出題されます。
              </ThemedText>
              <View style={styles.chipRow}>
                {TAGS.map((t) => (
                  <Chip key={t} label={t} selected={tag === t} onPress={() => setTag(t)} />
                ))}
              </View>
              <AppButton label={`スタート（${SESSION_SIZE}問）`} onPress={start} />

              <WeaknessCard tagStats={tagStats} />

              <View style={styles.linkRow}>
                <Card style={styles.linkCard}>
                  <ThemedText type="smallBold">📄 Part 6 長文穴埋め</ThemedText>
                  <AppButton label="練習する" variant="ghost" onPress={() => router.push('/quiz/part6')} />
                </Card>
                <Card style={styles.linkCard}>
                  <ThemedText type="smallBold">📰 Part 7 長文読解</ThemedText>
                  <AppButton label="練習する" variant="ghost" onPress={() => router.push('/quiz/part7')} />
                </Card>
              </View>

              <Card style={styles.mockCard}>
                <ThemedText type="smallBold">⏱ 模試・実力測定</ThemedText>
                <ThemedText type="small" themeColor="textSecondary">
                  ミニ模試（10分・15問）と、推定スコア付きの実力測定モード（40分・65問、Part 2〜7を横断）が受けられます。
                </ThemedText>
                <AppButton label="模試を受ける" variant="ghost" onPress={() => router.push('/quiz/mock')} />
              </Card>
            </>
          )}

          {phase === 'playing' && question && (
            <>
              <ThemedText type="small" themeColor="textSecondary">
                第 {index + 1} 問 / {session.length}　［{question.tag}］
              </ThemedText>
              <Card>
                <ThemedText type="default">{question.sentence}</ThemedText>
              </Card>

              <View style={styles.choices}>
                {question.choices.map((choice, i) => {
                  const isAnswer = i === question.answer;
                  const isPicked = i === selected;
                  const answered = selected !== null;
                  return (
                    <Pressable
                      key={choice}
                      onPress={() => pick(i)}
                      style={({ pressed }) => [
                        styles.choice,
                        answered && isAnswer && styles.choiceCorrect,
                        answered && isPicked && !isAnswer && styles.choiceWrong,
                        pressed && !answered && styles.pressed,
                      ]}>
                      <ThemedView
                        type={answered && (isAnswer || isPicked) ? 'background' : 'backgroundElement'}
                        style={styles.choiceInner}>
                        <ThemedText type="default">
                          ({String.fromCharCode(65 + i)}) {choice}
                          {answered && isAnswer ? '  ✔' : ''}
                          {answered && isPicked && !isAnswer ? '  ✘' : ''}
                        </ThemedText>
                      </ThemedView>
                    </Pressable>
                  );
                })}
              </View>

              {selected !== null && (
                <>
                  <Card>
                    <ThemedText type="smallBold">
                      {selected === question.answer ? '⭕ 正解！' : '❌ 不正解…'}
                    </ThemedText>
                    <ThemedText type="small">{question.explanation}</ThemedText>
                    <ThemedText type="small" themeColor="textSecondary">
                      訳: {question.sentenceJa}
                    </ThemedText>
                  </Card>
                  <AppButton
                    label={index + 1 < session.length ? '次の問題へ' : '結果を見る'}
                    onPress={next}
                  />
                </>
              )}
            </>
          )}

          {phase === 'result' && (
            <Card style={styles.resultCard}>
              <ThemedText type="subtitle">
                {score} / {session.length} 問正解
              </ThemedText>
              <ThemedText type="default">
                正答率 {Math.round((score / Math.max(1, session.length)) * 100)}%
              </ThemedText>
              <ThemedText type="small" themeColor="textSecondary">
                間違えた問題は復習リストに入り、次回のセッションで優先的に出題されます。
              </ThemedText>
              <View style={styles.resultButtons}>
                <AppButton label="もう一度" onPress={start} />
                <AppButton label="分野を選び直す" variant="ghost" onPress={() => setPhase('setup')} />
              </View>
            </Card>
          )}
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

/** 分野別の累計正答率と最弱分野を表示する */
function WeaknessCard({ tagStats }: { tagStats: TagStatsMap }) {
  const rows = TAGS.filter((t) => t !== '全部')
    .map((t) => ({ tag: t, stats: tagStats[t] }))
    .filter((r) => r.stats && r.stats.answered > 0)
    .map((r) => ({ tag: r.tag, rate: Math.round((r.stats!.correct / r.stats!.answered) * 100), answered: r.stats!.answered }));

  if (rows.length === 0) return null;
  const weakest = rows.reduce((a, b) => (b.rate < a.rate ? b : a));

  return (
    <Card>
      <ThemedText type="smallBold">📊 弱点分析（累計）</ThemedText>
      {rows.map((r) => (
        <View key={r.tag} style={styles.weakRow}>
          <ThemedText type="small">{r.tag}</ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            {r.rate}%（{r.answered}問）
          </ThemedText>
        </View>
      ))}
      {rows.length >= 2 && (
        <ThemedText type="small" style={styles.weakHint}>
          💡 「{weakest.tag}」が最も苦手です。分野を絞って集中的に解きましょう。
        </ThemedText>
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  mockCard: {
    borderWidth: 1.5,
    borderColor: '#3c87f7',
  },
  linkRow: {
    flexDirection: 'row',
    gap: Spacing.two,
  },
  linkCard: {
    flex: 1,
    justifyContent: 'space-between',
  },
  weakRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  weakHint: {
    color: '#e08b1e',
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
    flexWrap: 'wrap',
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
  choiceCorrect: {
    borderWidth: 2,
    borderColor: '#2fa96c',
  },
  choiceWrong: {
    borderWidth: 2,
    borderColor: '#e5484d',
  },
  pressed: {
    opacity: 0.6,
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
});
