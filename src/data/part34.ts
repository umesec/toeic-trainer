import type { ListeningSet } from '@/data/types';

import { PART3_EXTRA } from './part3x.ts';
import { PART4_EXTRA } from './part4x.ts';
import { PART34_GRAPH } from './part34g.ts';

/**
 * TOEIC Part 3（会話）/ Part 4（トーク）形式のリスニングセット。
 * script はTTSで話者ごとに読み上げる（会話は pitch を変えて聞き分けやすくする）。
 */
const BASE_SETS: ListeningSet[] = [
  {
    id: 'ls301',
    part: 3,
    title: '会議室の予約',
    script: [
      { speaker: 'W', text: 'Hi Mark, did you book the conference room for the client presentation on Thursday?' },
      { speaker: 'M', text: 'I tried, but the large room is already taken all afternoon. We could use Room 5, but it only holds eight people.' },
      { speaker: 'W', text: "That's too small. Ten people are coming. Why don't we ask the sales team to switch their meeting to the morning?" },
      { speaker: 'M', text: "Good idea. I'll email their manager right now and let you know what she says." },
    ],
    scriptJa:
      '女性: マーク、木曜の顧客向けプレゼンのために会議室を予約してくれた？\n男性: やってみたけど、大会議室は午後ずっと埋まっていて。第5会議室なら使えるけど8人しか入らないんだ。\n女性: それじゃ狭すぎるわ。10人来るのよ。営業チームに会議を午前に変えてもらうよう頼んだら？\n男性: いい考えだね。今すぐマネージャーにメールして、返事が来たら知らせるよ。',
    questions: [
      {
        q: 'What are the speakers mainly discussing?',
        choices: ['A client complaint', 'Reserving a meeting room', 'A sales report', 'Hiring new staff'],
        answer: 1,
        explanation: '冒頭の「did you book the conference room」から会議室の予約の話。book = reserve の言い換えに注意。',
      },
      {
        q: 'What problem does the man mention?',
        choices: [
          'The large room is unavailable.',
          'The presentation was canceled.',
          'The client is arriving late.',
          'The projector is broken.',
        ],
        answer: 0,
        explanation: '男性は「the large room is already taken all afternoon（大会議室は午後埋まっている）」と述べている。taken = unavailable の言い換え。',
      },
      {
        q: 'What will the man most likely do next?',
        choices: ['Cancel the meeting', 'Call the client', 'Send an email', 'Reserve Room 5'],
        answer: 2,
        explanation: "最後に「I'll email their manager right now」と言っている。next にすることを問う設問は会話の最後にヒントがある。",
      },
    ],
  },
  {
    id: 'ls302',
    part: 3,
    title: '注文商品の在庫切れ',
    script: [
      { speaker: 'M', text: "Thank you for calling Brighton Office Supplies. How can I help you?" },
      { speaker: 'W', text: 'Hello, I ordered twenty desk lamps last week, order number 4-5-2-9, but I received an email saying the item is out of stock.' },
      { speaker: 'M', text: "I'm sorry about that. We expect a new shipment on Friday. We can send them out the same day with express delivery at no extra charge." },
      { speaker: 'W', text: "That would be great. As long as they arrive before our office opening on Monday, there's no problem." },
    ],
    scriptJa:
      '男性: ブライトン事務用品にお電話ありがとうございます。ご用件を承ります。\n女性: 先週デスクランプを20台注文したのですが（注文番号4529）、在庫切れというメールが届きました。\n男性: 申し訳ございません。金曜日に新しい入荷がある予定です。追加料金なしの速達で当日発送いたします。\n女性: それは助かります。月曜のオフィス開所前に届くなら問題ありません。',
    questions: [
      {
        q: 'Why is the woman calling?',
        choices: [
          'To place a new order',
          'To ask about an out-of-stock item',
          'To cancel her order',
          'To request a refund',
        ],
        answer: 1,
        explanation: '女性は注文品が「out of stock（在庫切れ）」というメールを受け取ったため電話している。',
      },
      {
        q: 'What does the man offer to do?',
        choices: [
          'Provide free express shipping',
          'Give a discount on the next order',
          'Send a different model',
          'Extend the warranty',
        ],
        answer: 0,
        explanation: '「express delivery at no extra charge（追加料金なしの速達）」と申し出ている。no extra charge = free の言い換え。',
      },
      {
        q: 'What will happen on Monday?',
        choices: ['A shipment will arrive.', 'An office will open.', 'A sale will begin.', 'An invoice will be sent.'],
        answer: 1,
        explanation: '女性が「our office opening on Monday（月曜のオフィス開所）」と述べている。金曜=入荷、月曜=開所の時系列整理がポイント。',
      },
    ],
  },
  {
    id: 'ls303',
    part: 3,
    title: '研修の講師探し',
    script: [
      { speaker: 'W', text: 'Kenji, the trainer for next month\'s customer service workshop just canceled. Do you know anyone who could take over?' },
      { speaker: 'M', text: 'Actually, Lisa Chen in Human Resources used to run training sessions at her previous company. She might be interested.' },
      { speaker: 'W', text: "Perfect. Could you introduce me to her? I'd like to meet before the end of this week." },
      { speaker: 'M', text: "Sure, she sits near me. I'll set up a short meeting for tomorrow afternoon if she's free." },
    ],
    scriptJa:
      '女性: ケンジ、来月のカスタマーサービス研修の講師がキャンセルになったの。代わりにできそうな人を知らない？\n男性: 実は人事部のリサ・チェンが前の会社で研修をやっていたんだ。興味を持つかもしれないよ。\n女性: 完璧ね。彼女に紹介してくれる？今週中に会っておきたいの。\n男性: もちろん、席が近いんだ。彼女の都合が良ければ明日の午後に短い打ち合わせを設定するよ。',
    questions: [
      {
        q: 'What problem are the speakers discussing?',
        choices: [
          'A trainer canceled a workshop.',
          'A budget was cut.',
          'An employee resigned.',
          'A room is double-booked.',
        ],
        answer: 0,
        explanation: '冒頭で「the trainer ... just canceled（講師がキャンセルした）」と述べられている。',
      },
      {
        q: 'Who most likely is Lisa Chen?',
        choices: ['A customer', 'A company president', 'A human resources employee', 'An outside consultant'],
        answer: 2,
        explanation: '「Lisa Chen in Human Resources（人事部のリサ・チェン）」と紹介されている。部署名の聞き取りがカギ。',
      },
      {
        q: 'What does the man agree to do?',
        choices: ['Lead the workshop himself', 'Arrange a meeting', 'Contact another company', 'Postpone the training'],
        answer: 1,
        explanation: "「I'll set up a short meeting for tomorrow afternoon」= 打ち合わせを設定する。set up = arrange の言い換え。",
      },
    ],
  },
  {
    id: 'ls401',
    part: 4,
    title: '機内アナウンス',
    script: [
      {
        speaker: 'M',
        text: "Ladies and gentlemen, this is your captain speaking. We are now beginning our descent into Seattle. Due to strong winds, we expect some turbulence, so please return to your seats and fasten your seat belts. We will be landing about fifteen minutes behind schedule. Passengers with connecting flights should check the departure screens in the terminal for the latest gate information. Thank you for flying with Pacific Air.",
      },
    ],
    scriptJa:
      '機長アナウンス: 皆様、機長です。当機はまもなくシアトルへの降下を開始します。強風のため揺れが予想されますので、お席にお戻りになりシートベルトをお締めください。着陸は定刻より約15分遅れる見込みです。乗り継ぎのお客様はターミナルの出発案内画面で最新のゲート情報をご確認ください。パシフィック航空をご利用いただきありがとうございます。',
    questions: [
      {
        q: 'Where most likely is the speaker?',
        choices: ['At a train station', 'On an airplane', 'At a bus terminal', 'On a ferry'],
        answer: 1,
        explanation: '「this is your captain speaking」「fasten your seat belts」「landing」から機内アナウンスと判断できる。',
      },
      {
        q: 'What does the speaker say about the arrival?',
        choices: [
          'It will be earlier than planned.',
          'It will be on time.',
          'It will be delayed.',
          'It has been canceled.',
        ],
        answer: 2,
        explanation: '「landing about fifteen minutes behind schedule」= 予定より15分遅れ。behind schedule = delayed の言い換え。',
      },
      {
        q: 'What are some listeners advised to do?',
        choices: [
          'Check screens for gate information',
          'Collect their baggage early',
          'Fill out a customs form',
          'Contact the airline by phone',
        ],
        answer: 0,
        explanation: '乗り継ぎ客への案内「check the departure screens ... for the latest gate information」。',
      },
    ],
  },
  {
    id: 'ls402',
    part: 4,
    title: '留守番電話（歯科医院）',
    script: [
      {
        speaker: 'W',
        text: "Hello, this message is for Mr. Tanaka. This is Emily from Riverside Dental Clinic. I'm calling to remind you of your appointment this Thursday at 2 P.M. Please note that our clinic has moved to a new location on Maple Street, next to the central library. Free parking is available behind the building. If you need to reschedule, please call us at least twenty-four hours in advance. See you Thursday.",
      },
    ],
    scriptJa:
      '留守電: もしもし、田中様へのメッセージです。リバーサイド歯科クリニックのエミリーです。今週木曜午後2時のご予約のリマインドでお電話しました。当院はメープル通りの中央図書館の隣に移転しましたのでご注意ください。建物の裏に無料駐車場がございます。日程変更が必要な場合は、少なくとも24時間前にお電話ください。木曜にお待ちしております。',
    questions: [
      {
        q: 'What is the main purpose of the message?',
        choices: [
          'To cancel an appointment',
          'To remind a patient of an appointment',
          'To request a payment',
          'To announce new business hours',
        ],
        answer: 1,
        explanation: '「I\'m calling to remind you of your appointment」が目的。冒頭〜2文目に目的が来るのがPart 4の定石。',
      },
      {
        q: 'What has recently changed about the clinic?',
        choices: ['Its phone number', 'Its business hours', 'Its location', 'Its staff'],
        answer: 2,
        explanation: '「our clinic has moved to a new location on Maple Street」= 移転した。',
      },
      {
        q: 'What should the listener do to reschedule?',
        choices: [
          'Visit the clinic in person',
          'Send an email',
          'Call at least a day before',
          'Fill out an online form',
        ],
        answer: 2,
        explanation: '「call us at least twenty-four hours in advance」。twenty-four hours = a day の言い換えに注意。',
      },
    ],
  },
  {
    id: 'ls403',
    part: 4,
    title: '社内発表（新システム導入）',
    script: [
      {
        speaker: 'M',
        text: "Before we finish today's meeting, I have one announcement. Starting next Monday, we will switch to a new expense reporting system called QuickClaim. With the new system, you can submit receipts simply by taking a photo with your phone, and payments will be processed within five business days instead of three weeks. A thirty-minute online training session will be held this Friday at 10 A.M. Attendance is required for all staff who travel for business. Please sign up on the intranet by Wednesday.",
      },
    ],
    scriptJa:
      '発表: 本日の会議を終える前に1つお知らせがあります。来週月曜から、経費精算システムを新しい「QuickClaim」に切り替えます。新システムでは、スマートフォンで写真を撮るだけで領収書を提出でき、支払い処理は3週間から5営業日に短縮されます。今週金曜の午前10時に30分のオンライン研修を行います。出張のある社員は全員参加必須です。水曜までにイントラネットで登録してください。',
    questions: [
      {
        q: 'What is the announcement mainly about?',
        choices: [
          'A new expense reporting system',
          'A change in travel policy',
          'An office relocation',
          'A company merger',
        ],
        answer: 0,
        explanation: '「we will switch to a new expense reporting system」が主題。',
      },
      {
        q: 'According to the speaker, what is an advantage of the new system?',
        choices: [
          'It is free to use.',
          'Payments are processed faster.',
          'It works without the internet.',
          'It automatically books flights.',
        ],
        answer: 1,
        explanation: '「within five business days instead of three weeks」= 支払いが速くなる。instead of の前後関係の聞き取りがカギ。',
      },
      {
        q: 'What are some listeners required to do?',
        choices: [
          'Attend a training session',
          'Submit old receipts by Friday',
          'Buy a new phone',
          'Contact the accounting team',
        ],
        answer: 0,
        explanation: '「Attendance is required for all staff who travel for business」= 出張者は研修参加が必須。',
      },
    ],
  },
  {
    id: 'ls304',
    part: 3,
    title: 'カフェの求人',
    script: [
      { speaker: 'M', text: "Excuse me, I saw the help-wanted sign in your window. Are you still looking for part-time staff?" },
      { speaker: 'W', text: "Yes, we need someone for weekend mornings, mainly to take orders and run the register. Do you have any experience in food service?" },
      { speaker: 'M', text: 'I worked at a bakery for two years while I was in college. I also have a food handler certificate.' },
      { speaker: 'W', text: "That's exactly what we're looking for. Could you fill out this application? The manager will be back at noon, and she can interview you today if you have time." },
    ],
    scriptJa:
      '男性: すみません、窓の求人の貼り紙を見たのですが。まだアルバイトを募集していますか？\n女性: ええ、週末の午前担当を探しています。主に注文取りとレジです。飲食の経験はありますか？\n男性: 大学時代にベーカリーで2年働いていました。食品衛生の資格も持っています。\n女性: まさに探していた人材です。この応募用紙に記入していただけますか？店長が正午に戻るので、お時間があれば今日面接できますよ。',
    questions: [
      {
        q: 'Why is the man visiting the café?',
        choices: ['To apply for a job', 'To place an order', 'To make a complaint', 'To deliver supplies'],
        answer: 0,
        explanation: '「I saw the help-wanted sign（求人の貼り紙を見た）」= 仕事に応募するため。',
      },
      {
        q: 'What does the man mention about himself?',
        choices: [
          'He owns a bakery.',
          'He has food service experience.',
          'He can only work weekdays.',
          'He recently graduated.',
        ],
        answer: 1,
        explanation: '「I worked at a bakery for two years」= 飲食の実務経験がある。',
      },
      {
        q: 'What is the man asked to do?',
        choices: ['Come back tomorrow', 'Call the manager', 'Complete a form', 'Provide references'],
        answer: 2,
        explanation: '「Could you fill out this application?」。fill out = complete（記入する）の言い換え。',
      },
    ],
  },
  {
    id: 'ls305',
    part: 3,
    title: '出張の手配',
    script: [
      { speaker: 'W', text: "Daniel, I'm arranging your trip to the trade show in Chicago. Would you rather fly out Tuesday evening or Wednesday morning?" },
      { speaker: 'M', text: "Wednesday morning, please. I have a dinner with a client on Tuesday that I can't move." },
      { speaker: 'W', text: 'Got it. The earliest flight lands at ten, but your first appointment at the show is at nine thirty. You might miss it.' },
      { speaker: 'M', text: "Hmm, then let's do Tuesday after the dinner. There's a late flight around ten P.M., isn't there? Book that one, and a hotel near the convention center." },
    ],
    scriptJa:
      '女性: ダニエル、シカゴの展示会への出張を手配しています。火曜の夜と水曜の朝、どちらの便がいいですか？\n男性: 水曜の朝でお願い。火曜は動かせない顧客との夕食があるんだ。\n女性: 了解。ただ、最も早い便でも到着は10時で、展示会での最初のアポは9時半です。間に合わないかもしれません。\n男性: うーん、それなら夕食の後の火曜にしよう。午後10時頃の遅い便があったよね？それと、コンベンションセンター近くのホテルを予約して。',
    questions: [
      {
        q: 'What is the woman helping the man with?',
        choices: ['Preparing a presentation', 'Arranging business travel', 'Organizing a client dinner', 'Renting a car'],
        answer: 1,
        explanation: '「I\'m arranging your trip to the trade show」= 出張の手配。',
      },
      {
        q: 'What problem does the woman point out?',
        choices: [
          'The hotel is fully booked.',
          'A flight might arrive too late.',
          'The trade show was postponed.',
          'The budget is too small.',
        ],
        answer: 1,
        explanation: '「The earliest flight lands at ten, but your first appointment is at nine thirty」= 到着がアポに間に合わない可能性。',
      },
      {
        q: 'What does the man decide to do?',
        choices: [
          'Cancel his client dinner',
          'Take a late flight on Tuesday',
          'Skip the first appointment',
          'Attend the show online',
        ],
        answer: 1,
        explanation: '「let\'s do Tuesday after the dinner ... Book that one（火曜の夜遅い便にしよう）」。会話の結論は最後に来る。',
      },
    ],
  },
  {
    id: 'ls404',
    part: 4,
    title: 'ラジオ広告（家具店セール）',
    script: [
      {
        speaker: 'W',
        text: "Looking to give your living room a fresh new look? This weekend only, Hartfield Furniture is holding its biggest clearance sale of the year. Everything in the store is at least thirty percent off, and selected sofas are half price. Plus, spend two hundred dollars or more and receive free delivery within the city. Our doors open at eight A.M. on Saturday, two hours earlier than usual, so come early for the best selection. Hartfield Furniture, on Route 9 next to the Cineplex.",
      },
    ],
    scriptJa:
      'ラジオ広告: リビングルームを新しく模様替えしませんか？今週末限定で、ハートフィールド家具が年間最大のクリアランスセールを開催します。全商品最低30%オフ、対象のソファは半額です。さらに200ドル以上のお買い上げで市内配送無料。土曜日は通常より2時間早い午前8時に開店しますので、品揃えが豊富なうちにお早めにどうぞ。ハートフィールド家具、9号線沿いシネコン隣。',
    questions: [
      {
        q: 'What is being advertised?',
        choices: ['A moving company', 'A furniture sale', 'A movie theater', 'A home repair service'],
        answer: 1,
        explanation: '「Hartfield Furniture is holding its biggest clearance sale」= 家具店のセール広告。',
      },
      {
        q: 'How can customers receive free delivery?',
        choices: [
          'By spending at least $200',
          'By visiting on Saturday',
          'By joining a membership program',
          'By paying in cash',
        ],
        answer: 0,
        explanation: '「spend two hundred dollars or more and receive free delivery」= 200ドル以上の購入が条件。',
      },
      {
        q: 'What does the speaker say about Saturday?',
        choices: [
          'The store will close early.',
          'The store will open earlier than usual.',
          'A new branch will open.',
          'Parking will be unavailable.',
        ],
        answer: 1,
        explanation: '「open at eight A.M. ... two hours earlier than usual」= 通常より2時間早く開店。',
      },
    ],
  },
  {
    id: 'ls405',
    part: 4,
    title: '会議の冒頭スピーチ（売上報告）',
    script: [
      {
        speaker: 'M',
        text: "Good morning, everyone. Before we go over this quarter's numbers, I'd like to share some good news. Our online sales grew forty percent compared to last quarter, thanks largely to the redesigned website that launched in April. However, sales at our downtown location continue to decline, mainly because of the ongoing road construction nearby. To address this, we'll be offering in-store pickup discounts starting next month. Maria from the marketing team will now walk you through the campaign details, so please hold your questions until the end of her presentation.",
      },
    ],
    scriptJa:
      'スピーチ: おはようございます。今四半期の数字を確認する前に、良いニュースを共有します。オンライン売上は前四半期比40%増となりました。これは主に4月に公開したリニューアル版ウェブサイトのおかげです。一方、ダウンタウン店の売上は減少が続いています。主な原因は近隣で続く道路工事です。この対策として、来月から店頭受け取り割引を開始します。これからマーケティングチームのマリアがキャンペーンの詳細を説明しますので、質問は彼女のプレゼンの最後までお待ちください。',
    questions: [
      {
        q: 'According to the speaker, why did online sales increase?',
        choices: [
          'A website was redesigned.',
          'Prices were lowered.',
          'A new product was released.',
          'More staff were hired.',
        ],
        answer: 0,
        explanation: '「thanks largely to the redesigned website」= リニューアルしたウェブサイトが要因。',
      },
      {
        q: 'What problem does the speaker mention?',
        choices: [
          'A shortage of inventory',
          'Declining sales at one location',
          'A delayed marketing campaign',
          'Rising shipping costs',
        ],
        answer: 1,
        explanation: '「sales at our downtown location continue to decline」= ダウンタウン店の売上減少。原因は道路工事。',
      },
      {
        q: 'What will happen next?',
        choices: [
          'A question-and-answer session will begin.',
          'The meeting will end.',
          'A colleague will give a presentation.',
          'A video will be shown.',
        ],
        answer: 2,
        explanation: '「Maria ... will now walk you through the campaign details」= 同僚がプレゼンする。walk through = 説明するの言い換え。',
      },
    ],
  },
];

/** Part 3/4 の全セット（基本 + 追加分を結合） */
export const LISTENING_SETS: ListeningSet[] = [...BASE_SETS, ...PART3_EXTRA, ...PART4_EXTRA, ...PART34_GRAPH];
