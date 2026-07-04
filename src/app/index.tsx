import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BarChart, type BarDatum } from '@/components/bar-chart';
import { FeatureTile } from '@/components/feature-tile';
import { HeroCard } from '@/components/hero-card';
import { ProgressBar } from '@/components/progress-bar';
import { SettingsModal } from '@/components/settings-modal';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { AppButton, Card, Chip } from '@/components/ui';
import {
  BottomTabInset,
  MaxContentWidth,
  Radius,
  Spacing,
  TopContentInset,
  type FeatureKey,
} from '@/constants/theme';
import { useShadows, useTheme } from '@/hooks/use-theme';
import { WORDS } from '@/data/words';
import { setSpeechRateScale } from '@/lib/speech';
import {
  buildPhases,
  currentPhase,
  dailyQuota,
  daysUntilExam,
  feasibilityOf,
  CURRENT_SCORES,
  TARGET_SCORES,
  type StudyPlan,
} from '@/lib/plan';
import { syncReminders } from '@/lib/reminders';
import { addDays, isDue, todayStr } from '@/lib/srs';
import {
  clearPlan,
  loadCustomWords,
  loadDailyLogMap,
  loadDayLog,
  loadDiagnosisResult,
  loadMistakes,
  loadMockHistory,
  loadOnboardingDone,
  loadPlan,
  loadProgress,
  loadQuizStats,
  loadSettings,
  loadStreak,
  savePlan,
  type DayLog,
  type DiagnosisResult,
  type QuizStats,
} from '@/lib/storage';

const FEATURES: {
  emoji: string;
  title: string;
  subtitle?: string;
  feature: FeatureKey;
  href: string;
}[] = [
  { emoji: '🩺', title: '診断テスト', subtitle: '実力把握・スタート地点を確認', feature: 'quiz', href: '/quiz/diagnosis' },
  { emoji: '📚', title: '単語カード', subtitle: 'SRSで効率よく暗記', feature: 'words', href: '/flashcards' },
  { emoji: '📝', title: 'クイズ', subtitle: 'Part 5 文法・語彙', feature: 'quiz', href: '/quiz' },
  { emoji: '🎧', title: '音声変化', subtitle: '聞き取れる耳を作る', feature: 'listening', href: '/listening' },
  { emoji: '✍️', title: 'ディクテーション', subtitle: '書き取りで定着', feature: 'listening', href: '/listening/dictation' },
  { emoji: '🗣️', title: 'Part 3/4 会話', subtitle: '長文リスニング', feature: 'listening', href: '/listening/part34' },
  { emoji: '📰', title: 'Part 6/7 読解', subtitle: '長文問題', feature: 'reading', href: '/quiz/part7' },
  { emoji: '🖼️', title: 'Part 1 写真描写', subtitle: '場面に合う文を選ぶ', feature: 'listening', href: '/listening/part1' },
  { emoji: '🎙️', title: 'Part 2 応答', subtitle: '音声のみで挑戦', feature: 'listening', href: '/listening/part2' },
  { emoji: '📈', title: '模試・実力測定', subtitle: '推定スコアを測る', feature: 'mock', href: '/quiz/mock' },
  { emoji: '📓', title: '間違いノート', subtitle: '解き直しで克服', feature: 'mistakes', href: '/quiz/mistakes' },
  { emoji: '🔤', title: '単語テスト', subtitle: '4択で腕試し', feature: 'words', href: '/flashcards/test' },
  { emoji: '📊', title: '学習分析', subtitle: 'Part別正答率・スコア推移', feature: 'quiz', href: '/stats' },
];

