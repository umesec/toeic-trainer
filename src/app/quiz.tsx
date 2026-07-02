import { useState } from 'react';
import { ScrollView, StyleSheet, Pressable, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { AppButton, Card, Chip } from '@/components/ui';
import { BottomTabInset, MaxContentWidth, Spacing, TopContentInset } from '@/constants/theme';
import { QUIZZES } from '@/data/quizzes';
import type { QuizQuestion, QuizTag } from '@/data/types';
import { todayStr } from '@/lib/srs';
import {
  bumpDaily,
  loadQuizStats,
  loadWrongIds,
  recordStudy,
  saveQuizStats,
  saveWrongIds,
} from '@/lib/storage';
import { shuffle } from '@/lib/util';

const SESSION_SIZE = 10;
const TAGS = ['全部', '品詞', '時制', '前置詞', '語彙'] as const;
type TagFilter = (typeof TAGS)[number];

type Phase = 'setup' | 'playing' | 'result';

export default function QuizScreen() {
  const today = todayStr();
  const [phase, setPhase] = useState<Phase>('setup');
  const [tag, setTag] = useState<TagFilter>('全部');
  const [session, setSession] = useState<QuizQuestion[]>([]);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [wrongIds, setWrongIds] = useState<Set<string>>(new Set());

  const start = async () => {
    const pool = tag === '全部' ? QUIZZES : QUIZZES.filter((q) => q.tag === (tag as QuizTag));
    const wrong = new Set(await loadWrongIds());
    // 過去に間違えた問題を優先して出題する
    const prioritized = [
      ...shuffle(pool.filter((q) => wrong.has(q.id))),
      ...shuffle(pool.filter((q) => !wrong.has(q.id))),
    ].slice(0, SESSION_SIZE);
    setSession(prioritized);
    setWrongIds(wrong);
    setIndex(0);
    setScore(0);
    setSelected(null);
    setPhase('playing');
  };

  const question = session[index];

  const pick = (i: number) => {
    if (selected !== null || !question) return;
    setSelected(i);
    const correct = i === question.answer;
    if (correct) setScore((s) => s + 1);
    setWrongIds((prev) => {
      const next = new Set(prev);
      if (correct) next.delete(question.id);
      else next.add(question.id);
      return next;
    });
    bumpDaily(today, 'quiz');
    recordStudy(today);
  };

  const next = async () => {
    if (index + 1 < session.length) {
      setIndex(index + 1);
      setSelected(null);
      return;
    }
    // セッション終了: 成績と復習リストを保存
    const stats = await loadQuizStats();
    await saveQuizStats({ answered: stats.answered + session.length, correct: stats.correct + score });
    await saveWrongIds([...wrongIds]);
    setPhase('result');
  };

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          <ThemedText type="subtitle">文法・語彙クイズ</ThemedText>

          {phase === 'setup' && (
            <>
              <ThemedText type="small" themeColor="textSecondary">
                TOEIC Part 5 形式の4択問題です。分野を選んでスタート。間違えた問題は次回優先的に出題されます。
              </ThemedText>
              <View style={styles.chipRow}>
                {TAGS.map((t) => (
                  <Chip key={t} label={t} selected={tag === t} onPress={() => setTag(t)} />
                ))}
              </View>
              <AppButton label={`スタート（${SESSION_SIZE}問）`} onPress={start} />
            </>
          )}

          {phase === 'playing' && question && (
            <>
              <ThemedText type="small" themeColor="textSecondary">
                第 {index + 1} 問 / {session.length}　［{question.tag}］
              </ThemedText>
              <Card>
                <ThemedText type="default">{question.sentence}</ThemedText>
              </Card>

              <View style={styles.choices}>
                {question.choices.map((choice, i) => {
                  const isAnswer = i === question.answer;
                  const isPicked = i === selected;
                  const answered = selected !== null;
                  return (
                    <Pressable
                      key={choice}
                      onPress={() => pick(i)}
                      style={({ pressed }) => [
                        styles.choice,
                        answered && isAnswer && styles.choiceCorrect,
                        answered && isPicked && !isAnswer && styles.choiceWrong,
                        pressed && !answered && styles.pressed,
                      ]}>
                      <ThemedView
                        type={answered && (isAnswer || isPicked) ? 'background' : 'backgroundElement'}
                        style={styles.choiceInner}>
                        <ThemedText type="default">
                          ({String.fromCharCode(65 + i)}) {choice}
                          {answered && isAnswer ? '  ✔' : ''}
                          {answered && isPicked && !isAnswer ? '  ✘' : ''}
                        </ThemedText>
                      </ThemedView>
                    </Pressable>
                  );
                })}
              </View>

              {selected !== null && (
                <>
                  <Card>
                    <ThemedText type="smallBold">
                      {selected === question.answer ? '⭕ 正解！' : '❌ 不正解…'}
                    </ThemedText>
                    <ThemedText type="small">{question.explanation}</ThemedText>
                    <ThemedText type="small" themeColor="textSecondary">
                      訳: {question.sentenceJa}
                    </ThemedText>
                  </Card>
                  <AppButton
                    label={index + 1 < session.length ? '次の問題へ' : '結果を見る'}
                    onPress={next}
                  />
                </>
              )}
            </>
          )}

          {phase === 'result' && (
            <Card style={styles.resultCard}>
              <ThemedText type="subtitle">
                {score} / {session.length} 問正解
              </ThemedText>
              <ThemedText type="default">
                正答率 {Math.round((score / Math.max(1, session.length)) * 100)}%
              </ThemedText>
              <ThemedText type="small" themeColor="textSecondary">
                間違えた問題は復習リストに入り、次回のセッションで優先的に出題されます。
              </ThemedText>
              <View style={styles.resultButtons}>
                <AppButton label="もう一度" onPress={start} />
                <AppButton label="分野を選び直す" variant="ghost" onPress={() => setPhase('setup')} />
              </View>
            </Card>
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
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
  },
  choices: {
    gap: Spacing.two,
  },
  choice: {
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
  pressed: {
    opacity: 0.6,
  },
  resultCard: {
    alignItems: 'center',
    gap: Spacing.three,
    padding: Spacing.four,
  },
  resultButtons: {
    flexDirection: 'row',
    gap: Spacing.two,
  },
});
