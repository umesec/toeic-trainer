import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { AppButton, Card } from '@/components/ui';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import type { Part7Passage } from '@/data/types';
import { todayStr } from '@/lib/srs';
import { bumpDaily, recordMistake, recordPartAnswer, recordStudy, type MistakeKind } from '@/lib/storage';

export interface PassageQuestion {
  label: string;
  choices: [string, string, string, string];
  answer: number;
  explanation: string;
}

/**
 * Part 6/7 共通の「文書 + 設問」練習コンポーネント。
 * passages を渡すと複数文書（ダブル/トリプルパッセージ）を表示。
 * 全問回答後に訳を表示できる。
 */
export function PassagePractice({
  docType,
  passage,
  passageJa,
  passages,
  questions,
  mistakeKind,
  mistakeIds,
  partKind,
}: {
  /** シングル文書時のみ使用（Part 6 互換） */
  docType?: string;
  passage?: string;
  passageJa?: string;
  /** ダブル/トリプルパッセージ時に使用 */
  passages?: Part7Passage[];
  questions: PassageQuestion[];
  /** 誤答を間違いノートに記録する場合に指定 */
  mistakeKind?: MistakeKind;
  /** questions と同じ並びの問題ID */
  mistakeIds?: string[];
  /** Part別正答率記録用（'part6' | 'part7'） */
  partKind?: string;
}) {
  const theme = useTheme();
  const [answers, setAnswers] = useState<(number | null)[]>(Array(questions.length).fill(null));
  const [showJa, setShowJa] = useState(false);

  // passages が渡された場合はそちらを優先
  const resolvedPassages: Part7Passage[] = passages ??
    (passage != null ? [{ docType: docType ?? '', text: passage, textJa: passageJa ?? '' }] : []);

  // 文書を開いたら「今日のクイズ学習」としてカウント
  useEffect(() => {
    const today = todayStr();
    bumpDaily(today, 'quiz');
    recordStudy(today);
  }, []);

  const allAnswered = answers.every((a) => a !== null);
  const correctCount = questions.filter((q, i) => answers[i] === q.answer).length;

  return (
    <>
      {resolvedPassages.map((p, pi) => (
        <Card key={pi}>
          <ThemedText type="small" themeColor="textSecondary">
            {resolvedPassages.length > 1 ? `文書${pi + 1}【${p.docType}】` : `【${p.docType}】`}
          </ThemedText>
          <ThemedText type="small" style={styles.passage}>
            {p.text}
          </ThemedText>
        </Card>
      ))}

      {questions.map((q, qi) => {
        const picked = answers[qi];
        const done = picked !== null;
        return (
          <Card key={q.label}>
            <ThemedText type="smallBold">{q.label}</ThemedText>
            {q.choices.map((choice, ci) => {
              const isAnswer = ci === q.answer;
              const isPicked = ci === picked;
              return (
                <Pressable
                  key={choice}
                  onPress={() => {
                    if (done) return;
                    const next = [...answers];
                    next[qi] = ci;
                    setAnswers(next);
                    const correct = ci === q.answer;
                    if (partKind) recordPartAnswer(partKind, correct);
                    if (!correct && mistakeKind && mistakeIds?.[qi]) {
                      recordMistake(mistakeKind, mistakeIds[qi], todayStr());
                    }
                  }}
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
            結果: {correctCount} / {questions.length} 問正解
          </ThemedText>
          <AppButton
            label={showJa ? '訳を隠す' : '📄 全文訳を見る'}
            variant="ghost"
            onPress={() => setShowJa((s) => !s)}
          />
          {showJa && resolvedPassages.map((p, pi) => (
            <View key={pi}>
              {resolvedPassages.length > 1 && (
                <ThemedText type="small" themeColor="textSecondary">文書{pi + 1}</ThemedText>
              )}
              <ThemedText type="small" themeColor="textSecondary" style={styles.passage}>
                {p.textJa}
              </ThemedText>
            </View>
          ))}
        </Card>
      )}
    </>
  );
}

export function SetListCard({
  title,
  subtitle,
  meta,
  onPress,
}: {
  title: string;
  subtitle: string;
  meta: string;
  onPress: () => void;
}) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => pressed && styles.pressed}>
      <Card>
        <View style={styles.cardHeader}>
          <ThemedText type="smallBold">{title}</ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            {meta}
          </ThemedText>
        </View>
        <ThemedText type="small" themeColor="textSecondary">
          {subtitle}
        </ThemedText>
      </Card>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  passage: {
    lineHeight: 22,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  // 正誤の色（success/danger）は render 時にテーマから適用する
  choiceJudged: {
    borderWidth: 2,
  },
  pressed: {
    opacity: 0.6,
  },
});
