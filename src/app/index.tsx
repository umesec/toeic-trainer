import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BarChart, type BarDatum } from '@/components/bar-chart';
import { SettingsModal } from '@/components/settings-modal';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { AppButton, Card, Chip } from '@/components/ui';
import { BottomTabInset, MaxContentWidth, Spacing, TopContentInset } from '@/constants/theme';
import { WORDS } from '@/data/words';
import { setSpeechRateScale } from '@/lib/speech';
import {
  buildPhases,
  currentPhase,
  dailyQuota,
  daysUntilExam,
  CURRENT_SCORES,
  TARGET_SCORES,
  type StudyPlan,
} from '@/lib/plan';
import { addDays, isDue, todayStr } from '@/lib/srs';
import {
  clearPlan,
  loadCustomWords,
  loadDailyLogMap,
  loadDayLog,
  loadMistakes,
  loadMockHistory,
  loadPlan,
  loadProgress,
  loadQuizStats,
  loadSettings,
  loadStreak,
  savePlan,
  type DayLog,
  type QuizStats,
} from '@/lib/storage';

export default function HomeScreen() {
  const router = useRouter();
  const today = todayStr();

  const [plan, setPlan] = useState<StudyPlan | null>(null);
  const [dayLog, setDayLog] = useState<DayLog>({ cards: 0, quiz: 0, listening: 0 });
  const [streakCount, setStreakCount] = useState(0);
  const [quizStats, setQuizStats] = useState<QuizStats>({ answered: 0, correct: 0 });
  const [dueCount, setDueCount] = useState(0);
  const [showPlanModal, setShowPlanModal] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [dailyChart, setDailyChart] = useState<BarDatum[]>([]);
  const [scoreChart, setScoreChart] = useState<BarDatum[]>([]);
  const [mistakeCount, setMistakeCount] = useState(0);

  const reload = useCallback(async () => {
    const [p, log, streak, stats, progress, customWords, logMap, mockHistory, mistakes, settings] =
      await Promise.all([
        loadPlan(),
        loadDayLog(today),
        loadStreak(),
        loadQuizStats(),
        loadProgress(),
        loadCustomWords(),
        loadDailyLogMap(),
        loadMockHistory(),
        loadMistakes(),
        loadSettings(),
      ]);
    setPlan(p);
    setDayLog(log);
    setStreakCount(streak.count);
    setQuizStats(stats);
    const wordIds = [...WORDS.map((w) => w.id), ...customWords.map((c) => c.id)];
    setDueCount(wordIds.filter((id) => progress[id] && isDue(progress[id], today)).length);
    setMistakeCount(mistakes.length);
    // 設定の読み上げ速度をTTSに反映（アプリ起動時の初期化を兼ねる）
    setSpeechRateScale(settings.speechRateScale);

    // 直近14日の学習量
    const days: BarDatum[] = [];
    for (let i = 13; i >= 0; i--) {
      const date = addDays(today, -i);
      const d = logMap[date];
      days.push({
        label: date.slice(5).replace('-', '/'),
        value: d ? d.cards + d.quiz + d.listening : 0,
      });
    }
    setDailyChart(days);

    // 実力測定の推定スコア推移（直近10件）
    setScoreChart(
      mockHistory
        .filter((h) => h.estimatedTotal !== undefined)
        .slice(-10)
        .map((h) => ({ label: h.date.slice(5).replace('-', '/'), value: h.estimatedTotal! }))
    );
  }, [today]);

  // タブに戻ってくるたびに最新の進捗を反映
  useFocusEffect(
    useCallback(() => {
      reload();
    }, [reload])
  );

  const onSavePlan = async (p: StudyPlan) => {
    await savePlan(p);
    setShowPlanModal(false);
    reload();
  };

  const onClearPlan = async () => {
    await clearPlan();
    setShowPlanModal(false);
    reload();
  };

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          <View style={styles.titleRow}>
            <ThemedText type="subtitle">TOEIC トレーナー</ThemedText>
            <Pressable onPress={() => setShowSettings(true)} style={({ pressed }) => pressed && styles.dimmed}>
              <ThemedText type="subtitle">⚙️</ThemedText>
            </Pressable>
          </View>

          {/* 学習プラン */}
          {plan ? (
            <PlanSummary
              plan={plan}
              today={today}
              dayLog={dayLog}
              onEdit={() => setShowPlanModal(true)}
            />
          ) : (
            <Card style={styles.centerCard}>
              <ThemedText type="smallBold">🎯 目標を設定しよう</ThemedText>
              <ThemedText type="small" themeColor="textSecondary">
                目標スコアと試験日を設定すると、試験日までの学習プログラムと「今日のメニュー」が自動で組まれます。
              </ThemedText>
              <AppButton label="目標を設定する" onPress={() => setShowPlanModal(true)} />
            </Card>
          )}

          {/* 進捗サマリー */}
          <View style={styles.statsRow}>
            <StatCard label="連続学習" value={`${streakCount}日`} />
            <StatCard
              label="クイズ正答率"
              value={
                quizStats.answered > 0
                  ? `${Math.round((quizStats.correct / quizStats.answered) * 100)}%`
                  : '—'
              }
            />
            <StatCard label="復習待ち" value={`${dueCount}枚`} />
          </View>

          {/* クイックスタート */}
          <ThemedText type="smallBold">学習をはじめる</ThemedText>
          <View style={styles.quickRow}>
            <AppButton label="📚 単語カード" onPress={() => router.push('/flashcards')} style={styles.quickButton} />
            <AppButton label="📝 クイズ" onPress={() => router.push('/quiz')} style={styles.quickButton} />
          </View>
          <View style={styles.quickRow}>
            <AppButton label="🎧 音声変化" onPress={() => router.push('/listening')} style={styles.quickButton} />
            <AppButton label="✍️ ディクテーション" onPress={() => router.push('/listening/dictation')} style={styles.quickButton} />
          </View>
          <View style={styles.quickRow}>
            <AppButton label="🗣️ Part 3/4 会話" onPress={() => router.push('/listening/part34')} style={styles.quickButton} />
            <AppButton label="📰 Part 6/7 読解" onPress={() => router.push('/quiz/part7')} style={styles.quickButton} />
          </View>
          <View style={styles.quickRow}>
            <AppButton label="🎙️ Part 2 応答問題" onPress={() => router.push('/listening/part2')} style={styles.quickButton} />
            <AppButton label="📈 模試・実力測定" onPress={() => router.push('/quiz/mock')} style={styles.quickButton} />
          </View>
          <View style={styles.quickRow}>
            <AppButton
              label={mistakeCount > 0 ? `📓 間違いノート（${mistakeCount}）` : '📓 間違いノート'}
              onPress={() => router.push('/quiz/mistakes')}
              style={styles.quickButton}
            />
            <AppButton label="🔤 単語テスト" onPress={() => router.push('/flashcards/test')} style={styles.quickButton} />
          </View>

          {/* 学習統計 */}
          <ThemedText type="smallBold">学習統計</ThemedText>
          <Card>
            <ThemedText type="small" themeColor="textSecondary">
              直近14日の学習量（回答・カード数）
            </ThemedText>
            {dailyChart.some((d) => d.value > 0) ? (
              <BarChart data={dailyChart} />
            ) : (
              <ThemedText type="small" themeColor="textSecondary">
                まだデータがありません。今日の学習を始めましょう！
              </ThemedText>
            )}
          </Card>
          <Card>
            <ThemedText type="small" themeColor="textSecondary">
              推定スコアの推移（実力測定モード）
            </ThemedText>
            {scoreChart.length > 0 ? (
              <>
                <BarChart data={scoreChart} color="#2fa96c" maxValue={990} />
                <ThemedText type="small" themeColor="textSecondary">
                  最新: {scoreChart[scoreChart.length - 1].value} 点（990点満点スケール）
                </ThemedText>
              </>
            ) : (
              <ThemedText type="small" themeColor="textSecondary">
                実力測定モードを受けるとスコアの推移がここに表示されます。
              </ThemedText>
            )}
          </Card>
        </ScrollView>
      </SafeAreaView>

      <SettingsModal
        visible={showSettings}
        onClose={() => setShowSettings(false)}
        onDataChanged={reload}
      />

      <PlanModal
        // プラン読込・変更時に再マウントして useState の初期値へ反映させる
        key={plan ? `${plan.targetScore}-${plan.currentScore}-${plan.examDate}` : 'new'}
        visible={showPlanModal}
        plan={plan}
        today={today}
        onClose={() => setShowPlanModal(false)}
        onSave={onSavePlan}
        onClear={onClearPlan}
      />
    </ThemedView>
  );
}

