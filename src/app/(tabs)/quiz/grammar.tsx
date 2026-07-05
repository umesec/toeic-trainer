import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { AppButton, Card } from '@/components/ui';
import { screenStyles } from '@/constants/screen-styles';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

interface GrammarRule {
  tag: string;
  title: string;
  summary: string;
  sections: { heading: string; body: string; example?: { en: string; ja: string } }[];
  tips: string[];
}

const GRAMMAR_RULES: GrammarRule[] = [
  {
    tag: '品詞',
    title: '品詞（Part of Speech）',
    summary: '空所の前後の構造から、名詞・動詞・形容詞・副詞のどれが必要か見抜く。TOEICで最頻出のカテゴリ。',
    sections: [
      {
        heading: '名詞が入る位置',
        body: '冠詞（a/the）・所有格（his/her/its）・形容詞の直後、または前置詞の直後。',
        example: { en: 'The ___ of the project was delayed.', ja: 'プロジェクトの（完了）が遅れた。→ completion（名詞）' },
      },
      {
        heading: '形容詞が入る位置',
        body: '名詞の直前（限定用法）、またはbe動詞・appear・seem・become の後（叙述用法）。',
        example: { en: 'The results were ___. → satisfactory（形容詞）', ja: '結果は（満足のいく）ものだった。' },
      },
      {
        heading: '副詞が入る位置',
        body: '動詞・形容詞・他の副詞を修飾。文頭・文末・動詞の前後など位置が柔軟。-ly で終わる場合が多い。',
        example: { en: 'She ___  completed the task. → successfully', ja: '彼女はタスクを（成功裏に）完了した。' },
      },
      {
        heading: '動詞（動名詞・不定詞）が入る位置',
        body: 'to不定詞：動詞の目的語・主語・形容詞修飾。動名詞：前置詞の直後・動詞の目的語（enjoy/avoidなど）。',
        example: { en: 'She avoided ___ the meeting. → attending', ja: '彼女は会議に（出席すること）を避けた。' },
      },
    ],
    tips: [
      '選択肢が同じ語根で品詞違い（completion/complete/completely/completed）なら品詞問題。',
      '空所の右側が名詞なら形容詞、動詞なら副詞の可能性が高い。',
      '受動態の be + p.p. のp.p.部分が形容詞として使われることがある（interested, excited など）。',
    ],
  },
  {
    tag: '時制',
    title: '時制（Tense & Aspect）',
    summary: '時を表す副詞句（since/by/already/currently など）と文脈から正しい時制・アスペクトを選ぶ。',
    sections: [
      {
        heading: '現在完了 vs 過去形',
        body: 'since〜 / for〜（期間）/ already / yet / just → 現在完了。yesterday / last week / in 2020 → 過去形。',
        example: { en: 'The company ___ its headquarters since 2015. → has relocated', ja: '同社は2015年以来本社を（移転させてきた）。' },
      },
      {
        heading: '現在進行 vs 現在形',
        body: 'currently / now / at the moment → 進行形。habitually / always / every day → 現在形。',
        example: { en: 'We ___ a new product line. → are developing', ja: '私たちは新しい製品ラインを（開発中だ）。' },
      },
      {
        heading: '未来を表す形',
        body: 'will / be going to / be scheduled to（予定・確定）/ by the time → 未来完了（will have + p.p.）。',
        example: { en: 'By Friday, she ___ the report. → will have submitted', ja: '金曜日までに彼女はレポートを（提出し終えているだろう）。' },
      },
      {
        heading: '仮定法過去',
        body: 'If + 過去形, would/could/might + 原形。現実とは反対の仮定を表す。',
        example: { en: 'If she ___ here, she would help us. → were', ja: '彼女がここに（いれば）、助けてくれるのに。' },
      },
    ],
    tips: [
      '選択肢が同じ動詞の異なる時制なら時制問題。文中の時間副詞を真っ先に探す。',
      'by the end of this year → 未来完了（will have done）のサインが多い。',
      '受動態の時制も同様：is being + p.p.（現在進行受動）、has been + p.p.（完了受動）。',
    ],
  },
  {
    tag: '前置詞',
    title: '前置詞（Prepositions）',
    summary: '時間・場所・方向・原因などの意味関係を正確に覚える。熟語的な前置詞表現も頻出。',
    sections: [
      {
        heading: '時間の前置詞',
        body: 'at（時刻）/ on（日・曜日）/ in（月・年・季節）/ by（〜までに、期限）/ until（〜まで継続）/ within（〜以内に）/ during（〜の間中）/ for（期間の長さ）',
        example: { en: 'Please submit the form ___ Friday. → by', ja: '金曜日（までに）フォームを提出してください。' },
      },
      {
        heading: '場所・方向の前置詞',
        body: 'at（地点）/ in（空間の内部）/ on（接触）/ along（〜に沿って）/ through（〜を通り抜けて）/ toward（〜に向かって）',
        example: { en: 'The office is located ___ the third floor. → on', ja: 'オフィスは3階（に）ある。' },
      },
      {
        heading: '熟語的な前置詞',
        body: 'in charge of（〜の担当）/ in accordance with（〜に従って）/ on behalf of（〜を代表して）/ with regard to（〜に関して）/ prior to（〜の前に）/ due to（〜が原因で）',
        example: { en: '___ the inclement weather, the event was postponed. → Due to', ja: '（悪天候のせいで）イベントは延期された。' },
      },
    ],
    tips: [
      '前置詞問題は意味で判断。by（期限）vs until（継続）の区別が頻出。',
      '"despite / in spite of + 名詞/動名詞" vs "although/even though + 節" の区別。',
      'due to / because of / owing to はすべて理由を表す前置詞（句）で交換可能な場合が多い。',
    ],
  },
  {
    tag: '語彙',
    title: '語彙（Vocabulary）',
    summary: '文意から最も適切な語を選ぶ。品詞は一致しているが意味が異なる選択肢から選ぶ形式。',
    sections: [
      {
        heading: 'コロケーション（語の共起）',
        body: '特定の動詞・形容詞・名詞は一緒によく使われる組み合わせがある。まとまりで覚える。',
        example: { en: 'The company aims to ___ customer satisfaction. → enhance', ja: '会社は顧客満足度を（高める）ことを目指している。' },
      },
      {
        heading: '類義語の使い分け',
        body: 'similar / alike / identical / comparable / equivalent などニュアンスの違いに注意。文脈で判断する。',
        example: { en: 'The two products are ___. → comparable（同等の）', ja: '両製品は（比較できるほど）近い性能を持つ。' },
      },
      {
        heading: 'ビジネス頻出語',
        body: 'allocate（割り当てる）/ implement（実施する）/ assess（評価する）/ streamline（効率化する）/ negotiate（交渉する）/ comply with（〜を遵守する）',
        example: { en: 'All employees must ___ the new guidelines. → comply with', ja: '全従業員は新しいガイドラインを（遵守しなければならない）。' },
      },
    ],
    tips: [
      '文意を把握してから選択肢を見る。最初の1〜2語で飛びつかない。',
      '語彙問題は熟語・慣用表現が多い。provide A with B / supply A to B など動詞の語法も確認。',
      '品詞問題と見せかけた語彙問題あり：同じ品詞の選択肢が複数ある場合は語彙問題。',
    ],
  },
  {
    tag: '関係詞',
    title: '関係詞（Relative Pronouns & Adverbs）',
    summary: '先行詞の種類と関係詞節内での役割（主語・目的語・副詞）を見極めて選ぶ。',
    sections: [
      {
        heading: 'who / whom / whose（人）',
        body: 'who: 関係詞節の主語。whom: 関係詞節の目的語（目的格）。whose: 所有格（〜の）。',
        example: { en: 'The manager ___ was promoted joined in 2020. → who', ja: '昇進した部長は2020年に入社した。（who = 主語）' },
      },
      {
        heading: 'which / that（物・事）',
        body: 'which: 物・事が先行詞。that: 人・物どちらも可。先行詞にall/every/only/最上級があればthat優先。',
        example: { en: 'The report ___ she submitted was excellent. → that / which', ja: '彼女が提出したレポートは素晴らしかった。' },
      },
      {
        heading: '関係副詞 where / when / why / how',
        body: 'where: 場所の先行詞。when: 時の先行詞。why: reason が先行詞。how: 方法（先行詞なし）。',
        example: { en: 'This is the building ___ the meeting will be held. → where', ja: 'これが会議が開かれる建物です。' },
      },
      {
        heading: '複合関係詞 whoever / whatever / wherever',
        body: '先行詞を含む関係詞。「〜する人は誰でも/何でも/どこでも」という意味。',
        example: { en: '___ finishes first wins. → Whoever', ja: '最初に終わった人が誰であれ勝つ。' },
      },
    ],
    tips: [
      '空所の直後が動詞なら主格（who/which/that）、名詞なら所有格（whose）、完全な文なら副詞節（where/when）。',
      'カンマ+関係詞 → 非制限用法（that は使えない）。',
      '前置詞+関係詞の形：in which / for whom など。which/whom のみ使用可（that 不可）。',
    ],
  },
  {
    tag: '接続詞',
    title: '接続詞（Conjunctions）',
    summary: '等位接続詞・従属接続詞・接続副詞の違いを理解し、意味と文の構造から選ぶ。',
    sections: [
      {
        heading: '等位接続詞（FANBOYS）',
        body: 'for / and / nor / but / or / yet / so。同じ品詞・句・節を並列につなぐ。',
        example: { en: 'She was tired, ___ she kept working. → yet / but', ja: '彼女は疲れていた（が）、働き続けた。' },
      },
      {
        heading: '従属接続詞（副詞節）',
        body: 'although / even though（逆接）/ because / since / as（理由）/ if / unless（条件）/ while / whereas（対比）/ once / as soon as（時）',
        example: { en: '___ the price increased, demand remained high. → Although', ja: '価格が上がったにもかかわらず、需要は高いままだった。' },
      },
      {
        heading: '接続詞 vs 前置詞',
        body: 'although（接続詞＋節）vs despite（前置詞＋名詞）/ because（接続詞）vs due to（前置詞）/ while（接続詞）vs during（前置詞）',
        example: { en: '___ the rain, the event continued. → Despite', ja: '（雨にもかかわらず）イベントは続いた。（前置詞+名詞）' },
      },
      {
        heading: '相関接続詞',
        body: 'both A and B / either A or B / neither A nor B / not only A but also B / not A but B',
        example: { en: 'Not only did she win, ___ she broke the record. → but also', ja: '彼女は勝っただけでなく、記録も破った。' },
      },
    ],
    tips: [
      '空所の後が"主語+動詞"の節なら接続詞、名詞・動名詞なら前置詞。',
      'however/therefore/moreover は接続副詞で、カンマや; と組み合わせる（単独で2文をつなげない）。',
      'TOEIC では although と despite の区別が超頻出。直後が節か名詞かで判断。',
    ],
  },
];

