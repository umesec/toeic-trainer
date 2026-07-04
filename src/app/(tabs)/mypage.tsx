import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ACHIEVEMENTS } from '@/lib/achievements';
import { ProgressBar } from '@/components/progress-bar';
import { SettingsModal } from '@/components/settings-modal';
import { StatsContent } from '@/components/stats-content';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { AppButton, Card } from '@/components/ui';
import { BottomTabInset, MaxContentWidth, Radius, Spacing, TopContentInset } from '@/constants/theme';
import { useShadows, useTheme } from '@/hooks/use-theme';
import { WORDS } from '@/data/words';
import { addDays, classifyWordCounts, todayStr, type WordMasteryCounts } from '@/lib/srs';
import {
  loadAchievementMap,
  loadCustomWords,
  loadDailyLogMap,
  loadMistakes,
  loadPaceStats,
  loadProgress,
  loadStreak,
  type AchievementMap,
} from '@/lib/storage';

export default function MyPageScreen() {
  const router = useRouter();
  const theme = useTheme();
  const shadows = useShadows();
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
  const [part5PaceSec, setPart5PaceSec] = useState<number | null>(null);
  const [showMenu, setShowMenu] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [unlocked, setUnlocked] = useState<AchievementMap>({});
  const [streakCount, setStreakCount] = useState(0);
  const [calendar, setCalendar] = useState<{ date: string; count: number }[]>([]);

  const reload = useCallback(async () => {
    const [progress, customWords, mistakes, paceStats, achievementMap, streak, logMap] =
      await Promise.all([
        loadProgress(),
        loadCustomWords(),
        loadMistakes(),
        loadPaceStats(),
        loadAchievementMap(),
        loadStreak(),
        loadDailyLogMap(),
      ]);
    setUnlocked(achievementMap);
    setStreakCount(streak.count);
    // 直近35日の学習カレンダー（古い日→今日）
    const days: { date: string; count: number }[] = [];
    for (let i = 34; i >= 0; i--) {
      const date = addDays(today, -i);
      const d = logMap[date];
      days.push({ date, count: d ? d.cards + d.quiz + d.listening + (d.reading ?? 0) : 0 });
    }
    setCalendar(days);
    const ids = [...WORDS.map((w) => w.id), ...customWords.map((c) => c.id)];
    setCounts(classifyWordCounts(ids, progress, today));
    setCustomWordCount(customWords.length);
    setMistakeCount(mistakes.length);

    const totals = Object.values(paceStats).reduce(
      (acc, e) => ({ ms: acc.ms + e.totalMs, count: acc.count + e.count }),
      { ms: 0, count: 0 }
    );
    setAvgPaceSec(totals.count > 0 ? totals.ms / totals.count / 1000 : null);
    const p5 = paceStats['part5'];
    setPart5PaceSec(p5 && p5.count > 0 ? p5.totalMs / p5.count / 1000 : null);
  }, [today]);

  useFocusEffect(
    useCallback(() => {
      reload();
    }, [reload])
  );

  const totalWords = counts.untouched + counts.mastered + counts.due + counts.learning;

  const openMenuItem = (action: 'guide' | 'mistakes' | 'settings') => {
    setShowMenu(false);
    if (action === 'guide') router.push('/guide' as never);
    else if (action === 'mistakes') router.push('/quiz/mistakes' as never);
    else setShowSettings(true);
  };

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          <View style={styles.titleRow}>
            <ThemedText type="subtitle">マイページ</ThemedText>
            <Pressable
              onPress={() => setShowMenu(true)}
              accessibilityLabel="メニューを開く"
              style={({ pressed }) => pressed && styles.pressed}>
              <ThemedView type="backgroundElement" style={[styles.menuButton, shadows.card]}>
                <ThemedText style={styles.menuIcon}>☰</ThemedText>
              </ThemedView>
            </Pressable>
          </View>
          <ThemedText type="small" themeColor="textSecondary">
            単語の定着状況と学習分析をまとめて確認できます。
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
            {part5PaceSec !== null && (
              <ThemedText
                type="small"
                style={{ color: part5PaceSec <= 20 ? theme.success : theme.warning }}>
                Part 5 平均 {part5PaceSec.toFixed(1)}秒/問（900点ペースの目安 20秒）
              </ThemedText>
            )}
            {counts.due > 0 && (
              <AppButton
                label={`🕒 復習待ちの ${counts.due} 枚を復習する`}
                onPress={() => router.push('/flashcards' as never)}
              />
            )}
          </Card>

          <Card>
            <View style={styles.calendarHeader}>
              <ThemedText type="smallBold">📆 学習カレンダー（直近35日）</ThemedText>
              <ThemedText type="smallBold" style={{ color: theme.warning }}>
                🔥 {streakCount}日連続
              </ThemedText>
            </View>
            <View style={styles.calendarGrid}>
              {calendar.map((d) => {
                const bg =
                  d.count === 0
                    ? theme.backgroundSelected
                    : d.count < 10
                      ? `${theme.accent}55`
                      : d.count < 25
                        ? `${theme.accent}AA`
                        : theme.accent;
                return <View key={d.date} style={[styles.calendarCell, { backgroundColor: bg }]} />;
              })}
            </View>
            <ThemedText type="small" themeColor="textSecondary">
              マスを毎日塗りつぶして、学習の連続記録を伸ばしましょう
            </ThemedText>
          </Card>

          <Card>
            <ThemedText type="smallBold">
              🏆 実績 {Object.keys(unlocked).length} / {ACHIEVEMENTS.length}
            </ThemedText>
            <View style={styles.badgeGrid}>
              {ACHIEVEMENTS.map((a) => {
                const isUnlocked = !!unlocked[a.id];
                return (
                  <View
                    key={a.id}
                    style={[styles.badge, !isUnlocked && styles.badgeLocked]}>
                    <ThemedText style={styles.badgeEmoji}>{isUnlocked ? a.emoji : '🔒'}</ThemedText>
                    <ThemedText type="small" style={styles.badgeTitle} numberOfLines={1}>
                      {a.title}
                    </ThemedText>
                    <ThemedText
                      type="small"
                      themeColor="textSecondary"
                      style={styles.badgeDesc}
                      numberOfLines={2}>
                      {isUnlocked ? `${unlocked[a.id]} 達成` : a.desc}
                    </ThemedText>
                  </View>
                );
              })}
            </View>
          </Card>

          <ThemedText type="smallBold" style={styles.sectionTitle}>
            学習分析
          </ThemedText>
          <StatsContent />
        </ScrollView>
      </SafeAreaView>

      {/* 右上ハンバーガーメニュー */}
      <Modal visible={showMenu} transparent animationType="fade" onRequestClose={() => setShowMenu(false)}>
        <Pressable style={styles.menuBackdrop} onPress={() => setShowMenu(false)}>
          <View style={styles.menuAnchor} pointerEvents="box-none">
            <ThemedView type="backgroundElement" style={[styles.menuPanel, shadows.card]}>
              <MenuItem emoji="📖" label="ガイド" onPress={() => openMenuItem('guide')} />
              <MenuItem
                emoji="📓"
                label={mistakeCount > 0 ? `間違いノート（${mistakeCount}）` : '間違いノート'}
                onPress={() => openMenuItem('mistakes')}
              />
              <MenuItem emoji="⚙️" label="設定・バックアップ" onPress={() => openMenuItem('settings')} />
            </ThemedView>
          </View>
        </Pressable>
      </Modal>

      <SettingsModal
        visible={showSettings}
        onClose={() => setShowSettings(false)}
        onDataChanged={reload}
      />
    </ThemedView>
  );
}

