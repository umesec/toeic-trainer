import { useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { ScrollView, StyleSheet, Pressable, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { AppButton, Card, Chip } from '@/components/ui';
import { BottomTabInset, MaxContentWidth, Spacing, TopContentInset } from '@/constants/theme';
import { QUIZZES } from '@/data/quizzes';
import { useFeatureColors, useTheme } from '@/hooks/use-theme';
import type { QuizQuestion, QuizTag } from '@/data/types';
import { todayStr } from '@/lib/srs';
import {
  bumpDaily,
  loadQuizStats,
  loadTagStats,
  loadWrongIds,
  recordMistake,
  recordPaceAnswer,
  recordPartAnswer,
  recordStudy,
  recordTagAnswer,
  saveQuizStats,
  saveWrongIds,
  type TagStatsMap,
} from '@/lib/storage';
import { shuffle } from '@/lib/util';

const SESSION_SIZE = 10;
/** Part 5 を900点ペースで解くための1問あたり目標秒数 */
const PACE_TARGET_SEC = 20;
const TAGS = ['全部', '品詞', '時制', '前置詞', '語彙', '関係詞', '接続詞'] as const;
type TagFilter = (typeof TAGS)[number];

type Phase = 'setup' | 'playing' | 'result';

export default function QuizScreen() {
  const router = useRouter();
  const theme = useTheme();
  const features = useFeatureColors();
  const today = todayStr();
  const [phase, setPhase] = useState<Phase>('setup');
  const [tag, setTag] = useState<TagFilter>('全部');
  const [session, setSession] = useState<QuizQuestion[]>([]);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [wrongIds, setWrongIds] = useState<Set<string>>(new Set());
  const [tagStats, setTagStats] = useState<TagStatsMap>({});
  const [elapsedSec, setElapsedSec] = useState(0);
  const questionStartMsRef = useRef(Date.now());
  const sessionMsRef = useRef(0);

  // 設定画面に戻るたびに弱点分析を最新化
  useEffect(() => {
    if (phase === 'setup') loadTagStats().then(setTagStats);
  }, [phase]);

  // 問題が変わるたびにタイマーリセット
  useEffect(() => {
    if (phase !== 'playing') return;
    questionStartMsRef.current = Date.now();
    setElapsedSec(0);
    const id = setInterval(() => setElapsedSec((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [phase, index]);

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
    sessionMsRef.current = 0;
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
    recordPartAnswer('part5', correct);
    const answerMs = Date.now() - questionStartMsRef.current;
    sessionMsRef.current += answerMs;
    recordPaceAnswer('part5', answerMs);
    if (!correct) recordMistake('part5', question.id, today);
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

              <Card>
                <ThemedText type="smallBold">📓 間違いノート</ThemedText>
                <ThemedText type="small" themeColor="textSecondary">
                  クイズ・練習・模試で間違えた問題が全Part横断で自動的に溜まります。解き直して正解するとノートから外れます。
                </ThemedText>
                <AppButton label="ノートを開く" variant="ghost" onPress={() => router.push('/quiz/mistakes')} />
              </Card>

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

              <Card tint={features.mock.tint}>
                <ThemedText type="smallBold">⏱ 模試・実力測定</ThemedText>
                <ThemedText type="small" themeColor="textSecondary">
                  ミニ模試（10分・15問）、実力測定モード（40分・68問）、本番と同じ200問のフル模試まで、推定スコア付きで受けられます。
                </ThemedText>
                <AppButton label="模試を受ける" variant="ghost" onPress={() => router.push('/quiz/mock')} />
              </Card>
            </>
          )}

          {phase === 'playing' && question && (
            <>
              <View style={styles.progressRow}>
                <ThemedText type="small" themeColor="textSecondary">
                  第 {index + 1} 問 / {session.length}　［{question.tag}］
                </ThemedText>
                <ThemedText
                  type="small"
                  themeColor={elapsedSec > PACE_TARGET_SEC ? undefined : 'textSecondary'}
                  style={elapsedSec > PACE_TARGET_SEC ? { color: theme.warning } : undefined}>
                  {elapsedSec}秒 / 目安{PACE_TARGET_SEC}秒
                </ThemedText>
              </View>
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
                        answered && isAnswer && [styles.choiceJudged, { borderColor: theme.success }],
                        answered && isPicked && !isAnswer && [styles.choiceJudged, { borderColor: theme.danger }],
                        pressed && !answered && styles.pressed,
                      ]}>
                      <ThemedView
                        type="backgroundElement"
                        style={[
                          styles.choiceInner,
                          answered && isAnswer && { backgroundColor: theme.successBg },
                          answered && isPicked && !isAnswer && { backgroundColor: theme.dangerBg },
                        ]}>
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
              {(() => {
                const avgSec = sessionMsRef.current / Math.max(1, session.length) / 1000;
                const onPace = avgSec <= PACE_TARGET_SEC;
                return (
                  <ThemedText type="small" style={{ color: onPace ? theme.success : theme.warning }}>
                    ⏱ 平均 {avgSec.toFixed(1)}秒/問（900点ペースの目安 {PACE_TARGET_SEC}秒）
                    {onPace ? ' — 本番ペースOK！' : ' — もう少しテンポを上げましょう'}
                  </ThemedText>
                );
              })()}
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
  const router = useRouter();
  const theme = useTheme();
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
        <Pressable
          key={r.tag}
          onPress={() => router.push({ pathname: '/quiz/grammar', params: { tag: r.tag } } as never)}
          style={({ pressed }) => pressed && { opacity: 0.6 }}>
          <View style={styles.weakRow}>
            <ThemedText type="small">{r.tag}</ThemedText>
            <View style={styles.weakRight}>
              <ThemedText type="small" themeColor="textSecondary">
                {r.rate}%（{r.answered}問）
              </ThemedText>
              <ThemedText type="small" themeColor="accent">解説 ▶</ThemedText>
            </View>
          </View>
        </Pressable>
      ))}
      {rows.length >= 2 && (
        <ThemedText type="small" style={{ color: theme.warning }}>
          💡 「{weakest.tag}」が最も苦手です。タップして文法ルールを確認しましょう。
        </ThemedText>
      )}
      <AppButton
        label="文法ルール一覧を見る"
        variant="ghost"
        onPress={() => router.push('/quiz/grammar' as never)}
      />
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  progressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    alignItems: 'center',
    paddingVertical: Spacing.half,
  },
  weakRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
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
  // 正誤の色（success/danger）は render 時にテーマから適用する
  choiceJudged: {
    borderWidth: 2,
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
