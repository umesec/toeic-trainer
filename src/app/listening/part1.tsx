import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { AppButton, Card } from '@/components/ui';
import {
  BottomTabInset,
  MaxContentWidth,
  Radius,
  Spacing,
  TopContentInset,
} from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { PART1_ITEMS } from '@/data/part1';
import { accentForId, speak } from '@/lib/speech';
import { todayStr } from '@/lib/srs';
import { bumpDaily, recordMistake, recordStudy } from '@/lib/storage';
import { shuffle } from '@/lib/util';

const LABELS = ['A', 'B', 'C', 'D'] as const;

export default function Part1Screen() {
  const router = useRouter();
  const theme = useTheme();
  const [order] = useState(() => shuffle(PART1_ITEMS));
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(0);

  const item = order[index % order.length];

  /** (A)〜(D) の4文を連続再生 */
  const playAll = () => {
    speak(
      `A. ${item.statements[0]} ... B. ${item.statements[1]} ... C. ${item.statements[2]} ... D. ${item.statements[3]}`,
      { accent: accentForId(item.id) }
    );
  };

  const pick = (i: number) => {
    if (selected !== null) return;
    setSelected(i);
    setAnswered((n) => n + 1);
    if (i === item.answer) setScore((s) => s + 1);
    const today = todayStr();
    if (i !== item.answer) recordMistake('part1', item.id, today);
    bumpDaily(today, 'listening');
    recordStudy(today);
  };

  const next = () => {
    setIndex((i) => i + 1);
    setSelected(null);
  };

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          <Pressable onPress={() => router.back()} style={({ pressed }) => pressed && styles.pressed}>
            <ThemedText type="linkPrimary">← リスニングの一覧に戻る</ThemedText>
          </Pressable>

          <ThemedText type="subtitle">Part 1 写真描写</ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            第 {(index % order.length) + 1} 問 ・ 正解 {score} / {answered}　—　下の場面（写真の代わり）に最も合う描写文を、(A)〜(D)の音声から選んでください。
          </ThemedText>

          {/* 写真代わりの場面カード */}
          <Card style={styles.sceneCard}>
            <ThemedText style={styles.sceneEmoji}>{item.scene}</ThemedText>
            <ThemedText type="small" themeColor="textSecondary" style={styles.sceneJa}>
              {item.sceneJa}
            </ThemedText>
          </Card>

          <AppButton label="🔊 (A)〜(D) を再生" onPress={playAll} />

          <View style={styles.choices}>
            {LABELS.map((label, i) => {
              const isAnswer = i === item.answer;
              const isPicked = i === selected;
              const done = selected !== null;
              const showCorrect = done && isAnswer;
              const showWrong = done && isPicked && !isAnswer;
              return (
                <Pressable
                  key={label}
                  onPress={() => pick(i)}
                  style={({ pressed }) => [
                    styles.choiceMark,
                    showCorrect && { borderColor: theme.success },
                    showWrong && { borderColor: theme.danger },
                    pressed && !done && styles.pressed,
                  ]}>
                  <ThemedView
                    type="backgroundElement"
                    style={[
                      styles.choiceInner,
                      showCorrect && { backgroundColor: theme.successBg },
                      showWrong && { backgroundColor: theme.dangerBg },
                    ]}>
                    <ThemedText type="default">
                      ({label}) {done ? item.statements[i] : '？？？'}
                      {showCorrect ? '  ✔' : ''}
                      {showWrong ? '  ✘' : ''}
                    </ThemedText>
                    {done && (
                      <ThemedText type="small" themeColor="textSecondary">
                        {item.statementsJa[i]}
                      </ThemedText>
                    )}
                  </ThemedView>
                </Pressable>
              );
            })}
          </View>

          {selected !== null && (
            <>
              <Card>
                <ThemedText type="smallBold">
                  {selected === item.answer ? '⭕ 正解！' : '❌ 不正解…'}
                </ThemedText>
                <ThemedText type="small">💡 {item.explanation}</ThemedText>
              </Card>
              <AppButton label="次の問題へ" onPress={next} />
            </>
          )}
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
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
  sceneCard: {
    alignItems: 'center',
    gap: Spacing.two,
    padding: Spacing.four,
  },
  sceneEmoji: {
    fontSize: 48,
    lineHeight: 60,
    textAlign: 'center',
  },
  sceneJa: {
    textAlign: 'center',
  },
  choices: {
    gap: Spacing.two,
  },
  choiceMark: {
    borderRadius: Radius.sm,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  choiceInner: {
    borderRadius: Radius.sm - 2,
    paddingVertical: Spacing.two + 2,
    paddingHorizontal: Spacing.three,
    gap: Spacing.half,
  },
  pressed: {
    opacity: 0.6,
  },
});
