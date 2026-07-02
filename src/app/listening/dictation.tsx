import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { AppButton, Card } from '@/components/ui';
import { BottomTabInset, MaxContentWidth, Spacing, TopContentInset } from '@/constants/theme';
import { DICTATION_ITEMS, SOUND_CHANGE_RULES } from '@/data/soundChanges';
import { speak } from '@/lib/speech';
import { todayStr } from '@/lib/srs';
import { bumpDaily, recordStudy } from '@/lib/storage';
import { normalizeSentence, shuffle, splitByFocus } from '@/lib/util';

export default function DictationScreen() {
  const router = useRouter();
  const [order] = useState(() => shuffle(DICTATION_ITEMS));
  const [index, setIndex] = useState(0);
  const [input, setInput] = useState('');
  const [checked, setChecked] = useState(false);

  const item = order[index % order.length];
  const ruleName = SOUND_CHANGE_RULES.find((r) => r.id === item.ruleId)?.name ?? '';
  const correct = normalizeSentence(input) === normalizeSentence(item.sentence);
  const [before, focus, after] = splitByFocus(item.sentence, item.focus);

  const check = () => {
    setChecked(true);
    const today = todayStr();
    bumpDaily(today, 'listening');
    recordStudy(today);
  };

  const next = () => {
    setIndex((i) => i + 1);
    setInput('');
    setChecked(false);
  };

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          <Pressable onPress={() => router.back()} style={({ pressed }) => pressed && styles.pressed}>
            <ThemedText type="linkPrimary">← 音声変化の一覧に戻る</ThemedText>
          </Pressable>

          <ThemedText type="subtitle">ディクテーション</ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            第 {(index % order.length) + 1} 問 ・ 音声を聞いて、聞こえた英文をそのまま入力してください。
          </ThemedText>

          <View style={styles.playRow}>
            <AppButton label="🔊 再生" onPress={() => speak(item.sentence)} />
            <AppButton label="🐢 ゆっくり" variant="ghost" onPress={() => speak(item.sentence, { slow: true })} />
          </View>

          <ThemedView type="backgroundElement" style={styles.inputWrap}>
            <TextInput
              value={input}
              onChangeText={setInput}
              placeholder="聞こえた英文を入力..."
              placeholderTextColor="#8b93a5"
              autoCapitalize="none"
              autoCorrect={false}
              editable={!checked}
              multiline
              style={styles.input}
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
                  <ThemedText type="default" style={styles.focus}>
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
  inputWrap: {
    borderRadius: Spacing.two,
  },
  input: {
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two + 2,
    fontSize: 15,
    minHeight: 72,
    textAlignVertical: 'top',
    color: '#888f9c',
  },
  focus: {
    color: '#3c87f7',
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
  pressed: {
    opacity: 0.6,
  },
});
