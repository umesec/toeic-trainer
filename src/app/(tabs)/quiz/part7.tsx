import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { PassagePractice, SetListCard } from '@/components/passage-practice';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Chip } from '@/components/ui';
import { BottomTabInset, MaxContentWidth, Spacing, TopContentInset } from '@/constants/theme';
import { PART7_SETS } from '@/data/part7';
import type { Part7Set } from '@/data/types';
import { setQuestionId } from '@/lib/mistakes';

type PassageFilter = 'all' | 'single' | 'double' | 'triple';

const FILTERS: { key: PassageFilter; label: string }[] = [
  { key: 'all', label: '全て' },
  { key: 'single', label: 'シングル' },
  { key: 'double', label: 'ダブル' },
  { key: 'triple', label: 'トリプル' },
];

function passageCount(set: Part7Set): 1 | 2 | 3 {
  const n = set.passages.length;
  return n >= 3 ? 3 : n === 2 ? 2 : 1;
}

export default function Part7Screen() {
  const router = useRouter();
  const [current, setCurrent] = useState<Part7Set | null>(null);
  const [filter, setFilter] = useState<PassageFilter>('all');

  const filtered = PART7_SETS.filter((s) => {
    if (filter === 'all') return true;
    const n = passageCount(s);
    if (filter === 'single') return n === 1;
    if (filter === 'double') return n === 2;
    return n === 3;
  });

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
              passages={current.passages}
              mistakeKind="part7"
              mistakeIds={current.questions.map((_, i) => setQuestionId(current.id, i))}
              partKind="part7"
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
                メール・広告・告知・記事などの文書を読んで設問に答える本番形式です。言い換え表現とNOT問題に注意して解きましょう。ダブル/トリプルパッセージでは2〜3つの文書を照らし合わせるクロスリファレンス問題が出ます。
              </ThemedText>
              <View style={styles.filterRow}>
                {FILTERS.map((f) => (
                  <Chip
                    key={f.key}
                    label={f.label}
                    selected={filter === f.key}
                    onPress={() => setFilter(f.key)}
                  />
                ))}
              </View>
              {filtered.map((set) => {
                const n = passageCount(set);
                const typeLabel = n === 1 ? 'シングル' : n === 2 ? 'ダブル' : 'トリプル';
                const docTypes = set.passages.map((p) => p.docType).join(' + ');
                return (
                  <SetListCard
                    key={set.id}
                    title={`【${docTypes}】`}
                    subtitle={set.passages[0].text.split('\n')[0]}
                    meta={`${typeLabel} ・ Q${set.questions.length}`}
                    onPress={() => setCurrent(set)}
                  />
                );
              })}
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
  filterRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
  },
  pressed: {
    opacity: 0.6,
  },
});