/* ---------- プラン表示 ---------- */

function PlanSummary({
  plan,
  today,
  dayLog,
  onEdit,
}: {
  plan: StudyPlan;
  today: string;
  dayLog: DayLog;
  onEdit: () => void;
}) {
  const days = daysUntilExam(plan, today);
  const quota = dailyQuota(plan, today);
  const phase = currentPhase(plan, today);
  const phases = buildPhases(plan);

  if (days < 0) {
    return (
      <Card style={styles.centerCard}>
        <ThemedText type="smallBold">試験日（{plan.examDate}）を過ぎました</ThemedText>
        <ThemedText type="small" themeColor="textSecondary">
          お疲れさまでした！次の目標を設定して学習を続けましょう。
        </ThemedText>
        <AppButton label="新しい目標を設定" onPress={onEdit} />
      </Card>
    );
  }

  return (
    <Card>
      <View style={styles.planHeader}>
        <ThemedText type="smallBold">
          🎯 目標 {plan.targetScore}点（現在 {plan.currentScore}点）
        </ThemedText>
        <Pressable onPress={onEdit}>
          <ThemedText type="linkPrimary">変更</ThemedText>
        </Pressable>
      </View>
      <ThemedText type="default">
        試験日 {plan.examDate} まで <ThemedText type="smallBold" style={styles.accent}>あと{days}日</ThemedText>
      </ThemedText>
      <ThemedText type="small" themeColor="textSecondary">
        現在は「{phase.name}」— {phase.focus}
      </ThemedText>

      <ThemedText type="smallBold" style={styles.menuTitle}>
        今日のメニュー（目安 {quota.estMinutes}分）
      </ThemedText>
      <MenuRow label="単語カード" done={dayLog.cards} goal={quota.cards} unit="枚" />
      <MenuRow label="クイズ" done={dayLog.quiz} goal={quota.quiz} unit="問" />
      <MenuRow label="音声変化・ディクテーション" done={dayLog.listening} goal={quota.listening} unit="回" />

      <ThemedText type="smallBold" style={styles.menuTitle}>
        学習スケジュール
      </ThemedText>
      {phases.map((p) => (
        <View key={p.id} style={styles.phaseRow}>
          <ThemedText type="small" style={p.id === phase.id ? styles.accent : undefined}>
            {p.id === phase.id ? '▶ ' : '　'}
            {p.name}
          </ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            {p.from} 〜 {p.to}
          </ThemedText>
        </View>
      ))}
    </Card>
  );
}

