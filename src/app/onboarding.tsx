import { useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { AppButton, Card } from '@/components/ui';
import { screenStyles } from '@/constants/screen-styles';
import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { saveOnboardingDone } from '@/lib/storage';

const STEPS = [
  {
    num: '1',
    title: '診断テストで実力確認',
    body: '約10分・15問程度の簡易テストで現在の推定スコアを算出します。ここで得た結果を元に最短ルートを提案します。',
    icon: '🩺',
  },
  {
    num: '2',
    title: '目標スコアと試験日を設定',
    body: '目標と試験日を入力すると、フェーズ別の学習プランと「今日のメニュー」が自動生成されます。',
    icon: '🎯',
  },
  {
    num: '3',
    title: '毎日のメニューをこなす',
    body: '単語カード・文法クイズ・リスニング練習の3本柱を毎日続けましょう。間違えた問題は自動でSRSスケジュールに入ります。',
    icon: '📅',
  },
  {
    num: '4',
    title: '模試で実力を測って弱点を潰す',
    body: 'ハーフ模試（60分）や実力測定モードで定期的にスコアを確認。間違いノートと分析画面で弱点を特定して集中練習します。',
    icon: '📈',
  },
] as const;

export default function OnboardingScreen() {
  const router = useRouter();
  const theme = useTheme();

  const goToDiagnosis = async () => {
    await saveOnboardingDone();
    router.replace('/' as never);
    router.push('/quiz/diagnosis' as never);
  };

  const skip = async () => {
    await saveOnboardingDone();
    router.replace('/' as never);
  };

  return (
    <ThemedView style={screenStyles.container}>
      <SafeAreaView style={screenStyles.safeArea}>
        <ScrollView contentContainerStyle={screenStyles.scroll} showsVerticalScrollIndicator={false}>
          {/* ヒーロー */}
          <View style={[styles.hero, { backgroundColor: theme.accent }]}>
            <ThemedText type="title" style={styles.heroText}>TOEIC トレーナー</ThemedText>
            <ThemedText type="small" style={[styles.heroText, styles.heroSub]}>
              900点を目指す、あなた専用の学習システム
            </ThemedText>
          </View>

          <ThemedText type="smallBold" style={styles.sectionTitle}>
            学習の流れ
          </ThemedText>

          {STEPS.map((step) => (
            <Card key={step.num} style={styles.stepCard}>
              <View style={[styles.stepBadge, { backgroundColor: theme.accent }]}>
                <ThemedText type="smallBold" style={styles.heroText}>{step.num}</ThemedText>
              </View>
              <View style={{ flex: 1, gap: Spacing.half }}>
                <ThemedText type="smallBold">{step.icon} {step.title}</ThemedText>
                <ThemedText type="small" themeColor="textSecondary">{step.body}</ThemedText>
              </View>
            </Card>
          ))}

          <Card style={{ borderLeftWidth: 4, borderLeftColor: theme.success }}>
            <ThemedText type="smallBold">📌 まずは診断テストからスタート！</ThemedText>
            <ThemedText type="small" themeColor="textSecondary">
              現在のスコアを測って最短ルートを把握しましょう。約10分で完了します。音の出る環境で受けてください。
            </ThemedText>
          </Card>

          <AppButton label="診断テストをはじめる（約10分）" onPress={goToDiagnosis} />

          <Pressable onPress={skip} style={({ pressed }) => [styles.skipButton, pressed && { opacity: 0.6 }]}>
            <ThemedText type="small" themeColor="textSecondary">
              スキップしてホームに進む
            </ThemedText>
          </Pressable>
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  hero: {
    borderRadius: Radius.lg,
    padding: Spacing.four,
    alignItems: 'center',
    gap: Spacing.two,
  },
  heroText: { color: '#FFFFFF' },
  heroSub: { opacity: 0.9, textAlign: 'center' },
  sectionTitle: { fontSize: 17, lineHeight: 24 },
  stepCard: { flexDirection: 'row', alignItems: 'flex-start', gap: Spacing.three },
  stepBadge: {
    width: 28,
    height: 28,
    borderRadius: Radius.full,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
    flexShrink: 0,
  },
  skipButton: { alignItems: 'center', paddingVertical: Spacing.two },
});
