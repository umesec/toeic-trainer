import { useRouter } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BottomTabInset, MaxContentWidth, Spacing, TopContentInset } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { WORDS } from '@/data/words';
import { speak } from '@/lib/speech';
import { todayStr, type CardState } from '@/lib/srs';
import {
  loadCustomWords,
  loadProgress,
  saveCustomWords,
  type CustomWord,
  type ProgressMap,
} from '@/lib/storage';

interface Row {
  id: string;
  word: string;
  pos: string;
  meaning: string;
  custom: boolean;
}

type WordStatus = 'untouched' | 'mastered' | 'due' | 'learning';

function statusOf(state: CardState | undefined, today: string): { label: string; status: WordStatus } {
  if (!state) return { label: '未学習', status: 'untouched' };
  if (state.interval >= 21) return { label: '定着', status: 'mastered' };
  if (state.due <= today) return { label: '復習待ち', status: 'due' };
  return { label: '学習中', status: 'learning' };
}

export default function WordListScreen() {
  const router = useRouter();
  const theme = useTheme();
  const today = todayStr();

  // 学習ステータス → テーマカラーの対応
  const statusColors: Record<WordStatus, string> = {
    untouched: theme.textSecondary,
    mastered: theme.success,
    due: theme.warning,
    learning: theme.accent,
  };
  const [query, setQuery] = useState('');
  const [progress, setProgress] = useState<ProgressMap>({});
  const [customWords, setCustomWords] = useState<CustomWord[]>([]);

  useEffect(() => {
    Promise.all([loadProgress(), loadCustomWords()]).then(([p, cw]) => {
      setProgress(p);
      setCustomWords(cw);
    });
  }, []);

  const rows: Row[] = useMemo(() => {
    const builtin: Row[] = WORDS.map((w) => ({
      id: w.id,
      word: w.word,
      pos: w.pos,
      meaning: w.meaning,
      custom: false,
    }));
    const custom: Row[] = customWords.map((c) => ({
      id: c.id,
      word: c.word,
      pos: '自作',
      meaning: c.meaning,
      custom: true,
    }));
    const all = [...custom, ...builtin];
    const q = query.trim().toLowerCase();
    if (!q) return all;
    return all.filter(
      (r) => r.word.toLowerCase().includes(q) || r.meaning.toLowerCase().includes(q)
    );
  }, [customWords, query]);

  const masteredCount = rows.filter((r) => (progress[r.id]?.interval ?? 0) >= 21).length;

  const deleteCustom = (id: string) => {
    const updated = customWords.filter((c) => c.id !== id);
    setCustomWords(updated);
    saveCustomWords(updated);
  };

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <Pressable onPress={() => router.back()} style={({ pressed }) => pressed && styles.pressed}>
          <ThemedText type="linkPrimary">← 単語カードに戻る</ThemedText>
        </Pressable>
        <ThemedText type="subtitle">単語一覧</ThemedText>
        <ThemedText type="small" themeColor="textSecondary">
          全 {rows.length} 語 ・ 定着 {masteredCount} 語
        </ThemedText>

        <ThemedView type="backgroundElement" style={styles.searchWrap}>
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="単語・意味で検索..."
            placeholderTextColor={theme.textSecondary}
            autoCapitalize="none"
            autoCorrect={false}
            style={[styles.searchInput, { color: theme.text }]}
          />
        </ThemedView>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.listContent}>
          {rows.map((row) => {
            const status = statusOf(progress[row.id], today);
            return (
              <ThemedView key={row.id} type="backgroundElement" style={styles.row}>
                <View style={styles.rowMain}>
                  <View style={styles.wordLine}>
                    <ThemedText type="smallBold">{row.word}</ThemedText>
                    <ThemedText type="small" themeColor="textSecondary">
                      【{row.pos}】
                    </ThemedText>
                  </View>
                  <ThemedText type="small" themeColor="textSecondary" numberOfLines={1}>
                    {row.meaning}
                  </ThemedText>
                </View>
                <ThemedText type="small" style={{ color: statusColors[status.status] }}>
                  {status.label}
                </ThemedText>
                <Pressable onPress={() => speak(row.word)} style={({ pressed }) => [styles.iconButton, pressed && styles.pressed]}>
                  <ThemedText type="default">🔊</ThemedText>
                </Pressable>
                {row.custom && (
                  <Pressable
                    onPress={() => deleteCustom(row.id)}
                    style={({ pressed }) => [styles.iconButton, pressed && styles.pressed]}>
                    <ThemedText type="default">🗑</ThemedText>
                  </Pressable>
                )}
              </ThemedView>
            );
          })}
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
    paddingTop: TopContentInset,
    gap: Spacing.two,
  },
  searchWrap: {
    borderRadius: Spacing.two,
  },
  searchInput: {
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two + 2,
    fontSize: 15,
  },
  listContent: {
    gap: Spacing.one + 2,
    paddingBottom: BottomTabInset + Spacing.four,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    borderRadius: Spacing.two,
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.three,
  },
  rowMain: {
    flex: 1,
  },
  wordLine: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
  },
  iconButton: {
    padding: Spacing.one,
  },
  pressed: {
    opacity: 0.6,
  },
});