export default function HomeScreen() {
  const router = useRouter();
  const theme = useTheme();
  const shadows = useShadows();
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
  const [diagnosis, setDiagnosis] = useState<DiagnosisResult | null | undefined>(undefined);

  // 初回起動時のみオンボーディングへリダイレクト
  useEffect(() => {
    loadOnboardingDone().then((done) => {
      if (!done) router.replace('/onboarding' as never);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const reload = useCallback(async () => {
    const [p, log, streak, stats, progress, customWords, logMap, mockHistory, mistakes, settings, diag] =
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
        loadDiagnosisResult(),
      ]);
    setPlan(p);
    setDayLog(log);
    setStreakCount(streak.count);
    setQuizStats(stats);
    setDiagnosis(diag);
    const wordIds = [...WORDS.map((w) => w.id), ...customWords.map((c) => c.id)];
    setDueCount(wordIds.filter((id) => progress[id] && isDue(progress[id], today)).length);
    setMistakeCount(mistakes.length);
    // 設定の読み上げ速度をTTSに反映（アプリ起動時の初期化を兼ねる）
    setSpeechRateScale(settings.speechRateScale);
    // 19時リマインド通知を最新の消化状況に同期（失敗しても画面には影響させない）
    syncReminders(settings.remindEnabled, p, log).catch(() => {});

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
            <View>
              <ThemedText type="small" themeColor="textSecondary">
                こんにちは 👋
              </ThemedText>
              <ThemedText type="subtitle">TOEIC トレーナー</ThemedText>
            </View>
            <Pressable
              onPress={() => setShowSettings(true)}
              style={({ pressed }) => pressed && styles.dimmed}>
              <ThemedView
                type="backgroundElement"
                style={[styles.settingsButton, shadows.card]}>
                <ThemedText style={styles.settingsIcon}>⚙️</ThemedText>
              </ThemedView>
            </Pressable>
          </View>

          {/* 診断テスト CTA（未受診時のみ） */}
          {diagnosis === null && (
            <Pressable
              onPress={() => router.push('/quiz/diagnosis' as never)}
              style={({ pressed }) => [styles.diagnosisBanner, pressed && styles.dimmed]}>
              <View style={styles.diagnosisInner}>
                <View style={{ flex: 1, gap: Spacing.half }}>
                  <ThemedText type="smallBold" style={styles.heroTitle}>
                    🩺 まず診断テストを受けよう
                  </ThemedText>
                  <ThemedText type="small" style={styles.heroTextDim}>
                    約10分・現在のスコアを推定して最短学習ルートを提案します
                  </ThemedText>
                </View>
                <ThemedText type="smallBold" style={styles.heroTitle}>▶</ThemedText>
              </View>
            </Pressable>
          )}
          {diagnosis && (
            <Card style={styles.diagnosisDoneRow}>
              <View style={{ flex: 1 }}>
                <ThemedText type="small" themeColor="textSecondary">前回の診断スコア</ThemedText>
                <ThemedText type="smallBold">{diagnosis.estimatedTotal}点（L {diagnosis.listening} / R {diagnosis.reading}）</ThemedText>
              </View>
              <Pressable onPress={() => router.push('/quiz/diagnosis' as never)} style={({ pressed }) => pressed && styles.dimmed}>
                <ThemedText type="small" themeColor="accent">再診断 ▶</ThemedText>
              </Pressable>
            </Card>
          )}

          {/* 学習プラン */}
          {plan ? (
            <PlanSummary
              plan={plan}
              today={today}
              dayLog={dayLog}
              onEdit={() => setShowPlanModal(true)}
            />
          ) : (
            <HeroCard style={styles.heroEmpty}>
              <ThemedText type="smallBold" style={styles.heroTitle}>
                🎯 目標を設定しよう
              </ThemedText>
              <ThemedText type="small" style={styles.heroTextDim}>
                目標スコアと試験日を設定すると、試験日までの学習プログラムと「今日のメニュー」が自動で組まれます。
              </ThemedText>
              <Pressable
                onPress={() => setShowPlanModal(true)}
                style={({ pressed }) => [styles.heroCta, pressed && styles.dimmed]}>
                <ThemedText type="smallBold" style={{ color: theme.accent }}>
                  目標を設定する
                </ThemedText>
              </Pressable>
            </HeroCard>
          )}

          {/* 進捗サマリー */}
          <View style={styles.statsRow}>
            <StatCard emoji="🔥" label="連続学習" value={`${streakCount}日`} />
            <StatCard
              emoji="✅"
              label="正答率"
              value={
                quizStats.answered > 0
                  ? `${Math.round((quizStats.correct / quizStats.answered) * 100)}%`
                  : '—'
              }
            />
            <StatCard emoji="📚" label="復習待ち" value={`${dueCount}枚`} />
          </View>

          {/* クイックスタート */}
          <ThemedText type="smallBold" style={styles.sectionTitle}>
            学習をはじめる
          </ThemedText>
          <View style={styles.tileGrid}>
            {FEATURES.map((f) => (
              <FeatureTile
                key={f.href + f.title}
                emoji={f.emoji}
                title={f.title}
                subtitle={f.subtitle}
                feature={f.feature}
                badge={f.title === '間違いノート' ? mistakeCount : undefined}
                onPress={() => router.push(f.href as never)}
              />
            ))}
          </View>

          {/* 学習統計 */}
          <ThemedText type="smallBold" style={styles.sectionTitle}>
            学習統計
          </ThemedText>
          <Card>
            <ThemedText type="smallBold">📊 直近14日の学習量</ThemedText>
            {dailyChart.some((d) => d.value > 0) ? (
              <BarChart data={dailyChart} color={theme.accent} />
            ) : (
              <ThemedText type="small" themeColor="textSecondary">
                まだデータがありません。今日の学習を始めましょう！
              </ThemedText>
            )}
          </Card>
          <Card>
            <ThemedText type="smallBold">📈 推定スコアの推移</ThemedText>
            {scoreChart.length > 0 ? (
              <>
                <BarChart data={scoreChart} color={theme.success} maxValue={990} />
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
  const theme = useTheme();
  const days = daysUntilExam(plan, today);
  const quota = dailyQuota(plan, today);
  const phase = currentPhase(plan, today);
  const phases = buildPhases(plan);
  const feasibility = feasibilityOf(plan);

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
    <>
      {!feasibility.feasible && !feasibility.cautious && (
        <Pressable onPress={onEdit} style={({ pressed }) => pressed && styles.dimmed}>
          <Card style={[styles.feasibilityCard, { borderColor: theme.danger, backgroundColor: theme.dangerBg }]}>
            <ThemedText type="smallBold" style={{ color: theme.danger }}>
              ⚠️ 目標ペースがかなりハードです（1日 {feasibility.ptsPerDay.toFixed(1)} 点必要）
            </ThemedText>
            <ThemedText type="small">
              月25点ペースで達成するには約 {feasibility.suggestedMonths} ヶ月必要です。プランを修正することをおすすめします。
            </ThemedText>
            <ThemedText type="small" style={{ color: theme.danger }}>タップして修正 ▶</ThemedText>
          </Card>
        </Pressable>
      )}
      <HeroCard>
        <View style={styles.planHeader}>
          <ThemedText type="smallBold" style={styles.heroTitle}>
            🎯 目標 {plan.targetScore}点
          </ThemedText>
          <View style={styles.heroPill}>
            <ThemedText type="smallBold" style={styles.heroTitle}>
              あと{days}日
            </ThemedText>
          </View>
        </View>
        <ThemedText type="small" style={styles.heroTextDim}>
          現在 {plan.currentScore}点 ・ 試験日 {plan.examDate}
        </ThemedText>
        <ThemedText type="small" style={styles.heroTextDim}>
          「{phase.name}」— {phase.focus}
        </ThemedText>
        {feasibility.cautious && (
          <ThemedText type="small" style={[styles.heroTextDim, { opacity: 0.9 }]}>
            💪 1日約 {feasibility.dailyMinutesNeeded} 分の継続が必要なペースです
          </ThemedText>
        )}

        <ThemedText type="smallBold" style={[styles.heroTitle, styles.menuTitle]}>
          今日のメニュー（目安 {quota.estMinutes}分）
        </ThemedText>
        <MenuRow label="単語カード" done={dayLog.cards} goal={quota.cards} unit="枚" href="/flashcards" />
        <MenuRow label="クイズ" done={dayLog.quiz} goal={quota.quiz} unit="問" href="/quiz" />
        <MenuRow
          label="音声変化・ディクテーション"
          done={dayLog.listening}
          goal={quota.listening}
          unit="回"
          href="/listening"
        />

        <Pressable
          onPress={onEdit}
          style={({ pressed }) => [styles.heroEditButton, pressed && styles.dimmed]}>
          <ThemedText type="smallBold" style={styles.heroTitle}>
            プランを変更
          </ThemedText>
        </Pressable>
      </HeroCard>

      <Card>
        <ThemedText type="smallBold">学習スケジュール</ThemedText>
        {phases.map((p) => (
          <View key={p.id} style={styles.phaseRow}>
            <ThemedText
              type="small"
              style={p.id === phase.id ? { color: theme.accent, fontWeight: '700' } : undefined}>
              {p.id === phase.id ? '▶ ' : '　'}
              {p.name}
            </ThemedText>
            <ThemedText type="small" themeColor="textSecondary">
              {p.from} 〜 {p.to}
            </ThemedText>
          </View>
        ))}
      </Card>
    </>
  );
}

function MenuRow({
  label,
  done,
  goal,
  unit,
  href,
}: {
  label: string;
  done: number;
  goal: number;
  unit: string;
  href: string;
}) {
  const router = useRouter();
  const achieved = done >= goal;
  return (
    <Pressable
      onPress={() => router.push(href as never)}
      style={({ pressed }) => [styles.menuBlock, pressed && styles.menuBlockPressed]}>
      <View style={styles.menuRow}>
        <ThemedText type="small" style={styles.heroTitle}>
          {achieved ? '✅' : '⬜'} {label}
        </ThemedText>
        <View style={styles.menuRight}>
          <ThemedText type="small" style={achieved ? styles.heroTitle : styles.heroTextDim}>
            {Math.min(done, goal)} / {goal} {unit}
          </ThemedText>
          <ThemedText type="smallBold" style={styles.heroTitle}>
            ▶
          </ThemedText>
        </View>
      </View>
      <ProgressBar
        value={done}
        max={goal}
        height={6}
        color="#FFFFFF"
        trackColor="rgba(255,255,255,0.3)"
      />
    </Pressable>
  );
}

function StatCard({ emoji, label, value }: { emoji: string; label: string; value: string }) {
  return (
    <Card style={styles.statCard}>
      <ThemedText style={styles.statEmoji}>{emoji}</ThemedText>
      <ThemedText type="smallBold" style={styles.statValue}>
        {value}
      </ThemedText>
      <ThemedText type="small" themeColor="textSecondary" style={styles.statLabel}>
        {label}
      </ThemedText>
    </Card>
  );
}

/* ---------- プラン設定モーダル ---------- */

const MONTHS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const;

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
  const theme = useTheme();
  const todayYear = parseInt(today.slice(0, 4), 10);
  const todayMonth = parseInt(today.slice(5, 7), 10);

  const initDate = plan?.examDate ?? addDays(today, 90);
  const [target, setTarget] = useState<number>(plan?.targetScore ?? 700);
  const [current, setCurrent] = useState<number>(plan?.currentScore ?? 500);
  const [examYear, setExamYear] = useState<number>(parseInt(initDate.slice(0, 4), 10));
  const [examMonth, setExamMonth] = useState<number>(parseInt(initDate.slice(5, 7), 10));

  const examDate = `${examYear}-${String(examMonth).padStart(2, '0')}-20`;
  const isValidDate =
    examYear > todayYear || (examYear === todayYear && examMonth > todayMonth);
  const valid = isValidDate && target > current;

  const tempPlan: StudyPlan = {
    targetScore: target,
    currentScore: current,
    examDate,
    startDate: plan?.startDate ?? today,
  };
  const feasibility = target > current && isValidDate ? feasibilityOf(tempPlan) : null;

  const applyScore = (score: number) => {
    setTarget(Math.min(900, score));
  };
  const applyMonths = (months: number) => {
    const d = new Date(Date.UTC(todayYear, todayMonth - 1 + months, 20));
    setExamYear(d.getUTCFullYear());
    setExamMonth(d.getUTCMonth() + 1);
  };

  const save = () => {
    if (!valid) return;
    onSave({
      targetScore: target,
      currentScore: current,
      examDate,
      startDate: plan?.startDate ?? today,
    });
  };

  const YEARS = [todayYear, todayYear + 1, todayYear + 2];

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.modalBackdrop}>
        <ThemedView style={styles.modalBody}>
          <ScrollView contentContainerStyle={styles.modalScroll}>
            <ThemedText type="subtitle">学習プランの設定</ThemedText>

            <ThemedText type="small" themeColor="textSecondary">目標スコア</ThemedText>
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
            {target <= current && (
              <ThemedText type="small" style={{ color: theme.danger }}>
                目標スコアは現在のスコアより高く設定してください
              </ThemedText>
            )}

            <ThemedText type="small" themeColor="textSecondary">試験日（年）</ThemedText>
            <View style={styles.chipRow}>
              {YEARS.map((y) => (
                <Chip key={y} label={`${y}年`} selected={examYear === y} onPress={() => setExamYear(y)} />
              ))}
            </View>

            <ThemedText type="small" themeColor="textSecondary">試験日（月）</ThemedText>
            <View style={styles.chipRow}>
              {MONTHS.map((m) => {
                const isPast = examYear === todayYear && m <= todayMonth;
                return (
                  <Chip
                    key={m}
                    label={`${m}月`}
                    selected={examMonth === m}
                    onPress={() => !isPast && setExamMonth(m)}
                    disabled={isPast}
                  />
                );
              })}
            </View>
            {!isValidDate && (
              <ThemedText type="small" style={{ color: theme.danger }}>
                試験日は今日より後の月を選んでください
              </ThemedText>
            )}

            {/* 実現可能性フィードバック */}
            {feasibility && !feasibility.feasible && !feasibility.cautious && (
              <View style={[styles.feasibilityCard, { backgroundColor: theme.dangerBg, borderColor: theme.danger }]}>
                <ThemedText type="smallBold" style={{ color: theme.danger }}>
                  ⚠️ この目標はかなり難しいペースです
                </ThemedText>
                <ThemedText type="small">
                  必要な向上ペース: 1日 {feasibility.ptsPerDay.toFixed(1)} 点{'\n'}
                  TOEICは継続的な学習で月20〜30点程度の向上が一般的です。
                </ThemedText>
                <View style={styles.feasibilityButtons}>
                  <AppButton
                    label={`目標を ${feasibility.suggestedScore}点にする`}
                    variant="ghost"
                    onPress={() => applyScore(feasibility.suggestedScore)}
                  />
                  <AppButton
                    label={`試験日を ${feasibility.suggestedMonths}ヶ月後にする`}
                    variant="ghost"
                    onPress={() => applyMonths(feasibility.suggestedMonths)}
                  />
                </View>
              </View>
            )}
            {feasibility?.cautious && (
              <View style={[styles.feasibilityCard, { backgroundColor: theme.warningBg, borderColor: theme.warning }]}>
                <ThemedText type="smallBold" style={{ color: theme.warning }}>
                  💪 達成できますが、高い継続が必要です
                </ThemedText>
                <ThemedText type="small">
                  1日約 {feasibility.dailyMinutesNeeded} 分以上の学習を毎日続けることが目安です。
                </ThemedText>
              </View>
            )}
            {feasibility?.feasible && (
              <View style={[styles.feasibilityCard, { backgroundColor: theme.successBg, borderColor: theme.success }]}>
                <ThemedText type="smallBold" style={{ color: theme.success }}>
                  ✅ 現実的な目標設定です
                </ThemedText>
                <ThemedText type="small">
                  1日約 {feasibility.dailyMinutesNeeded} 分の継続で達成できるペースです。
                </ThemedText>
              </View>
            )}

            <View style={styles.modalButtons}>
              {plan && <AppButton label="プランを削除" variant="ghost" onPress={onClear} />}
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
  settingsButton: {
    width: 44,
    height: 44,
    borderRadius: Radius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingsIcon: {
    fontSize: 20,
    lineHeight: 26,
  },
  dimmed: {
    opacity: 0.6,
  },
  sectionTitle: {
    fontSize: 18,
    lineHeight: 26,
  },
  /* ヒーローカード */
  heroEmpty: {
    alignItems: 'center',
    gap: Spacing.two,
  },
  heroTitle: {
    color: '#FFFFFF',
  },
  heroTextDim: {
    color: 'rgba(255,255,255,0.85)',
  },
  heroCta: {
    backgroundColor: '#FFFFFF',
    paddingVertical: Spacing.three - 4,
    paddingHorizontal: Spacing.four,
    borderRadius: Radius.full,
    marginTop: Spacing.one,
  },
  heroPill: {
    backgroundColor: 'rgba(255,255,255,0.22)',
    paddingVertical: Spacing.one,
    paddingHorizontal: Spacing.three,
    borderRadius: Radius.full,
  },
  heroEditButton: {
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.6)',
    borderRadius: Radius.full,
    paddingVertical: Spacing.one + 2,
    alignItems: 'center',
    marginTop: Spacing.two,
  },
  planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  menuTitle: {
    marginTop: Spacing.two,
  },
  menuBlock: {
    gap: Spacing.one + 2,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: Radius.md,
    paddingVertical: Spacing.two + 2,
    paddingHorizontal: Spacing.three,
  },
  menuBlockPressed: {
    transform: [{ scale: 0.97 }],
    opacity: 0.85,
  },
  menuRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  menuRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  phaseRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  /* 統計 */
  statsRow: {
    flexDirection: 'row',
    gap: Spacing.two,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    gap: Spacing.half,
  },
  statEmoji: {
    fontSize: 20,
    lineHeight: 26,
  },
  statValue: {
    fontSize: 18,
    lineHeight: 24,
  },
  statLabel: {
    fontSize: 11,
    lineHeight: 14,
  },
  /* 診断バナー */
  diagnosisBanner: {
    borderRadius: Radius.lg,
    backgroundColor: '#4F6EF7',
    padding: Spacing.three,
  },
  diagnosisInner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
  },
  diagnosisDoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  /* タイルグリッド */
  tileGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
  },
  /* モーダル */
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.four,
  },
  modalBody: {
    borderRadius: Radius.lg,
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
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: Spacing.two,
    marginTop: Spacing.two,
  },
  feasibilityCard: {
    borderWidth: 1.5,
    borderRadius: Radius.md,
    padding: Spacing.three,
    gap: Spacing.two,
  },
  feasibilityButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
    marginTop: Spacing.one,
  },
});
