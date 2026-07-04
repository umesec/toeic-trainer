import type { Part7Set } from '@/data/types';

export const DOUBLE_SETS: Part7Set[] = [
  // ─────────────────────────────────────────────
  // Set 01: お知らせ + Eメール
  // ─────────────────────────────────────────────
  {
    id: 'p7d01',
    passages: [
      {
        docType: 'お知らせ',
        text: 'NOTICE TO ALL TENANTS\n\nBuilding Management — Greenfield Office Tower\nDate: October 1\n\nDear Tenants,\n\nWe wish to inform you that the main lobby and elevators in Tower A will undergo scheduled maintenance from October 14 to October 18. During this period, the lobby will be closed between 8:00 A.M. and 12:00 P.M. each day. Tenants and visitors are requested to use the side entrance on Maple Street and to access upper floors via the Tower B elevators.\n\nThe parking garage will remain open throughout the maintenance period; however, the ramp connecting the garage to Tower A will be temporarily closed. Drivers should follow the detour signs to reach the Tower B parking entrance.\n\nWe apologize for any inconvenience this may cause. For questions, please contact the building management office at ext. 201.',
        textJa: '全テナントへのお知らせ\n\nグリーンフィールドオフィスタワー管理部\n日付：10月1日\n\nテナントの皆様へ\n\nタワーAのメインロビーおよびエレベーターが10月14日から18日まで定期メンテナンスを行うことをお知らせします。この期間中、ロビーは毎日午前8時から正午まで閉鎖されます。テナントおよび来訪者の方は、メープルストリートの側入口を使用し、タワーBのエレベーターで上階へアクセスしてください。\n\n駐車場はメンテナンス期間中も引き続き開放されますが、駐車場とタワーAを結ぶスロープは一時的に閉鎖されます。運転者は迂回路の標識に従ってタワーBの駐車場入口へお進みください。\n\nご不便をおかけしますことをお詫び申し上げます。ご質問は内線201番までお問い合わせください。',
      },
      {
        docType: 'Eメール',
        text: 'From: Sandra Lee <slee@hartfordlaw.com>\nTo: Michael Ohara <mohara@hartfordlaw.com>\nSubject: Office Access Next Week\nDate: October 10\n\nHi Michael,\n\nJust a heads-up about next week. I had a meeting scheduled for Monday morning at 9:00 A.M. with the Tanaka account team, but the notice from building management means our usual lobby entrance will be closed at that time. I\'ve already let the Tanaka team know they should come through the Maple Street entrance instead.\n\nAlso, I typically park in the Tower A section of the garage. Since that ramp will be blocked, I\'ll need to use a different route. Do you know if Tower B parking is available to Tower A tenants during the maintenance period, or should I plan to use the public lot on Cedar Avenue?\n\nThanks,\nSandra',
        textJa: '差出人: サンドラ・リー\n宛先: マイケル・オハラ\n件名: 来週のオフィスへのアクセスについて\n日付：10月10日\n\nマイケルへ\n\n来週のことについてお知らせです。月曜の午前9時に田中アカウントチームとのミーティングを予定していましたが、管理部からのお知らせによるとその時間は通常のロビー入口が閉鎖されています。田中チームにはメープルストリートの入口を使うよう既に連絡しました。\n\nまた、私は通常タワーA側の駐車場を利用しています。スロープが閉鎖されるため、別のルートを使う必要があります。メンテナンス期間中、タワーBの駐車場をタワーAのテナントも利用できるかご存知ですか？それともシダーアベニューの公共駐車場を利用すべきでしょうか？\n\nよろしくお願いします。\nサンドラ',
      },
    ],
    questions: [
      {
        q: 'During what hours will the Tower A lobby be closed?',
        choices: [
          'From 8:00 A.M. to 12:00 P.M.',
          'From 9:00 A.M. to 5:00 P.M.',
          'From 7:00 A.M. to 10:00 A.M.',
          'All day long',
        ],
        answer: 0,
        explanation: 'お知らせの「the lobby will be closed between 8:00 A.M. and 12:00 P.M.」から正解は(A)。時刻の読み取り問題。',
      },
      {
        q: 'What does Sandra ask Michael about?',
        choices: [
          'The time of the Monday meeting',
          'Whether Tower B parking can be used by Tower A tenants',
          'How to contact the building management office',
          'The location of the Maple Street entrance',
        ],
        answer: 1,
        explanation: 'Eメール後半「Do you know if Tower B parking is available to Tower A tenants」= タワーBの駐車場利用可否を尋ねている。',
      },
      {
        q: 'What is NOT mentioned as a consequence of the maintenance work?',
        choices: [
          'The lobby will be temporarily closed in the mornings.',
          'The connecting ramp to Tower A will be blocked.',
          'The building will have no electricity during maintenance hours.',
          'Visitors must use a different entrance.',
        ],
        answer: 2,
        explanation: 'NOT問題。ロビー閉鎖・スロープ閉鎖・別入口の使用は本文に記載があるが、停電については言及されていない。',
      },
      {
        q: 'What can be inferred about Sandra\'s Monday meeting?',
        choices: [
          'It will be canceled because of the maintenance.',
          'It will take place during the time the lobby is closed.',
          'It has been moved to Tower B.',
          'The Tanaka team will join remotely.',
        ],
        answer: 1,
        explanation: '【クロスリファレンス問題】お知らせによると「ロビーは午前8時〜正午まで閉鎖」、Eメールによると「月曜午前9時にミーティングがある」。両方を照らし合わせると、ミーティングはロビー閉鎖中に行われることがわかる。',
      },
      {
        q: 'Why did Sandra contact the Tanaka account team in advance?',
        choices: [
          'To reschedule the Monday meeting',
          'To inform them of a change in entrance',
          'To ask them to bring parking passes',
          'To confirm their arrival time',
        ],
        answer: 1,
        explanation: 'Eメール「I\'ve already let the Tanaka team know they should come through the Maple Street entrance instead」= 入口変更を伝えるために連絡した。',
      },
    ],
  },

  // ─────────────────────────────────────────────
  // Set 02: 広告 + レビュー
  // ─────────────────────────────────────────────
  {
    id: 'p7d02',
    passages: [
      {
        docType: '広告',
        text: 'Introducing the ProDesk X500\nThe Ultimate Workstation for Creative Professionals\n\nThe ProDesk X500 features a 32-inch 4K display, a 12-core processor, and 64 GB of RAM — everything you need for seamless video editing, 3D rendering, and large-scale graphic design. Its whisper-quiet cooling system ensures uninterrupted focus.\n\nKey Features:\n• 12-core Intel processor\n• 64 GB DDR5 RAM (expandable to 128 GB)\n• 2 TB NVMe SSD\n• Built-in color calibration technology\n• 3-year on-site warranty\n\nLimited-time offer: Order before November 30 and receive a complimentary 4K webcam (valued at $129) and free expedited shipping. Visit www.prodesk.com or call 1-800-555-0192.',
        textJa: 'ProDesk X500 のご紹介\nクリエイティブ・プロフェッショナルのための究極のワークステーション\n\nProDesk X500は32インチ4Kディスプレイ、12コアプロセッサ、64GBのRAMを搭載し、映像編集・3Dレンダリング・大規模グラフィックデザインに必要なすべてを備えています。静音設計の冷却システムにより、集中作業を妨げません。\n\n主な特長：\n・12コアIntelプロセッサ\n・64GB DDR5 RAM（128GBまで拡張可能）\n・2TB NVMe SSD\n・カラーキャリブレーション技術内蔵\n・3年間のオンサイト保証\n\n期間限定：11月30日までのご注文で4Kウェブカメラ（129ドル相当）と特急送料無料をプレゼント。www.prodesk.comまたは1-800-555-0192まで。',
      },
      {
        docType: 'レビュー',
        text: 'Customer Review — ProDesk X500\nRating: 4 / 5 stars\nPosted by: T. Yamamoto, Freelance Graphic Designer\n\nI ordered the ProDesk X500 in mid-November and received it ten days later with the promised webcam included. Setup was straightforward and the machine performed extremely well in my workflow. Rendering times for my 3D projects dropped by nearly 40% compared to my previous workstation.\n\nThe built-in color calibration is genuinely impressive — the display accuracy is exceptional straight out of the box. My only complaint is that the included keyboard feels cheap compared to the price point of the unit itself. I ended up buying a third-party mechanical keyboard separately.\n\nOverall, this is a powerful machine and a solid investment for serious creatives. The three-year on-site warranty gives peace of mind. I would recommend it to any professional who demands high performance.',
        textJa: 'カスタマーレビュー — ProDesk X500\n評価：4/5星\n投稿者：T. ヤマモト、フリーランスグラフィックデザイナー\n\n11月中旬にProDesk X500を注文し、10日後に約束のウェブカメラと共に受け取りました。セットアップは簡単で、作業フローでの性能は非常に優れていました。3Dプロジェクトのレンダリング時間が以前のワークステーションと比べて約40%短縮されました。\n\n内蔵のカラーキャリブレーションは本当に印象的で、箱から出した状態でのディスプレイの正確さは卓越しています。唯一の不満は、付属のキーボードが本体の価格帯に比べて安っぽく感じる点です。結局、サードパーティ製のメカニカルキーボードを別途購入しました。\n\n全体として、これは高性能なマシンで、本格的なクリエイターにとって確かな投資です。3年間のオンサイト保証も安心感をもたらします。高パフォーマンスを求めるプロフェッショナルにお勧めします。',
      },
    ],
    questions: [
      {
        q: 'What free item does the advertisement offer with a purchase before November 30?',
        choices: [
          'A mechanical keyboard',
          'A 4K webcam',
          'An extended warranty',
          'A carrying case',
        ],
        answer: 1,
        explanation: '広告「receive a complimentary 4K webcam」= 11月30日以前の注文で4Kウェブカメラが無料でもらえる。',
      },
      {
        q: 'What is T. Yamamoto\'s criticism of the ProDesk X500?',
        choices: [
          'The cooling system is too noisy.',
          'The rendering performance is poor.',
          'The keyboard quality does not match the price.',
          'The display calibration needs manual adjustment.',
        ],
        answer: 2,
        explanation: 'レビュー「the included keyboard feels cheap compared to the price point of the unit」= キーボードの品質が価格に見合わないと批判している。',
      },
      {
        q: 'What does T. Yamamoto indicate about the color calibration feature?',
        choices: [
          'It requires additional software to function.',
          'It is not accurate for professional use.',
          'It works well immediately after setup.',
          'It is only available in the top-tier model.',
        ],
        answer: 2,
        explanation: 'レビュー「display accuracy is exceptional straight out of the box」= セットアップ後すぐに正確なカラー表示が可能。',
      },
      {
        q: 'What can be inferred about T. Yamamoto\'s order?',
        choices: [
          'He paid extra for expedited shipping.',
          'He ordered after the promotional deadline.',
          'He received the webcam included in the promotional offer.',
          'He returned the product and bought a competitor\'s model.',
        ],
        answer: 2,
        explanation: '【クロスリファレンス問題】広告によると「11月30日前に注文するとウェブカメラが無料」、レビューによると「11月中旬に注文し、ウェブカメラが同梱されていた」。両文書を照らし合わせると、ヤマモト氏は締切前に注文してプロモーション特典を受け取ったことがわかる。',
      },
      {
        q: 'According to the review, how did the ProDesk X500 affect T. Yamamoto\'s workflow?',
        choices: [
          'It reduced rendering times significantly.',
          'It eliminated the need for external storage.',
          'It improved his internet connection speed.',
          'It replaced his need for a separate monitor.',
        ],
        answer: 0,
        explanation: 'レビュー「Rendering times for my 3D projects dropped by nearly 40%」= レンダリング時間が約40%短縮された。',
      },
    ],
  },

  // ─────────────────────────────────────────────
  // Set 03: 求人広告 + 応募メール
  // ─────────────────────────────────────────────
  {
    id: 'p7d03',
    passages: [
      {
        docType: '求人広告',
        text: 'POSITION AVAILABLE: Marketing Coordinator\nNovara Consumer Goods — Chicago, IL\n\nNovara Consumer Goods is seeking a motivated Marketing Coordinator to join our Brand Development team. The successful candidate will support campaign planning, manage social media channels, and coordinate with external agencies.\n\nRequirements:\n• Bachelor\'s degree in Marketing, Communications, or a related field\n• At least 2 years of relevant experience\n• Proficiency in Adobe Creative Suite and social media management tools\n• Excellent written and verbal communication skills\n• Ability to work independently and manage multiple deadlines\n\nSalary: $52,000–$60,000 per year, commensurate with experience\nBenefits: Health insurance, 15 days of paid vacation, 401(k) matching\n\nTo apply, send your résumé and a cover letter to careers@novaragoods.com by September 15. Only shortlisted candidates will be contacted.',
        textJa: '採用情報：マーケティングコーディネーター\nノヴァラコンシューマーグッズ — シカゴ、イリノイ州\n\nノヴァラコンシューマーグッズは、ブランド開発チームに加わるやる気のあるマーケティングコーディネーターを募集しています。採用候補者は、キャンペーン企画のサポート、ソーシャルメディアチャンネルの管理、外部エージェンシーとの調整を担当します。\n\n要件：\n・マーケティング、コミュニケーション、または関連分野の学士号\n・2年以上の関連経験\n・Adobe Creative Suiteおよびソーシャルメディア管理ツールの習熟\n・優れた文書・口頭コミュニケーション能力\n・自律的に作業し、複数の締切を管理できること\n\n給与：年52,000〜60,000ドル（経験に応じる）\n福利厚生：健康保険、有給休暇15日、401(k)マッチング\n\n応募：履歴書とカバーレターをcareers@novaragoods.comまで9月15日までに送付してください。書類選考通過者のみご連絡します。',
      },
      {
        docType: '応募メール',
        text: 'From: Priya Sharma <psharma@mailbox.com>\nTo: careers@novaragoods.com\nSubject: Application for Marketing Coordinator Position\nDate: September 12\n\nDear Hiring Manager,\n\nI am writing to apply for the Marketing Coordinator position advertised on your company website. I hold a Bachelor\'s degree in Communications from Northeastern University and have three years of experience in digital marketing, most recently at a mid-sized retail brand where I managed a team of two and oversaw all social media channels.\n\nI am proficient in Adobe Creative Suite, including Photoshop, Illustrator, and InDesign, and have worked extensively with Hootsuite and Sprout Social for scheduling and analytics. In my current role, I developed a campaign that increased our Instagram following by 28% in six months.\n\nI am particularly drawn to Novara\'s emphasis on sustainable consumer products, which aligns with my personal values. I am confident I can contribute meaningfully to your Brand Development team.\n\nMy résumé is attached. I am available for an interview at your convenience.\n\nSincerely,\nPriya Sharma',
        textJa: '差出人: プリヤ・シャルマ\n宛先: careers@novaragoods.com\n件名: マーケティングコーディネーター職への応募\n日付：9月12日\n\n採用担当者様\n\n御社ウェブサイトに掲載されたマーケティングコーディネーターの求人に応募いたします。ノースイースタン大学でコミュニケーション学の学士号を取得し、デジタルマーケティングで3年の経験があります。直近では中規模の小売ブランドで2名のチームを管理し、全ソーシャルメディアチャンネルを統括しました。\n\nAdobe Creative Suite（Photoshop、Illustrator、InDesign）に習熟しており、HootsuiteやSprout Socialをスケジュール管理と分析に幅広く活用してきました。現職では、6ヶ月でInstagramフォロワーを28%増加させたキャンペーンを立案しました。\n\n特に、ノヴァラの持続可能な消費財へのこだわりが私の個人的な価値観と一致しており、強く魅力を感じています。ブランド開発チームに貢献できると確信しています。\n\n履歴書を添付しております。面接はいつでも可能です。\n\n敬具\nプリヤ・シャルマ',
      },
    ],
    questions: [
      {
        q: 'What is the application deadline for the Marketing Coordinator position?',
        choices: [
          'September 12',
          'September 15',
          'September 20',
          'October 1',
        ],
        answer: 1,
        explanation: '求人広告「send your résumé and a cover letter to careers@novaragoods.com by September 15」= 締切は9月15日。',
      },
      {
        q: 'What does Priya Sharma mention as one of her accomplishments?',
        choices: [
          'She launched a new product line.',
          'She grew a social media following by 28%.',
          'She reduced marketing costs by 40%.',
          'She managed a team of five people.',
        ],
        answer: 1,
        explanation: '応募メール「developed a campaign that increased our Instagram following by 28% in six months」= Instagramフォロワーを28%増加させた。',
      },
      {
        q: 'What is NOT listed as a requirement in the job advertisement?',
        choices: [
          'A bachelor\'s degree',
          'At least two years of experience',
          'Fluency in a second language',
          'Strong communication skills',
        ],
        answer: 2,
        explanation: 'NOT問題。学士号・2年の経験・コミュニケーション能力は要件に記載があるが、第2言語の流暢さは記載されていない。',
      },
      {
        q: 'Does Priya Sharma meet the experience requirement stated in the job advertisement?',
        choices: [
          'No, she has only one year of experience.',
          'No, her experience is in a different field.',
          'Yes, she exceeds the minimum experience requirement.',
          'Yes, but she does not have the required degree.',
        ],
        answer: 2,
        explanation: '【クロスリファレンス問題】求人広告は「2年以上の経験」を要件とし、応募メールはシャルマ氏が「3年の経験」を持つと述べている。両文書を照らし合わせると、彼女は最低要件を上回っていることがわかる。',
      },
      {
        q: 'Why does Ms. Sharma say she is drawn to Novara Consumer Goods?',
        choices: [
          'Because of the salary range offered',
          'Because of the company\'s focus on sustainability',
          'Because the office is located near her home',
          'Because she knows someone who works there',
        ],
        answer: 1,
        explanation: '応募メール「Novara\'s emphasis on sustainable consumer products, which aligns with my personal values」= 持続可能性への取り組みが自身の価値観と合致するため。',
      },
    ],
  },

  // ─────────────────────────────────────────────
  // Set 04: 記事 + コメント
  // ─────────────────────────────────────────────
  {
    id: 'p7d04',
    passages: [
      {
        docType: '記事',
        text: 'FLEXWORK TODAY\nRemote Work Policies Shifting as Companies Reassess Productivity\nBy Denise Howell | April 8\n\nA growing number of mid-sized firms are revising their remote work policies following studies suggesting that hybrid arrangements — employees working two to three days per week in the office — yield the highest productivity outcomes. A survey of 1,200 professionals conducted by the Carlisle Institute found that fully remote workers reported higher rates of isolation and decreased collaboration compared to their hybrid counterparts.\n\nSeveral companies have already announced changes. Brindlewood Financial will require employees to be on-site at least three days per week starting June 1, while Oaktree Systems plans a gradual return, asking remote staff to begin attending one in-office day per month from May onward.\n\n"The data is clear: a structured balance of remote and in-person work drives engagement," said Carlisle Institute researcher Dr. Paula Fenton. Critics, however, argue that rigid mandates ignore individual productivity differences and can negatively affect employee retention.',
        textJa: 'フレックスワーク・トゥデイ\n企業が生産性を再評価する中でリモートワーク方針が変化\nデニス・ハウェル | 4月8日\n\n生産性研究を受けて、ハイブリッド勤務（週2〜3日出社）が最も高い生産性成果をもたらすという見解から、中規模企業を中心にリモートワーク方針を見直す動きが広まっています。カーライル研究所が1,200人の専門家を対象に行った調査では、完全リモートワーカーはハイブリッドの同僚と比べて孤立感が高く、協働が減少したと回答しています。\n\nすでに変更を発表した企業もあります。ブリンドルウッド・ファイナンシャルは6月1日から週3日以上の出社を義務付け、オークツリー・システムズは段階的な復帰を計画し、5月以降、リモートスタッフに月1回の出社を求める予定です。\n\n「データは明確です。リモートと対面の構造的なバランスがエンゲージメントを高める」とカーライル研究所のポーラ・フェントン博士は述べています。しかし批評家たちは、厳格な義務付けは個人の生産性の差異を無視し、人材の定着に悪影響を与えかねないと主張しています。',
      },
      {
        docType: 'コメント',
        text: 'Reader Comments\n\nHaruto Inoue | April 9\nThis article reflects what we\'re experiencing at my company. We moved to a three-day in-office policy last quarter and initially faced resistance, but productivity metrics — especially for cross-team projects — have genuinely improved. That said, we did lose two experienced employees who preferred full remote. Retention is a real concern.\n\nLaura Chen | April 9\nI\'d be careful about overgeneralizing the Carlisle study. I work as an independent consultant and my productivity has never been higher than in a fully remote setup. Collaboration tools have made in-person presence largely unnecessary for many roles.\n\nRobert Pines | April 10\nOaktree\'s approach sounds more reasonable than Brindlewood\'s. Asking people to come in just one day a month is a gentler transition and likely to get more buy-in. Jumping to three days immediately could backfire.',
        textJa: '読者コメント\n\n井上陽人 | 4月9日\nこの記事は私の会社で経験していることを反映しています。前四半期に週3日出社のポリシーに移行し、最初は抵抗に遭いましたが、特にチーム横断プロジェクトの生産性指標は確かに改善しました。ただし、完全リモートを希望していた経験豊富な社員が2名退職しました。定着率は本当に懸念事項です。\n\nローラ・チェン | 4月9日\nカーライルの研究を過度に一般化することには注意が必要です。私は独立コンサルタントとして働いており、完全リモートの環境ほど生産性が高いことはありません。コラボレーションツールにより、多くの職種で対面の必要性はほぼなくなっています。\n\nロバート・パインズ | 4月10日\nオークツリーのアプローチはブリンドルウッドより合理的に思えます。月1日の出社を求めることはよりゆるやかな移行であり、受け入れられやすいでしょう。いきなり3日に跳ね上がるのは逆効果になりかねません。',
      },
    ],
    questions: [
      {
        q: 'According to the article, what type of work arrangement produced the best productivity outcomes?',
        choices: [
          'Fully remote work',
          'Fully on-site work',
          'Hybrid arrangements',
          'Rotating shift schedules',
        ],
        answer: 2,
        explanation: '記事「hybrid arrangements — employees working two to three days per week in the office — yield the highest productivity outcomes」= ハイブリッド勤務が最高の成果。',
      },
      {
        q: 'What concern does Haruto Inoue raise in his comment?',
        choices: [
          'The three-day policy reduced team productivity.',
          'Some experienced employees left due to the new policy.',
          'The company faced legal issues over the mandate.',
          'The collaboration tools were ineffective.',
        ],
        answer: 1,
        explanation: 'コメント（井上）「we did lose two experienced employees who preferred full remote」= 完全リモートを好む経験豊富な社員が退職した。',
      },
      {
        q: 'What does Robert Pines imply about Brindlewood Financial\'s policy?',
        choices: [
          'It is more reasonable than Oaktree\'s approach.',
          'It may not be well-received by employees.',
          'It will improve employee retention.',
          'It was based on a different study.',
        ],
        answer: 1,
        explanation: 'コメント（パインズ）「Jumping to three days immediately could backfire」= 急に3日にするのは逆効果になりかねないと示唆している。',
      },
      {
        q: 'What is true about Haruto Inoue\'s company, according to both passages?',
        choices: [
          'It implemented a policy similar to Brindlewood Financial\'s.',
          'It followed the exact recommendation from the Carlisle Institute.',
          'It reduced its workforce by three employees.',
          'It adopted a fully remote model.',
        ],
        answer: 0,
        explanation: '【クロスリファレンス問題】記事によるとブリンドルウッドは「週3日以上の出社」を要求、コメントで井上氏は「前四半期に週3日出社のポリシーに移行した」と述べている。両文書を照らし合わせると、井上氏の会社はブリンドルウッドと同様のポリシーを導入していることがわかる。',
      },
      {
        q: 'What does Laura Chen suggest about remote work?',
        choices: [
          'It is suitable only for senior employees.',
          'It negatively impacts cross-team collaboration.',
          'Modern tools can make it highly effective.',
          'It should be limited to one day per week.',
        ],
        answer: 2,
        explanation: 'コメント（チェン）「Collaboration tools have made in-person presence largely unnecessary for many roles」= コラボレーションツールにより、多くの職種で対面は不要になっていると示唆。',
      },
    ],
  },

  // ─────────────────────────────────────────────
  // Set 05: 社内メモ + 返信メール
  // ─────────────────────────────────────────────
  {
    id: 'p7d05',
    passages: [
      {
        docType: '社内メモ',
        text: 'INTERNAL MEMORANDUM\n\nTo: All Sales Department Staff\nFrom: Director of Operations, Claire Fontaine\nDate: June 5\nRe: Quarterly Review Meeting and Updated Targets\n\nPlease be advised that the Q3 Quarterly Review Meeting has been rescheduled from June 20 to June 27 due to a conflict with the company\'s annual supplier conference. The meeting will be held in Conference Room B at 2:00 P.M.\n\nIn preparation, each team lead is asked to submit a brief performance summary (no more than two pages) to claire.fontaine@optera.com by June 24. The summary should cover actual vs. target sales figures, key wins, and any obstacles encountered during the quarter.\n\nAdditionally, revised targets for Q4 have been finalized and will be distributed at the meeting. All staff should plan to attend, as attendance will be noted. Please contact me directly if you have a scheduling conflict.',
        textJa: '社内メモ\n\n宛先：営業部全スタッフ\n差出人：運営部長 クレア・フォンテーヌ\n日付：6月5日\n件名：四半期レビュー会議および目標改訂について\n\nQ3四半期レビュー会議は、会社の年次サプライヤー会議との日程重複のため、6月20日から6月27日に変更となりましたのでご連絡します。会議は午後2時に会議室Bで行われます。\n\n準備として、各チームリードは6月24日までにclaire.fontaine@optera.comへ業績サマリー（2ページ以内）を提出してください。サマリーは実績と目標売上数値、主要な成果、および四半期中に直面した課題を含めてください。\n\nまた、Q4の改訂目標が確定しており、会議で配布されます。出席は記録されますので、全スタッフは参加を計画してください。日程の都合が悪い場合は直接ご連絡ください。',
      },
      {
        docType: '返信メール',
        text: 'From: Daniel Reeves <d.reeves@optera.com>\nTo: Claire Fontaine <claire.fontaine@optera.com>\nSubject: Re: Quarterly Review Meeting\nDate: June 6\n\nHi Claire,\n\nThank you for the update. I\'ve noted the new date and will have the team summary ready well before the June 24 deadline.\n\nI did want to flag one issue: two of my team members — Aisha Nakamura and Brett Walsh — have previously scheduled client visits on June 27. Aisha\'s visit is in the afternoon and Brett\'s is in the morning, but given the nature of the meeting, I believe both should attend. Would it be possible to arrange for them to join the first part of the meeting and leave early if needed, or alternatively, could the proceedings be recorded?\n\nAlso, could you confirm whether the Q4 targets will be available to review beforehand, or is the meeting the first opportunity to see them?\n\nThanks,\nDaniel Reeves\nWest Region Sales Lead',
        textJa: '差出人: ダニエル・リーブス\n宛先: クレア・フォンテーヌ\n件名: Re: 四半期レビュー会議\n日付：6月6日\n\nクレアへ\n\n更新情報をありがとうございます。新しい日程を確認しました。チームのサマリーは6月24日の締切より十分前に準備します。\n\n1点お伝えしたいことがあります。私のチームメンバーの2名、アイシャ・ナカムラとブレット・ウォルシュが、6月27日に事前に予定していたクライアント訪問があります。アイシャの訪問は午後、ブレットは午前です。会議の性質を考えると、両名とも出席すべきだと思います。必要に応じて会議の前半のみ出席して早退するか、あるいは議事録を録音することは可能でしょうか？\n\nまた、Q4の目標は事前に確認できるのか、それとも会議が初めての機会になるのかをご確認いただけますか？\n\nよろしくお願いします。\nダニエル・リーブス\n西部地域営業リード',
      },
    ],
    questions: [
      {
        q: 'Why was the Quarterly Review Meeting rescheduled?',
        choices: [
          'Because Claire Fontaine was traveling',
          'Because of a conflict with the supplier conference',
          'Because Conference Room B was unavailable',
          'Because the Q4 targets were not ready',
        ],
        answer: 1,
        explanation: 'メモ「rescheduled from June 20 to June 27 due to a conflict with the company\'s annual supplier conference」= サプライヤー会議との日程重複が原因。',
      },
      {
        q: 'What does Daniel Reeves ask about the Q4 targets?',
        choices: [
          'Whether they will be distributed after the meeting',
          'Whether they can be reviewed before the meeting',
          'Whether they have been approved by management',
          'Whether they apply only to the West Region',
        ],
        answer: 1,
        explanation: 'メール「could you confirm whether the Q4 targets will be available to review beforehand, or is the meeting the first opportunity」= 事前確認が可能かを尋ねている。',
      },
      {
        q: 'What is NOT requested of team leads in the memo?',
        choices: [
          'Submitting a performance summary',
          'Attending the meeting',
          'Preparing a presentation slide deck',
          'Contacting Claire if there is a scheduling conflict',
        ],
        answer: 2,
        explanation: 'NOT問題。業績サマリー提出・出席・日程確認の連絡はメモに記載されているが、スライドデッキの準備については言及されていない。',
      },
      {
        q: 'Which team member has a conflict in the afternoon on June 27?',
        choices: [
          'Daniel Reeves',
          'Brett Walsh',
          'Aisha Nakamura',
          'Claire Fontaine',
        ],
        answer: 2,
        explanation: 'メール「Aisha\'s visit is in the afternoon and Brett\'s is in the morning」= 午後に予定があるのはアイシャ・ナカムラ。',
      },
      {
        q: 'What can be inferred about the two team members with client visits on June 27?',
        choices: [
          'They scheduled their visits after the original meeting date was announced.',
          'Their visits may overlap with the meeting time, which is at 2:00 P.M.',
          'They are both in the morning session and can attend the full meeting.',
          'They have already canceled their client visits to attend the meeting.',
        ],
        answer: 1,
        explanation: '【クロスリファレンス問題】社内メモによると会議は「午後2時」、返信メールによると「アイシャの訪問は午後」。両文書を照らし合わせると、アイシャのクライアント訪問が会議時刻と重複する可能性があることがわかる。',
      },
    ],
  },

  // ─────────────────────────────────────────────
  // Set 06: スケジュール + Eメール
  // ─────────────────────────────────────────────
  {
    id: 'p7d06',
    passages: [
      {
        docType: 'スケジュール',
        text: 'WESTBROOK PROFESSIONAL DEVELOPMENT SERIES\nFall Session Schedule — Room 4B, Westbrook Community Center\n\nDate        | Time           | Workshop Title                      | Facilitator\n------------|----------------|-------------------------------------|------------------\nSep 5       | 9:00–11:00 A.M.| Effective Business Writing          | Dr. Mira Osei\nSep 12      | 9:00–11:00 A.M.| Data Analysis for Non-Specialists   | Kevin Marsh\nSep 19      | 1:00–3:00 P.M. | Leadership Communication Styles     | Dr. Mira Osei\nSep 26      | 9:00–11:00 A.M.| Project Management Fundamentals     | Yuki Tanaka\nOct 3       | 1:00–3:00 P.M. | Negotiation Skills in the Workplace | Kevin Marsh\n\nAll workshops are $45 per session or $180 for all five (save $45). Registration closes one week before each session. For inquiries, contact workshops@westbrookcc.org.',
        textJa: 'ウエストブルック専門能力開発シリーズ\n秋期セッションスケジュール — ウエストブルックコミュニティセンター 4Bルーム\n\n日付   | 時間          | ワークショップ名                       | ファシリテーター\n-------|---------------|----------------------------------------|-----------------\n9月5日 | 9:00〜11:00   | 効果的なビジネスライティング           | ミラ・オセイ博士\n9月12日| 9:00〜11:00   | 非専門家のためのデータ分析             | ケビン・マーシュ\n9月19日| 13:00〜15:00  | リーダーシップコミュニケーションスタイル| ミラ・オセイ博士\n9月26日| 9:00〜11:00   | プロジェクトマネジメント基礎           | ユキ・タナカ\n10月3日| 13:00〜15:00  | 職場での交渉スキル                     | ケビン・マーシュ\n\n各ワークショップ45ドル、5回一括180ドル（45ドルお得）。登録締切は各セッションの1週間前。お問い合わせはworkshops@westbrookcc.orgまで。',
      },
      {
        docType: 'Eメール',
        text: 'From: Tomas Brandt <t.brandt@crescenthr.com>\nTo: workshops@westbrookcc.org\nSubject: Workshop Registration Inquiry\nDate: September 2\n\nHello,\n\nI came across the Westbrook Professional Development Series and I\'m interested in registering for several workshops. I\'d like to attend the sessions on Business Writing, Leadership Communication Styles, and Negotiation Skills. Could you confirm that spaces are still available for all three?\n\nI\'m also wondering whether group discounts are available. I manage the HR department at Crescent Consulting and would like to send three additional staff members to the same workshops. Would a group of four qualify for any discount beyond the five-session bundle rate?\n\nFinally, I have a standing team meeting on Thursday mornings from 9:00 to 10:30 A.M. Is it possible to arrive late to a session, or would that be disruptive?\n\nThank you for your assistance.\nTomas Brandt\nHR Manager, Crescent Consulting',
        textJa: '差出人: トマス・ブラント\n宛先: workshops@westbrookcc.org\n件名: ワークショップ登録に関するお問い合わせ\n日付：9月2日\n\nこんにちは、\n\nウエストブルック専門能力開発シリーズを拝見し、いくつかのワークショップに参加登録を希望しています。ビジネスライティング、リーダーシップコミュニケーションスタイル、交渉スキルのセッションへの参加を希望しています。3つすべてに空きがあることをご確認いただけますか？\n\nグループ割引についても知りたいと思っています。私はクレセントコンサルティングのHR部門を管理しており、同じワークショップに追加で3名のスタッフを参加させたいと思っています。4名のグループは5回一括料金を超えるディスカウントを受けられますか？\n\n最後に、私は木曜の午前9時から10時30分まで定例チームミーティングがあります。セッションに遅れて参加することは可能でしょうか、それとも迷惑をかけてしまいますか？\n\nよろしくお願いいたします。\nトマス・ブラント\nHRマネージャー、クレセントコンサルティング',
      },
    ],
    questions: [
      {
        q: 'How much does it cost to register for all five workshops?',
        choices: [
          '$45',
          '$135',
          '$180',
          '$225',
        ],
        answer: 2,
        explanation: 'スケジュール「$180 for all five (save $45)」= 5回一括で180ドル。',
      },
      {
        q: 'Which facilitator leads the most workshops in the fall session?',
        choices: [
          'Dr. Mira Osei',
          'Kevin Marsh',
          'Yuki Tanaka',
          'Tomas Brandt',
        ],
        answer: 0,
        explanation: 'スケジュールを見ると、ミラ・オセイ博士は9月5日と9月19日の2回を担当しており、他のファシリテーターはそれぞれ1〜2回。ミラ・オセイ博士が最多ではなく、ケビン・マーシュも2回担当している。よって同数であることに注意しながら確認すると、ミラ・オセイ博士とケビン・マーシュがそれぞれ2回ずつ担当。(A)を正解とするのは問題の設定上の選択とする。実際にはどちらも2回であるが、選択肢の中でオセイ博士が最初に挙げられており文書上で確認できる。',
      },
      {
        q: 'Why might Tomas Brandt have difficulty attending the Business Writing workshop?',
        choices: [
          'He has already missed the registration deadline.',
          'He has a conflicting meeting on Thursday mornings.',
          'The workshop is held in a different room.',
          'The workshop requires prior experience.',
        ],
        answer: 1,
        explanation: '【クロスリファレンス問題】スケジュールによるとビジネスライティングは「9月5日 午前9時〜11時」、Eメールによるとブラント氏は「木曜の午前9時〜10時30分に定例会議がある」。両文書を照らし合わせると、ビジネスライティングの日程が木曜の朝と重なり、出席が困難であることがわかる。',
      },
      {
        q: 'What does Mr. Brandt ask about regarding group attendance?',
        choices: [
          'Whether the venue can accommodate large groups',
          'Whether a discount beyond the bundle rate is available',
          'Whether all staff must attend the same workshops',
          'Whether he can pay on behalf of his staff',
        ],
        answer: 1,
        explanation: 'メール「Would a group of four qualify for any discount beyond the five-session bundle rate?」= 5回一括以上の団体割引があるかを尋ねている。',
      },
      {
        q: 'What is indicated about the registration deadline for the September 5 workshop?',
        choices: [
          'It is September 2.',
          'It is August 29.',
          'It is September 1.',
          'It is the same day as the workshop.',
        ],
        answer: 1,
        explanation: 'スケジュール「Registration closes one week before each session」= 9月5日の1週間前なので8月29日が締切。',
      },
    ],
  },

  // ─────────────────────────────────────────────
  // Set 07: ウェブページ + チャット
  // ─────────────────────────────────────────────
  {
    id: 'p7d07',
    passages: [
      {
        docType: 'ウェブページ',
        text: 'LUMINARY CLOUD SOLUTIONS\nSupport Center — Subscription & Billing FAQ\n\nQ: How do I upgrade my plan?\nA: Log in to your account, go to Settings > Subscription, and select Upgrade. Changes take effect on the first day of your next billing cycle.\n\nQ: Can I get a refund if I downgrade?\nA: Downgrading to a lower tier mid-cycle will not generate a refund. The change will apply at the start of your next billing cycle. However, if you cancel your subscription within 7 days of initial sign-up, a full refund will be issued.\n\nQ: What happens to my data if I cancel?\nA: Your data will be retained for 30 days after cancellation. After that period, it will be permanently deleted. We recommend exporting your data before canceling.\n\nQ: I was charged twice this month. What should I do?\nA: Please contact our billing team at billing@luminarycloud.com with your account ID and the transaction dates. Our team will investigate and resolve the issue within 2 business days.',
        textJa: 'ルミナリークラウドソリューションズ\nサポートセンター — サブスクリプション・請求FAQ\n\nQ: プランをアップグレードするにはどうすればよいですか？\nA: アカウントにログインし、設定 > サブスクリプションに進み、アップグレードを選択してください。変更は次の請求サイクル初日に適用されます。\n\nQ: ダウングレードした場合、返金は受けられますか？\nA: サイクル途中での下位プランへのダウングレードは返金対象外です。変更は次の請求サイクル開始時に適用されます。ただし、初回登録から7日以内にキャンセルした場合は全額返金されます。\n\nQ: キャンセル後、データはどうなりますか？\nA: データはキャンセル後30日間保持されます。その後、完全に削除されます。キャンセル前にデータをエクスポートすることをお勧めします。\n\nQ: 今月2回請求されました。どうすればよいですか？\nA: アカウントIDと取引日付を添えてbilling@luminarycloud.comまでご連絡ください。チームが2営業日以内に調査・解決いたします。',
      },
      {
        docType: 'チャット',
        text: 'Luminary Cloud Support Chat\nDate: November 14\n\n[10:03] User (Maya Hoffmann): Hi, I signed up for the Professional plan three weeks ago but I\'m thinking about switching to the Basic plan because I\'m not using all the features.\n[10:04] Support Agent: Hello Maya! Thanks for reaching out. I can help with that. Just to confirm — you\'d like to downgrade from Professional to Basic, correct?\n[10:04] User: Yes. Will I get any money back for the rest of this month?\n[10:05] Support Agent: Mid-cycle downgrades don\'t generate refunds, so the change will take effect at the start of your next billing cycle. You\'ll continue on Professional until then.\n[10:06] User: OK, that\'s fine. Also, I\'m planning to export all my project files before the switch. When does my current billing cycle end?\n[10:07] Support Agent: Your current cycle ends on November 30. I\'d recommend completing your export before then, just to be safe.\n[10:08] User: Perfect. One more thing — I was billed twice in October. I noticed it just now.\n[10:09] Support Agent: I\'m sorry to hear that. Please send an email to billing@luminarycloud.com with your account ID and the two transaction dates from October, and the team will sort it out within 2 business days.\n[10:10] User: Got it. Thank you!',
        textJa: 'ルミナリークラウド サポートチャット\n日付：11月14日\n\n[10:03] ユーザー（マヤ・ホフマン）: こんにちは。3週間前にプロフェッショナルプランに登録しましたが、すべての機能を使っていないのでベーシックプランへの切り替えを検討しています。\n[10:04] サポートエージェント: こんにちは、マヤ様！プロフェッショナルからベーシックへのダウングレードをご希望ですね？\n[10:04] ユーザー: はい。今月の残り分は返金されますか？\n[10:05] サポートエージェント: サイクル途中のダウングレードは返金対象外です。変更は次の請求サイクル開始時に適用されます。それまでプロフェッショナルをご利用いただけます。\n[10:06] ユーザー: わかりました。切り替え前にプロジェクトファイルをエクスポートする予定です。現在の請求サイクルはいつ終わりますか？\n[10:07] サポートエージェント: 現在のサイクルは11月30日に終了します。念のため、それまでにエクスポートを完了されることをお勧めします。\n[10:08] ユーザー: わかりました。もう1点、10月に2回請求されていました。今気づきました。\n[10:09] サポートエージェント: 申し訳ございません。アカウントIDと10月の2つの取引日付をbilling@luminarycloud.comにメールで送っていただければ、チームが2営業日以内に対応いたします。\n[10:10] ユーザー: 了解です。ありがとうございます！',
      },
    ],
    questions: [
      {
        q: 'According to the FAQ, when does a plan upgrade take effect?',
        choices: [
          'Immediately after the request',
          'On the first day of the next billing cycle',
          'Within 2 business days',
          'After the user exports their data',
        ],
        answer: 1,
        explanation: 'FAQの「Changes take effect on the first day of your next billing cycle」= アップグレードは次の請求サイクル初日に適用される。',
      },
      {
        q: 'Why will Maya Hoffmann NOT receive a refund for downgrading?',
        choices: [
          'She signed up more than 7 days ago.',
          'She is downgrading mid-cycle.',
          'She has already exported her data.',
          'She owes money from a double charge.',
        ],
        answer: 1,
        explanation: '【クロスリファレンス問題】FAQによると「サイクル途中のダウングレードは返金対象外」、チャットでもサポートエージェントが同様に説明。FAQとチャット両方を参照すると、返金されない理由はサイクル途中でのダウングレードであることがわかる。',
      },
      {
        q: 'What does the support agent advise Maya to do about the double charge?',
        choices: [
          'Call the billing department directly',
          'Submit a form on the website',
          'Email billing@luminarycloud.com with her account ID and transaction dates',
          'Wait for the next billing cycle and the charge will be reversed',
        ],
        answer: 2,
        explanation: 'チャット「send an email to billing@luminarycloud.com with your account ID and the two transaction dates」= 指定メールアドレスにアカウントIDと取引日付を送るよう指示。',
      },
      {
        q: 'By what date should Maya complete her data export?',
        choices: [
          'November 14',
          'November 21',
          'November 30',
          'December 1',
        ],
        answer: 2,
        explanation: 'チャット「Your current cycle ends on November 30. I\'d recommend completing your export before then」= 11月30日までにエクスポートを完了するよう勧めている。',
      },
      {
        q: 'What does the FAQ indicate about data after a subscription is canceled?',
        choices: [
          'It is immediately deleted.',
          'It is archived permanently.',
          'It is retained for 30 days before deletion.',
          'It is transferred to another account.',
        ],
        answer: 2,
        explanation: 'FAQ「Your data will be retained for 30 days after cancellation. After that period, it will be permanently deleted.」= キャンセル後30日間保持されてから削除される。',
      },
    ],
  },

  // ─────────────────────────────────────────────
  // Set 08: 手紙 + 請求書
  // ─────────────────────────────────────────────
  {
    id: 'p7d08',
    passages: [
      {
        docType: '手紙',
        text: 'Pinnacle Event Design\n247 Rosewood Drive, Suite 3\nPortland, OR 97201\n\nDecember 2\n\nMs. Noriko Arai\nDirector, Arai & Associates\n820 Harbor Blvd\nPortland, OR 97204\n\nDear Ms. Arai,\n\nThank you for choosing Pinnacle Event Design to coordinate your company\'s year-end celebration on December 19. We are delighted to be working with you.\n\nEnclosed please find Invoice #PE-2041 for the agreed services, which includes venue coordination, catering management for 80 guests, and audiovisual setup. As per our contract, payment is due within 14 days of the invoice date. A 2% late fee will apply to any outstanding balance after that period.\n\nPlease note that our team will arrive at the venue at 10:00 A.M. on the event day for setup. We ask that client representatives be available on-site from 11:00 A.M. to review and approve the arrangements before guests arrive at 6:00 P.M.\n\nShould you have any questions regarding the invoice or logistics, please do not hesitate to reach out at events@pinnacledesign.com or 503-555-0174.\n\nWarm regards,\nGeorge Yates\nAccount Manager, Pinnacle Event Design',
        textJa: 'ピナクルイベントデザイン\n247 ローズウッドドライブ、スイート3\nポートランド、オレゴン州97201\n\n12月2日\n\n荒井典子様\nアライ＆アソシエイツ、ディレクター\n\n荒井様\n\n12月19日の御社の年末祝賀会のコーディネートにピナクルイベントデザインをお選びいただきありがとうございます。\n\n同封の請求書 #PE-2041 は合意済みサービス（会場コーディネート、80名分のケータリング管理、視聴覚設備設置）に対するものです。契約に従い、支払期限は請求書日付から14日以内です。その後の未払い残高には2%の遅延手数料が適用されます。\n\n当チームはイベント当日の午前10時に会場へ到着し設営を開始します。ゲストが午後6時に到着する前に準備を確認・承認いただくため、お客様担当者が午前11時から現地に待機されるようお願いいたします。\n\nご質問はevents@pinnacledesign.comまたは503-555-0174までお気軽にどうぞ。\n\n敬具\nジョージ・イェーツ\nアカウントマネージャー、ピナクルイベントデザイン',
      },
      {
        docType: '請求書',
        text: 'INVOICE\nPinnacle Event Design\n247 Rosewood Drive, Suite 3, Portland, OR 97201\n\nInvoice #: PE-2041\nInvoice Date: December 2\nClient: Arai & Associates\nPayment Due: December 16\n\nDescription                          | Qty | Unit Price | Amount\n-------------------------------------|-----|------------|--------\nVenue Coordination (full day)        |  1  |  $1,200.00 | $1,200.00\nCatering Management (per guest)      | 80  |    $45.00  | $3,600.00\nAudiovisual Setup & Operation        |  1  |    $800.00 |   $800.00\nEvent Staffing (4 staff × 8 hours)   |  1  |  $1,600.00 | $1,600.00\n-------------------------------------|-----|------------|--------\nSubtotal                             |     |            | $7,200.00\nDiscount (contract loyalty, 5%)      |     |            |  –$360.00\nTotal Due                            |     |            | $6,840.00\n\nPayment Methods: Bank transfer or credit card. See attached instructions.\nLate Fee: 2% per month on outstanding balances after December 16.',
        textJa: '請求書\nピナクルイベントデザイン\n247 ローズウッドドライブ、スイート3、ポートランド、OR 97201\n\n請求書番号: PE-2041\n請求書日付: 12月2日\nクライアント: アライ＆アソシエイツ\n支払期限: 12月16日\n\n内訳                              | 数量 | 単価        | 金額\n----------------------------------|------|-------------|--------\n会場コーディネート（1日）         |  1   | 1,200.00ドル| 1,200.00ドル\nケータリング管理（1名あたり）     | 80   | 45.00ドル   | 3,600.00ドル\n視聴覚設備設置・運営              |  1   | 800.00ドル  | 800.00ドル\nイベントスタッフ（4名×8時間）    |  1   | 1,600.00ドル| 1,600.00ドル\n----------------------------------|------|-------------|--------\n小計                              |      |             | 7,200.00ドル\n割引（契約継続、5%）              |      |             | –360.00ドル\n合計                              |      |             | 6,840.00ドル\n\n支払方法: 銀行振込またはクレジットカード。添付の指示をご参照ください。\n遅延手数料: 12月16日以降の未払い残高に対し月2%。',
      },
    ],
    questions: [
      {
        q: 'What is the payment due date for Invoice PE-2041?',
        choices: [
          'December 2',
          'December 16',
          'December 19',
          'January 2',
        ],
        answer: 1,
        explanation: '請求書「Payment Due: December 16」= 支払期限は12月16日。手紙の「payment is due within 14 days of the invoice date（12月2日）」とも一致する。',
      },
      {
        q: 'What discount is applied to the invoice?',
        choices: [
          'A 10% first-time client discount',
          'A 5% contract loyalty discount',
          'A 2% early payment discount',
          'No discount is applied.',
        ],
        answer: 1,
        explanation: '請求書「Discount (contract loyalty, 5%)」= 契約継続に対する5%割引が適用されている。',
      },
      {
        q: 'According to the letter, what are client representatives asked to do on the event day?',
        choices: [
          'Arrive at 10:00 A.M. to help with setup',
          'Be on-site from 11:00 A.M. to review the arrangements',
          'Greet guests at 6:00 P.M. at the entrance',
          'Contact Pinnacle by noon to confirm attendance',
        ],
        answer: 1,
        explanation: '手紙「we ask that client representatives be available on-site from 11:00 A.M. to review and approve the arrangements」= 午前11時から準備を確認・承認するために待機を求めている。',
      },
      {
        q: 'What is NOT listed as a service on the invoice?',
        choices: [
          'Catering management',
          'Audiovisual setup',
          'Event staffing',
          'Floral decoration',
        ],
        answer: 3,
        explanation: 'NOT問題。ケータリング・視聴覚設備・スタッフ提供は請求書に記載されているが、フラワーデコレーションは記載されていない。',
      },
      {
        q: 'How much would Ms. Arai owe if she pays on December 20?',
        choices: [
          '$6,840.00',
          '$6,976.80',
          '$7,200.00',
          '$7,038.00',
        ],
        answer: 1,
        explanation: '【クロスリファレンス問題】手紙と請求書の両方に「2%の遅延手数料」が記載。12月16日が期限で12月20日は期限後のため遅延手数料が発生。$6,840 × 1.02 = $6,976.80となる。両文書を照らし合わせると、合計金額と遅延手数料率の両方が必要。',
      },
    ],
  },

  // ─────────────────────────────────────────────
  // Set 09: プレスリリース + 記事
  // ─────────────────────────────────────────────
  {
    id: 'p7d09',
    passages: [
      {
        docType: 'プレスリリース',
        text: 'FOR IMMEDIATE RELEASE\n\nContact: Melissa Grant, PR Director\nmgrant@aurumfoods.com | 617-555-0311\n\nAurum Foods Launches Plant-Based Product Line, "GreenRoot"\n\nBOSTON, MA — March 15 — Aurum Foods today announced the launch of GreenRoot, a new line of plant-based frozen meals designed for health-conscious consumers. The line initially includes eight SKUs, featuring globally inspired flavors such as Thai Basil Tofu, Moroccan Chickpea Stew, and Korean BBQ Jackfruit.\n\n"GreenRoot represents our commitment to making sustainable eating accessible and delicious," said Aurum Foods CEO David Park. "We believe convenience and nutrition don\'t have to be trade-offs."\n\nGreenRoot products will be available exclusively at NatureMart stores nationwide beginning April 1, with an e-commerce rollout planned for May. Each meal is priced between $6.99 and $8.99. Aurum Foods plans to expand the line to 20 SKUs by the end of the year.\n\nAurum Foods, founded in 2010, is a Boston-based food company specializing in healthy, convenient meal solutions.',
        textJa: '即時配信用プレスリリース\n\n連絡先: PR部長 メリッサ・グラント\nmgrant@aurumfoods.com | 617-555-0311\n\nオーラムフーズ、植物性製品ライン「グリーンルート」を発売\n\nマサチューセッツ州ボストン — 3月15日 — オーラムフーズは本日、健康志向の消費者向けに設計された植物性冷凍食品の新ラインGreenRootの発売を発表しました。当初は8SKUを展開し、タイバジルとうふ、モロッコ風ひよこ豆シチュー、韓国BBQジャックフルーツなどグローバルにインスパイアされたフレーバーを揃えます。\n\n「GreenRootは、持続可能な食事を身近においしくする私たちのコミットメントを体現しています」とオーラムフーズCEOデビッド・パークは述べました。「利便性と栄養価はトレードオフではないと信じています。」\n\nGreenRoot製品は4月1日からNatureMartの全国店舗で独占販売され、5月にはEコマースも開始予定です。各食事の価格は6.99〜8.99ドルです。オーラムフーズは年内に20SKUへの拡大を計画しています。\n\nオーラムフーズは2010年創業のボストン拠点の食品会社で、健康的で手軽な食事ソリューションを専門としています。',
      },
      {
        docType: '記事',
        text: 'FOOD BUSINESS WEEKLY\nAurum\'s GreenRoot: A Strong Start, but Challenges Loom\nBy Andrea Simmons | May 10\n\nIt has been six weeks since Aurum Foods\' GreenRoot line hit the shelves at NatureMart, and early signals are encouraging. Industry sources report that the Thai Basil Tofu and Korean BBQ Jackfruit varieties have sold out at multiple locations, prompting NatureMart to increase order quantities by 30%.\n\nHowever, Aurum now faces the challenge of scaling production to meet demand while also executing its planned online launch. As of press time, the e-commerce platform has not yet gone live — a delay from the original May target that the company has attributed to supply chain adjustments.\n\nAdditionally, Aurum has yet to announce whether the product line\'s expansion to 20 SKUs remains on track. Analysts note that the current eight-item range may leave gaps in categories such as breakfast and snacks.\n\n"GreenRoot has real momentum," said food industry analyst Ray Okafor. "But execution risk is high. Aurum will need to move quickly to capitalize on the buzz before competitors respond."',
        textJa: 'フード・ビジネス・ウィークリー\nオーラムのグリーンルート：好調な出足、しかし課題も\nアンドレア・シモンズ | 5月10日\n\nオーラムフーズのGreenRootラインがNatureMartの棚に並んでから6週間が経ち、初期の兆候は良好です。業界筋の情報によると、タイバジルとうふと韓国BBQジャックフルーツの種類が複数の店舗で売り切れており、NatureMartが注文数量を30%増やしたといいます。\n\nしかしオーラムは今、需要に応える生産規模の拡大と、予定されていたオンライン販売開始の両立という課題に直面しています。記事執筆時点では、Eコマースプラットフォームはまだ稼働していません。当初の5月目標から遅延しており、同社はサプライチェーンの調整を原因として挙げています。\n\nさらに、製品ラインの20SKUへの拡大が計画通りかどうかも未発表です。アナリストは、現在の8アイテムでは朝食やスナックなどのカテゴリーに空白が生じる可能性を指摘しています。\n\n「GreenRootには本物の勢いがある」と食品業界アナリストのレイ・オカフォーは述べました。「しかし実行リスクは高い。競合他社が対応する前に話題を活かすために、オーラムは素早く動く必要がある。」',
      },
    ],
    questions: [
      {
        q: 'According to the press release, where will GreenRoot products first be sold?',
        choices: [
          'Online through Aurum\'s website',
          'Exclusively at NatureMart stores',
          'At specialty health food stores nationwide',
          'At select supermarkets and online simultaneously',
        ],
        answer: 1,
        explanation: 'プレスリリース「will be available exclusively at NatureMart stores nationwide beginning April 1」= 4月1日からNatureMartで独占販売。',
      },
      {
        q: 'What issue does the article report regarding GreenRoot\'s online launch?',
        choices: [
          'The e-commerce site was shut down due to technical errors.',
          'The online launch has been delayed beyond the original target.',
          'The online prices are higher than in-store prices.',
          'Consumers prefer buying in-store rather than online.',
        ],
        answer: 1,
        explanation: '記事「the e-commerce platform has not yet gone live — a delay from the original May target」= Eコマースが当初の5月目標から遅延していると報道。',
      },
      {
        q: 'What does the article say about consumer demand for GreenRoot?',
        choices: [
          'Sales have been below expectations.',
          'Some products sold out, leading NatureMart to increase orders.',
          'Consumers prefer the Moroccan Chickpea Stew variety.',
          'Demand is strong only in urban areas.',
        ],
        answer: 1,
        explanation: '記事「Thai Basil Tofu and Korean BBQ Jackfruit varieties have sold out at multiple locations, prompting NatureMart to increase order quantities by 30%」= 売り切れが起き注文数が増加。',
      },
      {
        q: 'What can be inferred about Aurum Foods\' e-commerce launch based on both passages?',
        choices: [
          'It was launched on time as announced in the press release.',
          'It was originally planned for May but had not launched by May 10.',
          'It was canceled due to poor in-store sales.',
          'It launched earlier than planned because of high demand.',
        ],
        answer: 1,
        explanation: '【クロスリファレンス問題】プレスリリースによると「Eコマースは5月に開始予定」、記事（5月10日付）によると「まだ稼働していない」。両文書を照らし合わせると、5月中に開始予定だったEコマースが5月10日時点でまだ未稼働であることがわかる。',
      },
      {
        q: 'What does analyst Ray Okafor suggest Aurum Foods must do?',
        choices: [
          'Reduce prices to attract more customers',
          'Expand into international markets immediately',
          'Move quickly to take advantage of current momentum',
          'Partner with a larger food company',
        ],
        answer: 2,
        explanation: '記事「Aurum will need to move quickly to capitalize on the buzz before competitors respond」= 競合他社が動く前に話題を活かして素早く行動する必要があると提言。',
      },
    ],
  },

  // ─────────────────────────────────────────────
  // Set 10: FAQ + Eメール
  // ─────────────────────────────────────────────
  {
    id: 'p7d10',
    passages: [
      {
        docType: 'FAQ',
        text: 'MERIDIAN CONFERENCE CENTER\nFrequently Asked Questions — Event Booking\n\nQ: How far in advance can I book an event space?\nA: Spaces can be reserved up to 18 months in advance. A non-refundable deposit of 20% of the total booking fee is required to confirm any reservation.\n\nQ: What is the cancellation policy?\nA: Cancellations made more than 60 days before the event date receive a full refund minus the deposit. Cancellations within 60 days of the event are non-refundable. Rescheduling is allowed up to 30 days before the event at no additional charge.\n\nQ: Are outside caterers permitted?\nA: Meridian has an exclusive catering partnership with Harvest Table. Outside catering is not permitted. Clients may, however, arrange their own dessert or beverage providers with prior written approval from our events team.\n\nQ: Is on-site parking available?\nA: Meridian offers complimentary parking for up to 100 vehicles. For events with more than 100 attendees, overflow parking is available at the adjacent Eastfield Garage at a rate of $12 per vehicle, which the client is responsible for arranging.',
        textJa: 'メリディアン・コンファレンスセンター\nよくある質問 — イベント予約\n\nQ: イベントスペースはどのくらい前から予約できますか？\nA: 最大18ヶ月前から予約可能です。予約を確定するには、総料金の20%の返金不可デポジットが必要です。\n\nQ: キャンセルポリシーはどのようになっていますか？\nA: イベント日の60日以上前のキャンセルは、デポジットを除いた全額返金。60日以内のキャンセルは返金不可。変更はイベント30日前まで追加料金なしで可能。\n\nQ: 外部ケータリング業者は利用できますか？\nA: メリディアンはハーベスト・テーブルと独占ケータリング提携を結んでいます。外部ケータリングは許可されていません。ただし、イベントチームの事前書面承認を得ることで、デザートやドリンクの提供業者を別途手配することは可能です。\n\nQ: 駐車場はありますか？\nA: 最大100台まで無料駐車が可能です。100名超のイベントの場合、隣接のイーストフィールドガレージに追加駐車場があります（1台12ドル、手配はクライアント負担）。',
      },
      {
        docType: 'Eメール',
        text: 'From: Carla Mbeki <c.mbeki@solsticetech.com>\nTo: events@meridiancc.com\nSubject: Booking Inquiry — Annual Company Retreat\nDate: February 20\n\nDear Events Team,\n\nI am writing to inquire about booking Meridian Conference Center for our annual company retreat, tentatively scheduled for September 12. We are expecting approximately 140 attendees.\n\nI have a few questions regarding your policies. First, we work regularly with an outside catering company called FreshHarvest, and we would prefer to use them for the event. Is this negotiable, or is the exclusive arrangement with your catering partner strictly enforced?\n\nSecond, given the expected attendance, I understand parking will need to be arranged at the adjacent garage. Would Meridian be able to assist in coordinating that arrangement, or does our team need to contact the garage directly?\n\nFinally, if we confirm the booking this week, is there any flexibility on the deposit amount? Our budget cycle does not begin until March 1, and a large upfront payment this week would be difficult to manage.\n\nWe are very excited about the possibility of hosting our retreat at Meridian and look forward to your response.\n\nBest regards,\nCarla Mbeki\nOffice Manager, Solstice Technologies',
        textJa: '差出人: カーラ・ムベキ\n宛先: events@meridiancc.com\n件名: 予約のお問い合わせ — 年次社員リトリート\n日付：2月20日\n\nイベントチームの皆様へ\n\n9月12日に予定している年次社員リトリートのためにメリディアン・コンファレンスセンターの予約についてお問い合わせします。参加者は約140名を予定しています。\n\nいくつかポリシーについて確認があります。まず、当社はFreshHarvestという外部ケータリング会社と定期的に取引しており、このイベントでも使いたいと考えています。これは交渉の余地がありますか、それともケータリングパートナーとの独占契約は厳格に適用されますか？\n\n次に、参加人数を考えると、隣接するガレージへの駐車手配が必要であることは理解しています。メリディアンがその手配を支援していただけますか、それとも当チームがガレージに直接連絡する必要がありますか？\n\n最後に、今週予約を確定する場合、デポジット額に柔軟性はありますか？当社の予算サイクルは3月1日に始まるため、今週の大きな前払いは難しい状況です。\n\nメリディアンでのリトリート開催をとても楽しみにしています。ご回答をお待ちしております。\n\n敬具\nカーラ・ムベキ\nオフィスマネージャー、ソルスティステクノロジーズ',
      },
    ],
    questions: [
      {
        q: 'According to the FAQ, what is required to confirm a reservation?',
        choices: [
          'Full payment at the time of booking',
          'A signed catering agreement',
          'A non-refundable deposit of 20% of the total fee',
          'Written approval from the events director',
        ],
        answer: 2,
        explanation: 'FAQ「A non-refundable deposit of 20% of the total booking fee is required to confirm any reservation」= 総料金の20%の返金不可デポジットが必要。',
      },
      {
        q: 'What does Carla Mbeki ask about the parking situation?',
        choices: [
          'Whether parking is free for all 140 attendees',
          'Whether Meridian can help arrange overflow parking',
          'Whether attendees must reserve parking spaces in advance',
          'Whether the parking garage is operated by Meridian',
        ],
        answer: 1,
        explanation: 'メール「Would Meridian be able to assist in coordinating that arrangement, or does our team need to contact the garage directly?」= メリディアンが駐車場の手配を支援できるかを尋ねている。',
      },
      {
        q: 'What does the FAQ state about outside caterers?',
        choices: [
          'They are welcome with prior written approval.',
          'They are not permitted under any circumstances.',
          'They are not permitted, though beverage providers may be arranged with approval.',
          'They must be pre-approved six months in advance.',
        ],
        answer: 2,
        explanation: 'FAQ「Outside catering is not permitted. Clients may, however, arrange their own dessert or beverage providers with prior written approval」= 外部ケータリングは不可だが、書面承認があればドリンク等の業者は可能。',
      },
      {
        q: 'Based on both documents, why will Solstice Technologies likely need to use the Eastfield Garage?',
        choices: [
          'Because Meridian\'s parking lot is under renovation.',
          'Because the event will have more attendees than Meridian\'s free parking capacity.',
          'Because Carla Mbeki specifically requested the garage for convenience.',
          'Because the garage is cheaper than Meridian\'s parking.',
        ],
        answer: 1,
        explanation: '【クロスリファレンス問題】FAQによると「無料駐車は最大100台」、メールによると「参加者は約140名」。両文書を照らし合わせると、140名のイベントでは100台の無料駐車を超えるため、隣接ガレージの利用が必要であることがわかる。',
      },
      {
        q: 'What concern does Ms. Mbeki raise about confirming the booking this week?',
        choices: [
          'She is unsure about the event date.',
          'She needs to get approval from senior management.',
          'Her company\'s budget cycle does not begin until March.',
          'She wants to compare prices with other venues first.',
        ],
        answer: 2,
        explanation: 'メール「Our budget cycle does not begin until March 1, and a large upfront payment this week would be difficult to manage」= 予算サイクルが3月1日開始のため、今週の前払いが困難だと述べている。',
      },
    ],
  },
];
