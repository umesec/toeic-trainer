import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { AppButton, Card } from '@/components/ui';
import { BottomTabInset, MaxContentWidth, Spacing, TopContentInset } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { LISTENING_SETS } from '@/data/part34';
import type { ListeningSet } from '@/data/types';
import { setQuestionId } from '@/lib/mistakes';
import { pitchForSpeaker, speakLines, stopSpeech } from '@/lib/speech';
import { todayStr } from '@/lib/srs';
import { bumpDaily, recordMistake, recordStudy } from '@/lib/storage';

export default function Part34Screen() {
  const router = useRouter();
  const [current, setCurrent] = useState<ListeningSet | null>(null);

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          {current ? (
            <SetPlayer
              set={current}
              onBack={() => {
                stopSpeech();
                setCurrent(null);
              }}
            />
          ) : (
            <>
              <Pressable onPress={() => router.back()} style={({ pressed }) => pressed && styles.pressed}>
                <ThemedText type="linkPrimary">← 音声変化の一覧に戻る</ThemedText>
              </Pressable>
              <ThemedText type="subtitle">Part 3/4 会話・トーク</ThemedText>
              <ThemedText type="small" themeColor="textSecondary">
                会話（Part 3）やアナウンス・トーク（Part 4）を聞いて、3つの設問に答える本番形式の練習です。まず音声だけで解き、答え合わせでスクリプトと訳を確認しましょう。
              </ThemedText>
              {LISTENING_SETS.map((set) => (
                <Pressable
                  key={set.id}
                  onPress={() => setCurrent(set)}
                  style={({ pressed }) => pressed && styles.pressed}>
                  <Card>
                    <View style={styles.cardHeader}>
                      <ThemedText type="smallBold">
                        Part {set.part}　{set.title}
                      </ThemedText>
                      <ThemedText type="small" themeColor="textSecondary">
                        設問 {set.questions.length}
                      </ThemedText>
                    </View>
                    <ThemedText type="small" themeColor="textSecondary">
                      {set.part === 3 ? '2人の会話' : '1人のトーク・アナウンス'}
                    </ThemedText>
                  </Card>
                </Pressable>
              ))}
            </>
          )}
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

function SetPlayer({ set, onBack }: { set: ListeningSet; onBack: () => void }) {
  const theme = useTheme();
  const [answers, setAnswers] = useState<(number | null)[]>(Array(set.questions.length).fill(null));
  const [showScript, setShowScript] = useState(false);

  // セットを開いたら「今日のリスニング学習」としてカウント
  useEffect(() => {
    const today = todayStr();
    bumpDaily(today, 'listening');
    recordStudy(today);
  }, []);

  const play = (slow = false) => {
    speakLines(
      set.script.map((line) => ({ text: line.text, pitch: pitchForSpeaker(line.speaker) })),
      { slow }
    );
  };

  const allAnswered = answers.every((a) => a !== null);
  const correctCount = set.questions.filter((q, i) => answers[i] === q.answer).length;

  return (
    <>
      <Pressable onPress={onBack} style={({ pressed }) => pressed && styles.pressed}>
        <ThemedText type="linkPrimary">← セット一覧に戻る</ThemedText>
      </Pressable>
      <ThemedText type="subtitle">
        Part {set.part}　{set.title}
      </ThemedText>

      <View style={styles.playRow}>
        <AppButton label="🔊 音声を再生" onPress={() => play(false)} />
        <AppButton label="🐢 ゆっくり" variant="ghost" onPress={() => play(true)} />
      </View>

      {set.chart && <ChartView chart={set.chart} />}

      {set.questions.map((q, qi) => {
        const picked = answers[qi];
        const done = picked !== null;
        return (
          <Card key={q.q}>
            <ThemedText type="smallBold">
              Q{qi + 1}. {q.q}
            </ThemedText>
            {q.choices.map((choice, ci) => {
              const isAnswer = ci === q.answer;
              const isPicked = ci === picked;
              const showCorrect = done && isAnswer;
              const showWrong = done && isPicked && !isAnswer;
              return (
                <Pressable
                  key={choice}
                  onPress={() => {
                    if (done) return;
                    const next = [...answers];
                    next[qi] = ci;
                    setAnswers(next);
                    if (ci !== q.answer) {
                      recordMistake('part34', setQuestionId(set.id, qi), todayStr());
                    }
                  }}
                  style={({ pressed }) => [
                    styles.choice,
                    showCorrect && [styles.choiceMark, { borderColor: theme.success }],
                    showWrong && [styles.choiceMark, { borderColor: theme.danger }],
                    pressed && !done && styles.pressed,
                  ]}>
                  <ThemedView
                    type="backgroundElement"
                    style={[
                      styles.choiceInner,
                      showCorrect && { backgroundColor: theme.successBg },
                      showWrong && { backgroundColor: theme.dangerBg },
                    ]}>
                    <ThemedText type="small">
                      ({String.fromCharCode(65 + ci)}) {choice}
                      {done && isAnswer ? '  ✔' : ''}
                      {done && isPicked && !isAnswer ? '  ✘' : ''}
                    </ThemedText>
                  </ThemedView>
                </Pressable>
              );
            })}
            {done && (
              <ThemedText type="small" themeColor="textSecondary">
                💡 {q.explanation}
              </ThemedText>
            )}
          </Card>
        );
      })}

      {allAnswered && (
        <Card>
          <ThemedText type="smallBold">
            結果: {correctCount} / {set.questions.length} 問正解
          </ThemedText>
          <AppButton
            label={showScript ? 'スクリプトを隠す' : '📄 スクリプトと訳を見る'}
            variant="ghost"
            onPress={() => setShowScript((s) => !s)}
          />
          {showScript && (
            <>
              {set.script.map((line, i) => (
                <ThemedText key={i} type="small">
                  {line.speaker ? `[${line.speaker}] ` : ''}
                  {line.text}
                </ThemedText>
              ))}
              <ThemedText type="small" themeColor="textSecondary">
                {set.scriptJa}
              </ThemedText>
            </>
          )}
        </Card>
      )}
    </>
  );
}

function ChartView({ chart }: { chart: NonNullable<ListeningSet['chart']> }) {
  const theme = useTheme();
  const header = chart.rows[0];
  const body = chart.rows.slice(1);
  return (
    <Card>
      <ThemedText type="smallBold">📊 {chart.title}</ThemedText>
      <View style={chartStyles.table}>
        {header && (
          <View style={[chartStyles.row, { backgroundColor: theme.backgroundSelected }]}>
            {header.map((cell, i) => (
              <ThemedText key={i} type="small" style={[chartStyles.cell, chartStyles.headerCell]}>
                {cell}
              </ThemedText>
            ))}
          </View>
        )}
        {body.map((row, ri) => (
          <View key={ri} style={chartStyles.row}>
            {row.map((cell, ci) => (
              <ThemedText key={ci} type="small" style={chartStyles.cell}>
                {cell}
              </ThemedText>
            ))}
          </View>
        ))}
      </View>
    </Card>
  );
}

const chartStyles = StyleSheet.create({
  table: { gap: 1 },
  row: { flexDirection: 'row' },
  cell: {
    flex: 1,
    padding: Spacing.one + 2,
    borderWidth: 0.5,
    borderColor: 'rgba(128,128,128,0.3)',
  },
  headerCell: { fontWeight: '700' },
});

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
  playRow: {
    flexDirection: 'row',
    gap: Spacing.two,
  },
  choice: {
    borderRadius: Spacing.two,
  },
  choiceInner: {
    borderRadius: Spacing.two,
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.three,
  },
  choiceMark: {
    borderWidth: 2,
  },
  pressed: {
    opacity: 0.6,
  },
});
