import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BackLink } from '@/components/back-link';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { AppButton, Card } from '@/components/ui';
import { screenStyles } from '@/constants/screen-styles';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { DICTATION_ITEMS, SOUND_CHANGE_RULES } from '@/data/soundChanges';
import { accentForId, speak } from '@/lib/speech';
import { todayStr } from '@/lib/srs';
import { bumpStudy } from '@/lib/storage';
import { normalizeSentence, shuffle, splitByFocus } from '@/lib/util';

export default function DictationScreen() {
  const theme = useTheme();
  const [order, setOrder] = useState(() => shuffle(DICTATION_ITEMS));
  const [index, setIndex] = useState(0);
  const [input, setInput] = useState('');
  const [checked, setChecked] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  const finished = index >= order.length;
  const item = order[Math.min(index, order.length - 1)];
  const ruleName = SOUND_CHANGE_RULES.find((r) => r.id === item.ruleId)?.name ?? '';
  const correct = normalizeSentence(input) === normalizeSentence(item.sentence);
  const [before, focus, after] = splitByFocus(item.sentence, item.focus);

  const check = () => {
    setChecked(true);
    if (correct) setCorrectCount((n) => n + 1);
    const today = todayStr();
    bumpStudy('listening', today);
  };

  const next = () => {
    setIndex((i) => i + 1);
    setInput('');
    setChecked(false);
  };

  const restart = () => {
    setOrder(shuffle(DICTATION_ITEMS));
    setIndex(0);
    setInput('');
    setChecked(false);
    setCorrectCount(0);
  };

  return (
    <ThemedView style={screenStyles.container}>
      <SafeAreaView style={screenStyles.safeArea}>
        <ScrollView contentContainerStyle={screenStyles.scroll} showsVerticalScrollIndicator={false}>
          <BackLink label="← リスニングの一覧に戻る" fallbackHref="/listening" />

          <ThemedText type="subtitle">ディクテーション</ThemedText>

          {finished ? (
            <Card style={styles.doneCard}>
              <ThemedText type="subtitle">🎉 全問終了！</ThemedText>
              <ThemedText type="default">
                {order.length} 問中 {correctCount} 問正解
              </ThemedText>
              <ThemedText type="small" themeColor="textSecondary">
                お疲れさまでした。順番を変えてもう一度挑戦できます。
              </ThemedText>
              <AppButton label="もう一度最初から" onPress={restart} />
            </Card>
          ) : (
            <>
          <ThemedText type="small" themeColor="textSecondary">
            第 {index + 1} / {order.length} 問 ・ 音声を聞いて、聞こえた英文をそのまま入力してください。
          </ThemedText>

          <View style={styles.playRow}>
            <AppButton
              label="🔊 再生"
              onPress={() => speak(item.sentence, { accent: accentForId(item.id) })}
            />
            <AppButton
              label="🐢 ゆっくり"
              variant="ghost"
              onPress={() => speak(item.sentence, { slow: true, accent: accentForId(item.id) })}
            />
          </View>

          <ThemedView type="backgroundElement" style={styles.inputWrap}>
            <TextInput
              value={input}
              onChangeText={setInput}
              placeholder="聞こえた英文を入力..."
              placeholderTextColor={theme.textSecondary}
              autoCapitalize="none"
              autoCorrect={false}
              editable={!checked}
              multiline
              style={[styles.input, { color: theme.text }]}
            />
          </ThemedView>

          {!checked ? (
            <AppButton label="答え合わせ" onPress={check} disabled={!input.trim()} />
          ) : (
            <>
              <Card>
                <ThemedText type="smallBold">
                  {correct ? '⭕ 正解！お見事です' : '❌ 惜しい！正解はこちら'}
                </ThemedText>
                <ThemedText type="default">
                  {before}
                  <ThemedText type="default" style={[styles.focus, { color: theme.accent }]}>
                    {focus}
                  </ThemedText>
                  {after}
                </ThemedText>
                <ThemedText type="small" themeColor="textSecondary">
                  訳: {item.sentenceJa}
                </ThemedText>
                <ThemedText type="small">
                  💡 ポイント（{ruleName}）: {item.explanation}
                </ThemedText>
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
  playRow: {
    flexDirection: 'row',
    gap: Spacing.two,
  },
  inputWrap: {
    borderRadius: Spacing.two,
  },
  input: {
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two + 2,
    fontSize: 15,
    minHeight: 72,
    textAlignVertical: 'top',
  },
  focus: {
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
  doneCard: {
    alignItems: 'center',
    gap: Spacing.two,
    padding: Spacing.four,
  },
});
