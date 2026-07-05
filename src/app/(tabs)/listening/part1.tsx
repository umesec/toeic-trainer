import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BackLink } from '@/components/back-link';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { AppButton, Card } from '@/components/ui';
import { screenStyles } from '@/constants/screen-styles';
import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { PART1_ITEMS } from '@/data/part1';
import { accentForId, speak } from '@/lib/speech';
import { todayStr } from '@/lib/srs';
import { bumpStudy, recordMistake } from '@/lib/storage';
import { shuffle } from '@/lib/util';

const LABELS = ['A', 'B', 'C', 'D'] as const;

export default function Part1Screen() {
  const theme = useTheme();
  const [order, setOrder] = useState(() => shuffle(PART1_ITEMS));
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(0);

  const finished = index >= order.length;
  const item = order[Math.min(index, order.length - 1)];

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
    bumpStudy('listening', today);
  };

  const next = () => {
    setIndex((i) => i + 1);
    setSelected(null);
  };

  const restart = () => {
    setOrder(shuffle(PART1_ITEMS));
    setIndex(0);
    setSelected(null);
    setScore(0);
    setAnswered(0);
  };

  return (
    <ThemedView style={screenStyles.container}>
      <SafeAreaView style={screenStyles.safeArea}>
        <ScrollView contentContainerStyle={screenStyles.scroll} showsVerticalScrollIndicator={false}>
          <BackLink label="← リスニングの一覧に戻る" fallbackHref="/listening" />

          <ThemedText type="subtitle">Part 1 写真描写</ThemedText>

          {finished ? (
            <Card style={styles.doneCard}>
              <ThemedText type="subtitle">🎉 全問終了！</ThemedText>
              <ThemedText type="default">
                {order.length} 問中 {score} 問正解
              </ThemedText>
              <ThemedText type="small" themeColor="textSecondary">
                お疲れさまでした。順番を変えてもう一度挑戦できます。
              </ThemedText>
              <AppButton label="もう一度最初から" onPress={restart} />
            </Card>
          ) : (
            <>
          <ThemedText type="small" themeColor="textSecondary">
            第 {index + 1} / {order.length} 問 ・ 正解 {score} / {answered}　—　下の場面（写真の代わり）に最も合う描写文を、(A)〜(D)の音声から選んでください。
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
                    pressed && !done && screenStyles.pressed,
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
              <AppButton label={index + 1 < order.length ? '次の問題へ' : '結果を見る'} onPress={next} />
            </>
          )}
            </>
          )}
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
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
  doneCard: {
    alignItems: 'center',
    gap: Spacing.two,
    padding: Spacing.four,
  },
});
