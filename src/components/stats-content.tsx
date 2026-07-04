import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { BarChart, type BarDatum } from '@/components/bar-chart';
import { ThemedText } from '@/components/themed-text';
import { AppButton, Card } from '@/components/ui';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { addDays, todayStr } from '@/lib/srs';
import {
  loadDailyLogMap,
  loadMockHistory,
  loadPartStats,
  loadTagStats,
  type PartStatsMap,
  type TagStatsMap,
} from '@/lib/storage';

const PART_LABELS: { key: string; label: string }[] = [
  { key: 'part1', label: 'Part 1' },
  { key: 'part2', label: 'Part 2' },
  { key: 'part34', label: 'Part 3/4' },
  { key: 'part5', label: 'Part 5' },
  { key: 'part6', label: 'Part 6' },
  { key: 'part7', label: 'Part 7' },
];

const TAG_LABELS = ['品詞', '時制', '前置詞', '語彙', '関係詞', '接続詞'] as const;

/**
 * 学習分析のコンテンツ本体（Part別正答率・タグ別弱点・スコア推移・学習量）。
 * マイページへの直接埋め込みと /stats 単独ページの両方から使う。
 * データ読込は画面フォーカスのたびに自前で行う。
 */
export function StatsContent() {
  const router = useRouter();
  const theme = useTheme();
  const today = todayStr();

  const [partStats, setPartStats] = useState<PartStatsMap>({});
  const [tagStats, setTagStats] = useState<TagStatsMap>({});
  const [dailyChart, setDailyChart] = useState<BarDatum[]>([]);
  const [scoreChart, setScoreChart] = useState<BarDatum[]>([]);

  const reload = useCallback(async () => {
    const [ps, ts, logMap, mockHistory] = await Promise.all([
      loadPartStats(),
      loadTagStats(),
      loadDailyLogMap(),
      loadMockHistory(),
    ]);
    setPartStats(ps);
    setTagStats(ts);

    const days: BarDatum[] = [];
    for (let i = 13; i >= 0; i--) {
      const date = addDays(today, -i);
      const d = logMap[date];
      days.push({
        label: date.slice(5).replace('-', '/'),
        value: d ? d.cards + d.quiz + d.listening + (d.reading ?? 0) : 0,
      });
    }
    setDailyChart(days);

    setScoreChart(
      mockHistory
        .filter((h) => h.estimatedTotal !== undefined)
        .slice(-10)
        .map((h) => ({ label: h.date.slice(5).replace('-', '/'), value: h.estimatedTotal! }))
    );
  }, [today]);

  useFocusEffect(useCallback(() => { reload(); }, [reload]));

  const tagRows = TAG_LABELS
    .map((t) => ({ tag: t, stats: tagStats[t] }))
    .filter((r) => r.stats && r.stats.answered > 0)
    .map((r) => ({ tag: r.tag, rate: Math.round((r.stats!.correct / r.stats!.answered) * 100), answered: r.stats!.answered }));
  const weakestTag = tagRows.length >= 2 ? tagRows.reduce((a, b) => (b.rate < a.rate ? b : a)) : null;

  return (
    <>
      {/* Part別正答率 */}
      <Card>
        <ThemedText type="smallBold">📊 Part 別正答率</ThemedText>
        {PART_LABELS.map(({ key, label }) => {
          const s = partStats[key];
          if (!s || s.answered === 0) {
            return (
              <View key={key} style={styles.partRow}>
                <ThemedText type="small" style={styles.partLabel}>{label}</ThemedText>
                <ThemedText type="small" themeColor="textSecondary">— まだデータなし</ThemedText>
              </View>
            );
          }
          const rate = s.correct / s.answered;
          const pct = Math.round(rate * 100);
          const barColor = pct >= 80 ? theme.success : pct >= 60 ? theme.accent : theme.warning;
          return (
            <View key={key} style={styles.partRow}>
              <ThemedText type="small" style={styles.partLabel}>{label}</ThemedText>
              <View style={styles.partBarWrap}>
                <View style={[styles.partBarTrack, { backgroundColor: theme.backgroundElement }]}>
                  <View style={[styles.partBar, { width: `${pct}%`, backgroundColor: barColor }]} />
                </View>
                <ThemedText type="small" style={[styles.partPct, { color: barColor }]}>
                  {pct}%
                </ThemedText>
              </View>
              <ThemedText type="small" themeColor="textSecondary" style={styles.partCount}>
                {s.answered}問
              </ThemedText>
            </View>
          );
        })}
      </Card>

      {/* タグ別弱点分析 */}
      {tagRows.length > 0 && (
        <Card>
          <ThemedText type="smallBold">🏷 Part 5 タグ別正答率</ThemedText>
          {tagRows.map((r) => {
            const barColor = r.rate >= 80 ? theme.success : r.rate >= 60 ? theme.accent : theme.warning;
            return (
              <View key={r.tag} style={styles.partRow}>
                <ThemedText type="small" style={styles.partLabel}>{r.tag}</ThemedText>
                <View style={styles.partBarWrap}>
                  <View style={[styles.partBarTrack, { backgroundColor: theme.backgroundElement }]}>
                    <View style={[styles.partBar, { width: `${r.rate}%`, backgroundColor: barColor }]} />
                  </View>
                  <ThemedText type="small" style={[styles.partPct, { color: barColor }]}>
                    {r.rate}%
                  </ThemedText>
                </View>
                <ThemedText type="small" themeColor="textSecondary" style={styles.partCount}>
                  {r.answered}問
                </ThemedText>
              </View>
            );
          })}
          {weakestTag && (
            <>
              <ThemedText type="small" style={{ color: theme.warning }}>
                💡 「{weakestTag.tag}」が最も苦手です。集中的に練習しましょう。
              </ThemedText>
              <AppButton
                label={`「${weakestTag.tag}」を練習する`}
                variant="ghost"
                onPress={() => router.push('/quiz' as never)}
              />
            </>
          )}
        </Card>
      )}

      {/* スコア推移 */}
      <Card>
        <ThemedText type="smallBold">📈 推定スコア推移</ThemedText>
        {scoreChart.length > 0 ? (
          <>
            <BarChart data={scoreChart} color={theme.success} maxValue={990} />
            <ThemedText type="small" themeColor="textSecondary">
              最新: {scoreChart[scoreChart.length - 1].value}点（ハーフ/実力測定モード）
            </ThemedText>
          </>
        ) : (
          <ThemedText type="small" themeColor="textSecondary">
            ハーフ模試または実力測定を受けるとここに表示されます。
          </ThemedText>
        )}
      </Card>

      {/* 直近14日の学習量 */}
      <Card>
        <ThemedText type="smallBold">📅 直近14日の学習量</ThemedText>
        {dailyChart.some((d) => d.value > 0) ? (
          <>
            <BarChart data={dailyChart} color={theme.accent} showValues />
            <ThemedText type="small" themeColor="textSecondary">
              合計 {dailyChart.reduce((s, d) => s + d.value, 0)} 回 ・ 1日平均{' '}
              {(dailyChart.reduce((s, d) => s + d.value, 0) / dailyChart.length).toFixed(1)} 回
            </ThemedText>
          </>
        ) : (
          <ThemedText type="small" themeColor="textSecondary">
            まだデータがありません。今日から学習を始めましょう！
          </ThemedText>
        )}
      </Card>
    </>
  );
}

const styles = StyleSheet.create({
  partRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    marginTop: Spacing.one + 2,
  },
  partLabel: {
    width: 64,
  },
  partBarWrap: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  partBarTrack: {
    flex: 1,
    height: 10,
    borderRadius: 5,
    overflow: 'hidden',
  },
  partBar: {
    height: '100%',
    borderRadius: 5,
  },
  partPct: {
    width: 34,
    textAlign: 'right',
    fontSize: 12,
  },
  partCount: {
    width: 36,
    textAlign: 'right',
    fontSize: 11,
  },
});