export default function GrammarScreen() {
  const router = useRouter();
  const { tag: initialTag } = useLocalSearchParams<{ tag?: string }>();
  const theme = useTheme();
  const [selected, setSelected] = useState<string | null>(initialTag ?? null);

  const rule = GRAMMAR_RULES.find((r) => r.tag === selected);

  return (
    <ThemedView style={screenStyles.container}>
      <SafeAreaView style={screenStyles.safeArea}>
        <ScrollView contentContainerStyle={screenStyles.scroll} showsVerticalScrollIndicator={false}>
          <Pressable onPress={() => (selected ? setSelected(null) : router.back())} style={({ pressed }) => pressed && screenStyles.pressed}>
            <ThemedText type="linkPrimary">← {selected ? 'カテゴリ一覧に戻る' : '戻る'}</ThemedText>
          </Pressable>
          <ThemedText type="subtitle">文法ルール解説</ThemedText>

          {!selected && (
            <>
              <ThemedText type="small" themeColor="textSecondary">
                カテゴリを選ぶと解説・例文・攻略ポイントが表示されます。
              </ThemedText>
              {GRAMMAR_RULES.map((r) => (
                <Pressable key={r.tag} onPress={() => setSelected(r.tag)} style={({ pressed }) => pressed && screenStyles.pressed}>
                  <Card style={styles.categoryCard}>
                    <View style={{ flex: 1, gap: Spacing.half }}>
                      <ThemedText type="smallBold">{r.title}</ThemedText>
                      <ThemedText type="small" themeColor="textSecondary" numberOfLines={2}>{r.summary}</ThemedText>
                    </View>
                    <ThemedText type="smallBold" themeColor="accent">▶</ThemedText>
                  </Card>
                </Pressable>
              ))}
            </>
          )}

          {selected && rule && (
            <>
              <Card style={{ borderLeftWidth: 4, borderLeftColor: theme.accent }}>
                <ThemedText type="smallBold">{rule.title}</ThemedText>
                <ThemedText type="small" themeColor="textSecondary">{rule.summary}</ThemedText>
              </Card>

              {rule.sections.map((sec) => (
                <Card key={sec.heading}>
                  <ThemedText type="smallBold">📌 {sec.heading}</ThemedText>
                  <ThemedText type="small">{sec.body}</ThemedText>
                  {sec.example && (
                    <ThemedView type="backgroundSelected" style={styles.exampleBox}>
                      <ThemedText type="small" style={{ fontStyle: 'italic' }}>{sec.example.en}</ThemedText>
                      <ThemedText type="small" themeColor="textSecondary">{sec.example.ja}</ThemedText>
                    </ThemedView>
                  )}
                </Card>
              ))}

              <Card>
                <ThemedText type="smallBold">💡 攻略ポイント</ThemedText>
                {rule.tips.map((tip, i) => (
                  <ThemedText key={i} type="small">・{tip}</ThemedText>
                ))}
              </Card>

              <AppButton
                label={`「${rule.tag}」を集中練習する`}
                onPress={() => router.push({ pathname: '/quiz', params: { startTag: rule.tag } } as never)}
              />
            </>
          )}
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  categoryCard: { flexDirection: 'row', alignItems: 'center', gap: Spacing.two },
  exampleBox: { borderRadius: Spacing.two, padding: Spacing.two + 2, gap: Spacing.one, marginTop: Spacing.one },
});