function MenuRow({
  label,
  done,
  goal,
  unit,
}: {
  label: string;
  done: number;
  goal: number;
  unit: string;
}) {
  const achieved = done >= goal;
  return (
    <View style={styles.menuRow}>
      <ThemedText type="small">
        {achieved ? '✅' : '⬜'} {label}
      </ThemedText>
      <ThemedText type="small" themeColor={achieved ? 'text' : 'textSecondary'}>
        {Math.min(done, goal)} / {goal} {unit}
      </ThemedText>
    </View>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <Card style={styles.statCard}>
      <ThemedText type="small" themeColor="textSecondary">
        {label}
      </ThemedText>
      <ThemedText type="smallBold">{value}</ThemedText>
    </Card>
  );
}

/* ---------- プラン設定モーダル ---------- */

const EXAM_DATE_PRESETS = [
  { label: '1ヶ月後', days: 30 },
  { label: '2ヶ月後', days: 60 },
  { label: '3ヶ月後', days: 90 },
  { label: '半年後', days: 180 },
] as const;

function PlanModal({
  visible,
  plan,
  today,
  onClose,
  onSave,
  onClear,
}: {
  visible: boolean;
  plan: StudyPlan | null;
  today: string;
  onClose: () => void;
  onSave: (p: StudyPlan) => void;
  onClear: () => void;
}) {
  const [target, setTarget] = useState<number>(plan?.targetScore ?? 700);
  const [current, setCurrent] = useState<number>(plan?.currentScore ?? 500);
  const [examDate, setExamDate] = useState<string>(plan?.examDate ?? addDays(today, 90));

  const validDate = /^\d{4}-\d{2}-\d{2}$/.test(examDate) && examDate > today;
  const valid = validDate && target > current;

  const save = () => {
    if (!valid) return;
    onSave({
      targetScore: target,
      currentScore: current,
      examDate,
      // 既存プランの編集では開始日を維持し、フェーズ計算の起点を変えない
      startDate: plan?.startDate ?? today,
    });
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.modalBackdrop}>
        <ThemedView style={styles.modalBody}>
          <ScrollView contentContainerStyle={styles.modalScroll}>
            <ThemedText type="subtitle">学習プランの設定</ThemedText>

            <ThemedText type="small" themeColor="textSecondary">
              目標スコア
            </ThemedText>
            <View style={styles.chipRow}>
              {TARGET_SCORES.map((s) => (
                <Chip key={s} label={`${s}`} selected={target === s} onPress={() => setTarget(s)} />
              ))}
            </View>

            <ThemedText type="small" themeColor="textSecondary">
              現在のスコア（未受験なら目安でOK）
            </ThemedText>
            <View style={styles.chipRow}>
              {CURRENT_SCORES.map((s) => (
                <Chip key={s} label={`${s}`} selected={current === s} onPress={() => setCurrent(s)} />
              ))}
            </View>

            <ThemedText type="small" themeColor="textSecondary">
              試験日
            </ThemedText>
            <View style={styles.chipRow}>
              {EXAM_DATE_PRESETS.map((p) => {
                const date = addDays(today, p.days);
                return (
                  <Chip
                    key={p.label}
                    label={p.label}
                    selected={examDate === date}
                    onPress={() => setExamDate(date)}
                  />
                );
              })}
            </View>
            <ThemedView type="backgroundElement" style={styles.inputWrap}>
              <TextInput
                value={examDate}
                onChangeText={setExamDate}
                placeholder="YYYY-MM-DD"
                placeholderTextColor="#8b93a5"
                autoCapitalize="none"
                autoCorrect={false}
                style={styles.input}
              />
            </ThemedView>
            {!validDate && (
              <ThemedText type="small" style={styles.error}>
                試験日は今日より後の YYYY-MM-DD 形式で入力してください
              </ThemedText>
            )}
            {validDate && target <= current && (
              <ThemedText type="small" style={styles.error}>
                目標スコアは現在のスコアより高く設定してください
              </ThemedText>
            )}

            <View style={styles.modalButtons}>
              {plan && (
                <AppButton label="プランを削除" variant="ghost" onPress={onClear} />
              )}
              <AppButton label="キャンセル" variant="ghost" onPress={onClose} />
              <AppButton label="保存" onPress={save} disabled={!valid} />
            </View>
          </ScrollView>
        </ThemedView>
      </View>
    </Modal>
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
  centerCard: {
    alignItems: 'center',
    gap: Spacing.two,
    padding: Spacing.four,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dimmed: {
    opacity: 0.6,
  },
  planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  accent: {
    color: '#3c87f7',
  },
  menuTitle: {
    marginTop: Spacing.two,
  },
  menuRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  phaseRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statsRow: {
    flexDirection: 'row',
    gap: Spacing.two,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    gap: Spacing.one,
  },
  quickRow: {
    flexDirection: 'row',
    gap: Spacing.two,
  },
  quickButton: {
    flex: 1,
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
    gap: Spacing.two,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
    marginBottom: Spacing.two,
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
  error: {
    color: '#e5484d',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: Spacing.two,
    marginTop: Spacing.two,
  },
});