function MenuItem({ emoji, label, onPress }: { emoji: string; label: string; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.menuItem, pressed && styles.pressed]}>
      <ThemedText type="default">{emoji}</ThemedText>
      <ThemedText type="smallBold">{label}</ThemedText>
    </Pressable>
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
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  menuButton: {
    width: 44,
    height: 44,
    borderRadius: Radius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuIcon: {
    fontSize: 20,
    lineHeight: 24,
  },
  menuBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.25)',
  },
  menuAnchor: {
    flex: 1,
    alignItems: 'flex-end',
    paddingTop: TopContentInset + Spacing.six,
    paddingHorizontal: Spacing.four,
  },
  menuPanel: {
    borderRadius: Radius.md,
    paddingVertical: Spacing.one,
    minWidth: 220,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    paddingVertical: Spacing.two + 2,
    paddingHorizontal: Spacing.three,
  },
  sectionTitle: {
    fontSize: 18,
    lineHeight: 26,
  },
  masteryRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.three,
  },
  masteryStat: {
    gap: Spacing.half,
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.one,
  },
  calendarCell: {
    width: '12.2%',
    aspectRatio: 1.6,
    borderRadius: 4,
  },
  badgeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
  },
  badge: {
    flexBasis: '30%',
    flexGrow: 1,
    alignItems: 'center',
    gap: Spacing.half,
    paddingVertical: Spacing.two,
  },
  badgeLocked: {
    opacity: 0.4,
  },
  badgeEmoji: {
    fontSize: 26,
    lineHeight: 32,
  },
  badgeTitle: {
    fontWeight: '700',
    fontSize: 12,
    lineHeight: 16,
  },
  badgeDesc: {
    fontSize: 10,
    lineHeight: 13,
    textAlign: 'center',
  },
  pressed: {
    opacity: 0.6,
  },
});
