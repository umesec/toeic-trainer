import { useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { AppButton, Card } from '@/components/ui';
import { BottomTabInset, MaxContentWidth, Spacing, TopContentInset } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { PART2_ITEMS } from '@/data/part2';
import { PART7_SETS } from '@/data/part7';
import { QUIZZES } from '@/data/quizzes';
import { estimateScore } from '@/lib/score';
import { speak, stopSpeech } from '@/lib/speech';
import { todayStr } from '@/lib/srs';
import { saveDiagnosisResult, saveOnboardingDone } from '@/lib/storage';
import { shuffle } from '@/lib/util';

type Phase = 'intro' | 'part2' | 'part5' | 'part7' | 'result';

const P2_COUNT = 5;
const P5_COUNT = 10;

interface DiagPlan {
  p2: typeof PART2_ITEMS;
  p5: typeof QUIZZES;
  p7: (typeof PART7_SETS)[0];
}

function recommendTarget(total: number): { target: number; message: string; focus: string } {
  if (total < 350) return { target: 500, message: '英語の基礎を固める段階です。', focus: '語彙カードと Part 5 文法から始めましょう。まず毎日30枚の単語カードが効果的です。' };
  if (total < 500) return { target: 600, message: 'ビジネス英語の土台ができています。', focus: 'Part 3/4 のシャドーイングでリスニング力を上げつつ、Part 5 の時制・前置詞を強化しましょう。' };
  if (total < 650) return { target: 730, message: '中級者レベルです。あと一歩で高得点帯。', focus: 'Part 7 の速読（シングル → ダブルの順）と Part 5 の語彙量強化が鍵です。' };
  if (total < 800) return { target: 860, message: '上級者に差し掛かっています。', focus: 'Part 7 マルチパッセージの精度と、リーディングの時間管理が残る課題です。ハーフ模試で練習しましょう。' };
  return { target: 900, message: '高レベルです！あとは精度の積み上げ。', focus: 'トリプルパッセージと間違いノートの SRS 復習サイクルで最後の詰めをしましょう。' };
}

export default function DiagnosisScreen() {
  const router = useRouter();
  const theme = useTheme();
  const [phase, setPhase] = useState<Phase>('intro');
  const [plan, setPlan] = useState<DiagPlan | null>(null);
  const [p2idx, setP2idx] = useState(0);
  const [p5idx, setP5idx] = useState(0);
  const [p2correct, setP2correct] = useState(0);
  const [p5correct, setP5correct] = useState(0);
  const [p7answers, setP7answers] = useState<(number | null)[]>([]);
  const [picked2, setPicked2] = useState<number | null>(null);
  const [picked5, setPicked5] = useState<number | null>(null);
  const resultRef = useRef<{ l: number; lTotal: number; r: number; rTotal: number } | null>(null);

  const start = () => {
    const p7single = shuffle(PART7_SETS.filter((s) => s.passages.length === 1))[0];
    const p = {
      p2: shuffle(PART2_ITEMS).slice(0, P2_COUNT),
      p5: shuffle(QUIZZES).slice(0, P5_COUNT),
      p7: p7single,
    };
    setPlan(p);
    setP7answers(Array(p.p7.questions.length).fill(null));
    setP2idx(0);
    setP5idx(0);
    setP2correct(0);
    setP5correct(0);
    setPicked2(null);
    setPicked5(null);
    setPhase('part2');
  };

  // Part2: 問題が変わるたびに音声再生
  useEffect(() => {
    if (phase !== 'part2' || !plan) return;
    const it = plan.p2[p2idx];
    speak(`${it.question} ... A. ${it.choices[0]} ... B. ${it.choices[1]} ... C. ${it.choices[2]}`);
  }, [phase, p2idx, plan]);

  const pickP2 = (i: number) => {
    if (picked2 !== null || !plan) return;
    setPicked2(i);
    if (i === plan.p2[p2idx].answer) setP2correct((n) => n + 1);
    setTimeout(() => {
      stopSpeech();
      if (p2idx + 1 < P2_COUNT) {
        setP2idx(p2idx + 1);
        setPicked2(null);
      } else {
        setPhase('part5');
        setPicked5(null);
      }
    }, 700);
  };

  const pickP5 = (i: number) => {
    if (picked5 !== null || !plan) return;
    setPicked5(i);
    if (i === plan.p5[p5idx].answer) setP5correct((n) => n + 1);
    setTimeout(() => {
      if (p5idx + 1 < P5_COUNT) {
        setP5idx(p5idx + 1);
        setPicked5(null);
      } else {
        setPhase('part7');
      }
    }, 600);
  };

  const finishP7 = async () => {
    if (!plan) return;
    const p7correct = plan.p7.questions.filter((q, i) => p7answers[i] === q.answer).length;
    const lTotal = P2_COUNT;
    const rTotal = P5_COUNT + plan.p7.questions.length;
    const est = estimateScore(p2correct, lTotal, p5correct + p7correct, rTotal);
    resultRef.current = { l: p2correct, lTotal, r: p5correct + p7correct, rTotal };
    const today = todayStr();
    await saveDiagnosisResult({ estimatedTotal: est.total, listening: est.listening, reading: est.reading, date: today });
    await saveOnboardingDone();
    setPhase('result');
  };

  if (phase === 'intro') {
    return (
      <ThemedView style={styles.container}>
        <SafeAreaView style={styles.safeArea}>
          <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
            <Pressable onPress={() => router.back()} style={({ pressed }) => pressed && styles.pressed}>
              <ThemedText type="linkPrimary">← 戻る</ThemedText>
            </Pressable>
            <ThemedText type="subtitle">🎯 診断テスト</ThemedText>
            <Card>
              <ThemedText type="smallBold">今の実力を測って最短ルートを見つけよう</ThemedText>
              <ThemedText type="small" themeColor="textSecondary">
                約10分・{P2_COUNT + P5_COUNT + 3}問程度で現在のスコアを推定します。終了後に目標スコアと学習プランを提案します。
              </ThemedText>
            </Card>
            <Card>
              <ThemedText type="smallBold">出題内容</ThemedText>
              <ThemedText type="small">🎧 Part 2 応答問題 × {P2_COUNT}問</ThemedText>
              <ThemedText type="small">📝 Part 5 文法・語彙 × {P5_COUNT}問</ThemedText>
              <ThemedText type="small">📰 Part 7 長文読解 × 1セット（2〜4問）</ThemedText>
              <ThemedText type="small" themeColor="textSecondary">
                音声が必要なため、音の出る環境で受けてください。
              </ThemedText>
            </Card>
            <AppButton label="診断テストをはじめる" onPress={start} />
          </ScrollView>
        </SafeAreaView>
      </ThemedView>
    );
  }

  if (phase === 'part2' && plan) {
    const item = plan.p2[p2idx];
    return (
      <ThemedView style={styles.container}>
        <SafeAreaView style={styles.safeArea}>
          <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
            <ThemedText type="small" themeColor="textSecondary">
              診断 — Part 2　{p2idx + 1} / {P2_COUNT}
            </ThemedText>
            <Card>
              <ThemedText type="smallBold">🎧 質問と応答 (A)(B)(C) を聞いて最も適切な応答を選んでください</ThemedText>
              <AppButton label="🔊 もう一度再生" variant="ghost" onPress={() => speak(`${item.question} ... A. ${item.choices[0]} ... B. ${item.choices[1]} ... C. ${item.choices[2]}`)} />
            </Card>
            <View style={styles.choices}>
              {(['A', 'B', 'C'] as const).map((label, i) => (
                <Pressable
                  key={label}
                  onPress={() => pickP2(i)}
                  style={({ pressed }) => [
                    styles.choice,
                    picked2 !== null && i === item.answer && [styles.choiceJudged, { borderColor: theme.success }],
                    picked2 !== null && picked2 === i && i !== item.answer && [styles.choiceJudged, { borderColor: theme.danger }],
                    pressed && picked2 === null && styles.pressed,
                  ]}>
                  <ThemedView
                    type="backgroundElement"
                    style={[
                      styles.choiceInner,
                      picked2 !== null && i === item.answer && { backgroundColor: theme.successBg },
                      picked2 !== null && picked2 === i && i !== item.answer && { backgroundColor: theme.dangerBg },
                    ]}>
                    <ThemedText type="default">({label})</ThemedText>
                  </ThemedView>
                </Pressable>
              ))}
            </View>
          </ScrollView>
        </SafeAreaView>
      </ThemedView>
    );
  }

  if (phase === 'part5' && plan) {
    const q = plan.p5[p5idx];
    return (
      <ThemedView style={styles.container}>
        <SafeAreaView style={styles.safeArea}>
          <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
            <ThemedText type="small" themeColor="textSecondary">
              診断 — Part 5　{p5idx + 1} / {P5_COUNT}
            </ThemedText>
            <Card>
              <ThemedText type="default">{q.sentence}</ThemedText>
            </Card>
            <View style={styles.choices}>
              {q.choices.map((choice, i) => (
                <Pressable
                  key={choice}
                  onPress={() => pickP5(i)}
                  style={({ pressed }) => [
                    styles.choice,
                    picked5 !== null && i === q.answer && [styles.choiceJudged, { borderColor: theme.success }],
                    picked5 !== null && picked5 === i && i !== q.answer && [styles.choiceJudged, { borderColor: theme.danger }],
                    pressed && picked5 === null && styles.pressed,
                  ]}>
                  <ThemedView
                    type="backgroundElement"
                    style={[
                      styles.choiceInner,
                      picked5 !== null && i === q.answer && { backgroundColor: theme.successBg },
                      picked5 !== null && picked5 === i && i !== q.answer && { backgroundColor: theme.dangerBg },
                    ]}>
                    <ThemedText type="default">({String.fromCharCode(65 + i)}) {choice}</ThemedText>
                  </ThemedView>
                </Pressable>
              ))}
            </View>
          </ScrollView>
        </SafeAreaView>
      </ThemedView>
    );
  }

  if (phase === 'part7' && plan) {
    const set = plan.p7;
    const passage = set.passages[0];
    const allAnswered = p7answers.every((a) => a !== null);
    return (
      <ThemedView style={styles.container}>
        <SafeAreaView style={styles.safeArea}>
          <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
            <ThemedText type="small" themeColor="textSecondary">
              診断 — Part 7　長文読解（{set.questions.length}問）
            </ThemedText>
            <Card>
              <ThemedText type="small" themeColor="textSecondary">【{passage.docType}】</ThemedText>
              <ThemedText type="small" style={styles.passage}>{passage.text}</ThemedText>
            </Card>
            {set.questions.map((q, qi) => {
              const picked = p7answers[qi];
              return (
                <Card key={qi}>
                  <ThemedText type="smallBold">Q{qi + 1}. {q.q}</ThemedText>
                  {q.choices.map((choice, ci) => (
                    <Pressable
                      key={choice}
                      onPress={() => {
                        if (picked !== null) return;
                        const next = [...p7answers];
                        next[qi] = ci;
                        setP7answers(next);
                      }}
                      style={({ pressed }) => [
                        styles.choice,
                        pressed && picked === null && styles.pressed,
                        picked !== null && [styles.choiceJudged, { borderColor: ci === picked ? theme.accent : 'transparent' }],
                      ]}>
                      <ThemedView
                        type={picked === ci ? 'backgroundSelected' : 'backgroundElement'}
                        style={styles.choiceInner}>
                        <ThemedText type="small">({String.fromCharCode(65 + ci)}) {choice}</ThemedText>
                      </ThemedView>
                    </Pressable>
                  ))}
                </Card>
              );
            })}
            <AppButton label="診断を完了する" onPress={finishP7} disabled={!allAnswered} />
          </ScrollView>
        </SafeAreaView>
      </ThemedView>
    );
  }

  if (phase === 'result' && resultRef.current) {
    const { l, lTotal, r, rTotal } = resultRef.current;
    const est = estimateScore(l, lTotal, r, rTotal);
    const rec = recommendTarget(est.total);
    return (
      <ThemedView style={styles.container}>
        <SafeAreaView style={styles.safeArea}>
          <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
            <ThemedText type="subtitle">診断結果</ThemedText>

            <Card style={styles.scoreCard}>
              <ThemedText type="small" themeColor="textSecondary">推定スコア</ThemedText>
              <ThemedText type="title" style={{ color: theme.accent }}>{est.total}</ThemedText>
              <ThemedText type="small" themeColor="textSecondary">
                L {est.listening} / R {est.reading}　（±{est.margin}点程度の目安）
              </ThemedText>
            </Card>

            <Card>
              <ThemedText type="smallBold">📊 セクション別</ThemedText>
              <View style={styles.row}>
                <ThemedText type="small">🎧 リスニング（Part 2）</ThemedText>
                <ThemedText type="smallBold">{l}/{lTotal}問正解</ThemedText>
              </View>
              <View style={styles.row}>
                <ThemedText type="small">📖 リーディング（Part 5+7）</ThemedText>
                <ThemedText type="smallBold">{r}/{rTotal}問正解</ThemedText>
              </View>
            </Card>

            <Card style={{ borderLeftWidth: 4, borderLeftColor: theme.accent }}>
              <ThemedText type="smallBold">💡 {rec.message}</ThemedText>
              <ThemedText type="small" themeColor="textSecondary">{rec.focus}</ThemedText>
            </Card>

            <Card>
              <ThemedText type="smallBold">🎯 おすすめ目標スコア: {rec.target}点</ThemedText>
              <ThemedText type="small" themeColor="textSecondary">
                ホームから「目標を設定する」を開くと、試験日と目標スコアを入力して学習プランが自動作成されます。
              </ThemedText>
            </Card>

            <AppButton label="ホームに戻って学習を始める" onPress={() => router.replace('/' as never)} />
          </ScrollView>
        </SafeAreaView>
      </ThemedView>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  container: { flex: 1, flexDirection: 'row', justifyContent: 'center' },
  safeArea: { flex: 1, maxWidth: MaxContentWidth, paddingHorizontal: Spacing.four },
  scroll: { paddingTop: TopContentInset, paddingBottom: BottomTabInset + Spacing.four, gap: Spacing.three },
  pressed: { opacity: 0.6 },
  choices: { gap: Spacing.two },
  choice: { borderRadius: Spacing.two },
  choiceInner: {
    borderRadius: Spacing.two,
    paddingVertical: Spacing.two + 2,
    paddingHorizontal: Spacing.three,
  },
  choiceJudged: { borderWidth: 2 },
  passage: { lineHeight: 22 },
  scoreCard: { alignItems: 'center', gap: Spacing.two, padding: Spacing.four },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
});
