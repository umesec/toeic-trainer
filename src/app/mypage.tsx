import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { FeatureTile } from '@/components/feature-tile';
import { ProgressBar } from '@/components/progress-bar';
import { SettingsModal } from '@/components/settings-modal';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Card } from '@/components/ui';
import { BottomTabInset, MaxContentWidth, Spacing, TopContentInset } from '@/constants/theme';
import { WORDS } from '@/data/words';
import { classifyWordCounts, todayStr, type WordMasteryCounts } from '@/lib/srs';
import { loadCustomWords, loadMistakes, loadPaceStats, loadProgress } from '@/lib/storage';

export default function MyPageScreen() {
  const router = useRouter();
  const today = todayStr();

  const [counts, setCounts] = useState<WordMasteryCounts>({
    untouched: 0,
    mastered: 0,
    due: 0,
    learning: 0,
  });
  const [customWordCount, setCustomWordCount] = useState(0);
  const [mistakeCount, setMistakeCount] = useState(0);
  const [avgPaceSec, setAvgPaceSec] = useState<number | null>(null);

  const reload = useCallback(async () => {
    const [progress, customWords, mistakes, paceStats] = await Promise.all([
      loadProgress(),
      loadCustomWords(),
      loadMistakes(),
      loadPaceStats(),
    ]);
    const ids = [...WORDS.map((w) => w.id), ...customWords.map((c) => c.id)];
    setCounts(classifyWordCounts(ids, progress, today));
    setCustomWordCount(customWords.length);
    setMistakeCount(mistakes.length);

    const totals = Object.values(paceStats).reduce(
      (acc, e) => ({ ms: acc.ms + e.totalMs, count: acc.count + e.count }),
      { ms: 0, count: 0 }
    );
    setAvgPaceSec(totals.count > 0 ? totals.ms / totals.count / 1000 : null);
  }, [today]);

  useFocusEffect(
    useCallback(() => {
      reload();
    }, [reload])
  );

  const [showSettings, setShowSettings] = useState(false);
  const totalWords = counts.untouched + counts.mastered + counts.due + counts.learning;

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          <ThemedText type="subtitle">マイページ</ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            単語の定着状況や、学習に関する各種機能をまとめて確認できます。
          </ThemedText>

          <Card>
            <ThemedText type="smallBold">📚 単語の定着状況</ThemedText>
            <ProgressBar value={counts.mastered} max={Math.max(totalWords, 1)} height={8} />
            <View style={styles.masteryRow}>
              <MasteryStat emoji="✅" label="定着" value={counts.mastered} />
              <MasteryStat emoji="🕒" label="復習待ち" value={counts.due} />
              <MasteryStat emoji="✏️" label="学習中" value={counts.learning} />
              <MasteryStat emoji="⬜" label="未着手" value={counts.untouched} />
            </View>
            <ThemedText type="small" themeColor="textSecondary">
              自作単語 {customWordCount} 語を含む 全 {totalWords} 語
            </ThemedText>
            {avgPaceSec !== null && (
              <ThemedText type="small" themeColor="textSecondary">
                平均解答時間: 約{avgPaceSec.toFixed(1)}秒/問
              </ThemedText>
            )}
          </Card>

          <ThemedText type="smallBold" style={styles.sectionTitle}>
            メニュー
          </ThemedText>
          <View style={styles.tileGrid}>
            <FeatureTile
              emoji="📖"
              title="ガイド"
              subtitle="試験形式・攻略ポイント"
              feature="guide"
              onPress={() => router.push('/guide' as never)}
            />
            <FeatureTile
              emoji="📊"
              title="学習分析"
              subtitle="Part別正答率・スコア推移"
              feature="quiz"
              onPress={() => router.push('/stats' as never)}
            />
            <FeatureTile
              emoji="📓"
              title="間違いノート"
              subtitle="解き直しで克服"
              feature="mistakes"
              badge={mistakeCount}
              onPress={() => router.push('/quiz/mistakes' as never)}
            />
            <FeatureTile
              emoji="⚙️"
              title="設定・バックアップ"
              subtitle="読み上げ速度・通知・データ管理"
              feature="settings"
              onPress={() => setShowSettings(true)}
            />
          </View>
        </ScrollView>
      </SafeAreaView>

      <SettingsModal
        visible={showSettings}
        onClose={() => setShowSettings(false)}
        onDataChanged={reload}
      />
    </ThemedView>
  );
}

function MasteryStat({ emoji, label, value }: { emoji: string; label: string; value: number }) {
  return (
    <View style={styles.masteryStat}>
      <ThemedText type="smallBold">
        {emoji} {value}
      </ThemedText>
      <ThemedText type="small" themeColor="textSecondary">
        {label}
      </ThemedText>
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
  },
  scroll: {
    paddingTop: TopContentInset,
    paddingBottom: BottomTabInset + Spacing.four,
    gap: Spacing.three,
  },
  sectionTitle: {
    fontSize: 18,
    lineHeight: 26,
  },
  tileGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
  },
  masteryRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.three,
  },
  masteryStat: {
    gap: Spacing.half,
  },
});
