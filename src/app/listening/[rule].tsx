import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Card } from '@/components/ui';
import { BottomTabInset, MaxContentWidth, Spacing, TopContentInset } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { SOUND_CHANGE_RULES } from '@/data/soundChanges';
import type { SoundChangeExample } from '@/data/types';
import { speak } from '@/lib/speech';
import { todayStr } from '@/lib/srs';
import { bumpDaily, recordStudy } from '@/lib/storage';
import { splitByFocus } from '@/lib/util';

export default function SoundChangeRuleScreen() {
  const router = useRouter();
  const { rule: ruleId } = useLocalSearchParams<{ rule: string }>();
  const rule = SOUND_CHANGE_RULES.find((r) => r.id === ruleId);

  useEffect(() => {
    if (!rule) return;
    // ルール詳細を開いたら「今日のリスニング学習」としてカウント
    const today = todayStr();
    bumpDaily(today, 'listening');
    recordStudy(today);
  }, [rule]);

  if (!rule) {
    return (
      <ThemedView style={styles.container}>
        <SafeAreaView style={styles.safeArea}>
          <ThemedText type="default">ルールが見つかりませんでした。</ThemedText>
          <Pressable onPress={() => router.back()}>
            <ThemedText type="linkPrimary">← 一覧に戻る</ThemedText>
          </Pressable>
        </SafeAreaView>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          <Pressable onPress={() => router.back()} style={({ pressed }) => pressed && styles.pressed}>
            <ThemedText type="linkPrimary">← 音声変化の一覧に戻る</ThemedText>
          </Pressable>

          <ThemedText type="subtitle">
            {rule.name}{' '}
            <ThemedText type="default" themeColor="textSecondary">
              {rule.nameEn}
            </ThemedText>
          </ThemedText>

          <Card>
            <ThemedText type="small">{rule.description}</ThemedText>
          </Card>

          <ThemedText type="smallBold">実例（🔊 通常 / 🐢 ゆっくり）</ThemedText>
          {rule.examples.map((ex) => (
            <ExampleRow key={ex.phrase} example={ex} />
          ))}

          <ThemedText type="small" themeColor="textSecondary">
            ※ 音声はTTS（読み上げ）のため、実際の音声変化の再現度はOSの音声品質に依存します。カナはあくまで目安です。
          </ThemedText>
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

function ExampleRow({ example }: { example: SoundChangeExample }) {
  const theme = useTheme();
  const [before, focus, after] = splitByFocus(example.phrase, example.focus);
  return (
    <Card>
      <View style={styles.exampleHeader}>
        <ThemedText type="default" style={styles.phrase}>
          {before}
          <ThemedText type="default" style={[styles.focus, { color: theme.accent }]}>
            {focus}
          </ThemedText>
          {after}
        </ThemedText>
        <View style={styles.playRow}>
          <PlayButton label="🔊" onPress={() => speak(example.phrase)} />
          <PlayButton label="🐢" onPress={() => speak(example.phrase, { slow: true })} />
        </View>
      </View>
      <ThemedText type="small" themeColor="textSecondary">
        文字通り: {example.literal}
      </ThemedText>
      <ThemedText type="smallBold">実際の音: {example.actual}</ThemedText>
      {!!example.note && (
        <ThemedText type="small" themeColor="textSecondary">
          💡 {example.note}
        </ThemedText>
      )}
    </Card>
  );
}

function PlayButton({ label, onPress }: { label: string; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.playButton, pressed && styles.pressed]}>
      <ThemedText type="default">{label}</ThemedText>
    </Pressable>
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
  exampleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: Spacing.two,
  },
  phrase: {
    flexShrink: 1,
  },
  focus: {
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
  playRow: {
    flexDirection: 'row',
    gap: Spacing.two,
  },
  playButton: {
    padding: Spacing.one,
  },
  pressed: {
    opacity: 0.6,
  },
});
