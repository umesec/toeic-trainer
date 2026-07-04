import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { AppButton, Card, Chip } from '@/components/ui';
import { BottomTabInset, MaxContentWidth, Spacing, TopContentInset } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { resolveMistake, type ResolvedMistake } from '@/lib/mistakes';
import { speak } from '@/lib/speech';
import { todayStr } from '@/lib/srs';
import {
  clearMistakes,
  loadMistakes,
  loadMistakeSrs,
  recordMistake,
  removeMistake,
  reviewMistakeCard,
  type MistakeEntry,
  type MistakeSrsMap,
} from '@/lib/storage';
import { isDue } from '@/lib/srs';

interface NoteItem {
  entry: MistakeEntry;
  resolved: ResolvedMistake;
}

type ViewFilter = 'all' | 'due';

export default function MistakesScreen() {
  const router = useRouter();
  const today = todayStr();
  const [items, setItems] = useState<NoteItem[]>([]);
  const [srsMap, setSrsMap] = useState<MistakeSrsMap>({});
  const [filter, setFilter] = useState<ViewFilter>('due');
  const [openKey, setOpenKey] = useState<string | null>(null);
  const [confirmClear, setConfirmClear] = useState(false);
  const [masteredCount, setMasteredCount] = useState(0);

  useEffect(() => {
    Promise.all([loadMistakes(), loadMistakeSrs()]).then(([list, srs]) => {
      setSrsMap(srs);
      setItems(
        list
          .map((entry) => ({ entry, resolved: resolveMistake(entry) }))
          .filter((x): x is NoteItem => x.resolved !== null)
      );
    });
  }, []);

  const keyOf = (e: MistakeEntry) => `${e.kind}/${e.id}`;
  const srsKey = (e: MistakeEntry) => `${e.kind}:${e.id}`;

  const visibleItems = filter === 'due'
    ? items.filter((x) => isDue(srsMap[srsKey(x.entry)], today))
    : items;

  const dueCount = items.filter((x) => isDue(srsMap[srsKey(x.entry)], today)).length;

  const onSolved = async (item: NoteItem, correct: boolean) => {
    await reviewMistakeCard(item.entry.kind, item.entry.id, correct, today);
    setSrsMap((prev) => {
      // optimistically hide from "due" filter after review
      return { ...prev };
    });
    if (correct) {
      await removeMistake(item.entry.kind, item.entry.id);
      setItems((prev) => prev.filter((x) => keyOf(x.entry) !== keyOf(item.entry)));
      setMasteredCount((n) => n + 1);
      setOpenKey(null);
    } else {
      await recordMistake(item.entry.kind, item.entry.id, today);
      // reload srs map to get updated due date
      loadMistakeSrs().then(setSrsMap);
    }
  };

  const onClearAll = async () => {
    if (!confirmClear) {
      setConfirmClear(true);
      return;
    }
    await clearMistakes();
    setItems([]);
    setConfirmClear(false);
  };

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          <Pressable onPress={() => router.back()} style={({ pressed }) => pressed && styles.pressed}>
            <ThemedText type="linkPrimary">← 戻る</ThemedText>
          </Pressable>
          <ThemedText type="subtitle">📓 間違いノート</ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            クイズ・練習・模試で間違えた問題が自動で集まります。解き直して正解するとノートから外れます。
            {masteredCount > 0 ? `（このセッションで ${masteredCount} 問クリア！）` : ''}
          </ThemedText>

          <View style={styles.filterRow}>
            <Chip
              label={`今日の復習（${dueCount}問）`}
              selected={filter === 'due'}
              onPress={() => setFilter('due')}
            />
            <Chip
              label={`全て（${items.length}問）`}
              selected={filter === 'all'}
              onPress={() => setFilter('all')}
            />
          </View>

          {visibleItems.length === 0 ? (
            <Card style={styles.emptyCard}>
              {items.length === 0 ? (
                <>
                  <ThemedText type="smallBold">🎉 ノートは空です</ThemedText>
                  <ThemedText type="small" themeColor="textSecondary">
                    間違えた問題がここに溜まっていきます。クイズや模試に挑戦しましょう。
                  </ThemedText>
                </>
              ) : (
                <>
                  <ThemedText type="smallBold">✅ 今日の復習はありません</ThemedText>
                  <ThemedText type="small" themeColor="textSecondary">
                    SRS スケジュール上、今日の復習は完了しています。「全て」タブで全問確認できます。
                  </ThemedText>
                </>
              )}
            </Card>
          ) : (
            <>
              {visibleItems.map((item) => (
                <MistakeCard
                  key={keyOf(item.entry)}
                  item={item}
                  open={openKey === keyOf(item.entry)}
                  onToggle={() =>
                    setOpenKey(openKey === keyOf(item.entry) ? null : keyOf(item.entry))
                  }
                  onSolved={(correct) => onSolved(item, correct)}
                />
              ))}
              {filter === 'all' && (
                <AppButton
                  label={confirmClear ? '本当に全部削除する（取り消せません）' : 'ノートを全部削除'}
                  variant="ghost"
                  onPress={onClearAll}
                />
              )}
            </>
          )}
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

function MistakeCard({
  item,
  open,
  onToggle,
  onSolved,
}: {
  item: NoteItem;
  open: boolean;
  onToggle: () => void;
  onSolved: (correct: boolean) => void;
}) {
  const theme = useTheme();
  const { resolved, entry } = item;
  const [picked, setPicked] = useState<number | null>(null);

  const pick = (i: number) => {
    if (picked !== null) return;
    setPicked(i);
    onSolved(i === resolved.answer);
  };

  return (
    <Card>
      <Pressable onPress={onToggle} style={({ pressed }) => pressed && styles.pressed}>
        <View style={styles.cardHeader}>
          <ThemedText type="smallBold">{resolved.header}</ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            ✘{entry.wrongCount}　{open ? '▲' : '▼'}
          </ThemedText>
        </View>
        {!open && (
          <ThemedText type="small" themeColor="textSecondary" numberOfLines={1}>
            {resolved.prompt || '（音声問題）'}
          </ThemedText>
        )}
      </Pressable>

      {open && (
        <>
          {!!resolved.speakText && (
            <AppButton label="🔊 音声を再生" variant="ghost" onPress={() => speak(resolved.speakText!)} />
          )}
          {!!resolved.passage && (
            <ThemedView type="background" style={styles.passageBox}>
              <ThemedText type="small" style={styles.passage}>
                {resolved.passage}
              </ThemedText>
            </ThemedView>
          )}
          <ThemedText type="small">{resolved.prompt}</ThemedText>

          {resolved.choices.map((choice, i) => {
            const done = picked !== null;
            const isAnswer = i === resolved.answer;
            const isPicked = i === picked;
            return (
              <Pressable
                key={choice}
                onPress={() => pick(i)}
                style={({ pressed }) => [
                  styles.choice,
                  done && isAnswer && [styles.choiceJudged, { borderColor: theme.success }],
                  done && isPicked && !isAnswer && [styles.choiceJudged, { borderColor: theme.danger }],
                  pressed && !done && styles.pressed,
                ]}>
                <ThemedView
                  type="backgroundElement"
                  style={[
                    styles.choiceInner,
                    done && isAnswer && { backgroundColor: theme.successBg },
                    done && isPicked && !isAnswer && { backgroundColor: theme.dangerBg },
                  ]}>
                  <ThemedText type="small">
                    ({String.fromCharCode(65 + i)}) {choice}
                    {done && isAnswer ? '  ✔' : ''}
                    {done && isPicked && !isAnswer ? '  ✘' : ''}
                  </ThemedText>
                </ThemedView>
              </Pressable>
            );
          })}

          {picked !== null && (
            <>
              <ThemedText type="smallBold">
                {picked === resolved.answer ? '⭕ 正解！ノートから削除しました' : '❌ もう一度復習しましょう'}
              </ThemedText>
              {!!resolved.promptJa && (
                <ThemedText type="small" themeColor="textSecondary">
                  訳: {resolved.promptJa}
                </ThemedText>
              )}
              <ThemedText type="small" themeColor="textSecondary">
                💡 {resolved.explanation}
              </ThemedText>
              {picked !== resolved.answer && (
                <AppButton label="閉じてまた後で" variant="ghost" onPress={onToggle} />
              )}
            </>
          )}
        </>
      )}
    </Card>
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
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  filterRow: {
    flexDirection: 'row',
    gap: Spacing.two,
    flexWrap: 'wrap',
  },
  emptyCard: {
    alignItems: 'center',
    gap: Spacing.two,
    padding: Spacing.four,
  },
  passageBox: {
    borderRadius: Spacing.two,
    padding: Spacing.three,
  },
  passage: {
    lineHeight: 22,
  },
  choice: {
    borderRadius: Spacing.two,
  },
  choiceInner: {
    borderRadius: Spacing.two,
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.three,
  },
  // 正誤の色（success/danger）は render 時にテーマから適用する
  choiceJudged: {
    borderWidth: 2,
  },
  pressed: {
    opacity: 0.6,
  },
});
