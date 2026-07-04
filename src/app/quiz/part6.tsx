import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { PassagePractice, SetListCard } from '@/components/passage-practice';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BottomTabInset, MaxContentWidth, Spacing, TopContentInset } from '@/constants/theme';
import { PART6_SETS } from '@/data/part6';
import type { Part6Set } from '@/data/types';
import { setQuestionId } from '@/lib/mistakes';

export default function Part6Screen() {
  const router = useRouter();
  const [current, setCurrent] = useState<Part6Set | null>(null);

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          <Pressable
            onPress={() => (current ? setCurrent(null) : router.back())}
            style={({ pressed }) => pressed && styles.pressed}>
            <ThemedText type="linkPrimary">{current ? '← 文書一覧に戻る' : '← クイズに戻る'}</ThemedText>
          </Pressable>
          <ThemedText type="subtitle">Part 6 長文穴埋め</ThemedText>

          {current ? (
            <PassagePractice
              key={current.id}
              docType={current.docType}
              passage={current.passage}
              passageJa={current.passageJa}
              mistakeKind="part6"
              mistakeIds={current.blanks.map((_, i) => setQuestionId(current.id, i))}
              partKind="part6"
              questions={current.blanks.map((b) => ({
                label: `空所 [${b.no}]`,
                choices: b.choices,
                answer: b.answer,
                explanation: b.explanation,
              }))}
            />
          ) : (
            <>
              <ThemedText type="small" themeColor="textSecondary">
                文書中の空所 [1]〜[4] に入る語句・文を選ぶ本番形式です。文法だけでなく、前後の文脈から判断する問題が含まれます。
              </ThemedText>
              {PART6_SETS.map((set) => (
                <SetListCard
                  key={set.id}
                  title={`【${set.docType}】`}
                  subtitle={set.passage.split('\n')[0]}
                  meta={`空所 ${set.blanks.length}`}
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
