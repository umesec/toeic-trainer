import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { AppButton, Card } from '@/components/ui';
import { BottomTabInset, MaxContentWidth, Spacing, TopContentInset } from '@/constants/theme';
import { PART2_ITEMS } from '@/data/part2';
import { speak } from '@/lib/speech';
import { todayStr } from '@/lib/srs';
import { bumpDaily, recordMistake, recordStudy } from '@/lib/storage';
import { shuffle } from '@/lib/util';

const LABELS = ['A', 'B', 'C'] as const;

export default function Part2Screen() {
  const router = useRouter();
  const [order] = useState(() => shuffle(PART2_ITEMS));
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(0);

  const item = order[index % order.length];

  /** 質問→A→B→C の順で連続再生 */
  const playAll = () => {
    speak(
      `${item.question} ... A. ${item.choices[0]} ... B. ${item.choices[1]} ... C. ${item.choices[2]}`
    );
  };

  const pick = (i: number) => {
    if (selected !== null) return;
    setSelected(i);
    setAnswered((n) => n + 1);
    if (i === item.answer) setScore((s) => s + 1);
    const today = todayStr();
    if (i !== item.answer) recordMistake('part2', item.id, today);
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
            <ThemedText type="linkPrimary">← 音声変化の一覧に戻る</ThemedText>
          </Pressable>

          <ThemedText type="subtitle">Part 2 応答問題</ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            第 {(index % order.length) + 1} 問 ・ 正解 {score} / {answered}　—　質問と応答(A)(B)(C)を聞いて、最も適切な応答を選んでください。本番同様、文字は読まずに耳だけで挑戦しましょう。
          </ThemedText>

          <View style={styles.playRow}>
            <AppButton label="🔊 問題を再生" onPress={playAll} />
            <AppButton label="質問のみ" variant="ghost" onPress={() => speak(item.question)} />
          </View>

          <View style={styles.choices}>
            {LABELS.map((label, i) => {
              const isAnswer = i === item.answer;
              const isPicked = i === selected;
              const done = selected !== null;
              return (
                <View key={label} style={styles.choiceRow}>
                  <Pressable
                    onPress={() => pick(i)}
                    style={({ pressed }) => [
                      styles.choice,
                      done && isAnswer && styles.choiceCorrect,
                      done && isPicked && !isAnswer && styles.choiceWrong,
                      pressed && !done && styles.pressed,
                    ]}>
                    <ThemedView type="backgroundElement" style={styles.choiceInner}>
                      <ThemedText type="default">
                        ({label}) {done ? item.choices[i] : '？？？'}
                        {done && isAnswer ? '  ✔' : ''}
                        {done && isPicked && !isAnswer ? '  ✘' : ''}
                      </ThemedText>
                    </ThemedView>
                  </Pressable>
                  <Pressable
                    onPress={() => speak(item.choices[i])}
                    style={({ pressed }) => [styles.replay, pressed && styles.pressed]}>
                    <ThemedText type="default">🔊</ThemedText>
                  </Pressable>
                </View>
              );
            })}
          </View>

          {selected !== null && (
            <>
              <Card>
                <ThemedText type="smallBold">
                  {selected === item.answer ? '⭕ 正解！' : '❌ 不正解…'}
                </ThemedText>
                <ThemedText type="small">
                  Q: {item.question}
                  {'\n'}（{item.questionJa}）
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
  playRow: {
    flexDirection: 'row',
    gap: Spacing.two,
  },
  choices: {
    gap: Spacing.two,
  },
  choiceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  choice: {
    flex: 1,
    borderRadius: Spacing.two,
  },
  choiceInner: {
    borderRadius: Spacing.two,
    paddingVertical: Spacing.two + 2,
    paddingHorizontal: Spacing.three,
  },
  choiceCorrect: {
    borderWidth: 2,
    borderColor: '#2fa96c',
  },
  choiceWrong: {
    borderWidth: 2,
    borderColor: '#e5484d',
  },
  replay: {
    padding: Spacing.one,
  },
  pressed: {
    opacity: 0.6,
  },
});
