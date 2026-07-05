import { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { AppButton, Card } from '@/components/ui';
import { screenStyles } from '@/constants/screen-styles';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { LISTENING_SETS } from '@/data/part34';
import type { ListeningSet } from '@/data/types';
import { pitchForSpeaker, speak, stopSpeech } from '@/lib/speech';
import { todayStr } from '@/lib/srs';
import { bumpStudy } from '@/lib/storage';

export default function ShadowingScreen() {
  const [current, setCurrent] = useState<ListeningSet | null>(null);

  const handleSelect = (set: ListeningSet) => {
    const today = todayStr();
    bumpStudy('listening', today);
    setCurrent(set);
  };

  return (
    <ThemedView style={screenStyles.container}>
      <SafeAreaView style={screenStyles.safeArea}>
        {current ? (
          <ShadowingSession
            set={current}
            onBack={() => {
              stopSpeech();
              setCurrent(null);
            }}
          />
        ) : (
          <ScrollView contentContainerStyle={screenStyles.scroll} showsVerticalScrollIndicator={false}>
            <ThemedText type="subtitle">シャドーイング練習</ThemedText>
            <ThemedText type="small" themeColor="textSecondary">
              Part 3/4 のスクリプトを1行ずつ再生します。聞いた直後に声に出してシャドーイングし、テキストで確認しましょう。スロー再生でリズムを体感する練習にも使えます。
            </ThemedText>
            {LISTENING_SETS.map((set) => (
              <Pressable
                key={set.id}
                onPress={() => handleSelect(set)}
                style={({ pressed }) => pressed && screenStyles.pressed}>
                <Card>
                  <View style={styles.cardHeader}>
                    <ThemedText type="smallBold">
                      Part {set.part}　{set.title}
                    </ThemedText>
                    <ThemedText type="small" themeColor="textSecondary">
                      {set.script.length}行
                    </ThemedText>
                  </View>
                  <ThemedText type="small" themeColor="textSecondary">
                    {set.script[0]?.text.slice(0, 40)}…
                  </ThemedText>
                </Card>
              </Pressable>
            ))}
          </ScrollView>
        )}
      </SafeAreaView>
    </ThemedView>
  );
}

function ShadowingSession({ set, onBack }: { set: ListeningSet; onBack: () => void }) {
  const theme = useTheme();
  const [lineIdx, setLineIdx] = useState(0);
  const [showText, setShowText] = useState(false);
  const [done, setDone] = useState(false);

  const line = set.script[lineIdx];
  const total = set.script.length;

  // 行が変わったら自動的にテキストを隠す
  useEffect(() => {
    setShowText(false);
  }, [lineIdx]);

  const playLine = (slow = false) => {
    speak(line.text, { slow });
  };

  const next = () => {
    stopSpeech();
    if (lineIdx + 1 < total) {
      setLineIdx(lineIdx + 1);
    } else {
      setDone(true);
    }
  };

  if (done) {
    return (
      <ScrollView contentContainerStyle={screenStyles.scroll} showsVerticalScrollIndicator={false}>
        <Card style={styles.centeredCard}>
          <ThemedText type="subtitle">完了！</ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            {set.title} — 全{total}行のシャドーイングが終わりました。
          </ThemedText>
          <AppButton label="スクリプト全文を見る" variant="ghost" onPress={() => setDone(false)} />
          <AppButton label="セット一覧に戻る" onPress={onBack} />
        </Card>
        <Card>
          <ThemedText type="smallBold">スクリプト全文</ThemedText>
          {set.script.map((l, i) => (
            <View key={i} style={styles.scriptRow}>
              {l.speaker && (
                <ThemedText type="small" style={{ color: theme.accent, width: 24 }}>
                  {l.speaker}
                </ThemedText>
              )}
              <ThemedText type="small" style={styles.scriptText}>{l.text}</ThemedText>
            </View>
          ))}
          <ThemedText type="small" themeColor="textSecondary" style={styles.scriptJa}>
            {set.scriptJa}
          </ThemedText>
        </Card>
      </ScrollView>
    );
  }

  return (
    <ScrollView contentContainerStyle={screenStyles.scroll} showsVerticalScrollIndicator={false}>
      <Pressable onPress={onBack} style={({ pressed }) => pressed && screenStyles.pressed}>
        <ThemedText type="linkPrimary">← セット一覧に戻る</ThemedText>
      </Pressable>

      <ThemedText type="smallBold">
        {set.title} — {lineIdx + 1} / {total} 行
      </ThemedText>

      {/* 話者バッジ */}
      {line.speaker && (
        <View style={[styles.speakerBadge, { backgroundColor: theme.accent }]}>
          <ThemedText type="small" style={{ color: theme.onAccent }}>
            話者: {line.speaker === 'M' ? '男性' : line.speaker === 'W' ? '女性' : line.speaker}
          </ThemedText>
        </View>
      )}

      {/* テキスト表示エリア */}
      <Card style={styles.textCard}>
        {showText ? (
          <ThemedText type="default" style={styles.lineText}>{line.text}</ThemedText>
        ) : (
          <Pressable onPress={() => setShowText(true)}>
            <ThemedText type="small" themeColor="textSecondary" style={styles.tapHint}>
              タップしてテキストを表示
            </ThemedText>
          </Pressable>
        )}
      </Card>

      {/* 操作ボタン */}
      <View style={styles.btnRow}>
        <AppButton label="▶ 再生" onPress={() => playLine(false)} />
        <AppButton label="🐢 スロー再生" variant="ghost" onPress={() => playLine(true)} />
      </View>

      <AppButton
        label={lineIdx + 1 < total ? `次の行へ (${lineIdx + 2}/${total})` : '完了'}
        onPress={next}
      />

      {/* 進捗バー */}
      <View style={[styles.progressTrack, { backgroundColor: theme.backgroundElement }]}>
        <View
          style={[
            styles.progressFill,
            { width: `${((lineIdx + 1) / total) * 100}%`, backgroundColor: theme.success },
          ]}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  speakerBadge: {
    alignSelf: 'flex-start',
    paddingVertical: Spacing.one,
    paddingHorizontal: Spacing.three,
    borderRadius: 999,
  },
  textCard: {
    minHeight: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lineText: {
    lineHeight: 26,
    textAlign: 'center',
  },
  tapHint: {
    textAlign: 'center',
    paddingVertical: Spacing.three,
  },
  btnRow: {
    flexDirection: 'row',
    gap: Spacing.two,
  },
  progressTrack: {
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  centeredCard: {
    alignItems: 'center',
    gap: Spacing.two,
    padding: Spacing.four,
  },
  scriptRow: {
    flexDirection: 'row',
    gap: Spacing.two,
    marginTop: Spacing.one,
  },
  scriptText: {
    flex: 1,
    lineHeight: 20,
  },
  scriptJa: {
    marginTop: Spacing.two,
    lineHeight: 20,
  },
});
