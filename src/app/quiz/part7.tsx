import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { PassagePractice, SetListCard } from '@/components/passage-practice';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BottomTabInset, MaxContentWidth, Spacing, TopContentInset } from '@/constants/theme';
import { PART7_SETS } from '@/data/part7';
import type { Part7Set } from '@/data/types';
import { setQuestionId } from '@/lib/mistakes';

export default function Part7Screen() {
  const router = useRouter();
  const [current, setCurrent] = useState<Part7Set | null>(null);

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          <Pressable
            onPress={() => (current ? setCurrent(null) : router.back())}
            style={({ pressed }) => pressed && styles.pressed}>
            <ThemedText type="linkPrimary">{current ? '← 文書一覧に戻る' : '← クイズに戻る'}</ThemedText>
          </Pressable>
          <ThemedText type="subtitle">Part 7 長文読解</ThemedText>

          {current ? (
            <PassagePractice
              key={current.id}
              docType={current.docType}
              passage={current.passage}
              passageJa={current.passageJa}
              mistakeKind="part7"
              mistakeIds={current.questions.map((_, i) => setQuestionId(current.id, i))}
              questions={current.questions.map((q, i) => ({
                label: `Q${i + 1}. ${q.q}`,
                choices: q.choices,
                answer: q.answer,
                explanation: q.explanation,
              }))}
            />
          ) : (
            <>
              <ThemedText type="small" themeColor="textSecondary">
                メール・広告・告知・記事などの文書を読んで設問に答える本番形式です。言い換え表現とNOT問題に注意して解きましょう。
              </ThemedText>
              {PART7_SETS.map((set) => (
                <SetListCard
                  key={set.id}
                  title={`【${set.docType}】`}
                  subtitle={set.passage.split('\n')[0]}
                  meta={`設問 ${set.questions.length}`}
                  onPress={() => setCurrent(set)}
                />
              ))}
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
  pressed: {
    opacity: 0.6,
  },
});
