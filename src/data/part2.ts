import type { Part2Item } from '@/data/types';

const p = (
  id: string,
  question: string,
  questionJa: string,
  choices: [string, string, string],
  answer: number,
  explanation: string
): Part2Item => ({ id, question, questionJa, choices, answer, explanation });

/**
 * TOEIC Part 2 形式の応答問題。
 * 質問と応答をTTSで再生し、最も適切な応答を選ぶ。
 */
export const PART2_ITEMS: Part2Item[] = [
  p('p201', 'Where is the marketing meeting being held?', 'マーケティング会議はどこで開かれますか？',
    ['In Conference Room B.', 'At three o\'clock.', 'Yes, I met him yesterday.'], 0,
    'Where（場所）を聞かれたら場所で答える。(B)は時間、(C)はYes/No応答で、疑問詞疑問文にYes/Noは使えない。'),
  p('p202', 'When does the new store open?', '新しい店舗はいつオープンしますか？',
    ['On Fifth Avenue.', 'Sometime next month.', 'It opens the door automatically.'], 1,
    'When（時）には時で答える。(A)は場所の答え。(C)はopenの音を使った引っかけ。'),
  p('p203', 'Who is in charge of the budget report?', '予算報告書の担当は誰ですか？',
    ['By next Friday.', 'It was over budget.', 'Ms. Sato in Accounting.'], 2,
    'Who（人）には人で答える。(A)は期限、(B)はbudgetを繰り返す音の引っかけ。'),
  p('p204', 'Why was the flight delayed?', 'なぜフライトは遅れたのですか？',
    ['Because of the heavy fog.', 'At Gate 22.', 'For about two hours.'], 0,
    'Why（理由）にはBecause等の理由で答える。(C)は「どのくらい遅れたか」への答えで理由ではない。'),
  p('p205', 'How do I get to the convention center?', 'コンベンションセンターへはどう行けばいいですか？',
    ['It was very convenient.', 'Take the subway to Central Station.', 'About twenty dollars.'], 1,
    'How（手段・方法）には手段で答える。(A)はconvenientの音の引っかけ、(C)はHow muchへの答え。'),
  p('p206', 'Would you like coffee or tea?', 'コーヒーと紅茶、どちらになさいますか？',
    ['Yes, please.', 'Tea would be great, thanks.', 'In the break room.'], 1,
    'A or B の選択疑問文にはどちらかを選んで答える。Yes/No(A)では答えられないのがTOEIC頻出ポイント。'),
  p('p207', 'Could you send me the sales figures by noon?', '正午までに売上データを送っていただけますか？',
    ['Sure, I\'ll do it right away.', 'He\'s a good salesperson.', 'No, I didn\'t see the news.'], 0,
    'Could you〜？（依頼）には引き受ける/断る応答が自然。(B)はsalesの音の引っかけ。'),
  p('p208', 'The printer on the third floor is out of order again.', '3階のプリンターがまた故障しています。',
    ['Three copies, please.', 'I\'ll call the repair service.', 'Yes, the order arrived.'], 1,
    '平叙文（報告）には対応・コメントで応じる。(C)はorderを繰り返す音の引っかけ。'),
  p('p209', 'You\'ve met the new director, haven\'t you?', '新しい部長にはもう会いましたよね？',
    ['Yes, at the orientation last week.', 'Turn left at the corner.', 'It\'s a new building.'], 0,
    '付加疑問文は普通のYes/No疑問文と同じように答えればよい。(B)(C)はdirectionを連想させる引っかけ。'),
  p('p210', 'How long will the renovation take?', '改装にはどのくらいかかりますか？',
    ['About three weeks.', 'Twice a year.', 'It\'s ten meters long.'], 0,
    'How long（期間）には期間で答える。(B)は頻度(How often)、(C)は長さの引っかけ。'),
  p('p211', 'Didn\'t you attend the workshop yesterday?', '昨日のワークショップに参加しなかったのですか？',
    ['It works very well.', 'No, I had a client meeting.', 'At the community center.'], 1,
    '否定疑問文でも答え方は同じ。参加しなかったならNo。(A)はworkの音の引っかけ。'),
  p('p212', 'Should I email the agenda or print it out?', '議題はメールで送るべきですか、印刷すべきですか？',
    ['Yes, you should.', 'An email would be fine.', 'On the agenda.'], 1,
    '選択疑問文なのでどちらかを選ぶ。(A)のYesでは答えられない。'),
  p('p213', 'Whose laptop is this on the table?', 'テーブルの上のノートPCは誰のですか？',
    ['It\'s the latest model.', 'I think it\'s Maria\'s.', 'On the table.'], 1,
    'Whose（誰のもの）には所有者で答える。(C)は質問文の語句を繰り返す引っかけ。'),
  p('p214', 'Why don\'t we take a break before the next session?', '次のセッションの前に休憩しませんか？',
    ['Good idea. I could use some coffee.', 'Because I was tired.', 'It didn\'t break.'], 0,
    'Why don\'t we〜？は理由を聞いているのではなく提案。同意/断りで応じる。(B)は理由で答える引っかけ。'),
  p('p215', 'Has the shipment from the supplier arrived yet?', '仕入先からの荷物はもう届きましたか？',
    ['Yes, it came in this morning.', 'To the warehouse.', 'Every Tuesday.'], 0,
    '現在完了のYes/No疑問文。届いたかどうかを答える。(B)は場所、(C)は頻度の引っかけ。'),
];
