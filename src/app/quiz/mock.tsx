import { useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { AppButton, Card } from '@/components/ui';
import { BottomTabInset, MaxContentWidth, Spacing, TopContentInset } from '@/constants/theme';
import { PART1_ITEMS } from '@/data/part1';
import { PART2_ITEMS } from '@/data/part2';
import { LISTENING_SETS } from '@/data/part34';
import { PART6_SETS } from '@/data/part6';
import { PART7_SETS } from '@/data/part7';
import { QUIZZES } from '@/data/quizzes';
import type { ListeningSet, Part1Item, Part2Item, Part6Set, Part7Set, QuizQuestion } from '@/data/types';
import { useFeatureColors, useTheme } from '@/hooks/use-theme';
import { setQuestionId } from '@/lib/mistakes';
import { estimateScore } from '@/lib/score';
import { pitchForSpeaker, speak, speakLines, stopSpeech } from '@/lib/speech';
import { todayStr } from '@/lib/srs';
import {
  addMockResult,
  bumpDaily,
  loadMockHistory,
  recordMistake,
  recordStudy,
  recordTagAnswer,
  type MockResult,
} from '@/lib/storage';
import { shuffle } from '@/lib/util';

type Mode = 'mini' | 'full';

const MODE_CONFIG = {
  mini: { label: 'ミニ模試', minutes: 10, p1: 0, p2: 5, p34: 0, p5: 10, p6: 0, p7: 0 },
  full: { label: '実力測定モード', minutes: 40, p1: 3, p2: 13, p34: 5, p5: 20, p6: 2, p7: 3 },
} as const;

const P1_LABELS = ['A', 'B', 'C', 'D'] as const;
const P2_LABELS = ['A', 'B', 'C'] as const;

interface TestPlan {
  mode: Mode;
  part1: Part1Item[];
  part2: Part2Item[];
  part34: ListeningSet[];
  part5: QuizQuestion[];
  part6: Part6Set[];
  part7: Part7Set[];
}

interface Answers {
  p1: (number | null)[];
  p2: (number | null)[];
  p34: (number | null)[][];
  p5: (number | null)[];
  p6: (number | null)[][];
  p7: (number | null)[][];
}

const SECTION_ORDER = ['part1', 'part2', 'part34', 'part5', 'part6', 'part7'] as const;
type SectionKind = (typeof SECTION_ORDER)[number];

export default function MockTestScreen() {
  const router = useRouter();
  const theme = useTheme();
  const features = useFeatureColors();
  const [phase, setPhase] = useState<'intro' | 'test' | 'result'>('intro');
  const [plan, setPlan] = useState<TestPlan | null>(null);
  const [sectionIdx, setSectionIdx] = useState(0);
  const [itemIdx, setItemIdx] = useState(0);
  const [remaining, setRemaining] = useState(0);
  const [history, setHistory] = useState<MockResult[]>([]);
  const answersRef = useRef<Answers | null>(null);
  const [, setTick] = useState(0);
  const rerender = () => setTick((t) => t + 1);

  useEffect(() => {
    loadMockHistory().then(setHistory);
  }, [phase]);

  const sections: SectionKind[] = plan
    ? SECTION_ORDER.filter((k) => sectionSize(plan, k) > 0)
    : [];
  const kind = sections[sectionIdx];

  // タイマー
  useEffect(() => {
    if (phase !== 'test') return;
    const timer = setInterval(() => setRemaining((r) => r - 1), 1000);
    return () => clearInterval(timer);
  }, [phase]);

  useEffect(() => {
    if (remaining <= 0 && phase === 'test') finish();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [remaining]);

  // リスニングセクションは設問が変わるたびに自動再生
  useEffect(() => {
    if (phase !== 'test' || !plan) return;
    if (kind === 'part1') {
      const it = plan.part1[itemIdx];
      speak(`Number ${itemIdx + 1}. ... A. ${it.statements[0]} ... B. ${it.statements[1]} ... C. ${it.statements[2]} ... D. ${it.statements[3]}`);
    } else if (kind === 'part2') {
      const it = plan.part2[itemIdx];
      speak(`Number ${itemIdx + 1}. ${it.question} ... A. ${it.choices[0]} ... B. ${it.choices[1]} ... C. ${it.choices[2]}`);
    } else if (kind === 'part34') {
      const set = plan.part34[itemIdx];
      speakLines(set.script.map((l) => ({ text: l.text, pitch: pitchForSpeaker(l.speaker) })));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, sectionIdx, itemIdx]);

  const start = (mode: Mode) => {
    const c = MODE_CONFIG[mode];
    const p: TestPlan = {
      mode,
      part1: shuffle(PART1_ITEMS).slice(0, c.p1),
      part2: shuffle(PART2_ITEMS).slice(0, c.p2),
      part34: shuffle(LISTENING_SETS).slice(0, c.p34),
      part5: shuffle(QUIZZES).slice(0, c.p5),
      part6: shuffle(PART6_SETS).slice(0, c.p6),
      part7: shuffle(PART7_SETS).slice(0, c.p7),
    };
    answersRef.current = {
      p1: Array(p.part1.length).fill(null),
      p2: Array(p.part2.length).fill(null),
      p34: p.part34.map((s) => Array(s.questions.length).fill(null)),
      p5: Array(p.part5.length).fill(null),
      p6: p.part6.map((s) => Array(s.blanks.length).fill(null)),
      p7: p.part7.map((s) => Array(s.questions.length).fill(null)),
    };
    setPlan(p);
    setSectionIdx(0);
    setItemIdx(0);
    setRemaining(c.minutes * 60);
    setPhase('test');
  };

  const advance = () => {
    if (!plan) return;
    stopSpeech();
    const count = sectionSize(plan, kind);
    if (itemIdx + 1 < count) {
      setItemIdx(itemIdx + 1);
    } else if (sectionIdx + 1 < sections.length) {
      setSectionIdx(sectionIdx + 1);
      setItemIdx(0);
    } else {
      finish();
    }
  };

  const finish = async () => {
    if (!plan || !answersRef.current) return;
    stopSpeech();
    setPhase('result');
    const a = answersRef.current;
    const { listening, listeningTotal, reading, readingTotal } = countCorrect(plan, a);
    const today = todayStr();
    // recordTagAnswer / recordMistake は read-modify-write のため直列に実行する
    for (let i = 0; i < plan.part5.length; i++) {
      const correct = a.p5[i] === plan.part5[i].answer;
      await recordTagAnswer(plan.part5[i].tag, correct);
      if (!correct) await recordMistake('part5', plan.part5[i].id, today);
    }
    for (let i = 0; i < plan.part1.length; i++) {
      if (a.p1[i] !== plan.part1[i].answer) await recordMistake('part1', plan.part1[i].id, today);
    }
    for (let i = 0; i < plan.part2.length; i++) {
      if (a.p2[i] !== plan.part2[i].answer) await recordMistake('part2', plan.part2[i].id, today);
    }
    for (let si = 0; si < plan.part34.length; si++) {
      for (let qi = 0; qi < plan.part34[si].questions.length; qi++) {
        if (a.p34[si][qi] !== plan.part34[si].questions[qi].answer) {
          await recordMistake('part34', setQuestionId(plan.part34[si].id, qi), today);
        }
      }
    }
    for (let si = 0; si < plan.part6.length; si++) {
      for (let bi = 0; bi < plan.part6[si].blanks.length; bi++) {
        if (a.p6[si][bi] !== plan.part6[si].blanks[bi].answer) {
          await recordMistake('part6', setQuestionId(plan.part6[si].id, bi), today);
        }
      }
    }
    for (let si = 0; si < plan.part7.length; si++) {
      for (let qi = 0; qi < plan.part7[si].questions.length; qi++) {
        if (a.p7[si][qi] !== plan.part7[si].questions[qi].answer) {
          await recordMistake('part7', setQuestionId(plan.part7[si].id, qi), today);
        }
      }
    }
    await bumpDaily(today, 'listening', listeningTotal);
    await bumpDaily(today, 'quiz', readingTotal);
    await recordStudy(today);
    const estimated =
      plan.mode === 'full'
        ? estimateScore(listening, listeningTotal, reading, readingTotal)
        : undefined;
    await addMockResult({
      date: today,
      listening,
      listeningTotal,
      reading,
      readingTotal,
      estimatedTotal: estimated?.total,
    });
  };

  const mmss = `${String(Math.floor(Math.max(0, remaining) / 60)).padStart(2, '0')}:${String(
    Math.max(0, remaining) % 60
  ).padStart(2, '0')}`;

  const a = answersRef.current;

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          {phase === 'intro' && (
            <>
              <Pressable onPress={() => router.back()} style={({ pressed }) => pressed && styles.pressed}>
                <ThemedText type="linkPrimary">← クイズに戻る</ThemedText>
              </Pressable>
              <ThemedText type="subtitle">模試</ThemedText>

              <Card>
                <ThemedText type="smallBold">⏱ ミニ模試（約10分・15問）</ThemedText>
                <ThemedText type="small" themeColor="textSecondary">
                  Part 2×5問 + Part 5×10問。スキマ時間の腕試しに。スコア推定はありません。
                </ThemedText>
                <AppButton label="ミニ模試をはじめる" onPress={() => start('mini')} />
              </Card>

              <Card tint={features.mock.tint}>
                <ThemedText type="smallBold">📈 実力測定モード（約40分・68問）</ThemedText>
                <ThemedText type="small" themeColor="textSecondary">
                  L: Part 1×3問 + Part 2×13問 + Part 3/4×5セット（15問）{'\n'}
                  R: Part 5×20問 + Part 6×2文書（8問）+ Part 7×3文書（9問）{'\n'}
                  終了後に推定スコア（10〜990点）を表示します。リスニングは自動再生されるため、音の出る環境で受験してください。
                </ThemedText>
                <AppButton label="実力測定をはじめる" onPress={() => start('full')} />
              </Card>

              {history.length > 0 && (
                <Card>
                  <ThemedText type="smallBold">過去の結果</ThemedText>
                  {history.slice(-5).reverse().map((h, i) => (
                    <View key={`${h.date}-${i}`} style={styles.rowBetween}>
                      <ThemedText type="small" themeColor="textSecondary">
                        {h.date}
                      </ThemedText>
                      <ThemedText type="small">
                        L {h.listening}/{h.listeningTotal}・R {h.reading}/{h.readingTotal}
                        {h.estimatedTotal ? `　推定 ${h.estimatedTotal}点` : ''}
                      </ThemedText>
                    </View>
                  ))}
                </Card>
              )}
            </>
          )}

          {phase === 'test' && plan && a && (
            <>
              <View style={styles.rowBetween}>
                <ThemedText type="smallBold">{sectionTitle(plan, kind, itemIdx)}</ThemedText>
                <ThemedText type="smallBold" style={{ color: remaining < 60 ? theme.danger : theme.accent }}>
                  ⏱ {mmss}
                </ThemedText>
              </View>

              {kind === 'part1' && (
                <Part1Section
                  item={plan.part1[itemIdx]}
                  onPick={(i) => {
                    a.p1[itemIdx] = i;
                    rerender();
                    advance();
                  }}
                />
              )}

              {kind === 'part2' && (
                <Part2Section
                  item={plan.part2[itemIdx]}
                  onPick={(i) => {
                    a.p2[itemIdx] = i;
                    rerender();
                    advance();
                  }}
                />
              )}

              {kind === 'part34' && (
                <SetSection
                  questions={plan.part34[itemIdx].questions.map((q) => ({ label: q.q, choices: q.choices }))}
                  picked={a.p34[itemIdx]}
                  onPick={(qi, ci) => {
                    a.p34[itemIdx][qi] = ci;
                    rerender();
                  }}
                  onNext={advance}
                  extra={<AppButton label="🔊 もう一度再生" variant="ghost" onPress={() => speakLines(plan.part34[itemIdx].script.map((l) => ({ text: l.text, pitch: pitchForSpeaker(l.speaker) })))} />}
                />
              )}

              {kind === 'part5' && (
                <>
                  <Card>
                    <ThemedText type="default">{plan.part5[itemIdx].sentence}</ThemedText>
                  </Card>
                  <View style={styles.choices}>
                    {plan.part5[itemIdx].choices.map((choice, i) => (
                      <ChoiceButton
                        key={choice}
                        label={`(${String.fromCharCode(65 + i)}) ${choice}`}
                        onPress={() => {
                          a.p5[itemIdx] = i;
                          rerender();
                          advance();
                        }}
                      />
                    ))}
                  </View>
                </>
              )}

              {kind === 'part6' && (
                <SetSection
                  passage={`【${plan.part6[itemIdx].docType}】\n${plan.part6[itemIdx].passage}`}
                  questions={plan.part6[itemIdx].blanks.map((b) => ({ label: `空所 [${b.no}]`, choices: b.choices }))}
                  picked={a.p6[itemIdx]}
                  onPick={(qi, ci) => {
                    a.p6[itemIdx][qi] = ci;
                    rerender();
                  }}
                  onNext={advance}
                />
              )}

              {kind === 'part7' && (
                <SetSection
                  passage={`【${plan.part7[itemIdx].docType}】\n${plan.part7[itemIdx].passage}`}
                  questions={plan.part7[itemIdx].questions.map((q, i) => ({ label: `Q${i + 1}. ${q.q}`, choices: q.choices }))}
                  picked={a.p7[itemIdx]}
                  onPick={(qi, ci) => {
                    a.p7[itemIdx][qi] = ci;
                    rerender();
                  }}
                  onNext={advance}
                />
              )}
            </>
          )}

          {phase === 'result' && plan && a && (
            <ResultView plan={plan} answers={a} onRetry={() => start(plan.mode)} onBack={() => setPhase('intro')} />
          )}
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

/* ---------- セクション補助 ---------- */

function sectionSize(plan: TestPlan, kind: SectionKind): number {
  switch (kind) {
    case 'part1':
      return plan.part1.length;
    case 'part2':
      return plan.part2.length;
    case 'part34':
      return plan.part34.length;
    case 'part5':
      return plan.part5.length;
    case 'part6':
      return plan.part6.length;
    case 'part7':
      return plan.part7.length;
  }
}

function sectionTitle(plan: TestPlan, kind: SectionKind, idx: number): string {
  const n = idx + 1;
  const total = sectionSize(plan, kind);
  switch (kind) {
    case 'part1':
      return `Part 1 — 第 ${n}/${total} 問`;
    case 'part2':
      return `Part 2 — 第 ${n}/${total} 問`;
    case 'part34':
      return `Part ${plan.part34[idx].part} — セット ${n}/${total}`;
    case 'part5':
      return `Part 5 — 第 ${n}/${total} 問`;
    case 'part6':
      return `Part 6 — 文書 ${n}/${total}`;
    case 'part7':
      return `Part 7 — 文書 ${n}/${total}`;
  }
}

function countCorrect(plan: TestPlan, a: Answers) {
  const p1 = plan.part1.filter((it, i) => a.p1[i] === it.answer).length;
  const p2 = plan.part2.filter((it, i) => a.p2[i] === it.answer).length;
  const p34 = plan.part34.reduce(
    (sum, set, si) => sum + set.questions.filter((q, qi) => a.p34[si][qi] === q.answer).length,
    0
  );
  const p5 = plan.part5.filter((it, i) => a.p5[i] === it.answer).length;
  const p6 = plan.part6.reduce(
    (sum, set, si) => sum + set.blanks.filter((b, bi) => a.p6[si][bi] === b.answer).length,
    0
  );
  const p7 = plan.part7.reduce(
    (sum, set, si) => sum + set.questions.filter((q, qi) => a.p7[si][qi] === q.answer).length,
    0
  );
  const listeningTotal =
    plan.part1.length + plan.part2.length + plan.part34.reduce((s, x) => s + x.questions.length, 0);
  const readingTotal =
    plan.part5.length +
    plan.part6.reduce((s, x) => s + x.blanks.length, 0) +
    plan.part7.reduce((s, x) => s + x.questions.length, 0);
  return { listening: p1 + p2 + p34, listeningTotal, reading: p5 + p6 + p7, readingTotal };
}

/* ---------- テスト中のUI部品 ---------- */

function ChoiceButton({ label, onPress }: { label: string; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => pressed && styles.pressed}>
      <ThemedView type="backgroundElement" style={styles.choiceInner}>
        <ThemedText type="default">{label}</ThemedText>
      </ThemedView>
    </Pressable>
  );
}

function Part1Section({ item, onPick }: { item: Part1Item; onPick: (i: number) => void }) {
  return (
    <>
      <Card style={styles.sceneCard}>
        <ThemedText style={styles.sceneEmoji}>{item.scene}</ThemedText>
        <ThemedText type="small" themeColor="textSecondary" style={styles.sceneJa}>
          {item.sceneJa}
        </ThemedText>
      </Card>
      <ThemedText type="small" themeColor="textSecondary">
        場面（写真の代わり）に最も合う描写文を選んでください。
      </ThemedText>
      <AppButton
        label="🔊 もう一度再生"
        variant="ghost"
        onPress={() => speak(`A. ${item.statements[0]} ... B. ${item.statements[1]} ... C. ${item.statements[2]} ... D. ${item.statements[3]}`)}
      />
      <View style={styles.choices}>
        {P1_LABELS.map((label, i) => (
          <ChoiceButton key={label} label={`(${label})`} onPress={() => onPick(i)} />
        ))}
      </View>
    </>
  );
}

function Part2Section({ item, onPick }: { item: Part2Item; onPick: (i: number) => void }) {
  return (
    <>
      <ThemedText type="small" themeColor="textSecondary">
        最も適切な応答を選んでください。
      </ThemedText>
      <AppButton
        label="🔊 もう一度再生"
        variant="ghost"
        onPress={() => speak(`${item.question} ... A. ${item.choices[0]} ... B. ${item.choices[1]} ... C. ${item.choices[2]}`)}
      />
      <View style={styles.choices}>
        {P2_LABELS.map((label, i) => (
          <ChoiceButton key={label} label={`(${label})`} onPress={() => onPick(i)} />
        ))}
      </View>
    </>
  );
}

/** Part 3/4/6/7 共通の「セット単位で全問回答 → 次へ」ビュー */
function SetSection({
  passage,
  questions,
  picked,
  onPick,
  onNext,
  extra,
}: {
  passage?: string;
  questions: { label: string; choices: readonly string[] }[];
  picked: (number | null)[];
  onPick: (qi: number, ci: number) => void;
  onNext: () => void;
  extra?: React.ReactNode;
}) {
  const theme = useTheme();
  const allAnswered = picked.every((p) => p !== null);
  return (
    <>
      {extra}
      {!!passage && (
        <Card>
          <ThemedText type="small" style={styles.passage}>
            {passage}
          </ThemedText>
        </Card>
      )}
      {questions.map((q, qi) => (
        <Card key={q.label}>
          <ThemedText type="smallBold">{q.label}</ThemedText>
          {q.choices.map((choice, ci) => (
            <Pressable
              key={choice}
              onPress={() => onPick(qi, ci)}
              style={({ pressed }) => [pressed && styles.pressed]}>
              <ThemedView
                type={picked[qi] === ci ? 'backgroundSelected' : 'backgroundElement'}
                style={[styles.choiceInner, picked[qi] === ci && [styles.choiceSelected, { borderColor: theme.accent }]]}>
                <ThemedText type="small">
                  ({String.fromCharCode(65 + ci)}) {choice}
                </ThemedText>
              </ThemedView>
            </Pressable>
          ))}
        </Card>
      ))}
      <AppButton label="次へ" onPress={onNext} disabled={!allAnswered} />
    </>
  );
}

/* ---------- 結果 ---------- */

interface ReviewEntry {
  key: string;
  header: string;
  body: string;
  correct: string;
  explanation: string;
}

function buildReview(plan: TestPlan, a: Answers): ReviewEntry[] {
  const entries: ReviewEntry[] = [];
  plan.part1.forEach((it, i) => {
    if (a.p1[i] !== it.answer) {
      entries.push({
        key: it.id,
        header: `Part 1${a.p1[i] === null ? '（時間切れ）' : ''}`,
        body: `${it.scene} ${it.sceneJa}`,
        correct: `(${P1_LABELS[it.answer]}) ${it.statements[it.answer]}`,
        explanation: it.explanation,
      });
    }
  });
  plan.part2.forEach((it, i) => {
    if (a.p2[i] !== it.answer) {
      entries.push({
        key: it.id,
        header: `Part 2${a.p2[i] === null ? '（時間切れ）' : ''}`,
        body: `Q: ${it.question}（${it.questionJa}）`,
        correct: `(${P2_LABELS[it.answer]}) ${it.choices[it.answer]}`,
        explanation: it.explanation,
      });
    }
  });
  plan.part34.forEach((set, si) => {
    set.questions.forEach((q, qi) => {
      if (a.p34[si][qi] !== q.answer) {
        entries.push({
          key: `${set.id}-${qi}`,
          header: `Part ${set.part}「${set.title}」`,
          body: q.q,
          correct: `(${String.fromCharCode(65 + q.answer)}) ${q.choices[q.answer]}`,
          explanation: q.explanation,
        });
      }
    });
  });
  plan.part5.forEach((it, i) => {
    if (a.p5[i] !== it.answer) {
      entries.push({
        key: it.id,
        header: `Part 5［${it.tag}］${a.p5[i] === null ? '（時間切れ）' : ''}`,
        body: it.sentence,
        correct: `(${String.fromCharCode(65 + it.answer)}) ${it.choices[it.answer]}`,
        explanation: it.explanation,
      });
    }
  });
  plan.part6.forEach((set, si) => {
    set.blanks.forEach((b, bi) => {
      if (a.p6[si][bi] !== b.answer) {
        entries.push({
          key: `${set.id}-${b.no}`,
          header: `Part 6【${set.docType}】空所[${b.no}]`,
          body: '',
          correct: `(${String.fromCharCode(65 + b.answer)}) ${b.choices[b.answer]}`,
          explanation: b.explanation,
        });
      }
    });
  });
  plan.part7.forEach((set, si) => {
    set.questions.forEach((q, qi) => {
      if (a.p7[si][qi] !== q.answer) {
        entries.push({
          key: `${set.id}-${qi}`,
          header: `Part 7【${set.docType}】`,
          body: q.q,
          correct: `(${String.fromCharCode(65 + q.answer)}) ${q.choices[q.answer]}`,
          explanation: q.explanation,
        });
      }
    });
  });
  return entries;
}

function ResultView({
  plan,
  answers,
  onRetry,
  onBack,
}: {
  plan: TestPlan;
  answers: Answers;
  onRetry: () => void;
  onBack: () => void;
}) {
  const theme = useTheme();
  const { listening, listeningTotal, reading, readingTotal } = countCorrect(plan, answers);
  const estimated = plan.mode === 'full' ? estimateScore(listening, listeningTotal, reading, readingTotal) : null;
  const review = buildReview(plan, answers);

  return (
    <>
      <ThemedText type="subtitle">結果</ThemedText>

      {estimated && (
        <Card style={styles.resultCard}>
          <ThemedText type="small" themeColor="textSecondary">
            推定スコア
          </ThemedText>
          <ThemedText type="title" style={{ color: theme.accent }}>
            {estimated.total}
          </ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            ±{estimated.margin}点程度の目安　（L {estimated.listening} / R {estimated.reading}）
          </ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            ※ 68問・TTS音声・自作問題による簡易推定です。公式スコアを保証するものではありません。
          </ThemedText>
        </Card>
      )}

      <Card style={styles.resultCard}>
        <ThemedText type="subtitle">
          {listening + reading} / {listeningTotal + readingTotal}
        </ThemedText>
        <View style={styles.rowBetween}>
          <ThemedText type="small">🎧 リスニング（Part 2〜4）</ThemedText>
          <ThemedText type="smallBold">
            {listening} / {listeningTotal}
          </ThemedText>
        </View>
        <View style={styles.rowBetween}>
          <ThemedText type="small">📖 リーディング（Part 5〜7）</ThemedText>
          <ThemedText type="smallBold">
            {reading} / {readingTotal}
          </ThemedText>
        </View>
      </Card>

      {review.length > 0 && <ThemedText type="smallBold">間違えた問題の復習（{review.length}問）</ThemedText>}
      {review.map((r) => (
        <Card key={r.key}>
          <ThemedText type="small" themeColor="textSecondary">
            {r.header}
          </ThemedText>
          {!!r.body && <ThemedText type="small">{r.body}</ThemedText>}
          <ThemedText type="small">正解: {r.correct}</ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            💡 {r.explanation}
          </ThemedText>
        </Card>
      ))}

      <View style={styles.resultButtons}>
        <AppButton label="もう一度" onPress={onRetry} />
        <AppButton label="モード選択に戻る" variant="ghost" onPress={onBack} />
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
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  choices: {
    gap: Spacing.two,
  },
  choiceInner: {
    borderRadius: Spacing.two,
    paddingVertical: Spacing.two + 2,
    paddingHorizontal: Spacing.three,
    marginTop: Spacing.one,
  },
  // 選択中の色（accent）は render 時にテーマから適用する
  choiceSelected: {
    borderWidth: 2,
  },
  passage: {
    lineHeight: 22,
  },
  sceneCard: {
    alignItems: 'center',
    gap: Spacing.two,
    padding: Spacing.four,
  },
  sceneEmoji: {
    fontSize: 44,
    lineHeight: 56,
    textAlign: 'center',
  },
  sceneJa: {
    textAlign: 'center',
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
