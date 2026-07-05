import { useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Card } from '@/components/ui';
import { screenStyles } from '@/constants/screen-styles';
import { useFeatureColors } from '@/hooks/use-theme';
import { SOUND_CHANGE_RULES } from '@/data/soundChanges';

export default function ListeningIndexScreen() {
  const router = useRouter();
  const features = useFeatureColors();

  return (
    <ThemedView style={screenStyles.container}>
      <SafeAreaView style={screenStyles.safeArea}>
        <ScrollView contentContainerStyle={screenStyles.scroll} showsVerticalScrollIndicator={false}>
          <ThemedText type="subtitle">リスニング：音声変化</ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            「知っている単語なのに聞き取れない」原因の多くは、英語特有の音声変化です。各ルールを実例の音声つきで確認しましょう。
          </ThemedText>

          {SOUND_CHANGE_RULES.map((rule) => (
            <Pressable
              key={rule.id}
              onPress={() => router.push(`/listening/${rule.id}`)}
              style={({ pressed }) => pressed && styles.pressed}>
              <Card>
                <View style={styles.cardHeader}>
                  <ThemedText type="smallBold">
                    {rule.name}
                    <ThemedText type="small" themeColor="textSecondary">
                      {'  '}
                      {rule.nameEn}
                    </ThemedText>
                  </ThemedText>
                  <ThemedText type="small" themeColor="textSecondary">
                    実例 {rule.examples.length}
                  </ThemedText>
                </View>
                <ThemedText type="small">{rule.summary}</ThemedText>
              </Card>
            </Pressable>
          ))}

          <Pressable
            onPress={() => router.push('/listening/dictation')}
            style={({ pressed }) => pressed && styles.pressed}>
            <Card tint={features.listening.tint}>
              <ThemedText type="smallBold">✍️ ディクテーション練習</ThemedText>
              <ThemedText type="small">
                音声変化を含む文を聞いて書き取り、どこで音が変化したかを答え合わせで確認します。
              </ThemedText>
            </Card>
          </Pressable>

          <Pressable
            onPress={() => router.push('/listening/part1')}
            style={({ pressed }) => pressed && styles.pressed}>
            <Card tint={features.listening.tint}>
              <ThemedText type="smallBold">🖼️ Part 1 写真描写</ThemedText>
              <ThemedText type="small">
                場面（写真の代わりの絵文字+説明）に最も合う描写文を、(A)〜(D)の音声から選ぶ本番形式の練習です。
              </ThemedText>
            </Card>
          </Pressable>

          <Pressable
            onPress={() => router.push('/listening/part2')}
            style={({ pressed }) => pressed && styles.pressed}>
            <Card tint={features.listening.tint}>
              <ThemedText type="smallBold">🎙️ Part 2 応答問題</ThemedText>
              <ThemedText type="small">
                本番のPart 2形式。質問と応答(A)(B)(C)を耳だけで聞き、最も適切な応答を選ぶ練習です。
              </ThemedText>
            </Card>
          </Pressable>

          <Pressable
            onPress={() => router.push('/listening/part34')}
            style={({ pressed }) => pressed && styles.pressed}>
            <Card tint={features.listening.tint}>
              <ThemedText type="smallBold">🗣️ Part 3/4 会話・トーク</ThemedText>
              <ThemedText type="small">
                会話やアナウンスを聞いて3つの設問に答える本番形式。答え合わせでスクリプトと訳を確認できます。
              </ThemedText>
            </Card>
          </Pressable>

          <Pressable
            onPress={() => router.push('/listening/shadowing')}
            style={({ pressed }) => pressed && styles.pressed}>
            <Card tint={features.listening.tint}>
              <ThemedText type="smallBold">🎤 シャドーイング練習</ThemedText>
              <ThemedText type="small">
                Part 3/4 スクリプトを1行ずつ再生。聞いた直後に声に出して追いかけるシャドーイングで、リスニング力とスピーキング力を同時に鍛えます。スロー再生も可能。
              </ThemedText>
            </Card>
          </Pressable>
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pressed: {
    opacity: 0.7,
  },
});
