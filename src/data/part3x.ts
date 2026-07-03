import type { ListeningSet } from './types';

/** Part 3 会話の追加セット（本体は part34.ts で結合） */
export const PART3_EXTRA: ListeningSet[] = [
  {
    id: 'ls306',
    part: 3,
    title: '商品の交換',
    script: [
      { speaker: 'M', text: 'Good afternoon, Hartley Clothing. How may I help you?' },
      { speaker: 'W', text: "Hi, I bought a jacket at your store last weekend, but it's too small. I'd like to exchange it for a larger size." },
      { speaker: 'M', text: 'Certainly. As long as you have the receipt, we can exchange it. We have the same jacket in medium and large in stock.' },
      { speaker: 'W', text: "Great. I'll stop by your store on Saturday morning with the receipt." },
    ],
    scriptJa:
      '男性: こんにちは、ハートレー衣料品店です。ご用件を承ります。\n女性: 先週末そちらでジャケットを買ったのですが、小さすぎて。大きいサイズに交換したいんです。\n男性: かしこまりました。レシートをお持ちであれば交換できます。同じジャケットのMとLの在庫がございます。\n女性: よかった。土曜の午前中にレシートを持って伺います。',
    questions: [
      {
        q: 'Why is the woman calling?',
        choices: ['To exchange a purchase', 'To ask about store hours', 'To order a new jacket', 'To request a catalog'],
        answer: 0,
        explanation: "女性は「I'd like to exchange it for a larger size（大きいサイズに交換したい）」と述べている。買った物の交換が目的だ。",
      },
      {
        q: 'What does the man say the woman needs?',
        choices: ['A membership card', 'A receipt', 'The original box', 'A credit card'],
        answer: 1,
        explanation: '男性は「As long as you have the receipt, we can exchange it」と述べており、交換にはレシートが必要である。',
      },
      {
        q: 'When will the woman visit the store?',
        choices: ['On Thursday', 'On Friday', 'On Saturday', 'On Sunday'],
        answer: 2,
        explanation: "最後に「I'll stop by your store on Saturday morning」と言っている。曜日の聞き取りがポイントだ。",
      },
    ],
  },
  {
    id: 'ls307',
    part: 3,
    title: 'パソコンの接続トラブル',
    script: [
      { speaker: 'M', text: "Hi, this is Daniel in Accounting. My computer suddenly can't connect to the office network, and I have a report due at noon." },
      { speaker: 'W', text: 'Sorry to hear that. We updated the security software last night, and a few computers are having trouble. Have you tried restarting your computer?' },
      { speaker: 'M', text: "Yes, twice, but it didn't help." },
      { speaker: 'W', text: "Then I'll come to your desk in about ten minutes. In the meantime, you can use one of the shared laptops in the break room." },
    ],
    scriptJa:
      '男性: もしもし、経理部のダニエルです。パソコンが急にオフィスのネットワークにつながらなくなって。正午締め切りの報告書があるんです。\n女性: それは大変ですね。昨夜セキュリティソフトを更新したのですが、何台か不具合が出ています。再起動は試しましたか？\n男性: ええ、2回。でもだめでした。\n女性: では10分ほどでお席に伺います。それまでは休憩室の共用ノートパソコンをお使いください。',
    questions: [
      {
        q: 'What department does the man work in?',
        choices: ['Human Resources', 'Accounting', 'Marketing', 'Security'],
        answer: 1,
        explanation: '冒頭で男性が「this is Daniel in Accounting（経理部のダニエル）」と名乗っている。',
      },
      {
        q: 'What most likely caused the problem?',
        choices: ['A power outage', 'A broken cable', 'A software update', 'A forgotten password'],
        answer: 2,
        explanation: '女性は「We updated the security software last night, and a few computers are having trouble」と述べている。更新が原因だ。',
      },
      {
        q: 'What does the woman suggest the man do?',
        choices: ['Restart the network router', 'Submit the report later', 'Call the manufacturer', 'Use a shared laptop'],
        answer: 3,
        explanation: '女性は「you can use one of the shared laptops in the break room」と提案している。',
      },
    ],
  },
  {
    id: 'ls308',
    part: 3,
    title: 'レストラン予約の変更',
    script: [
      { speaker: 'M', text: 'Thank you for calling Bella Vista Restaurant. How can I help you?' },
      { speaker: 'W', text: 'Hello, I have a reservation for six people tonight at seven under the name Carter. Could I change it to eight people?' },
      { speaker: 'M', text: "Let me check... I'm afraid our main dining area is fully booked, but our private room is available. It seats up to ten, though it requires a set-course menu." },
      { speaker: 'W', text: "That actually sounds better for a birthday dinner. Let's do that." },
    ],
    scriptJa:
      '男性: ベラ・ビスタ・レストランにお電話ありがとうございます。ご用件を承ります。\n女性: もしもし、カーターの名前で今夜7時に6名で予約しているのですが、8名に変更できますか？\n男性: 確認いたします……あいにくメインダイニングは満席ですが、個室ならご用意できます。10名まで入れますが、コースメニューのご注文が必要です。\n女性: 誕生日の食事会にはむしろその方がよさそうね。それでお願いします。',
    questions: [
      {
        q: 'What does the woman want to do?',
        choices: ['Cancel a reservation', 'Order food for delivery', 'Add guests to her reservation', 'Book a table for next week'],
        answer: 2,
        explanation: '女性は6名の予約を「Could I change it to eight people?」と8名に増やしたいと述べている。',
      },
      {
        q: 'What does the man say about the private room?',
        choices: ['It is being renovated.', 'It is already reserved.', 'It has a nice view.', 'It requires a set-course menu.'],
        answer: 3,
        explanation: '男性は個室について「it requires a set-course menu（コースメニューが必要）」と説明している。',
      },
      {
        q: 'What event is the woman most likely celebrating?',
        choices: ['A birthday', 'A retirement', 'A promotion', 'An anniversary'],
        answer: 0,
        explanation: '最後に女性が「better for a birthday dinner」と述べている。誕生日の食事会である。',
      },
    ],
  },
  {
    id: 'ls309',
    part: 3,
    title: 'オフィス移転の準備',
    script: [
      { speaker: 'M', text: 'Have you started packing for the office move? The moving company arrives on Friday morning.' },
      { speaker: 'W', text: "Not yet. I heard we're supposed to get boxes, but I haven't seen any." },
      { speaker: 'M', text: "They'll be delivered tomorrow. Make sure you write your department name and floor number on every box." },
      { speaker: 'W', text: 'Got it. What about the filing cabinets?' },
      { speaker: 'M', text: "The movers will handle those. I'll send everyone an email with the full instructions this afternoon." },
    ],
    scriptJa:
      '男性: オフィス移転の荷造りは始めた？金曜の朝に引っ越し業者が来るよ。\n女性: まだなの。箱が配られるって聞いたけど、まだ見ていないわ。\n男性: 明日届くよ。すべての箱に部署名と階数を必ず書いてね。\n女性: 了解。ファイルキャビネットはどうするの？\n男性: それは業者がやってくれる。今日の午後、全員に詳しい手順をメールで送るよ。',
    questions: [
      {
        q: 'What will happen on Friday?',
        choices: ['Boxes will be delivered.', 'An email will be sent.', 'A new employee will start.', 'A moving company will arrive.'],
        answer: 3,
        explanation: '冒頭で「The moving company arrives on Friday morning」と述べている。箱の配布は明日なので混同しないこと。',
      },
      {
        q: 'What should employees write on the boxes?',
        choices: ['Their department name and floor', 'Their employee ID number', 'The contents of the box', 'The new office address'],
        answer: 0,
        explanation: '男性は「write your department name and floor number on every box」と指示している。',
      },
      {
        q: 'What does the man say he will do this afternoon?',
        choices: ['Order more boxes', 'Send an email with instructions', 'Move the filing cabinets', 'Talk to the movers'],
        answer: 1,
        explanation: "最後の「I'll send everyone an email with the full instructions this afternoon」が根拠だ。",
      },
    ],
  },
  {
    id: 'ls310',
    part: 3,
    title: '面接日程の調整',
    script: [
      { speaker: 'W', text: "Hello, may I speak to Mr. Ramirez? This is Julia Wong from Kendall Design's personnel department. We'd like to invite you for an interview for the graphic designer position." },
      { speaker: 'M', text: "That's great news! When would you like me to come in?" },
      { speaker: 'W', text: "Would next Tuesday at ten in the morning work for you? Please bring a portfolio of your recent work. You'll meet with our creative director." },
      { speaker: 'M', text: "Tuesday at ten is perfect. I'll prepare my portfolio. Thank you very much." },
    ],
    scriptJa:
      '女性: もしもし、ラミレスさんはいらっしゃいますか？ケンダル・デザイン人事部のジュリア・ウォンです。グラフィックデザイナー職の面接にお越しいただきたいのですが。\n男性: それは嬉しいです！いつ伺えばよいでしょうか？\n女性: 来週火曜の午前10時はいかがですか？最近の作品のポートフォリオをお持ちください。当社のクリエイティブディレクターと面談していただきます。\n男性: 火曜の10時で大丈夫です。ポートフォリオを準備します。ありがとうございます。',
    questions: [
      {
        q: 'Why is the woman calling?',
        choices: ['To arrange a job interview', 'To offer the man a job', 'To request a reference letter', 'To confirm a project deadline'],
        answer: 0,
        explanation: "「We'd like to invite you for an interview」と述べており、面接の日程調整が目的である。採用の決定ではない点に注意。",
      },
      {
        q: 'What is the man asked to bring?',
        choices: ['A résumé', 'A portfolio', 'A letter of reference', 'A photo ID'],
        answer: 1,
        explanation: '女性は「Please bring a portfolio of your recent work」と依頼している。',
      },
      {
        q: 'Who will the man meet on Tuesday?',
        choices: ['The company president', 'A personnel manager', 'A creative director', 'A team of designers'],
        answer: 2,
        explanation: "「You'll meet with our creative director」と述べられている。電話をかけている人事部のジュリアではない。",
      },
    ],
  },
  {
    id: 'ls311',
    part: 3,
    title: '出張の航空券手配',
    script: [
      { speaker: 'M', text: "Rina, could you book me a flight to Chicago for the trade show next Wednesday? I'd prefer a morning departure." },
      { speaker: 'W', text: "I checked earlier, and the morning direct flights are already sold out. There's an afternoon flight that arrives at four o'clock." },
      { speaker: 'M', text: 'That should be fine. My first appointment is a dinner meeting at seven.' },
      { speaker: 'W', text: "OK, I'll book it now. I'll also reserve a hotel room near the convention center." },
    ],
    scriptJa:
      '男性: リナ、来週水曜の見本市のためにシカゴ行きの便を予約してくれる？午前発がいいんだけど。\n女性: さっき調べたんですが、午前の直行便はもう売り切れでした。午後の便なら4時に到着します。\n男性: それで大丈夫。最初の予定は7時の夕食会だから。\n女性: では今予約します。コンベンションセンター近くのホテルも取っておきますね。',
    questions: [
      {
        q: 'Why is the man going to Chicago?',
        choices: ['To meet a new client', 'To attend a trade show', 'To inspect a factory', 'To interview job candidates'],
        answer: 1,
        explanation: '冒頭の「a flight to Chicago for the trade show（見本市のためのシカゴ行きの便）」が根拠だ。',
      },
      {
        q: 'What problem does the woman mention?',
        choices: ['The trade show was postponed.', 'Hotel rates have increased.', 'Morning flights are sold out.', 'The airport is under construction.'],
        answer: 2,
        explanation: '女性は「the morning direct flights are already sold out（午前の直行便は売り切れ）」と述べている。',
      },
      {
        q: 'What will the woman do next?',
        choices: ['Cancel a dinner meeting', 'Print a boarding pass', 'Call the convention center', 'Book a flight and a hotel'],
        answer: 3,
        explanation: "最後に「I'll book it now. I'll also reserve a hotel room」と述べており、航空券とホテルの両方を手配する。",
      },
    ],
  },
  {
    id: 'ls312',
    part: 3,
    title: '事務用品の発注',
    script: [
      { speaker: 'W', text: "Jake, we're almost out of printer paper again. Could you place an order with our supplier?" },
      { speaker: 'M', text: "Sure. Actually, they're offering ten percent off orders over one hundred dollars this month. Should I order extra?" },
      { speaker: 'W', text: 'Good idea. Get enough for the next three months, and add two toner cartridges as well.' },
      { speaker: 'M', text: "Will do. They usually deliver within two business days, so we'll have everything by Thursday." },
    ],
    scriptJa:
      '女性: ジェイク、またプリンター用紙が切れそうなの。仕入れ先に発注してくれる？\n男性: いいですよ。実は今月、100ドル以上の注文が10%引きなんです。多めに頼みましょうか？\n女性: いい考えね。3か月分と、トナーカートリッジも2本追加して。\n男性: 了解です。普段は2営業日以内に届くので、木曜までには全部そろいますよ。',
    questions: [
      {
        q: 'What does the woman ask the man to do?',
        choices: ['Fix a printer', 'Contact a customer', 'Order office supplies', 'Return some cartridges'],
        answer: 2,
        explanation: '女性は用紙が切れそうだとして「Could you place an order with our supplier?」と発注を依頼している。',
      },
      {
        q: 'According to the man, what is the supplier offering this month?',
        choices: ['Free delivery', 'An extended warranty', 'Free samples', 'A discount on large orders'],
        answer: 3,
        explanation: '男性は「ten percent off orders over one hundred dollars this month（今月は100ドル以上の注文が10%引き）」と述べている。',
      },
      {
        q: 'When does the man expect the order to arrive?',
        choices: ['By Thursday', 'By Friday', 'Next Monday', 'In three months'],
        answer: 0,
        explanation: "最後に「we'll have everything by Thursday（木曜までには全部そろう）」と述べている。",
      },
    ],
  },
  {
    id: 'ls313',
    part: 3,
    title: '創立記念パーティーの企画',
    script: [
      { speaker: 'M', text: "The company's twentieth anniversary party is only six weeks away. Have we decided on a venue yet?" },
      { speaker: 'W', text: 'I visited the Riverside Hotel yesterday. Their banquet hall can hold two hundred people, and the price includes catering.' },
      { speaker: 'M', text: 'Sounds ideal. But before we sign the contract, we need an accurate number of attendees.' },
      { speaker: 'W', text: "Right. Could you send a survey to all employees asking whether they'll attend?" },
      { speaker: 'M', text: "Sure, I'll send it out this afternoon and set the deadline for next Friday." },
    ],
    scriptJa:
      '男性: 会社の創立20周年パーティーまであと6週間しかない。会場はもう決まった？\n女性: 昨日リバーサイド・ホテルを見てきたの。宴会場は200人収容できて、料金にケータリングも含まれているわ。\n男性: 理想的だね。ただ契約する前に、正確な参加人数が必要だ。\n女性: そうね。全社員に参加するかどうかのアンケートを送ってくれる？\n男性: もちろん。今日の午後に送って、締め切りは来週金曜にするよ。',
    questions: [
      {
        q: 'What event are the speakers planning?',
        choices: ['A product launch', 'A retirement dinner', 'A training seminar', 'An anniversary celebration'],
        answer: 3,
        explanation: "冒頭の「The company's twentieth anniversary party（創立20周年パーティー）」が根拠だ。",
      },
      {
        q: 'What does the woman say about the Riverside Hotel?',
        choices: ['Its price includes catering.', 'It is being renovated.', 'It is far from the office.', 'It requires a deposit.'],
        answer: 0,
        explanation: '女性は「the price includes catering（料金にケータリングが含まれる）」と述べている。',
      },
      {
        q: 'What will the man do this afternoon?',
        choices: ['Sign a contract', 'Send a survey', 'Visit a hotel', 'Revise a budget'],
        answer: 1,
        explanation: "最後に「I'll send it out this afternoon」と述べている。it は参加確認のアンケート（survey）を指す。",
      },
    ],
  },
  {
    id: 'ls314',
    part: 3,
    title: '請求書の二重請求',
    script: [
      { speaker: 'M', text: 'Customer service, this is Ben speaking. How can I help you?' },
      { speaker: 'W', text: "Hi, I'm calling about my latest invoice. I was charged twice for the same internet service in May." },
      { speaker: 'M', text: "I apologize for the inconvenience. Our billing system had an error last month, and some customers were double-charged. I'll process a refund right away." },
      { speaker: 'W', text: 'Thank you. How long will the refund take?' },
      { speaker: 'M', text: "It should appear on your account within five business days. We'll also add a ten-dollar credit to your next bill for the trouble." },
    ],
    scriptJa:
      '男性: カスタマーサービス、ベンです。ご用件を承ります。\n女性: もしもし、最新の請求書の件で電話しました。5月分のインターネットサービスが二重に請求されているんです。\n男性: ご迷惑をおかけして申し訳ありません。先月請求システムにエラーがあり、一部のお客様に二重請求が発生しました。すぐに返金処理いたします。\n女性: ありがとう。返金はどのくらいかかりますか？\n男性: 5営業日以内に口座に反映されるはずです。お詫びとして次回の請求から10ドル割引もいたします。',
    questions: [
      {
        q: 'Why is the woman calling?',
        choices: ['She was billed twice.', 'Her service was disconnected.', 'She wants to upgrade her plan.', 'She did not receive an invoice.'],
        answer: 0,
        explanation: '女性は「I was charged twice for the same internet service（同じサービスが二重に請求された）」と述べている。charged twice = billed twice。',
      },
      {
        q: 'What caused the problem?',
        choices: ['A late payment', 'A system error', 'A canceled contract', 'An incorrect address'],
        answer: 1,
        explanation: '男性は「Our billing system had an error last month（先月請求システムにエラーがあった）」と説明している。',
      },
      {
        q: 'What does the man offer the woman?',
        choices: ['A free month of service', 'A faster internet plan', 'A credit on her next bill', 'A new contract'],
        answer: 2,
        explanation: "最後の「We'll also add a ten-dollar credit to your next bill」が根拠だ。返金に加えて割引を提供している。",
      },
    ],
  },
  {
    id: 'ls315',
    part: 3,
    title: '健康診断の予約変更',
    script: [
      { speaker: 'W', text: 'Lakeside Medical Clinic, how may I help you?' },
      { speaker: 'M', text: 'Hi, I have an annual checkup with Dr. Patel next Tuesday, but I have to go on a business trip that day. Could I reschedule?' },
      { speaker: 'W', text: 'Let me see. Dr. Patel is fully booked on Wednesday, but he has an opening on Thursday at three P.M.' },
      { speaker: 'M', text: 'Thursday at three works for me.' },
      { speaker: 'W', text: "Great. Please arrive ten minutes early and bring your insurance card, since we've switched to a new registration system." },
    ],
    scriptJa:
      '女性: レイクサイド・メディカル・クリニックです。ご用件を承ります。\n男性: もしもし、来週火曜にパテル先生の年次健診を予約しているのですが、その日は出張になってしまって。予約を変更できますか？\n女性: 確認しますね。パテル先生は水曜は予約でいっぱいですが、木曜の午後3時なら空きがあります。\n男性: 木曜3時で大丈夫です。\n女性: では、受付システムが新しくなりましたので、10分早めにお越しいただき、保険証をお持ちください。',
    questions: [
      {
        q: 'Why does the man want to change his appointment?',
        choices: ['He is feeling better.', 'He will be on a business trip.', 'He lost his insurance card.', 'He prefers a different doctor.'],
        answer: 1,
        explanation: '男性は「I have to go on a business trip that day（その日は出張になった）」と理由を述べている。',
      },
      {
        q: 'When will the man see Dr. Patel?',
        choices: ['On Tuesday', 'On Wednesday', 'On Thursday', 'On Friday'],
        answer: 2,
        explanation: '女性が木曜午後3時の空きを提示し、男性が「Thursday at three works for me」と同意している。',
      },
      {
        q: 'What is the man asked to do?',
        choices: ['Pay in advance', 'Fill out a form online', 'Call back tomorrow', 'Arrive ten minutes early'],
        answer: 3,
        explanation: '最後に女性が「Please arrive ten minutes early and bring your insurance card」と依頼している。',
      },
    ],
  },
  {
    id: 'ls316',
    part: 3,
    title: '賃貸アパートの内見',
    script: [
      { speaker: 'M', text: 'Hello, I saw your listing for a two-bedroom apartment on Grant Avenue. Is it still available?' },
      { speaker: 'W', text: "Yes, it is. It was renovated last year, and it's just a five-minute walk from the subway station." },
      { speaker: 'M', text: 'That sounds perfect. I work downtown, so the location matters most to me. Could I see it this week?' },
      { speaker: 'W', text: 'Of course. I can show you the apartment tomorrow at five thirty. And note that the monthly rent includes a parking space.' },
    ],
    scriptJa:
      '男性: もしもし、グラント通りの2LDKアパートの広告を見たのですが、まだ空いていますか？\n女性: はい、空いています。昨年改装済みで、地下鉄の駅から徒歩5分ですよ。\n男性: 完璧ですね。都心で働いているので、立地が一番大事なんです。今週見学できますか？\n女性: もちろんです。明日の5時半にご案内できます。それと、家賃には駐車場代も含まれていますよ。',
    questions: [
      {
        q: 'Who most likely is the woman?',
        choices: ['An architect', 'A bank employee', 'A real estate agent', 'A moving company worker'],
        answer: 2,
        explanation: '物件広告への問い合わせに応対し、「I can show you the apartment（内見にご案内できる）」と述べていることから不動産業者だとわかる。',
      },
      {
        q: 'What does the man say is most important to him?',
        choices: ['The rent', 'The apartment size', 'The renovation', 'The location'],
        answer: 3,
        explanation: '男性は「the location matters most to me（立地が一番大事）」と明言している。',
      },
      {
        q: 'What will happen tomorrow?',
        choices: ['The man will view the apartment.', 'The man will sign a lease.', 'The woman will lower the rent.', 'The apartment will be renovated.'],
        answer: 0,
        explanation: '女性が「I can show you the apartment tomorrow at five thirty」と述べており、明日内見が行われる。',
      },
    ],
  },
  {
    id: 'ls317',
    part: 3,
    title: '役員会議のケータリング',
    script: [
      { speaker: 'M', text: 'Fresh Fork Catering, this is Marco.' },
      { speaker: 'W', text: "Hi, I'd like to order lunch for a board meeting next Wednesday. There will be about fifteen people." },
      { speaker: 'M', text: 'Certainly. Our most popular option is the sandwich platter set, which comes with salads and drinks. We can include vegetarian choices as well.' },
      { speaker: 'W', text: 'Perfect—three of our directors are vegetarian. Could you deliver it by eleven thirty?' },
      { speaker: 'M', text: 'No problem. Just e-mail me the final number of attendees by Monday.' },
    ],
    scriptJa:
      '男性: フレッシュ・フォーク・ケータリング、マルコです。\n女性: こんにちは、来週水曜の役員会議用に昼食を注文したいのですが。15名ほどになります。\n男性: かしこまりました。一番人気はサンドイッチの盛り合わせセットで、サラダと飲み物付きです。ベジタリアン向けも入れられますよ。\n女性: 助かります。役員のうち3人がベジタリアンなんです。11時半までに配達できますか？\n男性: 問題ありません。月曜までに最終的な人数をメールでお知らせください。',
    questions: [
      {
        q: 'What is the woman ordering food for?',
        choices: ['A wedding reception', 'A staff picnic', 'A training session', 'A board meeting'],
        answer: 3,
        explanation: '女性は「order lunch for a board meeting next Wednesday」と述べている。役員会議用の昼食だ。',
      },
      {
        q: 'What does the woman say about some directors?',
        choices: ['They are vegetarian.', 'They will arrive late.', 'They prefer hot meals.', 'They cannot attend.'],
        answer: 0,
        explanation: '女性は「three of our directors are vegetarian（役員のうち3人がベジタリアン）」と述べている。',
      },
      {
        q: 'What is the woman asked to do by Monday?',
        choices: ['Pay a deposit', 'Send the final number of attendees', 'Choose a dessert', 'Confirm the delivery address'],
        answer: 1,
        explanation: '男性は最後に「e-mail me the final number of attendees by Monday（月曜までに最終人数をメールで）」と依頼している。',
      },
    ],
  },
  {
    id: 'ls318',
    part: 3,
    title: 'パンフレットの特急印刷',
    script: [
      { speaker: 'W', text: 'Speedy Print Services, how can I help you?' },
      { speaker: 'M', text: 'Hello, I need five hundred brochures printed for a trade fair, but the fair is this Friday. Is that possible?' },
      { speaker: 'W', text: "We can do a rush order, but it costs fifteen percent extra. If you send us the file today, they'll be ready Thursday afternoon." },
      { speaker: 'M', text: "That's fine. Also, which paper would you recommend?" },
      { speaker: 'W', text: "For brochures, glossy paper looks the most professional. I'll e-mail you a price quote within the hour." },
    ],
    scriptJa:
      '女性: スピーディー印刷サービスです。ご用件を承ります。\n男性: もしもし、見本市用にパンフレットを500部印刷したいのですが、見本市が今週金曜なんです。間に合いますか？\n女性: 特急仕上げなら可能ですが、15%の追加料金がかかります。本日中にデータをお送りいただければ、木曜の午後には仕上がります。\n男性: 構いません。それと、どの用紙がおすすめですか？\n女性: パンフレットなら光沢紙が一番見栄えがします。1時間以内にお見積もりをメールいたします。',
    questions: [
      {
        q: 'What does the man need?',
        choices: ['Printed brochures', 'Business cards', 'Event posters', 'A large banner'],
        answer: 0,
        explanation: '男性は「I need five hundred brochures printed（パンフレットを500部印刷したい）」と述べている。',
      },
      {
        q: 'What does the woman say about rush orders?',
        choices: ['They are not available.', 'They cost extra.', 'They take a week.', 'They require cash payment.'],
        answer: 1,
        explanation: '女性は「We can do a rush order, but it costs fifteen percent extra（15%の追加料金がかかる）」と説明している。',
      },
      {
        q: 'What will the woman send the man?',
        choices: ['A sample brochure', 'An invoice', 'A price quote', 'A paper catalog'],
        answer: 2,
        explanation: "最後に「I'll e-mail you a price quote within the hour（1時間以内に見積もりをメールする）」と述べている。",
      },
    ],
  },
  {
    id: 'ls319',
    part: 3,
    title: 'ジムの入会案内',
    script: [
      { speaker: 'M', text: 'Welcome to Peak Fitness. Are you interested in a membership?' },
      { speaker: 'W', text: "Yes, my office just moved nearby, and I'd like to work out before going home. What are your rates?" },
      { speaker: 'M', text: 'A standard membership is forty dollars a month. And if you sign up this month, the fifty-dollar enrollment fee is waived. It includes the pool and all group classes.' },
      { speaker: 'W', text: "That's a good deal. Could I look around first?" },
      { speaker: 'M', text: "Of course. I'll give you a tour right now, and you can try a free yoga class this evening." },
    ],
    scriptJa:
      '男性: ピーク・フィットネスへようこそ。ご入会をお考えですか？\n女性: ええ、職場が近くに移転したばかりで、帰宅前に運動したいんです。料金はいくらですか？\n男性: スタンダード会員は月40ドルです。今月ご入会いただければ、50ドルの入会金が無料になります。プールとすべてのグループレッスンが含まれますよ。\n女性: お得ですね。まず見学してもいいですか？\n男性: もちろんです。今すぐご案内しますし、今晩は無料のヨガクラスも体験できますよ。',
    questions: [
      {
        q: 'Why is the woman interested in joining the gym?',
        choices: ['Her doctor recommended exercise.', 'Her office moved nearby.', 'Her friend is a member.', 'She is training for a race.'],
        answer: 1,
        explanation: '女性は「my office just moved nearby（職場が近くに移転したばかり）」と理由を述べている。',
      },
      {
        q: 'What does the man say about this month?',
        choices: ['Classes are half price.', 'The pool is closed.', 'The enrollment fee is waived.', 'The gym is open longer.'],
        answer: 2,
        explanation: '男性は「if you sign up this month, the fifty-dollar enrollment fee is waived（今月入会すれば入会金が無料）」と述べている。',
      },
      {
        q: 'What will the woman most likely do next?',
        choices: ['Sign a contract', 'Attend a yoga class', 'Pay the enrollment fee', 'Take a tour of the facility'],
        answer: 3,
        explanation: "男性が「I'll give you a tour right now（今すぐ案内する）」と述べている。ヨガクラスは今晩なので next の行動は見学だ。",
      },
    ],
  },
  {
    id: 'ls320',
    part: 3,
    title: '荷物の配達遅延',
    script: [
      { speaker: 'M', text: 'Rapid Parcel Service, this is Tom.' },
      { speaker: 'W', text: "Hi, I'm expecting a package that was supposed to arrive yesterday, but it hasn't come yet. The tracking number is R-880." },
      { speaker: 'M', text: 'One moment... I see. The package was delayed because a storm closed our regional distribution center over the weekend.' },
      { speaker: 'W', text: 'I see. When can I expect it? It contains materials I need for a presentation on Thursday.' },
      { speaker: 'M', text: 'It left the center this morning and should arrive tomorrow morning. You can also sign up for text alerts to follow its progress.' },
    ],
    scriptJa:
      '男性: ラピッド宅配サービス、トムです。\n女性: もしもし、昨日届くはずの荷物がまだ来ないんです。追跡番号はR880です。\n男性: 少々お待ちください……確認できました。週末の嵐で地域の配送センターが閉鎖されたため、遅延が発生しています。\n女性: そうですか。いつ届きますか？木曜のプレゼンに必要な資料が入っているんです。\n男性: 今朝センターを出ましたので、明日の午前中には届くはずです。テキスト通知に登録すれば配送状況を追跡できますよ。',
    questions: [
      {
        q: 'Why is the woman calling?',
        choices: ['To return a package', 'To change a delivery address', 'To ask about a late package', 'To report a damaged item'],
        answer: 2,
        explanation: '女性は「a package that was supposed to arrive yesterday, but it hasn\'t come yet」と、届かない荷物について問い合わせている。',
      },
      {
        q: 'What caused the delay?',
        choices: ['A wrong address', 'A holiday closure', 'Heavy traffic', 'A storm'],
        answer: 3,
        explanation: '男性は「a storm closed our regional distribution center（嵐で配送センターが閉鎖された）」と説明している。',
      },
      {
        q: 'What does the man suggest the woman do?',
        choices: ['Sign up for text alerts', 'Pick up the package herself', 'Call again tomorrow', 'Contact the sender'],
        answer: 0,
        explanation: '最後に「You can also sign up for text alerts to follow its progress」と提案している。',
      },
    ],
  },
  {
    id: 'ls321',
    part: 3,
    title: '車のブレーキ修理',
    script: [
      { speaker: 'W', text: 'Good morning, what can we do for your car today?' },
      { speaker: 'M', text: "It's making a squeaking noise whenever I brake. It started about a week ago." },
      { speaker: 'W', text: "That usually means the brake pads are worn out. We can replace them in about two hours. Also, our records show you're due for an oil change." },
      { speaker: 'M', text: 'Please do both, then. The problem is, I have to pick up my daughter at noon.' },
      { speaker: 'W', text: 'No problem. We offer a free shuttle service, or you can borrow one of our loaner cars.' },
    ],
    scriptJa:
      '女性: おはようございます。本日はどうされましたか？\n男性: ブレーキを踏むたびにキーキー音がするんです。1週間ほど前からです。\n女性: それはたいていブレーキパッドの摩耗ですね。交換は2時間ほどでできます。それと、記録によるとオイル交換の時期でもありますよ。\n男性: では両方お願いします。ただ、正午に娘を迎えに行かないといけなくて。\n女性: 大丈夫ですよ。無料送迎サービスがありますし、代車を借りていただくこともできます。',
    questions: [
      {
        q: 'What problem does the man mention about his car?',
        choices: ["The engine won't start.", 'A tire is flat.', 'The air conditioner is broken.', 'It makes a noise when braking.'],
        answer: 3,
        explanation: '男性は「making a squeaking noise whenever I brake（ブレーキを踏むたびに音がする）」と述べている。',
      },
      {
        q: 'What does the woman say the records show?',
        choices: ['An oil change is due.', 'The warranty has expired.', 'The brakes were replaced recently.', 'The car was inspected last month.'],
        answer: 0,
        explanation: "女性は「our records show you're due for an oil change（記録ではオイル交換の時期）」と述べている。",
      },
      {
        q: 'Why is the man concerned about the time?',
        choices: ['He has a meeting at noon.', 'He must pick up his daughter.', 'His parking meter will expire.', 'The shop closes early.'],
        answer: 1,
        explanation: '男性は「I have to pick up my daughter at noon（正午に娘を迎えに行く）」と述べている。',
      },
    ],
  },
  {
    id: 'ls322',
    part: 3,
    title: 'カンファレンスの参加登録',
    script: [
      { speaker: 'W', text: 'Are you going to the digital marketing conference in October? Registration closes this Friday.' },
      { speaker: 'M', text: "I'd like to, but I missed the early-bird discount, and the regular fee is quite high." },
      { speaker: 'W', text: "Actually, there's a group rate. If three or more people from the same company register together, everyone gets twenty percent off." },
      { speaker: 'M', text: "Oh, then let's ask Emi from the PR team. I'm sure she's interested. I'll register all three of us online this afternoon." },
    ],
    scriptJa:
      '女性: 10月のデジタルマーケティング・カンファレンスに行く？登録は今週金曜までよ。\n男性: 行きたいんだけど、早期割引を逃しちゃって。通常料金はかなり高いんだよね。\n女性: 実はグループ料金があるの。同じ会社から3人以上一緒に登録すると、全員20%引きになるのよ。\n男性: それなら広報チームのエミを誘おう。きっと興味あるはずだ。今日の午後、3人分オンラインで登録するよ。',
    questions: [
      {
        q: 'What are the speakers mainly discussing?',
        choices: ['Attending a conference', 'Planning a marketing campaign', 'Organizing a company trip', 'Renewing a membership'],
        answer: 0,
        explanation: '冒頭の「Are you going to the digital marketing conference in October?」から、カンファレンス参加の話題である。',
      },
      {
        q: 'Why was the man hesitant to register?',
        choices: ['He is busy in October.', 'The fee is expensive.', 'His manager did not approve.', 'The venue is far away.'],
        answer: 1,
        explanation: '男性は「the regular fee is quite high（通常料金がかなり高い）」ため迷っていた。',
      },
      {
        q: 'What will the man do this afternoon?',
        choices: ['Talk to his manager', 'E-mail the organizer', 'Register online', 'Ask for a refund'],
        answer: 2,
        explanation: "最後に「I'll register all three of us online this afternoon（午後に3人分オンライン登録する）」と述べている。",
      },
    ],
  },
  {
    id: 'ls323',
    part: 3,
    title: '新しいコピー機の使い方',
    script: [
      { speaker: 'M', text: "Hey Sarah, do you know how to make double-sided copies on this new machine? I can't find the button." },
      { speaker: 'W', text: "It's all on the touch screen now. Tap 'Settings,' then select 'Two-sided.' It confused me at first, too." },
      { speaker: 'M2', text: "Excuse me, I couldn't help overhearing. I'm from Orion Office Equipment—we installed the copier this morning. We're holding a short training session tomorrow at ten." },
      { speaker: 'W', text: 'Oh, that would be helpful. Where will it be?' },
      { speaker: 'M2', text: "In the second-floor meeting room. It only takes thirty minutes, and we'll hand out a quick reference guide." },
    ],
    scriptJa:
      '男性: ねえサラ、この新しい機械で両面コピーの仕方わかる？ボタンが見つからないんだ。\n女性: 今は全部タッチパネルなのよ。「設定」を押して「両面」を選ぶの。私も最初は戸惑ったわ。\n男性2: 失礼します、話が聞こえてしまって。オリオン事務機器の者です。今朝このコピー機を設置しました。明日10時に短い講習会を開きますよ。\n女性: それは助かります。場所はどこですか？\n男性2: 2階の会議室です。30分だけですし、簡単な操作ガイドもお配りします。',
    questions: [
      {
        q: 'What is the first man trying to do?',
        choices: ['Replace a toner cartridge', 'Make double-sided copies', 'Scan a document', 'Connect to a printer'],
        answer: 1,
        explanation: '男性は冒頭で「how to make double-sided copies（両面コピーの仕方）」を尋ねている。',
      },
      {
        q: 'Who most likely is the second man?',
        choices: ['A new employee', 'A building manager', 'An equipment company representative', 'An IT technician'],
        answer: 2,
        explanation: "「I'm from Orion Office Equipment—we installed the copier」と述べており、事務機器会社の担当者である。",
      },
      {
        q: 'What will happen tomorrow at ten?',
        choices: ['A copier will be installed.', 'A meeting room will be cleaned.', 'New equipment will be delivered.', 'A training session will be held.'],
        answer: 3,
        explanation: "「We're holding a short training session tomorrow at ten（明日10時に講習会を開く）」が根拠だ。設置は今朝済んでいる。",
      },
    ],
  },
  {
    id: 'ls324',
    part: 3,
    title: '出張経費の精算方法',
    script: [
      { speaker: 'M', text: 'Hi Keiko, I just got back from the Osaka trip. How do I submit my travel expenses? I heard the process changed.' },
      { speaker: 'W', text: 'Yes, we moved to an online system last month. You scan your receipts and upload them—no more paper forms.' },
      { speaker: 'M', text: "That's convenient. Is there a deadline?" },
      { speaker: 'W', text: "Everything must be submitted by the tenth of each month to be reimbursed in the same month. I'll send you a link to the user manual." },
    ],
    scriptJa:
      '男性: ケイコさん、大阪出張から戻りました。出張経費はどうやって申請すればいいですか？手続きが変わったと聞いたんですが。\n女性: ええ、先月からオンラインシステムに移行したの。領収書をスキャンしてアップロードするだけ。紙の書類はもう不要よ。\n男性: 便利ですね。締め切りはありますか？\n女性: 当月中に精算を受けるには毎月10日までに提出する必要があるわ。利用マニュアルのリンクを送っておくわね。',
    questions: [
      {
        q: 'What does the man ask about?',
        choices: ['Booking a business trip', 'Getting a corporate card', 'Submitting travel expenses', 'Scheduling a meeting'],
        answer: 2,
        explanation: '男性は「How do I submit my travel expenses?（出張経費はどう申請すればいいか）」と尋ねている。',
      },
      {
        q: 'What changed last month?',
        choices: ['The reimbursement amount', 'The accounting manager', 'The office location', 'The submission process'],
        answer: 3,
        explanation: '女性は「we moved to an online system last month（先月オンラインシステムに移行した）」と述べている。申請方法の変更だ。',
      },
      {
        q: 'What will the woman send the man?',
        choices: ['A link to a manual', 'A paper form', 'A receipt', 'A payment schedule'],
        answer: 0,
        explanation: "最後に「I'll send you a link to the user manual（マニュアルのリンクを送る）」と述べている。",
      },
    ],
  },
  {
    id: 'ls325',
    part: 3,
    title: '店舗改装の打ち合わせ',
    script: [
      { speaker: 'W', text: "Thanks for coming, Mr. Diaz. About the store renovation—we'd like to stay open during the work. Is that possible?" },
      { speaker: 'M', text: "Yes, if we do the noisy work at night after closing. It'll take about three weeks instead of two, though." },
      { speaker: 'W', text: "That's acceptable. Our busiest season starts in November, so as long as you finish by the end of October, we're fine." },
      { speaker: 'M', text: "Understood. I'll revise the schedule and bring it to you on Monday, along with the updated cost estimate." },
    ],
    scriptJa:
      '女性: お越しいただきありがとうございます、ディアスさん。店舗改装の件ですが、工事中も営業を続けたいんです。可能でしょうか？\n男性: ええ、騒音の出る作業を閉店後の夜間に行えば可能です。ただ、2週間ではなく3週間ほどかかりますが。\n女性: それで構いません。11月から繁忙期が始まるので、10月末までに終われば問題ありません。\n男性: 承知しました。スケジュールを修正して、更新した見積もりと一緒に月曜にお持ちします。',
    questions: [
      {
        q: 'What are the speakers mainly discussing?',
        choices: ['A store opening', 'A holiday sale', 'A moving plan', 'A renovation project'],
        answer: 3,
        explanation: '冒頭で女性が「About the store renovation（店舗改装の件）」と切り出している。',
      },
      {
        q: 'What does the woman want to do?',
        choices: ['Keep the store open during the work', 'Close the store for two weeks', 'Start the work in November', 'Hire a different contractor'],
        answer: 0,
        explanation: "女性は「we'd like to stay open during the work（工事中も営業を続けたい）」と述べている。",
      },
      {
        q: 'What will the man bring on Monday?',
        choices: ['Building materials', 'A revised schedule and estimate', 'A signed contract', 'Paint samples'],
        answer: 1,
        explanation: "最後の「I'll revise the schedule and bring it to you on Monday, along with the updated cost estimate」が根拠だ。",
      },
    ],
  },
  {
    id: 'ls326',
    part: 3,
    title: '社員旅行の行き先',
    script: [
      { speaker: 'M', text: 'We need to decide on the destination for the company retreat. The survey results are in—the hot spring resort got the most votes.' },
      { speaker: 'W', text: "I saw that. But isn't it over budget? The resort's weekend rates are pretty high." },
      { speaker: 'M', text: 'Actually, if we go on a Thursday and Friday, the weekday rates are thirty percent lower. That puts us within budget.' },
      { speaker: 'W', text: "Great. Then let's book it before the rooms fill up. Can you call the resort today and check availability for the last week of September?" },
    ],
    scriptJa:
      '男性: 社員旅行の行き先を決めないと。アンケート結果が出て、温泉リゾートが最多票だったよ。\n女性: 見たわ。でも予算オーバーじゃない？あのリゾートの週末料金はかなり高いのよ。\n男性: 実は木曜・金曜に行けば平日料金で30%安くなるんだ。それなら予算内に収まるよ。\n女性: いいわね。じゃあ部屋が埋まる前に予約しましょう。今日リゾートに電話して、9月最終週の空きを確認してくれる？',
    questions: [
      {
        q: 'What are the speakers mainly discussing?',
        choices: ['A company retreat', 'A client visit', 'A budget report', 'A hotel renovation'],
        answer: 0,
        explanation: '冒頭の「the destination for the company retreat（社員旅行の行き先）」から社員旅行の計画の話だ。',
      },
      {
        q: 'What was the woman concerned about?',
        choices: ['The distance', 'The cost', 'The weather', 'The schedule'],
        answer: 1,
        explanation: "女性は「isn't it over budget?（予算オーバーでは？）」「rates are pretty high」と費用を心配している。",
      },
      {
        q: 'What does the woman ask the man to do?',
        choices: ['Send another survey', 'Reserve a bus', 'Call the resort', 'Change the dates'],
        answer: 2,
        explanation: '最後に「Can you call the resort today and check availability?（今日リゾートに電話して空きを確認して）」と依頼している。',
      },
    ],
  },
  {
    id: 'ls327',
    part: 3,
    title: '納期延長の相談',
    script: [
      { speaker: 'W', text: "Marcus, the client just asked us to add a search function to the Web site. There's no way we can finish by the original deadline." },
      { speaker: 'M', text: 'I agree. Adding that feature will take at least another week of development and testing.' },
      { speaker: 'W', text: "Should we tell the client it's impossible?" },
      { speaker: 'M', text: "No—since it was their request, I think they'll accept a later delivery date. I'll ask the director to approve a one-week extension this afternoon." },
      { speaker: 'W', text: "OK. Meanwhile, I'll update the project timeline so we can show them exactly what changed." },
    ],
    scriptJa:
      '女性: マーカス、クライアントがウェブサイトに検索機能を追加してほしいって。元の締め切りにはとても間に合わないわ。\n男性: 同感だ。あの機能の追加には開発とテストで少なくともあと1週間はかかる。\n女性: クライアントには無理だと伝えるべきかしら？\n男性: いや、先方の要望なんだから、納期の延期は受け入れてくれると思う。今日の午後、部長に1週間の延長を承認してもらうよ。\n女性: わかったわ。その間に私はプロジェクトの工程表を更新して、何が変わったか正確に示せるようにしておく。',
    questions: [
      {
        q: 'What did the client request?',
        choices: ['A lower price', 'An additional feature', 'An earlier deadline', 'A design change'],
        answer: 1,
        explanation: '女性は「the client just asked us to add a search function（検索機能の追加を依頼された）」と述べている。',
      },
      {
        q: 'Why does the man say, "since it was their request"?',
        choices: ['To criticize the client', 'To refuse the extra work', 'To suggest the client will accept a delay', 'To ask for more staff'],
        answer: 2,
        explanation: '直後に「they\'ll accept a later delivery date」と続けており、先方の要望だから延期を受け入れるはずだという意図である。',
      },
      {
        q: 'What will the woman do?',
        choices: ['Contact the client', 'Test the search function', 'Meet the director', 'Update the project timeline'],
        answer: 3,
        explanation: "最後に女性が「I'll update the project timeline（工程表を更新する）」と述べている。部長に話すのは男性の役割だ。",
      },
    ],
  },
  {
    id: 'ls328',
    part: 3,
    title: '新製品発表会の準備',
    script: [
      { speaker: 'M', text: 'How are the preparations for the product launch going? The event is only ten days away.' },
      { speaker: 'W', text: "Mostly on track, but the demonstration units haven't arrived from the factory yet. They were supposed to be here Monday." },
      { speaker: 'M', text: "That's worrying. The press invitations have already gone out, and reporters will expect a live demo." },
      { speaker: 'W', text: "I'll call the factory right after this meeting and ask them to ship the units by express." },
      { speaker: 'M', text: "Please do. Also, let's move the rehearsal from Tuesday to Wednesday to give ourselves more time." },
    ],
    scriptJa:
      '男性: 新製品発表会の準備はどう？イベントまであと10日しかないよ。\n女性: おおむね順調だけど、デモ機がまだ工場から届いていないの。月曜に届くはずだったのに。\n男性: それは心配だな。報道関係者への招待状はもう発送済みで、記者たちは実演を期待しているはずだ。\n女性: この会議が終わったらすぐ工場に電話して、速達で発送するよう頼むわ。\n男性: 頼むよ。それと、余裕を持たせるためにリハーサルを火曜から水曜に変更しよう。',
    questions: [
      {
        q: 'What event are the speakers preparing for?',
        choices: ["A shareholders' meeting", 'A job fair', 'A product launch', 'A charity dinner'],
        answer: 2,
        explanation: '冒頭の「the preparations for the product launch（新製品発表会の準備）」が根拠だ。',
      },
      {
        q: 'What problem does the woman mention?',
        choices: ['Invitations were not sent.', 'A reporter canceled.', 'The venue is unavailable.', 'Some units have not arrived.'],
        answer: 3,
        explanation: "女性は「the demonstration units haven't arrived from the factory yet（デモ機がまだ届いていない）」と述べている。",
      },
      {
        q: 'What will the woman do after the meeting?',
        choices: ['Call the factory', 'Reschedule the rehearsal', 'Contact reporters', 'Print invitations'],
        answer: 0,
        explanation: "「I'll call the factory right after this meeting（会議の後すぐ工場に電話する）」が根拠だ。リハーサル変更は男性の提案。",
      },
    ],
  },
  {
    id: 'ls329',
    part: 3,
    title: '駐車許可証の申請',
    script: [
      { speaker: 'M', text: 'Hi, I just transferred to this branch. How do I get a spot in the company parking lot?' },
      { speaker: 'W', text: "You'll need a monthly permit, but I'm afraid there's a waiting list—about two months right now." },
      { speaker: 'M', text: 'Two months? I drive in every day. Is there anything I can do in the meantime?' },
      { speaker: 'W', text: 'The garage across the street gives our employees a discount. Just show your company badge. And be sure to submit the permit application form on the intranet today so you get on the list sooner.' },
    ],
    scriptJa:
      '男性: すみません、この支店に転勤してきたばかりなんですが、会社の駐車場を使うにはどうすればいいですか？\n女性: 月間許可証が必要なんですが、あいにく順番待ちがあって、今は2か月ほどかかります。\n男性: 2か月ですか？毎日車で通勤しているんです。その間、何か方法はありませんか？\n女性: 通りの向かいの駐車場が当社の社員に割引をしてくれますよ。社員証を見せるだけです。それと、早く順番が回るように、今日中にイントラネットで許可証の申請書を提出しておいてくださいね。',
    questions: [
      {
        q: 'What does the man want?',
        choices: ['An office key', 'A commuter pass', 'A new ID badge', 'A parking permit'],
        answer: 3,
        explanation: '男性は「How do I get a spot in the company parking lot?」と尋ねており、駐車場の利用許可を求めている。',
      },
      {
        q: 'What problem does the woman mention?',
        choices: ['There is a waiting list.', 'The lot is closed for repairs.', 'The permit fee increased.', 'The garage is full.'],
        answer: 0,
        explanation: "女性は「there's a waiting list—about two months（約2か月の順番待ちがある）」と述べている。",
      },
      {
        q: 'What does the woman advise the man to do today?',
        choices: ['Talk to his manager', 'Submit an application form', 'Buy a monthly pass at the garage', 'Take public transportation'],
        answer: 1,
        explanation: '最後に「be sure to submit the permit application form on the intranet today」と助言している。',
      },
    ],
  },
  {
    id: 'ls330',
    part: 3,
    title: '来客の空港送迎',
    script: [
      { speaker: 'M', text: "The clients from Berlin arrive tomorrow at three twenty. Who's picking them up at the airport?" },
      { speaker: 'W', text: "I reserved the company van, but it's in the repair shop until Friday. We need another option." },
      { speaker: 'M2', text: "Sorry to interrupt—I heard you mention the airport. I'm driving there tomorrow at two to drop off some documents. I could pick up the clients on my way back." },
      { speaker: 'W', text: 'Really? That would save us. There are four of them, plus luggage.' },
      { speaker: 'M2', text: "No problem, I'll take the seven-seater from the motor pool. Just text me their flight number and names." },
    ],
    scriptJa:
      '男性: ベルリンからのクライアントは明日3時20分に到着する。誰が空港に迎えに行くんだ？\n女性: 社用バンを予約していたんですが、金曜まで修理に出ていて。別の手段が必要です。\n男性2: 話に割り込んですみません、空港と聞こえたので。私は明日2時に書類を届けに空港へ行くんです。帰りにクライアントをお乗せできますよ。\n女性: 本当に？助かるわ。4名で、荷物もあるんだけど。\n男性2: 問題ありません。車両課の7人乗りを使います。フライト番号とお名前をメッセージで送ってください。',
    questions: [
      {
        q: 'What are the speakers mainly discussing?',
        choices: ['Transportation for visiting clients', 'A vehicle repair schedule', 'A business trip to Berlin', 'A document delivery service'],
        answer: 0,
        explanation: "冒頭の「Who's picking them up at the airport?」から、来訪するクライアントの送迎手段が話題だ。",
      },
      {
        q: 'What problem does the woman mention?',
        choices: ['A flight was canceled.', 'The company van is unavailable.', 'Some luggage was lost.', 'The meeting room is too small.'],
        answer: 1,
        explanation: "女性は「the company van ... it's in the repair shop until Friday（社用バンが金曜まで修理中）」と述べている。",
      },
      {
        q: 'What does the second man ask for?',
        choices: ['A parking pass', 'Directions to the airport', "The clients' flight information", 'A larger vehicle'],
        answer: 2,
        explanation: '2人目の男性は最後に「text me their flight number and names（フライト番号と名前を送って）」と頼んでいる。',
      },
    ],
  },
  {
    id: 'ls331',
    part: 3,
    title: '契約書の翻訳依頼',
    script: [
      { speaker: 'M', text: 'Global Language Services, Daniel speaking.' },
      { speaker: 'W', text: 'Hello, I need a thirty-page contract translated from English into Japanese. How long would that take?' },
      { speaker: 'M', text: 'For legal documents, we assign specialized translators, so usually about one week. When do you need it?' },
      { speaker: 'W', text: 'Our signing meeting is in ten days, but our lawyers need a few days to review the translation first.' },
      { speaker: 'M', text: "Understood. We can deliver it in five days for a rush fee. I'll e-mail you a quote within the hour—could you send me a sample page so we can give you an exact price?" },
    ],
    scriptJa:
      '男性: グローバル・ランゲージ・サービス、ダニエルです。\n女性: もしもし、30ページの契約書を英語から日本語に翻訳してほしいのですが。どのくらいかかりますか？\n男性: 法律文書は専門の翻訳者が担当しますので、通常1週間ほどです。いつまでに必要ですか？\n女性: 調印の会議が10日後なんですが、その前に弁護士が翻訳を数日かけて確認する必要があるんです。\n男性: 承知しました。特急料金で5日で納品できます。1時間以内に見積もりをメールしますが、正確な料金を出すためにサンプルページを1枚送っていただけますか？',
    questions: [
      {
        q: 'What does the woman need?',
        choices: ['An interpreter for a meeting', 'A document translation', 'A legal consultation', 'A printing service'],
        answer: 1,
        explanation: '女性は「a thirty-page contract translated from English into Japanese」と契約書の翻訳を依頼している。',
      },
      {
        q: 'Why does the woman need the document early?',
        choices: ['She is going on vacation.', 'The contract expires soon.', 'Lawyers must review it first.', 'Her boss requested it.'],
        answer: 2,
        explanation: '女性は「our lawyers need a few days to review the translation first（弁護士が先に数日かけて確認する）」と述べている。',
      },
      {
        q: 'What does the man ask the woman to send?',
        choices: ['A payment', 'A signed contract', "Her lawyer's contact information", 'A sample page'],
        answer: 3,
        explanation: '最後に「could you send me a sample page（サンプルページを送ってもらえるか）」と依頼している。',
      },
    ],
  },
  {
    id: 'ls332',
    part: 3,
    title: '休憩室のコーヒーメーカー',
    script: [
      { speaker: 'W', text: "The coffee machine in the break room isn't working again. It just flashes an error message." },
      { speaker: 'M', text: 'I know. I reported it to the facilities team this morning. Actually, they said the machine is too old to repair, so we\'re getting a new one.' },
      { speaker: 'W', text: 'Finally! When will it arrive?' },
      { speaker: 'M', text: 'Early next week. Until then, the café on the first floor is giving our employees a twenty percent discount—just show your staff ID.' },
    ],
    scriptJa:
      '女性: 休憩室のコーヒーメーカー、また壊れてるわ。エラーメッセージが点滅するだけなの。\n男性: 知ってるよ。今朝、施設管理チームに報告したんだ。実は、古すぎて修理できないから新しいのに替えるそうだよ。\n女性: やっとね！いつ届くの？\n男性: 来週の初めだって。それまでは1階のカフェが社員向けに20%割引をしてくれるよ。社員証を見せるだけでいいんだ。',
    questions: [
      {
        q: 'What problem are the speakers discussing?',
        choices: ['A power outage', 'A broken elevator', 'A broken coffee machine', 'A leaking pipe'],
        answer: 2,
        explanation: "冒頭の「The coffee machine in the break room isn't working again」から、コーヒーメーカーの故障が話題だ。",
      },
      {
        q: 'What did the facilities team say about the machine?',
        choices: ['It will be repaired today.', 'A part must be ordered.', 'The warranty has expired.', 'It will be replaced.'],
        answer: 3,
        explanation: "男性は「the machine is too old to repair, so we're getting a new one（修理できないので新品に替える）」と伝えている。",
      },
      {
        q: 'How can employees get a discount at the café?',
        choices: ['By showing their staff ID', 'By using a coupon', 'By paying in cash', 'By ordering before nine'],
        answer: 0,
        explanation: '男性は「just show your staff ID（社員証を見せるだけ）」と述べている。',
      },
    ],
  },
  {
    id: 'ls333',
    part: 3,
    title: 'セミナー会場の設営',
    script: [
      { speaker: 'M', text: "The seminar starts at two, but I just checked the registration list—eighty people signed up, and we've only set up sixty chairs." },
      { speaker: 'W', text: "There are extra chairs in the storage room next to the elevator. Let's bring twenty more and add two rows at the back." },
      { speaker: 'M', text: "OK. Could you also test the wireless microphones while I do that? They had static during last month's event." },
      { speaker: 'W', text: 'Sure. And remember, the doors open at one thirty, so everything needs to be ready by then.' },
    ],
    scriptJa:
      '男性: セミナーは2時開始だけど、さっき登録リストを確認したら80人が申し込んでいて、椅子は60脚しか並べていないんだ。\n女性: エレベーター横の倉庫に予備の椅子があるわ。あと20脚運んで、後ろに2列追加しましょう。\n男性: 了解。その間にワイヤレスマイクのテストもしてくれる？先月のイベントで雑音が入ったんだ。\n女性: いいわよ。それと、開場は1時半だから、それまでに全部準備しておかないとね。',
    questions: [
      {
        q: 'What are the speakers preparing for?',
        choices: ['A job fair', 'A concert', 'A board meeting', 'A seminar'],
        answer: 3,
        explanation: '冒頭の「The seminar starts at two」から、セミナーの準備をしているとわかる。',
      },
      {
        q: 'What problem does the man mention?',
        choices: ['There are not enough chairs.', 'The microphones are missing.', 'The room is double-booked.', 'The presenter is late.'],
        answer: 0,
        explanation: "「eighty people signed up, and we've only set up sixty chairs」と、申込者80人に対し椅子が60脚しかないと述べている。",
      },
      {
        q: 'What does the man ask the woman to do?',
        choices: ['Move some chairs', 'Test the microphones', 'Print a registration list', 'Open the doors early'],
        answer: 1,
        explanation: '男性は「Could you also test the wireless microphones?」と依頼している。椅子を運ぶのは男性の担当だ。',
      },
    ],
  },
  {
    id: 'ls334',
    part: 3,
    title: '引っ越しの見積もり',
    script: [
      { speaker: 'M', text: 'Metro Movers, how can I help you?' },
      { speaker: 'W', text: "Hi, I'm moving from a two-bedroom apartment to a house across town next month. Could you give me an estimate?" },
      { speaker: 'M', text: 'Sure. For an accurate price, we do a free on-site estimate. Also, weekday moves are fifteen percent cheaper than weekends, if your schedule is flexible.' },
      { speaker: 'W', text: 'I can take a day off, so a Wednesday would work. Could someone come by this Saturday morning to look at my apartment?' },
      { speaker: 'M', text: "Certainly. I'll put you down for Saturday at ten." },
    ],
    scriptJa:
      '男性: メトロ引越サービスです。ご用件を承ります。\n女性: もしもし、来月2LDKのアパートから町の反対側の一軒家に引っ越すんです。見積もりをお願いできますか？\n男性: もちろんです。正確な料金のために、無料の訪問見積もりを行っています。それと、日程に融通が利くなら、平日の引っ越しは週末より15%安くなりますよ。\n女性: 休みは取れるので水曜日で大丈夫です。今週土曜の午前中に部屋を見に来てもらえますか？\n男性: かしこまりました。土曜の10時に伺います。',
    questions: [
      {
        q: 'Why is the woman calling?',
        choices: ['To get a moving estimate', 'To change her moving date', 'To report damaged furniture', 'To cancel a service'],
        answer: 0,
        explanation: '女性は引っ越しについて「Could you give me an estimate?（見積もりをお願いできるか）」と依頼している。',
      },
      {
        q: 'According to the man, how can the woman save money?',
        choices: ['By packing her own boxes', 'By moving on a weekday', 'By booking a smaller truck', 'By paying in advance'],
        answer: 1,
        explanation: '男性は「weekday moves are fifteen percent cheaper than weekends（平日は週末より15%安い）」と述べている。',
      },
      {
        q: 'What will happen on Saturday?',
        choices: ['The woman will move.', 'The woman will take a day off.', 'An estimator will visit the apartment.', 'A contract will be signed.'],
        answer: 2,
        explanation: '女性が土曜午前の訪問を頼み、男性が「I\'ll put you down for Saturday at ten」と応じている。訪問見積もりが行われる。',
      },
    ],
  },
  {
    id: 'ls335',
    part: 3,
    title: '名刺の増刷',
    script: [
      { speaker: 'M', text: "Hi Naomi, I'm almost out of business cards, and I'm attending the expo next Thursday. How do I order more?" },
      { speaker: 'W', text: "We now order them through an online portal—I'll send you the link. By the way, weren't you promoted last month? You should update your job title first." },
      { speaker: 'M', text: 'Oh, right. Senior Sales Manager now. How long does printing take?' },
      { speaker: 'W', text: "Normally five business days, which might be too late. But if you choose express printing at checkout, they'll arrive in two days." },
    ],
    scriptJa:
      '男性: ナオミさん、名刺がもうすぐなくなるんですが、来週木曜の展示会に参加するんです。どうやって追加注文すればいいですか？\n女性: 今はオンラインポータルで注文するのよ。リンクを送るわね。ところで、先月昇進したんじゃなかった？まず肩書きを更新した方がいいわよ。\n男性: ああ、そうでした。今はシニア・セールス・マネージャーです。印刷にはどのくらいかかりますか？\n女性: 通常は5営業日だから間に合わないかも。でも注文時に特急印刷を選べば2日で届くわ。',
    questions: [
      {
        q: 'Why does the man need business cards?',
        choices: ['He lost his card case.', 'He is attending an expo.', 'He is meeting a new client.', 'He changed departments.'],
        answer: 1,
        explanation: "男性は「I'm attending the expo next Thursday（来週木曜の展示会に参加する）」ため名刺が必要だと述べている。",
      },
      {
        q: 'What does the woman remind the man to do?',
        choices: ['Order a larger quantity', 'Confirm the delivery address', 'Update his job title', 'Get approval from his manager'],
        answer: 2,
        explanation: '女性は昇進に触れて「You should update your job title first（まず肩書きを更新すべき）」と念を押している。',
      },
      {
        q: 'What does the woman suggest?',
        choices: ['Canceling the expo', 'Borrowing cards from a colleague', 'Calling the print shop', 'Choosing express printing'],
        answer: 3,
        explanation: "「if you choose express printing at checkout, they'll arrive in two days」と特急印刷を勧めている。",
      },
    ],
  },
  {
    id: 'ls336',
    part: 3,
    title: '退職祝いの花の注文',
    script: [
      { speaker: 'M', text: 'Bloom and Petal Florist, good morning.' },
      { speaker: 'W', text: "Hi, I'd like to order a large bouquet for a colleague's retirement party this Friday. Her favorite color is purple." },
      { speaker: 'M', text: "Then I'd suggest our seasonal arrangement with lavender and violets. It's very popular right now. Would you like it delivered?" },
      { speaker: 'W', text: 'Yes, please—to the Norton Building on Pine Street by three P.M. Friday. Also, can you include a message card?' },
      { speaker: 'M', text: 'Of course. You can type the message on our Web site after you complete the order, or tell me now over the phone.' },
    ],
    scriptJa:
      '男性: ブルーム・アンド・ペタル花店です。おはようございます。\n女性: こんにちは、今週金曜の同僚の退職パーティー用に大きな花束を注文したいんです。彼女の好きな色は紫なんですよ。\n男性: それでしたら、ラベンダーとスミレを使った季節のアレンジメントがおすすめです。今とても人気なんですよ。お届けしましょうか？\n女性: はい、お願いします。金曜の午後3時までにパイン通りのノートン・ビルへ。それと、メッセージカードを付けられますか？\n男性: もちろんです。ご注文完了後に当店のウェブサイトで入力していただくか、今お電話で承ることもできます。',
    questions: [
      {
        q: 'What is the woman ordering flowers for?',
        choices: ['A wedding', 'A grand opening', 'A retirement party', 'A hospital visit'],
        answer: 2,
        explanation: "女性は「for a colleague's retirement party this Friday（金曜の同僚の退職パーティー用）」と述べている。",
      },
      {
        q: 'What does the man suggest?',
        choices: ['A larger vase', 'A different delivery date', 'A gift certificate', 'A seasonal arrangement'],
        answer: 3,
        explanation: "男性は「I'd suggest our seasonal arrangement with lavender and violets」と季節のアレンジメントを勧めている。",
      },
      {
        q: 'What does the woman ask for?',
        choices: ['A message card', 'A price list', 'Faster delivery', 'A purple ribbon'],
        answer: 0,
        explanation: '女性は「can you include a message card?（メッセージカードを付けられるか）」と尋ねている。',
      },
    ],
  },
  {
    id: 'ls337',
    part: 3,
    title: '歓迎会の店選び',
    script: [
      { speaker: 'M', text: 'We should plan a welcome dinner for the two new designers. Any suggestions for a place?' },
      { speaker: 'W', text: 'Somewhere near the office would be best, so people can join easily after work.' },
      { speaker: 'W2', text: 'How about Casa Verde, the Spanish restaurant that opened across the street? I went last week—the tapas are excellent, and they have a private room for groups.' },
      { speaker: 'M', text: 'Sounds great. If twelve of us go, can we get that room?' },
      { speaker: 'W2', text: 'I think so, but Thursdays get busy. You should call today.' },
      { speaker: 'M', text: "OK, I'll make the reservation right after lunch." },
    ],
    scriptJa:
      '男性: 新しいデザイナー2人の歓迎会を計画しないと。どこかいい店ある？\n女性: 仕事の後にみんなが参加しやすいように、オフィスの近くがいいわね。\n女性2: 通りの向かいにオープンしたスペイン料理店のカサ・ベルデはどう？先週行ったんだけど、タパスが絶品で、団体用の個室もあるのよ。\n男性: いいね。12人で行くなら、その個室は取れるかな？\n女性2: 取れると思うけど、木曜は混むわよ。今日中に電話した方がいいわ。\n男性: わかった、昼食の後すぐ予約するよ。',
    questions: [
      {
        q: 'What are the speakers planning?',
        choices: ['A client dinner', 'A farewell party', 'A team-building trip', 'A welcome dinner'],
        answer: 3,
        explanation: '冒頭の「a welcome dinner for the two new designers（新人デザイナー2人の歓迎会）」が根拠だ。',
      },
      {
        q: 'What does the second woman say about Casa Verde?',
        choices: ['It has a private room.', 'It is closed on Thursdays.', 'It is expensive.', 'It requires a deposit.'],
        answer: 0,
        explanation: '2人目の女性は「they have a private room for groups（団体用の個室がある）」と述べている。',
      },
      {
        q: 'What will the man do after lunch?',
        choices: ['Invite the new designers', 'Make a reservation', 'Visit the restaurant', 'Check the budget'],
        answer: 1,
        explanation: "最後に「I'll make the reservation right after lunch（昼食の後すぐ予約する）」と述べている。",
      },
    ],
  },
  {
    id: 'ls338',
    part: 3,
    title: 'ホテルの部屋の変更',
    script: [
      { speaker: 'M', text: "Excuse me, I checked into Room 210 an hour ago, but it's right next to the elevator, and it's quite noisy. I specifically requested a quiet room when I booked." },
      { speaker: 'W', text: "I do apologize, sir. Let me check... You're right, the request is in your reservation. We have a corner room available on the eighth floor, away from the elevators." },
      { speaker: 'M', text: 'That would be much better. I have an early conference call tomorrow, so I need a good night\'s sleep.' },
      { speaker: 'W', text: 'Of course. The room will be ready in about thirty minutes. In the meantime, please accept these complimentary drink coupons for our lounge.' },
    ],
    scriptJa:
      '男性: すみません、1時間前に210号室にチェックインしたのですが、エレベーターのすぐ隣でかなりうるさいんです。予約時に静かな部屋をわざわざお願いしたのですが。\n女性: 大変申し訳ございません。確認いたします……おっしゃる通り、ご予約にリクエストが入っております。8階にエレベーターから離れた角部屋がございます。\n男性: その方がずっといいですね。明日は朝早くから電話会議があるので、しっかり眠りたいんです。\n女性: かしこまりました。お部屋は30分ほどでご用意できます。それまでの間、ラウンジの無料ドリンク券をどうぞお使いください。',
    questions: [
      {
        q: "What is the man's complaint?",
        choices: ['His room is noisy.', 'His room is too small.', 'The air conditioning is broken.', 'His reservation was lost.'],
        answer: 0,
        explanation: "男性は「it's right next to the elevator, and it's quite noisy（エレベーターの隣でうるさい）」と苦情を述べている。",
      },
      {
        q: 'Why does the man want a quiet room?',
        choices: ['He is feeling sick.', 'He has an early conference call.', 'He is traveling with children.', 'He works night shifts.'],
        answer: 1,
        explanation: '男性は「I have an early conference call tomorrow（明日朝早く電話会議がある）」と理由を述べている。',
      },
      {
        q: 'What does the woman give the man?',
        choices: ['A free breakfast', 'A late checkout', 'Drink coupons', 'A parking pass'],
        answer: 2,
        explanation: '最後に「please accept these complimentary drink coupons（無料ドリンク券をどうぞ）」と渡している。',
      },
    ],
  },
  {
    id: 'ls339',
    part: 3,
    title: 'オフィス観葉植物のレンタル',
    script: [
      { speaker: 'W', text: "Hello, I'm calling from Ardent Consulting. We'd like to put some plants in our reception area to make it more welcoming. Do you rent office plants?" },
      { speaker: 'M', text: 'Yes, we do. Our monthly plan includes delivery, and our staff visits once a month to water and replace any unhealthy plants.' },
      { speaker: 'W', text: "That's exactly what we need—nobody here has time to take care of them." },
      { speaker: 'M', text: "I'll e-mail you our catalog today. If you like, I can also visit your office next Tuesday to recommend plants that suit your lighting." },
      { speaker: 'W', text: 'Tuesday works. Could you come in the morning?' },
    ],
    scriptJa:
      '女性: もしもし、アーデント・コンサルティングの者です。受付エリアをもっと感じよくするために植物を置きたいのですが、オフィス向けの観葉植物のレンタルはやっていますか？\n男性: はい、やっております。月額プランには配達が含まれ、スタッフが月1回伺って水やりと元気のない植物の交換を行います。\n女性: まさにそれが必要なんです。ここには世話をする時間のある人がいなくて。\n男性: 本日カタログをメールでお送りします。よろしければ、来週火曜に御社へ伺って、照明に合う植物をご提案することもできますよ。\n女性: 火曜で大丈夫です。午前中に来ていただけますか？',
    questions: [
      {
        q: 'Why is the woman calling?',
        choices: ['To order flowers for an event', 'To ask about renting plants', 'To schedule a cleaning service', 'To renovate a reception area'],
        answer: 1,
        explanation: '女性は「Do you rent office plants?（オフィス向け観葉植物のレンタルはあるか）」と問い合わせている。',
      },
      {
        q: 'What is included in the monthly plan?',
        choices: ['A discount on purchases', 'Free replacement pots', 'Regular maintenance visits', 'Gardening lessons'],
        answer: 2,
        explanation: '男性は「our staff visits once a month to water and replace any unhealthy plants（月1回訪問して手入れする）」と述べている。',
      },
      {
        q: 'What will the man do next Tuesday?',
        choices: ['Deliver the plants', 'Send a catalog', 'Sign a contract', "Visit the woman's office"],
        answer: 3,
        explanation: '男性は「I can also visit your office next Tuesday（来週火曜に御社へ伺える）」と述べ、女性が同意している。カタログ送付は本日だ。',
      },
    ],
  },
];
