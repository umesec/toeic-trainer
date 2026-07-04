import type { ListeningSet } from '@/data/types';

/**
 * TOEIC Part 3/4 — 図表問題 (グラフィック付き) セット。
 * 各セットに図表参照問題と話者意図問題を1問ずつ含む。
 * ls501–ls510
 */
export const PART34_GRAPH: ListeningSet[] = [
  // ── ls501 ── Part 3: 時刻表 × 出張の列車選び ────────────────────────────
  {
    id: 'ls501',
    part: 3,
    title: '出張列車の選択',
    script: [
      { speaker: 'M', text: "Karen, have you checked the train schedule for the conference in Westfield next Tuesday?" },
      { speaker: 'W', text: "I looked it up. The 7:30 express gets us there by 9:15, which is well before the opening session." },
      { speaker: 'M', text: "That sounds perfect, but I have a doctor's appointment that morning. I can't leave before nine." },
      { speaker: 'W', text: "In that case, we should take the 9 o'clock express. We'd arrive at 10:45, just in time for the afternoon workshops." },
      { speaker: 'M', text: "That works for me. Should we book the tickets today before they sell out?" },
      { speaker: 'W', text: "I'll take care of it right now. I'll reserve two seats." },
    ],
    scriptJa:
      '男性: カレン、来週火曜のウェストフィールドでの会議に向けて列車の時刻を確認した？\n' +
      '女性: 調べたわ。7時30分発のエクスプレスなら9時15分に着くから、開会セッションの前に余裕で間に合うわ。\n' +
      '男性: それが理想だけど、その朝は医者の予約があってね。9時前に出発できないんだ。\n' +
      '女性: それなら9時発のエクスプレスにしましょう。10時45分に着けば午後のワークショップに間に合うわ。\n' +
      '男性: それで問題ない。売り切れる前に今日チケットを買っておくべきかな？\n' +
      '女性: 今すぐ手配するわ。2席確保しておく。',
    chart: {
      title: 'Westfield行き列車時刻表',
      rows: [
        ['列車', '出発時刻', '到着時刻', '種別'],
        ['Train A', '07:30', '09:15', 'Express'],
        ['Train B', '08:00', '10:30', 'Local'],
        ['Train C', '09:00', '10:45', 'Express'],
        ['Train D', '10:15', '12:00', 'Local'],
      ],
    },
    questions: [
      {
        q: 'What are the speakers mainly planning?',
        choices: [
          'Traveling together to a business conference',
          'Organizing a workshop at their office',
          'Booking a hotel near Westfield',
          'Reviewing an agenda for a team meeting',
        ],
        answer: 0,
        explanation:
          '冒頭の「train schedule for the conference in Westfield」から、会議への出張を計画していることがわかる。',
      },
      {
        q: "What does the man mean when he says \"I have a doctor's appointment that morning\"?",
        choices: [
          'He is not feeling well and wants to cancel the trip.',
          'He cannot depart before nine o\'clock.',
          'He wants to reschedule the conference.',
          'He will join the meeting by video call instead.',
        ],
        answer: 1,
        explanation:
          '医者の予約があるため直後に「I can\'t leave before nine」と続けており、午前9時より前には出発できないことを示している。',
      },
      {
        q: 'Look at the graphic. Which train will the speakers most likely take?',
        choices: [
          'Train A',
          'Train B',
          'Train C',
          'Train D',
        ],
        answer: 2,
        explanation:
          '男性は9時前に出発できないため、9時発のエクスプレスであるTrain Cが選択される。「9 o\'clock express」が表のTrain Cに対応する。',
      },
    ],
  },

  // ── ls502 ── Part 3: 価格表 × プリンター購入 ────────────────────────────
  {
    id: 'ls502',
    part: 3,
    title: 'プリンターの選択',
    script: [
      { speaker: 'W', text: "Excuse me, I'm looking for a printer for our small office. We print a large volume of documents daily." },
      { speaker: 'M', text: "For high-volume printing, I'd recommend the ProX300 or ProX400. Both come with a three-year warranty." },
      { speaker: 'W', text: "The price difference is a hundred dollars. Is the ProX400 significantly faster?" },
      { speaker: 'M', text: "It prints at 50 pages per minute versus 40 for the ProX300. But honestly, for most offices, 40 pages per minute is more than sufficient." },
      { speaker: 'W', text: "I see. So you're saying the ProX300 would be a better value for us?" },
      { speaker: 'M', text: "Exactly. It's our most popular model for small businesses." },
    ],
    scriptJa:
      '女性: すみません、小さなオフィス向けのプリンターを探しているのですが。毎日大量に印刷するんです。\n' +
      '男性: 大量印刷でしたら、ProX300かProX400をお勧めします。どちらも3年保証付きです。\n' +
      '女性: 価格差が100ドルですね。ProX400はかなり速いんですか？\n' +
      '男性: ProX300の40ページ/分に対し50ページ/分です。ただ正直なところ、ほとんどのオフィスには40ページ/分でも十分すぎます。\n' +
      '女性: なるほど。ProX300の方がコスパが良いということですね？\n' +
      '男性: まさにその通りです。小規模ビジネスでは最も人気のモデルです。',
    chart: {
      title: 'プリンター価格一覧',
      rows: [
        ['モデル', '価格', '印刷速度', '保証期間'],
        ['ProX100', '$149', '20ppm', '1年'],
        ['ProX200', '$249', '30ppm', '2年'],
        ['ProX300', '$349', '40ppm', '3年'],
        ['ProX400', '$449', '50ppm', '3年'],
      ],
    },
    questions: [
      {
        q: 'Where does this conversation most likely take place?',
        choices: [
          'At a post office',
          'At a repair shop',
          'At a copy center',
          'At an electronics store',
        ],
        answer: 3,
        explanation:
          '「looking for a printer」「most popular model for small businesses」という発言から、電器店（electronics store）での会話とわかる。',
      },
      {
        q: 'What does the man mean when he says "40 pages per minute is more than sufficient"?',
        choices: [
          'The ProX300 fully meets the woman\'s printing needs.',
          'The ProX400 is too fast for everyday use.',
          'The print speed is the only factor worth considering.',
          'Neither model is suitable for high-volume printing.',
        ],
        answer: 0,
        explanation:
          '「more than sufficient（十分すぎるほど）」という表現で、ProX300の印刷速度がほとんどのオフィスのニーズを十分に満たすと示唆している。',
      },
      {
        q: 'Look at the graphic. Which printer will the woman most likely purchase?',
        choices: [
          'ProX100',
          'ProX300',
          'ProX400',
          'ProX200',
        ],
        answer: 1,
        explanation:
          '男性はProX300を「most popular model for small businesses」と紹介し、女性もコスパが良いと理解している。表のProX300が選択される。',
      },
    ],
  },

  // ── ls503 ── Part 3: 組織図 × 新規ポジション ────────────────────────────
  {
    id: 'ls503',
    part: 3,
    title: 'マーケティング部門の新ポジション',
    script: [
      { speaker: 'W', text: "Tom, I wanted to discuss the new position we're creating in the marketing department." },
      { speaker: 'M', text: "Of course. What role did you have in mind?" },
      { speaker: 'W', text: "Based on our restructuring plan, we need someone to oversee campaign strategy across all regions — a position between the Marketing Director and the VP of Marketing." },
      { speaker: 'M', text: "I see. Then a Senior Marketing Analyst title won't be sufficient. You're describing something at the director level, aren't you?" },
      { speaker: 'W', text: "Exactly. We'd be adding a director-level position that reports directly to the VP of Marketing." },
      { speaker: 'M', text: "I'll update the organizational chart and post the job listing this week." },
    ],
    scriptJa:
      '女性: トム、マーケティング部門に新設するポジションについて話したいのですが。\n' +
      '男性: もちろんです。どんな役職を想定されていますか？\n' +
      '女性: 組織再編計画に基づき、全地域のキャンペーン戦略を監督する人材が必要です。マーケティングディレクターとVPの間に位置する役職です。\n' +
      '男性: なるほど。それならシニアマーケティングアナリストでは不十分ですね。ディレクターレベルのことをおっしゃっていますよね？\n' +
      '女性: その通りです。VPマーケティングに直接報告するディレクター職を新設します。\n' +
      '男性: 組織図を更新して、今週中に求人を掲載します。',
    chart: {
      title: 'マーケティング部門組織図',
      rows: [
        ['役職', '報告先', 'レベル'],
        ['VP of Marketing', 'CEO', 'Executive'],
        ['Marketing Director – Americas', 'VP of Marketing', 'Director'],
        ['Marketing Director – Asia Pacific', 'VP of Marketing', 'Director'],
        ['Senior Marketing Analyst', 'Marketing Director', 'Senior Staff'],
      ],
    },
    questions: [
      {
        q: 'What is the main topic of the conversation?',
        choices: [
          'A quarterly marketing budget review',
          'An employee performance evaluation',
          'A new position in the marketing department',
          'An upcoming product launch campaign',
        ],
        answer: 2,
        explanation:
          '冒頭の「new position we\'re creating in the marketing department」から、マーケティング部門の新規ポジション設置が議題とわかる。',
      },
      {
        q: 'What does the man mean when he says "a Senior Marketing Analyst title won\'t be sufficient"?',
        choices: [
          'The candidate lacks the required experience.',
          'The marketing budget is too limited for the role.',
          'The company needs to hire multiple analysts.',
          'The described responsibilities require a higher-level title.',
        ],
        answer: 3,
        explanation:
          '「won\'t be sufficient（不十分）」は、説明された業務内容がSenior Marketing Analystより上位のレベル（ディレクター職）を必要とすることを意味している。',
      },
      {
        q: 'Look at the graphic. Which position will the new role report to?',
        choices: [
          'VP of Marketing',
          'CEO',
          'Marketing Director – Americas',
          'Senior Marketing Analyst',
        ],
        answer: 0,
        explanation:
          '女性が「reports directly to the VP of Marketing」と明示しており、表のVP of Marketingが新ポジションの報告先となる。',
      },
    ],
  },

  // ── ls504 ── Part 3: 座席表 × 周年パーティー ────────────────────────────
  {
    id: 'ls504',
    part: 3,
    title: '周年記念パーティーの席次',
    script: [
      { speaker: 'M', text: "Ms. Peterson, we've prepared the initial seating plan for your company's anniversary banquet. I'd like your approval before we finalize it." },
      { speaker: 'W', text: "Thank you. Where will our keynote speakers be seated?" },
      { speaker: 'M', text: "We've placed them at Table 2, in the front-left area. It gives them easy access to the stage." },
      { speaker: 'W', text: "That makes sense. And the journalists from the press — I'd like them to have a good view of the stage as well." },
      { speaker: 'M', text: "They're at Table 3, front right. It's directly opposite Table 2, so the sightlines are excellent." },
      { speaker: 'W', text: "\"Directly opposite\" — so they'll be facing the speakers at all times? Perfect. Please go ahead and finalize the plan." },
    ],
    scriptJa:
      '男性: ピーターソン様、御社の周年記念パーティーの初期席次案を用意しました。確定前にご確認いただけますか。\n' +
      '女性: ありがとうございます。基調講演のスピーカーはどこに座りますか？\n' +
      '男性: ステージへのアクセスがしやすい前方左のTable 2に配置しました。\n' +
      '女性: それは理にかなっていますね。報道関係者にもステージがよく見える席を用意したいのですが。\n' +
      '男性: 彼らは前方右のTable 3です。Table 2の真向かいで、見通しは抜群です。\n' +
      '女性: 「真向かい」ということは、常にスピーカーの方を向いているわけですね？完璧です。確定してください。',
    chart: {
      title: 'バンケットホール席次表',
      rows: [
        ['テーブル', '位置', '席数', '割り当て'],
        ['Table 1', '正面中央', '8', 'VIPゲスト'],
        ['Table 2', '前方左', '6', 'スピーカー'],
        ['Table 3', '前方右', '6', 'メディア'],
        ['Table 4', '後方', '10', '一般ゲスト'],
      ],
    },
    questions: [
      {
        q: 'Who is the woman in this conversation?',
        choices: [
          'A journalist covering the event',
          'A client planning a banquet',
          'A keynote speaker at the event',
          'A hotel catering manager',
        ],
        answer: 1,
        explanation:
          '男性が「your company\'s anniversary banquet」の席次表の承認を求めており、女性はイベントを依頼するクライアントである。',
      },
      {
        q: 'What does the man mean when he says "it\'s directly opposite Table 2"?',
        choices: [
          'Table 3 is less expensive to reserve.',
          'Table 3 is far from the stage.',
          'Table 3 faces the speakers\' table.',
          'Table 3 has fewer seats than Table 2.',
        ],
        answer: 2,
        explanation:
          '「directly opposite（真向かい）」はTable 3がTable 2の正面に位置することを示しており、メディアはスピーカーの席を常に正面から見られることを意味している。',
      },
      {
        q: 'Look at the graphic. Where will the media be seated?',
        choices: [
          'Table 1',
          'Table 2',
          'Table 4',
          'Table 3',
        ],
        answer: 3,
        explanation:
          '表の「割り当て：メディア」の行がTable 3であり、本文の「journalists from the press」はメディアを指す。男性も「Table 3, front right」と明示している。',
      },
    ],
  },

  // ── ls505 ── Part 3: 注文フォーム × 備品発注 ────────────────────────────
  {
    id: 'ls505',
    part: 3,
    title: '月次備品発注の確認',
    script: [
      { speaker: 'W', text: "James, I've prepared the monthly stationery order. Could you take a look before I submit it?" },
      { speaker: 'M', text: "Sure. Let me check... It looks good overall, but I think we should reduce the stapler quantity. Three seems excessive when we already have several on hand." },
      { speaker: 'W', text: "You're right. Should I change it to one?" },
      { speaker: 'M', text: "Let's make it two, just to be safe. Also, we need to add toner cartridges — we've been running low." },
      { speaker: 'W', text: "I'll add those right away. The total will increase, but it should still be within our monthly budget." },
      { speaker: 'M', text: "It's within our monthly budget — that's a relief. Please submit the order by end of day." },
    ],
    scriptJa:
      '女性: ジェームズ、今月の文房具の発注書を作りました。提出前に確認していただけますか？\n' +
      '男性: もちろんです。確認します…全体的には問題ありませんが、ステープラーの数量を減らした方がいいと思います。在庫がすでにあるのに3台は多すぎます。\n' +
      '女性: おっしゃる通りですね。1台に変更しましょうか？\n' +
      '男性: 念のため2台にしましょう。それから、トナーカートリッジを追加する必要があります。残りが少なくなってきています。\n' +
      '女性: すぐに追加します。合計は増えますが、月次予算内に収まるはずです。\n' +
      '男性: 予算内に収まるなら安心しました。今日中に発注をお願いします。',
    chart: {
      title: 'オフィス備品発注フォーム',
      rows: [
        ['品名', '単価', '数量', '小計'],
        ['A4用紙（500枚）', '$8.00', '10', '$80.00'],
        ['ボールペン（12本入）', '$6.50', '5', '$32.50'],
        ['ステープラー', '$12.00', '3', '$36.00'],
        ['付箋（100枚入）', '$4.00', '8', '$32.00'],
      ],
    },
    questions: [
      {
        q: 'What are the speakers doing?',
        choices: [
          'Reviewing a supply order before submission',
          'Planning a company product launch',
          'Negotiating prices with a vendor',
          'Preparing a quarterly financial report',
        ],
        answer: 0,
        explanation:
          '「I\'ve prepared the monthly stationery order」「Could you take a look before I submit it」から、発注書の提出前確認をしていることがわかる。',
      },
      {
        q: 'What does the man mean when he says "It\'s within our monthly budget"?',
        choices: [
          'The updated order is financially acceptable.',
          'The company must reduce spending next month.',
          'The order will be submitted in the following month.',
          'The budget has already been exceeded this month.',
        ],
        answer: 1,
        explanation:
          '「within our monthly budget（月次予算内）」とは、トナーを追加しても予算を超えないという安堵を示している。直前に「a relief（安心）」と表現していることも確認できる。',
      },
      {
        q: 'Look at the graphic. What change will the woman most likely make to the order?',
        choices: [
          'Increase the quantity of A4 paper.',
          'Remove the sticky notes from the order.',
          'Adjust the unit price of ballpoint pens.',
          'Reduce the quantity of staplers.',
        ],
        answer: 3,
        explanation:
          '男性が「reduce the stapler quantity（ステープラーの数量を減らす）」よう求め、女性もそれに同意している。表のステープラーの数量が変更される。',
      },
    ],
  },

  // ── ls506 ── Part 4: スケジュール表 × システムメンテナンス ──────────────
  {
    id: 'ls506',
    part: 4,
    title: 'システムメンテナンスのお知らせ',
    script: [
      { text: "Good afternoon. This is a message from Nexus Technologies IT Support." },
      { text: "We would like to inform all staff members about upcoming scheduled maintenance on our company systems." },
      { text: "Due to necessary upgrades, there will be temporary service interruptions throughout the coming week." },
      { text: "We kindly ask that you save your work frequently and avoid initiating large file transfers during the maintenance windows." },
      { text: "Please note that Saturday's maintenance will be the most extensive, as it will cover all systems simultaneously." },
      { text: "If you experience any issues after maintenance is completed, please contact the IT help desk at extension 2200. We apologize for any inconvenience." },
    ],
    scriptJa:
      'こんにちは。ネクサステクノロジーズITサポートからのお知らせです。\n' +
      '来週、社内システムの定期メンテナンスが予定されていることをお知らせします。\n' +
      '必要なアップグレードに伴い、来週にかけて一時的なサービス停止が発生します。\n' +
      'メンテナンス時間帯は、作業を頻繁に保存し、大容量ファイルの転送を開始しないようご注意ください。\n' +
      '土曜日のメンテナンスは全システムを同時に対象とするため、最も大規模なものとなります。\n' +
      'メンテナンス完了後に問題が発生した場合は、内線2200のITヘルプデスクまでご連絡ください。ご不便をおかけして申し訳ございません。',
    chart: {
      title: 'システムメンテナンス スケジュール',
      rows: [
        ['日付', '時間帯', '対象システム', '所要時間'],
        ['月曜 3月3日', '22:00–24:00', 'メールサーバー', '2時間'],
        ['水曜 3月5日', '01:00–04:00', 'データベース', '3時間'],
        ['金曜 3月7日', '23:00–24:00', 'ファイルストレージ', '1時間'],
        ['土曜 3月8日', '10:00–14:00', '全システム', '4時間'],
      ],
    },
    questions: [
      {
        q: 'What is the purpose of this announcement?',
        choices: [
          'To introduce new software to employees',
          'To report an unexpected system failure',
          'To inform staff about scheduled system maintenance',
          'To request user feedback on IT services',
        ],
        answer: 2,
        explanation:
          '冒頭で「upcoming scheduled maintenance on our company systems」と述べており、システムメンテナンスの事前案内が目的である。',
      },
      {
        q: 'What does the speaker mean when he says "Saturday\'s maintenance will be the most extensive"?',
        choices: [
          'Saturday maintenance will be provided free of charge.',
          'All staff members are required to work on Saturday.',
          'Saturday is the safest day for system upgrades.',
          'The Saturday maintenance will affect all systems at once.',
        ],
        answer: 3,
        explanation:
          '「most extensive（最も大規模）」の直後に「covering all systems simultaneously（全システムを同時に）」と続けており、土曜日は全システムが対象になることを示している。',
      },
      {
        q: 'Look at the graphic. When will the database maintenance take place?',
        choices: [
          'Wednesday, March 5 from 01:00 to 04:00',
          'Monday, March 3 from 22:00 to 24:00',
          'Friday, March 7 from 23:00 to 24:00',
          'Saturday, March 8 from 10:00 to 14:00',
        ],
        answer: 0,
        explanation:
          '表の「データベース」行を参照すると「水曜 3月5日、01:00–04:00」と記載されており、これが正解となる。',
      },
    ],
  },

  // ── ls507 ── Part 4: 評価一覧 × 患者満足度調査 ──────────────────────────
  {
    id: 'ls507',
    part: 4,
    title: '患者満足度調査の結果報告',
    script: [
      { text: "Good morning, everyone. I'm pleased to share the results of our first-quarter patient satisfaction survey." },
      { text: "Our reception and nursing care teams have exceeded their targets, and I want to personally thank both departments for their outstanding efforts." },
      { text: "However, we still have work to do." },
      { text: "Doctor-patient communication scored below the 4.5 target, and facility cleanliness was also below expectations." },
      { text: "We will be organizing additional communication training for physicians starting next month, and we are bringing in a professional cleaning service three times a week." },
      { text: "I am confident that with these measures, our Q2 scores will improve significantly. Thank you for your continued dedication." },
    ],
    scriptJa:
      'おはようございます。第1四半期の患者満足度調査の結果をご報告します。\n' +
      '受付チームと看護ケアチームは目標を上回り、両部門の皆さんの素晴らしい努力に個人的に感謝したいと思います。\n' +
      'しかし、まだ取り組むべき課題があります。\n' +
      '医師と患者のコミュニケーションは目標の4.5を下回り、施設の清潔さも期待以下でした。\n' +
      '来月から医師向けの追加コミュニケーション研修を実施し、週3回のプロの清掃サービスを導入します。\n' +
      'これらの対策により、第2四半期のスコアは大幅に改善されると確信しています。引き続きご尽力ありがとうございます。',
    chart: {
      title: '患者満足度調査結果（第1四半期）',
      rows: [
        ['カテゴリ', 'スコア', '目標値', '達成状況'],
        ['受付サービス', '4.8', '4.5', '達成'],
        ['医師とのコミュニケーション', '4.2', '4.5', '未達'],
        ['看護ケア', '4.6', '4.5', '達成'],
        ['施設の清潔さ', '3.9', '4.5', '未達'],
      ],
    },
    questions: [
      {
        q: 'Who is most likely giving this talk?',
        choices: [
          'A patient representative',
          'A hospital administrator',
          'A medical researcher',
          'A government health inspector',
        ],
        answer: 1,
        explanation:
          '患者満足度調査の結果を職員に共有し、部門ごとの改善策を指示する立場であることから、病院の管理職（administrator）と推測できる。',
      },
      {
        q: 'What does the speaker mean when he says "we still have work to do"?',
        choices: [
          'Additional staff must be hired immediately.',
          'The survey results have not been finalized.',
          'Some areas require further improvement.',
          'Patients are generally satisfied with current services.',
        ],
        answer: 2,
        explanation:
          '「we still have work to do（まだやるべきことがある）」は、一部カテゴリが目標未達であることを婉曲的に表現しており、改善の余地があることを示している。直後に未達カテゴリの説明が続く。',
      },
      {
        q: 'Look at the graphic. Which category received the lowest score?',
        choices: [
          'Reception Service',
          'Doctor Communication',
          'Nursing Care',
          'Facility Cleanliness',
        ],
        answer: 3,
        explanation:
          '表を確認すると「施設の清潔さ」のスコアが3.9と最も低く、達成状況も「未達」となっている。他のカテゴリと比較して最低値である。',
      },
    ],
  },

  // ── ls508 ── Part 4: 配送スケジュール × 物流の更新連絡 ──────────────────
  {
    id: 'ls508',
    part: 4,
    title: '配送スケジュールの変更連絡',
    script: [
      { text: "Hello, this is David Chen from Metro Logistics." },
      { text: "I'm calling to update you on this week's delivery situation for Route 7." },
      { text: "Most deliveries are proceeding as planned, but I want to flag two exceptions." },
      { text: "Tuesday's delivery to Warehouse B has been pushed back by approximately two hours due to a vehicle breakdown. Our technicians expect it to be resolved by midday." },
      { text: "Additionally, Thursday's delivery to Retail Center D has been cancelled due to a road closure near the facility. We will reschedule that shipment for next Monday." },
      { text: "If you have any questions, please call me back at 555-4892. Thank you." },
    ],
    scriptJa:
      'こんにちは、メトロロジスティクスのデビッド・チェンです。\n' +
      '今週のルート7の配送状況についてご連絡しています。\n' +
      'ほとんどの配送は予定通り進んでいますが、2件の例外をお知らせしたいと思います。\n' +
      '火曜日のウェアハウスBへの配送は、車両の故障により約2時間遅延しています。技術者が対応中で、正午までに解決する見込みです。\n' +
      'また、木曜日のリテールセンターDへの配送は、施設付近の道路閉鎖により中止となりました。来週月曜日に再スケジュールします。\n' +
      'ご質問があれば555-4892にお電話ください。ありがとうございました。',
    chart: {
      title: '週間配送スケジュール（ルート7）',
      rows: [
        ['曜日', '配送先', '出発時刻', 'ステータス'],
        ['月曜日', 'ウェアハウスA', '08:00', '予定通り'],
        ['火曜日', 'ウェアハウスB', '09:30', '遅延'],
        ['水曜日', 'リテールセンターC', '07:00', '予定通り'],
        ['木曜日', 'リテールセンターD', '10:00', '中止'],
      ],
    },
    questions: [
      {
        q: 'Why is the speaker calling?',
        choices: [
          'To report changes to the delivery schedule',
          'To request payment for completed deliveries',
          'To confirm a new logistics contract',
          'To report a complaint about vehicle maintenance',
        ],
        answer: 0,
        explanation:
          '「update you on this week\'s delivery situation」という発言から、配送スケジュールの変更を知らせる目的の電話であることがわかる。',
      },
      {
        q: 'What does the speaker mean when he says "I want to flag two exceptions"?',
        choices: [
          'He wants to draw attention to two issues that need to be noted.',
          'He is announcing two new delivery routes.',
          'He has found two errors in the delivery records.',
          'He is requesting approval for two additional vehicles.',
        ],
        answer: 1,
        explanation:
          '「flag（注意を引く・指摘する）」は「two exceptions（2件の例外）」に注目してほしいという意味で、問題が生じている2件の配送について説明しようとしている。',
      },
      {
        q: 'Look at the graphic. What is the status of Thursday\'s delivery?',
        choices: [
          'It is behind schedule.',
          'It departed earlier than planned.',
          'It has been cancelled.',
          'It has been moved to Wednesday.',
        ],
        answer: 2,
        explanation:
          '表の木曜日の行のステータス欄に「中止」と記載されており、本文でも「Thursday\'s delivery...has been cancelled」と述べられている。',
      },
    ],
  },

  // ── ls509 ── Part 4: メニュー表 × ケータリング確認 ──────────────────────
  {
    id: 'ls509',
    part: 4,
    title: '役員昼食会のメニュー確認',
    script: [
      { text: "Good afternoon. This is Andrea Park, catering director at Grand Pavilion." },
      { text: "I'm calling to confirm the menu selection for your executive luncheon scheduled for next Friday." },
      { text: "After reviewing your dietary requirements, we recommend Option A for the main course — the grilled salmon — as it accommodates both your vegetarian and low-calorie preferences." },
      { text: "The beef tenderloin is equally popular, but comes at an additional charge per person." },
      { text: "For beverages, please note that wine is available at an extra cost per bottle. If you'd like to add wine service, please let us know by Wednesday so we can arrange the appropriate quantities." },
      { text: "We look forward to making your event a success. Please feel free to call us with any questions." },
    ],
    scriptJa:
      'こんにちは。グランドパビリオンのケータリングディレクター、アンドレア・パークです。\n' +
      '来週金曜日にご予定の役員昼食会のメニュー選択を確認するためにお電話しています。\n' +
      'お客様の食事制限をご確認した結果、メインコースはオプションA（グリルサーモン）をお勧めします。ベジタリアンおよび低カロリーのご希望に対応しています。\n' +
      'ビーフテンダーロインも同様に人気ですが、1人当たり追加料金がかかります。\n' +
      'お飲み物については、ワインは1本ごとに追加料金が発生します。ワインサービスをご希望の場合は、適切な数量を手配するため水曜日までにお知らせください。\n' +
      'イベントを成功させるためにお手伝いできることを楽しみにしております。ご質問があればお気軽にご連絡ください。',
    chart: {
      title: '役員昼食会メニュー',
      rows: [
        ['コース', 'オプションA', 'オプションB', '料金（1名）'],
        ['スターター', 'ガーデンサラダ', '本日のスープ', '込み'],
        ['メイン', 'グリルサーモン', 'ビーフテンダーロイン', 'ビーフは+$15'],
        ['デザート', 'ティラミス', '季節のフルーツ', '込み'],
        ['飲み物', '水・コーヒー', 'プレミアムワイン', 'ワインは+$20/本'],
      ],
    },
    questions: [
      {
        q: 'Who is most likely the intended recipient of this message?',
        choices: [
          'A restaurant food critic',
          'A hotel operations manager',
          'A chef at Grand Pavilion',
          'A corporate event organizer',
        ],
        answer: 3,
        explanation:
          '「executive luncheon」のメニューを確認し、食事制限を考慮した選択肢を提案されていることから、企業イベントの担当者への連絡とわかる。',
      },
      {
        q: 'What does the speaker mean when she says "it accommodates both your vegetarian and low-calorie preferences"?',
        choices: [
          'The grilled salmon suits the client\'s dietary requirements.',
          'Option B is not available for this particular event.',
          'The menu has been revised based on prior feedback.',
          'Vegetarian guests must place their orders separately.',
        ],
        answer: 0,
        explanation:
          '「accommodates（対応する・満たす）」は、ベジタリアンおよび低カロリーという顧客の要望を、グリルサーモンが満たすという意味である。',
      },
      {
        q: 'Look at the graphic. Which main course does the speaker recommend?',
        choices: [
          'Beef Tenderloin',
          'Garden Salad',
          'Grilled Salmon',
          'Tiramisu',
        ],
        answer: 2,
        explanation:
          'スピーカーは「we recommend Option A for the main course — the grilled salmon」と明示しており、表のメインコースのオプションAに対応するグリルサーモンが正解となる。',
      },
    ],
  },

  // ── ls510 ── Part 4: 地図コード × 不動産物件紹介 ──────────────────────
  {
    id: 'ls510',
    part: 4,
    title: '不動産物件の紹介',
    script: [
      { text: "Hello, Mr. and Mrs. Tanaka. This is Oliver Grant from Premier Properties." },
      { text: "Thank you for attending our open house last weekend." },
      { text: "I'm calling because a new listing has come in that I believe perfectly matches your requirements." },
      { text: "You mentioned you're looking for a two-bedroom apartment in a quiet residential area at a reasonable price. Based on those criteria, the property at code A-01 in Northgate would be an excellent fit." },
      { text: "The neighborhood is family-friendly and within walking distance of good schools." },
      { text: "I'd love to arrange a private viewing at your earliest convenience. Please call me back at 555-7731. I look forward to hearing from you." },
    ],
    scriptJa:
      'こんにちは、田中様。プレミアプロパティーズのオリバー・グラントです。\n' +
      '先週末のオープンハウスにご参加いただきありがとうございました。\n' +
      'お客様のご要望に完璧に合う新しい物件が入ったためご連絡しています。\n' +
      '静かな住宅地で手頃な価格の2ベッドルームアパートをお探しとのことでしたね。その条件に基づき、ノースゲートのコードA-01の物件が最適です。\n' +
      'この地域はファミリー向けで、良い学校まで徒歩圏内です。\n' +
      'できるだけ早く内覧のご予約をしたいと思います。555-7731にお電話ください。ご連絡お待ちしています。',
    chart: {
      title: '物件エリアガイド（空き物件一覧）',
      rows: [
        ['コード', 'エリア', '物件種別', '賃料目安'],
        ['A-01', 'ノースゲート', 'アパート', '$1,200–$1,500/月'],
        ['B-02', 'ウェストサイド', 'スタジオ', '$800–$950/月'],
        ['C-03', 'ダウンタウン', 'オフィス', '$3,000–$4,500/月'],
        ['D-04', 'イーストブリッジ', '商業スペース', '$2,200–$3,000/月'],
      ],
    },
    questions: [
      {
        q: 'What is the purpose of this call?',
        choices: [
          'To discuss the terms of a purchase contract',
          'To recommend a newly available property',
          'To confirm receipt of a rental deposit',
          'To reschedule a previously arranged viewing',
        ],
        answer: 1,
        explanation:
          '「a new listing has come in that I believe perfectly matches your requirements」という発言から、新しい物件を紹介することが電話の目的とわかる。',
      },
      {
        q: 'What does the speaker mean when he says "a new listing has come in that perfectly matches your requirements"?',
        choices: [
          'The property is the most affordable option currently available.',
          'The property is located in the most sought-after district.',
          'The property has more rooms than the clients requested.',
          'The property suits all of the clients\' stated needs.',
        ],
        answer: 3,
        explanation:
          '「matches your requirements（要件に合致する）」は、顧客が述べた条件（静かな住宅地の2ベッドルームアパート・手頃な価格）にぴったり合うという意味である。',
      },
      {
        q: 'Look at the graphic. Which property does the speaker recommend?',
        choices: [
          'A-01 in Northgate',
          'B-02 in Westside',
          'C-03 in Downtown',
          'D-04 in Eastbridge',
        ],
        answer: 0,
        explanation:
          '「the property at code A-01 in Northgate」と明示されており、表のコードA-01に対応するノースゲートのアパートが推薦物件である。',
      },
    ],
  },
];
