import type { Part7Set } from '@/data/types';

const s = (
  id: string,
  docType: string,
  text: string,
  textJa: string,
  questions: Part7Set['questions'],
): Part7Set => ({ id, passages: [{ docType, text, textJa }], questions });

export const SINGLE_EXTRA_B: Part7Set[] = [
  s(
    'p719',
    'Eメール',
    'From: Patricia Lund <plund@greystone-edu.org>\nTo: All Faculty <faculty@greystone-edu.org>\nSubject: Summer Professional Development Workshop\nDate: April 18\n\nDear Colleagues,\n\nI am pleased to announce that Greystone Academy will host its annual Summer Professional Development Workshop from July 14 to July 16. This year\'s theme is "Integrating Technology in the Classroom," and sessions will cover digital assessment tools, collaborative learning platforms, and data-driven instruction.\n\nParticipation is mandatory for full-time faculty. Part-time instructors are welcome to attend any sessions they find relevant at no charge. All participants should register by May 31 through the staff portal so that materials can be prepared in advance.\n\nLunch will be provided on all three days. On the final afternoon, the session schedule will conclude at 3:00 P.M. to allow time for the end-of-program reception.\n\nIf you have suggestions for session topics or would like to lead a session yourself, please contact me directly by April 30.\n\nPatricia Lund\nDirector of Professional Development',
    '差出人: パトリシア・ランド（グレイストーン・アカデミー）\n宛先: 全教員\n件名: 夏季専門能力開発ワークショップ\n\n同僚の皆さん\n\nグレイストーン・アカデミーが7月14日〜16日に年次夏季専門能力開発ワークショップを開催することをお知らせします。今年のテーマは「教室でのテクノロジー活用」で、デジタル評価ツール、協働学習プラットフォーム、データ駆動型指導に関するセッションが行われます。\n\n正規教員の参加は必須です。非常勤講師は関心のあるセッションに無料で参加できます。5月31日までにスタッフポータルから登録してください。\n\n3日間とも昼食が提供されます。最終日午後のセッションは午後3時に終了し、修了式レセプションの時間が設けられます。\n\nセッションのテーマ提案や自らセッションを担当したい方は、4月30日までに直接ご連絡ください。\n\nパトリシア・ランド　専門能力開発部長',
    [
      {
        q: 'What is the purpose of the email?',
        choices: [
          'To announce a faculty recruitment drive',
          'To inform staff about an upcoming workshop',
          'To request budget approval for a training program',
          'To introduce a new school curriculum',
        ],
        answer: 1,
        explanation: '冒頭「I am pleased to announce … Summer Professional Development Workshop」= ワークショップの告知が目的。',
      },
      {
        q: 'What are part-time instructors told about the workshop?',
        choices: [
          'They must register by April 30.',
          'They are required to lead at least one session.',
          'They may attend sessions at no cost.',
          'They will not receive lunch on any day.',
        ],
        answer: 2,
        explanation: '「Part-time instructors are welcome to attend any sessions … at no charge」= 無料参加可。at no charge = at no cost の言い換え。',
      },
      {
        q: 'What is NOT mentioned as a topic for the workshop sessions?',
        choices: [
          'Digital assessment tools',
          'Collaborative learning platforms',
          'Data-driven instruction',
          'Foreign language teaching methods',
        ],
        answer: 3,
        explanation: 'NOT問題。デジタル評価ツール・協働学習プラットフォーム・データ駆動型指導は記載あり。外国語教授法は言及なし。',
      },
      {
        q: 'By what date must full-time faculty register?',
        choices: ['April 18', 'April 30', 'May 31', 'July 14'],
        answer: 2,
        explanation: '「All participants should register by May 31」。April 30 はセッション提案の締め切り、July 14 はワークショップ開始日。日付の区別が問われる。',
      },
    ],
  ),
  s(
    'p720',
    '広告',
    'NORTHGATE FINANCIAL SERVICES\nFree Retirement Planning Seminar\n\nAre you on track for a secure retirement? Join us for a complimentary two-hour seminar led by certified financial planners.\n\nDate: Saturday, September 6\nTime: 10:00 A.M. – 12:00 P.M.\nVenue: Northgate Conference Center, Suite 400, 220 Harbor Boulevard\n\nTopics include:\n• Understanding pension plans and 401(k) options\n• Managing investment risk at every life stage\n• Social Security timing strategies\n• Estate planning basics\n\nSeating is limited to 40 attendees. Light refreshments will be served. All registered participants will receive a complimentary copy of our guide "Your Retirement Roadmap."\n\nTo register, visit northgatefinancial.com/seminar or call (800) 555-0192 by September 1. Walk-in registrations cannot be accommodated.\n\nThis seminar is educational in nature and does not constitute investment advice.',
    'ノースゲート・ファイナンシャル・サービス\n無料退職計画セミナー\n\n安心できる老後への準備はできていますか？認定ファイナンシャルプランナーが主催する2時間の無料セミナーにご参加ください。\n\n日時: 9月6日（土）午前10時〜正午\n会場: ノースゲート・カンファレンスセンター スイート400\n\n主なテーマ：年金・401(k)の活用、ライフステージ別リスク管理、社会保障の受給タイミング戦略、相続計画の基礎\n\n定員40名。軽食を提供。登録者全員に「あなたの退職ロードマップ」ガイドを無料進呈。\n\n登録はウェブサイトまたは電話で9月1日まで。当日参加不可。\n\nこのセミナーは教育目的であり、投資アドバイスの提供を意図するものではありません。',
    [
      {
        q: 'What is offered to all registered participants?',
        choices: [
          'A free consultation with a financial planner',
          'A complimentary guidebook',
          'A discount on investment services',
          'A certificate of completion',
        ],
        answer: 1,
        explanation: '「All registered participants will receive a complimentary copy of our guide」= 無料ガイドブックの配布。complimentary = free の言い換え。',
      },
      {
        q: 'What is suggested about the seminar?',
        choices: [
          'It is open to walk-in attendees.',
          'It will be held in the morning.',
          'It costs $40 to attend.',
          'It is intended for financial professionals only.',
        ],
        answer: 1,
        explanation: '「10:00 A.M. – 12:00 P.M.」= 午前中に開催される。ウォークイン不可、参加無料、一般向けという記述から他の選択肢は誤り。',
      },
      {
        q: 'What is the deadline to register for the seminar?',
        choices: ['August 31', 'September 1', 'September 5', 'September 6'],
        answer: 1,
        explanation: '「call (800) 555-0192 by September 1」= 登録締め切りは9月1日。September 6 はセミナー当日。',
      },
    ],
  ),
  s(
    'p721',
    '社内告知',
    'MEMORANDUM\n\nTo: All Department Heads\nFrom: Finance Division\nDate: November 3\nRe: Year-End Budget Submission Deadline\n\nThis is a reminder that all department budget proposals for the upcoming fiscal year must be submitted to the Finance Division no later than November 30. Proposals received after this date will not be included in the consolidated budget report presented to the executive committee on December 8.\n\nEach proposal must include:\n1. A line-item breakdown of projected expenses\n2. A justification for any increase exceeding 5% over the current year\'s allocation\n3. Headcount projections through December of the following year\n\nTemplates are available on the company intranet under Finance > Budget Forms. Please use only the current versions, as the templates were updated in October.\n\nDepartment heads who require clarification on any line item should contact Budget Analyst Sylvia Park at extension 3305.',
    '社内メモ\n宛先: 全部門長　差出人: 財務部　日付: 11月3日\n件名: 年度末予算提出期限\n\n来年度の全部門予算案を11月30日までに財務部へ提出してください。期限後に受領した提案は、12月8日の経営幹部向け統合予算報告書に含まれません。\n\n各提案に必要な内容：\n1. 費目別の支出見込み\n2. 今年度配分から5%超の増加がある場合の根拠\n3. 翌年12月までの人員計画\n\nテンプレートは社内イントラネット（Finance > Budget Forms）に掲載。10月に更新されたため、最新版を使用してください。\n\n各項目について確認が必要な場合は、予算アナリストのシルビア・パーク（内線3305）にご連絡ください。',
    [
      {
        q: 'What is the main purpose of this memo?',
        choices: [
          'To announce a new budget approval process',
          'To remind department heads of an upcoming deadline',
          'To introduce a new budget analyst',
          'To report the results of the current fiscal year',
        ],
        answer: 1,
        explanation: '「This is a reminder that all department budget proposals … must be submitted … no later than November 30」= 期限のリマインダー。',
      },
      {
        q: 'According to the memo, what must be included when expenses increase by more than 5%?',
        choices: [
          'A signature from the division director',
          'A written justification',
          'An updated headcount report',
          'Approval from the executive committee',
        ],
        answer: 1,
        explanation: '「A justification for any increase exceeding 5%」= 5%超の増加には根拠説明が必要。justification = written justification の言い換え。',
      },
      {
        q: 'What is indicated about the budget templates?',
        choices: [
          'They must be requested from Sylvia Park.',
          'They were recently revised.',
          'They are only available in printed form.',
          'They are the same as last year\'s versions.',
        ],
        answer: 1,
        explanation: '「the templates were updated in October」= 最近改訂された。updated = recently revised の言い換え。',
      },
    ],
  ),
  s(
    'p722',
    '記事',
    'RIVERSIDE HERALD — Business Section, February 19\n\nCredit Union Opens Branch to Serve Underbanked Residents\n\nRiverdale Community Credit Union (RCCU) opened its newest branch on Monday at 340 Fulton Street in the Westfield neighborhood, an area where access to mainstream banking services has historically been limited.\n\n"We know that many households here rely on expensive check-cashing services and payday lenders because traditional banks have not served them," said RCCU President Dana Alcott. "Our goal is to offer fair rates and financial education, not just accounts."\n\nThe branch will offer free checking accounts with no minimum balance, low-interest personal loans, and a financial literacy workshop series beginning in March. The workshops, open to all community members regardless of membership, will cover topics such as budgeting, building credit, and saving for emergencies.\n\nRCCU was founded in 1971 and currently serves more than 45,000 members across five branches. The Fulton Street location marks the organization\'s first expansion in six years.\n\nLocal council member Patricia Yuen praised the opening, calling it "a genuine investment in the economic well-being of our neighborhood."',
    'リバーサイド・ヘラルド ビジネス面 2月19日\n\n信用組合が未銀行化住民向け支店を開設\n\nリバーデール・コミュニティ信用組合（RCCU）は月曜日、ウェストフィールド地区のフルトン通り340番地に新支店を開設した。この地区では従来、主流の銀行サービスへのアクセスが限られていた。\n\nRCCU代表のダナ・アルコットは「多くの世帯が高額なチェック換金サービスや給料日ローンに頼っているのは、従来の銀行が彼らにサービスを提供してこなかったからです。私たちの目標は、口座だけでなく、適正な金利と金融教育を提供することです」と語った。\n\nこの支店では、最低残高不要の無料当座預金口座、低利の個人ローン、3月から始まる金融リテラシーワークショップシリーズを提供する。ワークショップはメンバー以外にも開放され、予算管理、信用スコアの構築、緊急時の貯蓄などを扱う。\n\nRCCUは1971年に設立され、現在5支店で4万5千人以上の会員にサービスを提供している。フルトン通り店は6年ぶりの新規出店となる。\n\n地区議員のパトリシア・ユエン氏は今回の開設を「地域の経済的健全性への真の投資」と評価した。',
    [
      {
        q: 'Why did RCCU open a branch in the Westfield neighborhood?',
        choices: [
          'To replace a branch that recently closed',
          'To serve residents who lack access to banking services',
          'To compete with a new bank in the area',
          'To expand its commercial lending operations',
        ],
        answer: 1,
        explanation: '「an area where access to mainstream banking services has historically been limited」= 銀行サービスが行き届いていない地域の住民のため。',
      },
      {
        q: 'What is indicated about the financial literacy workshops?',
        choices: [
          'They are restricted to RCCU members.',
          'They will begin in February.',
          'They are open to the broader community.',
          'They focus exclusively on investment strategies.',
        ],
        answer: 2,
        explanation: '「open to all community members regardless of membership」= 会員でなくても参加可能。',
      },
      {
        q: 'What is suggested about RCCU\'s recent history?',
        choices: [
          'It has been expanding rapidly each year.',
          'It has not opened a new branch for several years.',
          'It recently merged with another financial institution.',
          'It relocated its headquarters last year.',
        ],
        answer: 1,
        explanation: '「the organization\'s first expansion in six years」= 6年ぶりの出店 = 数年間新支店を開設していなかったことが示唆される。',
      },
    ],
  ),
  s(
    'p723',
    'お知らせ',
    'FAIRMONT CIVIC CENTER\nNotice of Temporary Closure — Aquatic Facility\n\nThe Fairmont Civic Center Aquatic Facility will be closed from Monday, August 4, through Friday, August 15, for scheduled maintenance and resurfacing of the competition pool.\n\nDuring this period:\n• All lap swimming sessions, water aerobics classes, and swim team practices are suspended.\n• The dry fitness areas, including the weight room and cardio floor, will remain open during regular hours (6:00 A.M. – 10:00 P.M.).\n• Annual pass holders will receive a prorated credit for the closure period, automatically applied to the next billing cycle.\n\nThe Civic Center apologizes for any inconvenience. We encourage members to visit the Hillside Recreation Center (82 Hillside Drive), which has extended its lap lane availability during this period as a courtesy to displaced swimmers.\n\nThe aquatic facility is expected to reopen on Monday, August 18. For updates, follow @FairmontCivic on social media or call (555) 722-4400.',
    'フェアモント市民センター\n一時閉鎖のお知らせ — 水泳施設\n\nフェアモント市民センターの水泳施設は、競技プールのメンテナンスと表面補修のため、8月4日（月）から8月15日（金）まで閉鎖します。\n\nこの期間中：\n・レーン水泳、水中エアロビクス、スイムチームの練習はすべて休止。\n・ウェイトルームやカーディオフロアを含むドライフィットネスエリアは通常時間帯（午前6時〜午後10時）も引き続き利用可能。\n・年間パス保有者には、閉鎖期間分の日割りクレジットが次回請求時に自動的に適用されます。\n\nご不便をおかけして申し訳ありません。影響を受ける水泳愛好者のためにレーンを延長したヒルサイド・レクリエーションセンター（ヒルサイドドライブ82番地）の利用をお勧めします。\n\n水泳施設は8月18日（月）に再開予定です。最新情報はSNSまたは電話（555-722-4400）でご確認ください。',
    [
      {
        q: 'Why will the aquatic facility be closed?',
        choices: [
          'Due to a water quality issue',
          'For scheduled repairs and resurfacing',
          'Because of a staffing shortage',
          'To host a regional swim competition',
        ],
        answer: 1,
        explanation: '「scheduled maintenance and resurfacing of the competition pool」= 予定されたメンテナンスと補修工事のため。',
      },
      {
        q: 'What will remain available at the Civic Center during the closure?',
        choices: [
          'Water aerobics classes',
          'The lap swimming lanes',
          'The weight room and cardio floor',
          'Swim team practice sessions',
        ],
        answer: 2,
        explanation: '「The dry fitness areas, including the weight room and cardio floor, will remain open」= ウェイトルームとカーディオフロアは利用継続。',
      },
      {
        q: 'What is NOT mentioned as a way to get updates about the reopening?',
        choices: [
          'Calling the Civic Center',
          'Visiting the Hillside Recreation Center',
          'Following social media accounts',
          'Checking a website',
        ],
        answer: 3,
        explanation: 'NOT問題。電話・SNSは明示されているが、ウェブサイト確認は記載されていない（Hillside は代替施設の案内であり情報源ではない）。',
      },
    ],
  ),
  s(
    'p724',
    'チャット',
    'Priya Mehta [2:04 P.M.]\nHi Marco, the catering vendor just confirmed they can only deliver the lunch boxes by 12:30, not 12:00 as we requested. The opening keynote ends at 12:15.\n\nMarco Falcone [2:06 P.M.]\nThat\'s a tight window. How many boxes are we talking about?\n\nPriya Mehta [2:07 P.M.]\n160. They said they can split the delivery — half at 12:15, the rest by 12:30.\n\nMarco Falcone [2:09 P.M.]\nThat could work. We\'ll need a few volunteers at the loading dock. I can ask the event committee.\n\nPriya Mehta [2:10 P.M.]\nGood idea. Also, should we shift the breakout sessions back by fifteen minutes to give everyone time to collect their lunch?\n\nMarco Falcone [2:12 P.M.]\nI think that\'s wise. Let me update the schedule and send the revised agenda to all attendees by end of day.\n\nPriya Mehta [2:13 P.M.]\nPerfect. I\'ll confirm the split delivery with the vendor now.',
    'プリヤ [14:04] マルコ、ケータリング業者から連絡があって、ランチボックスの配達が要望の12時ではなく12時30分になるとのこと。開幕基調講演が12時15分に終わるのに。\nマルコ [14:06] かなりギリギリだね。何個の話？\nプリヤ [14:07] 160個。配達を分けられるって — 前半を12時15分、残りを12時30分までに。\nマルコ [14:09] それでいけるかも。荷捌き場に何人かボランティアが必要だね。イベント委員会に聞いてみる。\nプリヤ [14:10] いい考え。あと、ランチを受け取る時間をとるため、分科会セッションを15分遅らせるべきかな？\nマルコ [14:12] それが賢明だと思う。スケジュールを更新して、今日中に参加者全員に改訂版アジェンダを送るよ。\nプリヤ [14:13] 完璧。私は今から業者に分割配達を確認する。',
    [
      {
        q: 'What problem are Priya and Marco discussing?',
        choices: [
          'A keynote speaker has canceled.',
          'A catering delivery will be later than planned.',
          'The number of lunch boxes is insufficient.',
          'The loading dock is unavailable.',
        ],
        answer: 1,
        explanation: '「the catering vendor … can only deliver … by 12:30, not 12:00 as we requested」= 配達が予定より遅れる問題。',
      },
      {
        q: 'What does Marco agree to do?',
        choices: [
          'Contact the catering vendor directly',
          'Update and redistribute the event schedule',
          'Organize the volunteers at the loading dock himself',
          'Cancel the afternoon breakout sessions',
        ],
        answer: 1,
        explanation: '「Let me update the schedule and send the revised agenda to all attendees by end of day」= スケジュール更新とアジェンダ再送が彼の役割。',
      },
      {
        q: 'At 2:12 P.M., what does Marco mean when he writes, "I think that\'s wise"?',
        choices: [
          'He agrees that they should hire more volunteers.',
          'He supports delaying the breakout sessions.',
          'He believes the vendor should be replaced.',
          'He approves of splitting the keynote address.',
        ],
        answer: 1,
        explanation: '書き手の意図問題。直前のプリヤの提案「breakout sessions を15分遅らせるべきか」への同意表現。',
      },
      {
        q: 'What will Priya do next?',
        choices: [
          'Update the event agenda',
          'Recruit volunteers for the loading dock',
          'Confirm the split delivery arrangement',
          'Reschedule the opening keynote',
        ],
        answer: 2,
        explanation: '最後のメッセージ「I\'ll confirm the split delivery with the vendor now」= 分割配達の確認が次のアクション。',
      },
    ],
  ),
  s(
    'p725',
    'FAQ',
    'FREQUENTLY ASKED QUESTIONS — Greenfield Municipal Composting Program\n\nQ: Who is eligible to participate in the composting program?\nA: All residents of Greenfield with a valid municipal services account are eligible. Renters in multi-unit buildings should check with their building manager, as participation depends on whether the property has enrolled.\n\nQ: What materials can be placed in the green composting bin?\nA: Accepted materials include fruit and vegetable scraps, coffee grounds and filters, tea bags, eggshells, yard trimmings, and non-coated paper towels. Meat, dairy, oils, and processed foods are not accepted, as they attract pests and disrupt the composting process.\n\nQ: How often are the green bins collected?\nA: Green bins are collected every two weeks on the same day as your regular recycling pickup. A collection calendar can be downloaded from the city website.\n\nQ: What happens to the finished compost?\nA: The compost is processed at the Greenfield Organic Facility and made available free of charge to residents each spring through the Community Compost Giveaway event.\n\nQ: Is there a fee to join the program?\nA: No. The program is free for all eligible residents. Replacement bins, however, incur a $15 replacement fee.',
    'よくある質問 — グリーンフィールド市コンポストプログラム\n\nQ: 参加資格は？\nA: 有効な市営サービスアカウントを持つグリーンフィールド市民全員が対象です。集合住宅の賃借人は、物件が参加登録しているかをビル管理者に確認してください。\n\nQ: 緑のゴミ箱に入れられるものは？\nA: 果物・野菜くず、コーヒーかすとフィルター、ティーバッグ、卵の殻、庭の刈り取りくず、コーティングなしのペーパータオルが可。肉・乳製品・油・加工食品は害獣を呼び込み、プロセスを乱すため不可。\n\nQ: 収集頻度は？\nA: 2週間ごと、通常の資源ゴミ収集と同じ日。収集カレンダーは市ウェブサイトからダウンロード可能。\n\nQ: できたコンポストはどうなる？\nA: グリーンフィールド有機物処理施設で処理され、毎春の「コミュニティ・コンポスト贈呈イベント」で市民に無料配布される。\n\nQ: プログラムへの参加に費用はかかる？\nA: いいえ、無料です。ただし、ゴミ箱の交換には15ドルの費用がかかります。',
    [
      {
        q: 'According to the FAQ, what should renters in apartment buildings do before joining the program?',
        choices: [
          'Pay a registration fee online',
          'Download a collection calendar',
          'Check with their building manager',
          'Request a green bin from the city',
        ],
        answer: 2,
        explanation: '「Renters in multi-unit buildings should check with their building manager」= ビル管理者に確認するよう指示されている。',
      },
      {
        q: 'Which of the following items is NOT accepted in the green composting bin?',
        choices: [
          'Coffee grounds',
          'Eggshells',
          'Yard trimmings',
          'Dairy products',
        ],
        answer: 3,
        explanation: 'NOT問題。「Meat, dairy, oils, and processed foods are not accepted」= 乳製品は不可。他の三つは受け入れ可能品として明記されている。',
      },
      {
        q: 'What is suggested about the finished compost?',
        choices: [
          'It is sold to local farms at a reduced price.',
          'It is distributed to residents at no cost.',
          'It is available year-round at a city facility.',
          'It can be picked up at the recycling center.',
        ],
        answer: 1,
        explanation: '「made available free of charge to residents each spring」= 無料で配布される。at no cost = free of charge の言い換え。',
      },
    ],
  ),
  s(
    'p726',
    '求人広告',
    'POSITION OPENING — PROGRAM COORDINATOR\nBrightPath Nonprofit Foundation\n\nBrightPath Nonprofit Foundation, dedicated to expanding access to vocational training for underserved adults, is seeking a full-time Program Coordinator to join its downtown headquarters team.\n\nResponsibilities:\n• Coordinate enrollment for vocational training courses in partnership with twelve community colleges\n• Serve as the primary contact for program participants, providing guidance on course selection and funding options\n• Compile monthly progress reports for grant funders\n• Support the planning of the annual Workforce Readiness Conference\n\nQualifications:\n• Bachelor\'s degree required; field of study in social work, education, or a related area preferred\n• Minimum two years of experience in a nonprofit or community services role\n• Demonstrated proficiency in Microsoft Office and database management\n• Bilingual (English/Spanish) strongly preferred\n\nSalary: $48,000–$54,000 per year, commensurate with experience\nBenefits: Health, dental, and vision insurance; 15 days paid leave; employer-matched retirement contributions\n\nTo apply, submit a cover letter and résumé to hr@brightpathfoundation.org by July 15. No phone inquiries, please.',
    'ブライトパス非営利財団 — プログラムコーディネーター募集\n\n不遇な立場の成人向け職業訓練の普及を使命とするブライトパス非営利財団は、市内中心部の本部に加わるフルタイムのプログラムコーディネーターを募集しています。\n\n主な業務：\n・12のコミュニティカレッジと連携した職業訓練コースの入学管理\n・参加者の主要窓口としてコース選択と助成金オプションの案内\n・助成金提供者向け月次進捗レポートの作成\n・年次ワークフォース・レディネス会議の企画サポート\n\n応募資格：\n・学士号必須（社会福祉、教育または関連分野優遇）\n・非営利またはコミュニティサービス分野での2年以上の経験\n・Microsoft OfficeおよびデータベースのスキルのあるPatricia\n・英語・スペイン語バイリンガルを強く推奨\n\n給与：年間4万8千〜5万4千ドル（経験に応じる）\n福利厚生：健康・歯科・視力保険、有給15日、雇用主マッチング退職積立金\n\n応募は7月15日までにカバーレターと履歴書をhr@brightpathfoundation.orgへ。電話での問い合わせは不可。',
    [
      {
        q: 'What is the main focus of BrightPath Nonprofit Foundation?',
        choices: [
          'Providing scholarships for university students',
          'Offering vocational training access to underserved adults',
          'Operating a network of community colleges',
          'Publishing research on workforce development',
        ],
        answer: 1,
        explanation: '「dedicated to expanding access to vocational training for underserved adults」= 不遇な立場の成人への職業訓練機会の拡大が使命。',
      },
      {
        q: 'What is indicated about the Program Coordinator position?',
        choices: [
          'It requires a graduate degree.',
          'It involves writing reports for grant funders.',
          'It is a part-time remote role.',
          'It requires five or more years of experience.',
        ],
        answer: 1,
        explanation: '「Compile monthly progress reports for grant funders」= 助成金提供者向けレポート作成が業務のひとつ。',
      },
      {
        q: 'How should applicants submit their materials?',
        choices: [
          'By mailing a printed résumé to the headquarters',
          'By calling the HR department',
          'By emailing a cover letter and résumé',
          'By completing an online application form',
        ],
        answer: 2,
        explanation: '「submit a cover letter and résumé to hr@brightpathfoundation.org」= メールで提出。No phone inquiries とも明示されている。',
      },
    ],
  ),
  s(
    'p727',
    'レビュー',
    'Customer Review — Harvest & Grain Restaurant\nPosted on DineLocal.com | Rating: 4/5 stars\n\nI visited Harvest & Grain last Saturday with three colleagues for a working lunch. The restaurant is located in the old Fenwick Building — the exposed brick walls and large windows give it a relaxed, upscale feel without being stuffy.\n\nThe seasonal menu was impressive. I ordered the roasted beet and quinoa salad, which was beautifully presented and genuinely flavorful. One colleague had the pan-seared trout and said it was the best fish dish she had tried in months. However, our fourth colleague, who has a nut allergy, found the menu a bit frustrating — several items included nuts without clearly labeling allergens.\n\nService was attentive and paced well for a business lunch. Our server knew the menu thoroughly and was happy to describe preparation methods. The only real downside was the noise level: the hard surfaces make conversation difficult when the restaurant fills up, and by 1:00 P.M. it was quite loud.\n\nPrices are mid-range for the area — our group of four spent about $180 in total, including a shared appetizer and non-alcoholic beverages. I would return, but I\'d ask for a table near the back where it\'s reportedly quieter.',
    'Harvest & Grain レストランのレビュー\nDineLocal.com 投稿 | 評価：4/5\n\n先週の土曜日、同僚3人とワーキングランチでハーベスト&グレインを訪れました。古いフェンウィックビルに入っており、むき出しのレンガ壁と大きな窓が、堅苦しくないくつろいだ高級感を醸し出しています。\n\n季節のメニューは印象的でした。私はローストビーツとキヌアのサラダを注文しましたが、見た目も美しく本当においしかった。ある同僚はスキレットトラウトを注文し、ここ数カ月で最高の魚料理だと言っていました。ただ、ナッツアレルギーのある同僚は、アレルゲンが明記されていない料理が多く、少し困っていました。\n\nサービスはビジネスランチに適したテンポで、スタッフは料理に詳しく調理法の説明も丁寧でした。唯一の欠点は騒音レベル：硬い内装面のため、席が埋まると会話が難しくなります。午後1時には非常に騒がしくなっていました。\n\n価格は地域相場の中程度で、前菜のシェアとノンアルコール飲料を含む4人分の合計は約180ドルでした。また訪れたいですが、静かとされる奥のテーブルを指定すると思います。',
    [
      {
        q: 'What is one criticism the reviewer makes about Harvest & Grain?',
        choices: [
          'The food portions were too small.',
          'The prices were too high for the quality.',
          'Allergen information was not clearly provided.',
          'The service was slow during the lunch hour.',
        ],
        answer: 2,
        explanation: '「several items included nuts without clearly labeling allergens」= アレルゲン表示が不十分という批判。',
      },
      {
        q: 'What is suggested about the reviewer?',
        choices: [
          'He or she visited the restaurant for a social event.',
          'He or she plans to return to the restaurant.',
          'He or she works in the food and beverage industry.',
          'He or she has visited the restaurant many times before.',
        ],
        answer: 1,
        explanation: '「I would return, but I\'d ask for a table near the back」= 再訪の意向が示されている。',
      },
      {
        q: 'According to the review, approximately how much did the group spend per person?',
        choices: [
          'Around $25',
          'Around $35',
          'Around $45',
          'Around $60',
        ],
        answer: 2,
        explanation: '「our group of four spent about $180 in total」= 4人で約180ドル → 1人あたり約45ドル。計算問題。',
      },
    ],
  ),
  s(
    'p728',
    'ウェブページ',
    'LAKEVIEW CITY GOVERNMENT\nOfficial Website — Parks & Recreation Department\n\nSummer Concert Series — Lakefront Amphitheater\n\nThe Parks & Recreation Department is proud to present the 12th Annual Summer Concert Series, running every Friday evening from June 20 through August 22. All performances begin at 7:30 P.M. and are free to the public.\n\nThis year\'s lineup features local and regional artists performing a variety of genres, including jazz, folk, and classical. The full schedule and artist profiles are available on this page.\n\nVenues and Parking:\nThe Lakefront Amphitheater is located at 55 Marina Drive. Free parking is available at the adjacent City Lot B (enter from Harbor Street). Overflow parking is available two blocks east at the Municipal Garage (fee: $5 flat rate). Attendees are encouraged to arrive by 7:00 P.M. as the amphitheater fills quickly on warm evenings.\n\nFood and Beverage:\nThe Friends of Lakefront Parks will operate a concession stand offering snacks and beverages on all concert nights. Outside food and non-alcoholic beverages are welcome. No alcohol may be brought onto the amphitheater grounds.\n\nAccessibility:\nWheelchair-accessible seating is available in sections A and C. Guests requiring accommodations should contact our office at (555) 801-2200 at least 48 hours in advance.',
    'レイクビュー市公式サイト — 公園・レクリエーション局\nサマーコンサートシリーズ — レイクフロント野外劇場\n\n公園・レクリエーション局は第12回年次サマーコンサートシリーズを6月20日から8月22日まで毎週金曜夜に開催します。全公演は午後7時30分開始、入場無料です。\n\n今年のラインナップはジャズ、フォーク、クラシックを含むさまざまなジャンルの地元・地域アーティストです。全スケジュールとアーティスト情報はこのページに掲載。\n\n会場と駐車場：\n野外劇場はマリナドライブ55番地。隣接する市ロットB（ハーバーストリートから入場）は無料。2ブロック東の市営ガレージは5ドルで利用可能。暖かい夜は満席になりやすいため、午後7時までの到着をお勧めします。\n\n飲食：\nレイクフロント公園の友の会がスナックと飲料を提供。外からの食べ物とノンアルコール飲料の持ち込み可。アルコールの持ち込みは不可。\n\nアクセシビリティ：\n車いす対応席はAセクションとCセクションに設置。特別配慮が必要な方は48時間前までに電話でご連絡ください。',
    [
      {
        q: 'What is stated about the Summer Concert Series performances?',
        choices: [
          'They are held on Saturday evenings.',
          'Admission is free for all attendees.',
          'They feature only jazz and classical music.',
          'Each concert ends at 7:30 P.M.',
        ],
        answer: 1,
        explanation: '「All performances … are free to the public」= 全公演無料。毎週金曜の開催で、7:30 は終了ではなく開始時刻。',
      },
      {
        q: 'What are attendees NOT permitted to bring onto the amphitheater grounds?',
        choices: [
          'Non-alcoholic beverages',
          'Outside food',
          'Alcoholic beverages',
          'Portable chairs',
        ],
        answer: 2,
        explanation: 'NOT問題。「No alcohol may be brought onto the amphitheater grounds」= アルコールの持ち込みは禁止。食べ物とノンアルコール飲料は持ち込み可と明記。',
      },
      {
        q: 'What should guests with accessibility needs do?',
        choices: [
          'Arrive at least two hours before the show',
          'Contact the office at least 48 hours in advance',
          'Purchase a special ticket online',
          'Request seating through the Friends of Lakefront Parks',
        ],
        answer: 1,
        explanation: '「Guests requiring accommodations should contact our office … at least 48 hours in advance」= 48時間前までに連絡が必要。',
      },
    ],
  ),
  s(
    'p729',
    'メモ',
    'INTERNAL MEMO\n\nTo: Logistics Team\nFrom: Warehouse Manager, Kenji Tashiro\nDate: March 7\nRe: Updated Receiving Procedures for Perishable Goods\n\nEffective March 15, all perishable goods received at the warehouse must follow the updated intake protocol below. These changes are in response to the temperature excursion incident recorded in February and are intended to prevent spoilage and ensure compliance with our food safety certification.\n\n1. Upon arrival, all perishable shipments must be temperature-checked using the calibrated probe thermometer stored in the receiving bay. Results must be logged in the Delivery Inspection Log (paper form DI-07) and photographed.\n\n2. Any shipment arriving outside the acceptable temperature range (2°C–8°C for refrigerated goods; -18°C or below for frozen) must be quarantined in the holding area and reported to the Quality Assurance team immediately. Do not accept or sign for the shipment until QA clears it.\n\n3. All receiving staff must complete the refresher training module (available on the company intranet) by March 14. Completion must be confirmed to Supervisor Chen.\n\nFailure to follow these procedures may result in certification loss and disciplinary action. Questions? Contact me directly.',
    '社内メモ\n宛先: 物流チーム　差出人: 倉庫マネージャー 田代健司　日付: 3月7日\n件名: 生鮮品受領手順の更新\n\n3月15日より、倉庫で受領するすべての生鮮品は以下の更新された受入プロトコルに従ってください。これは2月の温度逸脱インシデントを受けたもので、腐敗防止と食品安全認証の遵守を目的としています。\n\n1. 到着時に受領ベイの検定済み温度プローブ温度計で温度確認を行い、配送検査ログ（紙フォームDI-07）に記録・写真撮影すること。\n\n2. 許容温度範囲外の荷物（冷蔵：2〜8°C、冷凍：-18°C以下）はホールディングエリアに隔離し、品質保証チームに即報告。QAの承認なしに受領・署名しないこと。\n\n3. 受領スタッフ全員が3月14日までに社内イントラネットの復習トレーニングモジュールを完了し、陳スーパーバイザーに報告すること。\n\n手順に従わない場合、認証取り消しや懲戒処分になる可能性があります。質問は直接ご連絡ください。',
    [
      {
        q: 'Why were the new receiving procedures introduced?',
        choices: [
          'To reduce overtime hours for receiving staff',
          'To address a temperature problem that occurred in February',
          'To prepare for an upcoming inspection by a health authority',
          'To comply with new government regulations',
        ],
        answer: 1,
        explanation: '「in response to the temperature excursion incident recorded in February」= 2月の温度逸脱インシデントへの対応として変更された。',
      },
      {
        q: 'According to the memo, what should staff do if a shipment arrives outside the acceptable temperature range?',
        choices: [
          'Return it to the supplier immediately',
          'Accept it and flag it in the log',
          'Quarantine it and notify the Quality Assurance team',
          'Contact the warehouse manager before doing anything',
        ],
        answer: 2,
        explanation: '「must be quarantined … and reported to the Quality Assurance team immediately」= 隔離してQAチームへ即報告。',
      },
      {
        q: 'What must receiving staff do by March 14?',
        choices: [
          'Submit a written report to Kenji Tashiro',
          'Complete a refresher training module',
          'Pick up calibrated thermometers from storage',
          'Update the paper form DI-07 template',
        ],
        answer: 1,
        explanation: '「All receiving staff must complete the refresher training module … by March 14」= 3月14日までにトレーニングモジュールを完了する。',
      },
    ],
  ),
  s(
    'p730',
    '手紙',
    'April 3\n\nMs. Helena Voss\nExecutive Director\nTristam Youth Arts Foundation\n74 Clearwater Road\nSomerville, MA 02143\n\nDear Ms. Voss,\n\nI am writing on behalf of the Somerville Cultural Grants Committee to inform you that the Tristam Youth Arts Foundation has been selected to receive a Community Arts Development Grant in the amount of $25,000 for the current fiscal year. This award was among fifty-two applications reviewed by our panel of independent evaluators.\n\nThe grant is intended to support the expansion of your after-school visual arts program into two additional community centers in the eastern district, as described in your application. Funds must be used for this stated purpose and cannot be redirected without written approval from our office.\n\nPlease note that a mid-year progress report is required by October 15, and a final report with receipts must be submitted within sixty days of the fiscal year end. Failure to submit reports on time may affect future grant eligibility.\n\nA grant agreement will be sent to your office within ten business days. Please sign and return both copies. If you have any questions about the award terms, contact Grants Administrator Paul Liao at pliao@somervillecultural.gov.\n\nCongratulations on this achievement.\n\nSincerely,\nDr. Margaret Chu\nChair, Somerville Cultural Grants Committee',
    '4月3日\n\nヘレナ・ヴォス様\nトリスタム青少年芸術財団 エグゼクティブ・ディレクター\n\n拝啓\n\nサマービル文化助成委員会を代表して、トリスタム青少年芸術財団が今会計年度のコミュニティ芸術開発助成金として25,000ドルを受賞されたことをお知らせします。この賞は52件の応募から独立評価委員会が選定しました。\n\nこの助成金は、東部地区の2つの追加コミュニティセンターへの放課後視覚芸術プログラム拡大（申請書記載の内容）を支援するものです。助成金は記載された目的のみに使用でき、当委員会の書面による承認なしに転用することはできません。\n\n10月15日までの中間進捗報告書の提出と、会計年度終了後60日以内の領収書付き最終報告書の提出が必要です。期限内に提出しない場合、将来の助成金資格に影響する可能性があります。\n\n助成金協定書を10営業日以内に送付しますので、2部に署名の上ご返送ください。条件に関するご質問はグランツ・アドミニストレーターのポール・リャオ（pliao@somervillecultural.gov）にご連絡ください。\n\nこの受賞を心よりお祝い申し上げます。\n\n敬具\nマーガレット・チュー博士\nサマービル文化助成委員会 委員長',
    [
      {
        q: 'What is the purpose of this letter?',
        choices: [
          'To request additional information from the Foundation',
          'To notify the Foundation that it has received a grant',
          'To invite the Foundation to apply for future funding',
          'To acknowledge receipt of a progress report',
        ],
        answer: 1,
        explanation: '「to inform you that the Tristam Youth Arts Foundation has been selected to receive a … Grant」= 助成金受賞の通知が目的。',
      },
      {
        q: 'According to the letter, what is one requirement for using the grant funds?',
        choices: [
          'Funds must be spent within the first quarter.',
          'Funds must be used only for the purpose described in the application.',
          'Half of the funds must be matched by private donations.',
          'Funds must be deposited into a dedicated bank account.',
        ],
        answer: 1,
        explanation: '「Funds must be used for this stated purpose and cannot be redirected without written approval」= 申請書記載の目的のみに使用すること。',
      },
      {
        q: 'What is NOT mentioned as a reporting requirement?',
        choices: [
          'A mid-year progress report due October 15',
          'A final report with receipts',
          'A quarterly financial summary',
          'Submission of reports within sixty days of fiscal year end',
        ],
        answer: 2,
        explanation: 'NOT問題。中間報告・領収書付き最終報告・会計年度後60日以内の提出は明記されているが、四半期財務サマリーは言及なし。',
      },
    ],
  ),
];
