import type { ListeningSet } from './types';

/** Part 4 トークの追加セット（本体は part34.ts で結合） */
export const PART4_EXTRA: ListeningSet[] = [
  {
    id: 'ls406',
    part: 4,
    title: '空港の搭乗ゲート変更',
    script: [
      { speaker: 'M', text: 'Attention, passengers on Skyway Airlines Flight 274 to Denver. The departure gate for this flight has been changed from Gate 12 to Gate 31, located in Concourse C.' },
      { speaker: 'M', text: 'Please note that Concourse C is about a ten-minute walk from the main terminal, so we recommend heading there as soon as possible.' },
      { speaker: 'M', text: 'Boarding will begin at 3:40, twenty minutes later than originally scheduled.' },
      { speaker: 'M', text: 'Passengers who need wheelchair assistance should speak to a Skyway staff member at the service counter next to Gate 12.' },
    ],
    scriptJa:
      '空港アナウンス: デンバー行きスカイウェイ航空274便をご利用のお客様にご案内いたします。当便の出発ゲートは12番からコンコースCの31番に変更になりました。コンコースCはメインターミナルから徒歩約10分ですので、お早めのご移動をお勧めします。搭乗開始は当初の予定より20分遅い3時40分です。車椅子の介助が必要なお客様は、12番ゲート横のサービスカウンターで係員にお申し出ください。',
    questions: [
      {
        q: 'Where is the announcement most likely being made?',
        choices: ['At an airport', 'At a bus station', 'On a subway platform', 'At a ferry terminal'],
        answer: 0,
        explanation: '「passengers on Skyway Airlines Flight 274」「departure gate」「Boarding」から空港でのアナウンスだと分かる。',
      },
      {
        q: 'What has been changed?',
        choices: ['The destination', 'The departure gate', 'The airline', 'The ticket price'],
        answer: 1,
        explanation: '「The departure gate ... has been changed from Gate 12 to Gate 31」と述べており、変更されたのは出発ゲートである。',
      },
      {
        q: 'What should passengers who need assistance do?',
        choices: ['Call the airline', 'Board the plane first', 'Speak to a staff member at a counter', 'Wait at Gate 31'],
        answer: 2,
        explanation: '最後に「speak to a Skyway staff member at the service counter」と案内している。依頼・指示はトークの終盤に来ることが多い。',
      },
    ],
  },
  {
    id: 'ls407',
    part: 4,
    title: '駅の遅延アナウンス',
    script: [
      { speaker: 'W', text: 'Good evening, passengers. This is an announcement for the 6:15 express train to Riverside on Platform 4.' },
      { speaker: 'W', text: 'Due to a signal problem near Milton Station, this train will be delayed by approximately twenty-five minutes.' },
      { speaker: 'W', text: 'Passengers in a hurry may take the local train departing from Platform 2 at 6:20, although it makes six additional stops.' },
      { speaker: 'W', text: 'We apologize for the inconvenience. For updates, please check the electronic boards or download the Metro Transit app, which sends real-time alerts to your phone.' },
    ],
    scriptJa:
      '駅アナウンス: ご利用の皆様にご案内いたします。4番線発リバーサイド行き6時15分の急行列車についてのお知らせです。ミルトン駅付近の信号トラブルのため、この列車は約25分遅れる見込みです。お急ぎのお客様は2番線発6時20分の各駅停車をご利用いただけますが、停車駅が6駅多くなります。ご迷惑をおかけして申し訳ございません。最新情報は電光掲示板をご確認いただくか、リアルタイム通知が届くメトロトランジットのアプリをダウンロードしてください。',
    questions: [
      {
        q: 'What is the cause of the delay?',
        choices: ['Bad weather', 'Track construction', 'A medical emergency', 'A signal problem'],
        answer: 3,
        explanation: '「Due to a signal problem near Milton Station」と遅延の原因を明言している。Due to の直後に原因が来る。',
      },
      {
        q: 'What does the speaker say about the local train?',
        choices: ['It has been canceled.', 'It leaves from Platform 4.', 'It makes more stops.', 'It is faster than the express.'],
        answer: 2,
        explanation: '「it makes six additional stops（停車駅が6駅多い）」と述べている。additional stops = more stops の言い換え。',
      },
      {
        q: 'How can listeners receive real-time updates?',
        choices: ['By calling the station', 'By downloading an app', 'By visiting a ticket window', 'By listening to the radio'],
        answer: 1,
        explanation: '「download the Metro Transit app, which sends real-time alerts」= アプリでリアルタイム通知を受け取れる。',
      },
    ],
  },
  {
    id: 'ls408',
    part: 4,
    title: '留守番電話（自動車修理店）',
    script: [
      { speaker: 'M', text: 'Hi, this message is for Ms. Ramirez. This is Tony calling from Lakeside Auto Repair about your car.' },
      { speaker: 'M', text: 'We finished inspecting it this morning, and the good news is that the engine is fine. However, the brake pads are badly worn and should be replaced right away.' },
      { speaker: 'M', text: 'The parts cost eighty dollars, and with labor the total comes to about one hundred fifty.' },
      { speaker: 'M', text: "If you'd like us to go ahead with the repair, please call me back before five o'clock today, and the car will be ready tomorrow afternoon." },
    ],
    scriptJa:
      '留守電: もしもし、ラミレス様へのメッセージです。レイクサイド自動車修理のトニーです。お車の件でお電話しました。今朝点検が終わりまして、エンジンに問題はありませんでした。ただ、ブレーキパッドがかなり摩耗しており、すぐに交換が必要です。部品代は80ドル、工賃込みで合計約150ドルになります。修理を進めてよろしければ、本日5時までに折り返しお電話ください。お車は明日の午後にはお渡しできます。',
    questions: [
      {
        q: 'Why is the speaker calling?',
        choices: ['To schedule an inspection', 'To report on a vehicle', 'To cancel an order', 'To advertise a discount'],
        answer: 1,
        explanation: '「calling from Lakeside Auto Repair about your car」「We finished inspecting it」= 点検結果を報告するための電話である。',
      },
      {
        q: 'What problem does the speaker mention?',
        choices: ['Some parts are worn out.', 'The engine is damaged.', 'The car was in an accident.', 'A payment is overdue.'],
        answer: 0,
        explanation: '「the brake pads are badly worn（ブレーキパッドがひどく摩耗している）」と述べている。worn = worn out の言い換え。',
      },
      {
        q: 'What is the listener asked to do?',
        choices: ['Visit the shop tomorrow', 'Pay a deposit online', 'Bring extra parts', "Return the call by five o'clock"],
        answer: 3,
        explanation: "「please call me back before five o'clock today」= 今日5時までに折り返し電話するよう求めている。",
      },
    ],
  },
  {
    id: 'ls409',
    part: 4,
    title: '留守番電話（面接の案内）',
    script: [
      { speaker: 'W', text: "Hello, this message is for Kevin Ito. My name is Sandra Wells, and I'm the hiring manager at Grantham Publishing." },
      { speaker: 'W', text: "Thank you for applying for the editorial assistant position. We were impressed with your résumé, and we'd like to invite you to an interview next Tuesday at ten A.M. at our downtown office." },
      { speaker: 'W', text: 'The interview will last about an hour and will include a short writing test. Please bring two copies of your résumé and a form of photo identification.' },
      { speaker: 'W', text: 'To confirm the time, simply reply to the email we sent this morning.' },
    ],
    scriptJa:
      '留守電: もしもし、ケビン・イトウ様へのメッセージです。グランサム出版の採用担当マネージャー、サンドラ・ウェルズと申します。編集アシスタント職へのご応募ありがとうございます。ご経歴を高く評価し、来週火曜の午前10時にダウンタウンのオフィスでの面接にお越しいただきたく存じます。面接は約1時間で、短い筆記テストも含まれます。履歴書を2部と写真付き身分証明書をお持ちください。時間の確認は、今朝お送りしたメールに返信していただくだけで結構です。',
    questions: [
      {
        q: 'Who most likely is the speaker?',
        choices: ['A magazine editor', 'A job applicant', 'A hiring manager', 'A receptionist'],
        answer: 2,
        explanation: "「I'm the hiring manager at Grantham Publishing」と自己紹介している。冒頭の名乗りが根拠になる。",
      },
      {
        q: 'What will happen during the interview?',
        choices: ['A tour of the office', 'A group discussion', 'A salary negotiation', 'A writing test'],
        answer: 3,
        explanation: '「will include a short writing test（短い筆記テストを含む）」と述べている。',
      },
      {
        q: 'What should the listener do to confirm the appointment?',
        choices: ['Reply to an email', 'Call the office', 'Visit a website', 'Send a text message'],
        answer: 0,
        explanation: '「To confirm the time, simply reply to the email」= メールへの返信で確認する。',
      },
    ],
  },
  {
    id: 'ls410',
    part: 4,
    title: 'ラジオ広告（スポーツジム）',
    script: [
      { speaker: 'M', text: 'Are you ready to get in shape this summer? Then come down to FitZone Gym on Harbor Avenue.' },
      { speaker: 'M', text: 'For this month only, new members pay no sign-up fee and get their first month at half price.' },
      { speaker: 'M', text: 'FitZone offers modern training equipment, a heated indoor pool, and over thirty group classes a week, including yoga and spinning. Our certified trainers will even create a personal workout plan for free.' },
      { speaker: 'M', text: "Don't wait—visit our website today to book a free one-day trial pass." },
    ],
    scriptJa:
      'ラジオ広告: この夏、体を鍛える準備はできていますか？それならハーバー通りのフィットゾーン・ジムへ。今月限定で、新規会員は入会金無料、初月会費は半額です。フィットゾーンには最新のトレーニング機器、温水屋内プール、ヨガやスピニングを含む週30以上のグループレッスンがあります。認定トレーナーが無料であなた専用のトレーニングプランも作成します。お待たせしません。今日ウェブサイトから無料の1日体験パスをご予約ください。',
    questions: [
      {
        q: 'What is being advertised?',
        choices: ['A fitness center', 'A swimming school', 'A sports equipment store', 'A summer camp'],
        answer: 0,
        explanation: '「FitZone Gym」「training equipment」「group classes」からスポーツジム（fitness center）の広告である。',
      },
      {
        q: 'What can new members receive this month?',
        choices: ['A free swimsuit', 'A discounted first month', 'A free year of personal training', 'A gym bag'],
        answer: 1,
        explanation: '「get their first month at half price（初月半額）」= 初月が割引になる。half price = discounted の言い換え。',
      },
      {
        q: 'What are listeners encouraged to do?',
        choices: ['Call the gym', 'Visit the gym in person', 'Book a trial pass online', 'Attend a yoga class'],
        answer: 2,
        explanation: '「visit our website today to book a free one-day trial pass」= ウェブサイトで体験パスを予約するよう促している。',
      },
    ],
  },
  {
    id: 'ls411',
    part: 4,
    title: 'ラジオ広告（レストラン開店）',
    script: [
      { speaker: 'W', text: 'This Friday, the wait is finally over—Bella Vista, the newest Italian restaurant in the Rosedale district, opens its doors.' },
      { speaker: 'W', text: 'Chef Marco Bertini, who trained in Florence for over ten years, prepares fresh pasta daily using local ingredients.' },
      { speaker: 'W', text: 'To celebrate our grand opening, every table will receive a complimentary dessert during the first week.' },
      { speaker: 'W', text: 'Seats are filling up fast, so make a reservation now through our website or by calling 555-0187. Bella Vista—where every meal feels like a trip to Italy.' },
    ],
    scriptJa:
      'ラジオ広告: 今週金曜、ついに待望の時が来ます。ローズデール地区の最新イタリアンレストラン「ベラ・ビスタ」がオープンします。フィレンツェで10年以上修業したシェフ、マルコ・ベルティーニが、地元の食材を使った生パスタを毎日仕込みます。グランドオープンを記念して、最初の1週間は全テーブルにデザートを無料でご提供。席は急速に埋まっていますので、今すぐウェブサイトまたはお電話555-0187でご予約を。ベラ・ビスタ、すべての食事がイタリア旅行のように感じられるお店です。',
    questions: [
      {
        q: 'What type of business is being advertised?',
        choices: ['A travel agency', 'A cooking school', 'A grocery store', 'A restaurant'],
        answer: 3,
        explanation: '「the newest Italian restaurant ... opens its doors」からレストランの開店広告である。',
      },
      {
        q: 'What will customers receive during the first week?',
        choices: ['A discount on pasta', 'A free cooking lesson', 'A free dessert', 'A gift card'],
        answer: 2,
        explanation: '「every table will receive a complimentary dessert」= 無料のデザート。complimentary = free の言い換えは頻出。',
      },
      {
        q: 'Why should listeners act quickly?',
        choices: ['A sale ends on Friday.', 'Reservations are filling up quickly.', 'The chef is leaving soon.', 'The offer is for members only.'],
        answer: 1,
        explanation: '「Seats are filling up fast, so make a reservation now」= 席がすぐ埋まるため早めの予約を勧めている。',
      },
    ],
  },
  {
    id: 'ls412',
    part: 4,
    title: 'スーパーの店内放送',
    script: [
      { speaker: 'M', text: "Attention, Greenfield Market shoppers. For the next thirty minutes, all fresh seafood at our fish counter is twenty percent off. That includes today's salmon, delivered from the coast just this morning." },
      { speaker: 'M', text: "Also, don't forget that our bakery now closes at eight P.M., one hour earlier than before." },
      { speaker: 'M', text: 'Finally, a customer has lost a set of car keys with a blue keychain. If you find them, please bring them to the customer service desk near the main entrance.' },
      { speaker: 'M', text: 'Thank you for shopping at Greenfield Market.' },
    ],
    scriptJa:
      '店内放送: グリーンフィールド・マーケットをご利用のお客様にご案内いたします。これから30分間、鮮魚コーナーの魚介類がすべて20%引きです。今朝海岸から届いたばかりの本日のサーモンも対象です。また、ベーカリーの閉店時間は以前より1時間早い午後8時になりましたのでご注意ください。最後に、青いキーホルダーの付いた車の鍵をお客様がお探しです。見つけた方は正面入口近くのカスタマーサービスデスクまでお届けください。グリーンフィールド・マーケットをご利用いただきありがとうございます。',
    questions: [
      {
        q: 'Where is the announcement most likely taking place?',
        choices: ['At a fish market', 'At a supermarket', 'At a shopping mall', 'At a restaurant'],
        answer: 1,
        explanation: '「Greenfield Market shoppers」「fish counter」「bakery」など複数の売り場があることからスーパーマーケットだと分かる。',
      },
      {
        q: 'What does the speaker say about the bakery?',
        choices: ['It closes earlier than before.', 'It has moved.', 'It is offering a discount.', 'It is temporarily closed.'],
        answer: 0,
        explanation: '「our bakery now closes at eight P.M., one hour earlier than before」= 以前より1時間早く閉まる。',
      },
      {
        q: 'What are shoppers asked to do if they find the keys?',
        choices: ['Call the owner', 'Leave them where they are', 'Give them to a cashier', 'Take them to the service desk'],
        answer: 3,
        explanation: '「bring them to the customer service desk near the main entrance」= サービスデスクへ届けるよう依頼している。',
      },
    ],
  },
  {
    id: 'ls413',
    part: 4,
    title: '書店の閉店前アナウンス',
    script: [
      { speaker: 'W', text: 'Good evening, Paperleaf Books customers. The store will be closing in fifteen minutes. Please bring your final purchases to the registers at the front of the store.' },
      { speaker: 'W', text: 'As a reminder, our author event with mystery writer Dana Cole begins tomorrow at two P.M. on the second floor.' },
      { speaker: 'W', text: 'Seating is limited, so we recommend picking up a free ticket at the information desk before you leave tonight.' },
      { speaker: 'W', text: 'Also, all calendars and diaries are now thirty percent off. Thank you for visiting Paperleaf Books, and we hope to see you again soon.' },
    ],
    scriptJa:
      '店内放送: ペーパーリーフ・ブックスをご利用のお客様、当店はあと15分で閉店いたします。お買い上げの商品は店頭前方のレジまでお持ちください。なお、ミステリー作家ダナ・コールを迎えた著者イベントが明日午後2時から2階で始まります。お席に限りがございますので、本日お帰りの前にインフォメーションデスクで無料の整理券をお受け取りになることをお勧めします。また、カレンダーと手帳は全品30%引きです。ペーパーリーフ・ブックスにご来店いただきありがとうございました。またのお越しをお待ちしております。',
    questions: [
      {
        q: 'Where would this announcement most likely be heard?',
        choices: ['At a library', 'At a movie theater', 'At a bookstore', 'At a stationery factory'],
        answer: 2,
        explanation: '「Paperleaf Books」「author event」「mystery writer」から書店の店内放送だと分かる。',
      },
      {
        q: 'What will happen tomorrow afternoon?',
        choices: ['A store will close early.', 'A sale will end.', 'A new branch will open.', 'An author event will be held.'],
        answer: 3,
        explanation: '「our author event ... begins tomorrow at two P.M.」= 明日の午後に著者イベントが行われる。',
      },
      {
        q: 'What are interested customers advised to do?',
        choices: ['Get a ticket at the information desk', 'Buy a calendar', 'Reserve seats online', 'Arrive early tomorrow morning'],
        answer: 0,
        explanation: '「picking up a free ticket at the information desk before you leave tonight」= 帰る前に無料整理券を受け取るよう勧めている。',
      },
    ],
  },
  {
    id: 'ls414',
    part: 4,
    title: '会議の抜粋（オフィス移転）',
    script: [
      { speaker: 'M', text: "Next on the agenda is our office move. As you know, our lease here expires at the end of September, and we've signed a contract for a larger space in the Weston Business Park." },
      { speaker: 'M', text: 'The new office has twice as many meeting rooms and free parking for all employees.' },
      { speaker: 'M', text: 'The move itself will take place over the weekend of October third, so no work days will be lost.' },
      { speaker: 'M', text: 'Please pack your personal belongings into the boxes that will be delivered to each desk next Friday, and label them clearly with your name and department.' },
    ],
    scriptJa:
      '会議発言: 次の議題はオフィスの移転です。ご存じの通り、ここの賃貸契約は9月末で満了し、ウェストン・ビジネスパークのより広いスペースの契約を結びました。新オフィスには会議室が今の2倍あり、全社員が無料で駐車できます。引っ越し自体は10月3日の週末に行うため、勤務日が失われることはありません。来週金曜に各デスクに届く箱に私物を詰め、氏名と部署をはっきり記入してください。',
    questions: [
      {
        q: 'What is the speaker mainly discussing?',
        choices: ['An office relocation', 'A new hiring plan', 'A lease negotiation', 'A parking problem'],
        answer: 0,
        explanation: '冒頭の「Next on the agenda is our office move」から、オフィス移転が主題である。move = relocation の言い換え。',
      },
      {
        q: 'What is an advantage of the new office?',
        choices: ['It is close to a train station.', 'It has more meeting rooms.', 'It has a cafeteria.', 'The rent is lower.'],
        answer: 1,
        explanation: '「twice as many meeting rooms（会議室が2倍）」と述べている。twice as many = more の言い換え。',
      },
      {
        q: 'What are listeners asked to do?',
        choices: ['Work from home in October', 'Sign a contract', 'Pack and label their belongings', 'Reserve a meeting room'],
        answer: 2,
        explanation: '最後に「pack your personal belongings into the boxes ... and label them clearly」と依頼している。',
      },
    ],
  },
  {
    id: 'ls415',
    part: 4,
    title: '会議の抜粋（リサイクル計画）',
    script: [
      { speaker: 'W', text: "Before we wrap up, I want to introduce our new office recycling program, which starts on Monday. You'll notice three new collection bins in the kitchen area: blue for paper, yellow for plastic, and green for cans and bottles." },
      { speaker: 'W', text: 'The regular trash cans next to each desk will be removed, so please take a moment to sort your waste properly.' },
      { speaker: 'W', text: 'Last year our building produced over twenty tons of garbage, and our goal is to cut that in half within twelve months.' },
      { speaker: 'W', text: 'If you have questions, contact Rafael in general affairs.' },
    ],
    scriptJa:
      '会議発言: 締めくくる前に、月曜から始まる新しいオフィスのリサイクルプログラムを紹介します。給湯室に新しい回収ボックスが3つ置かれます。青は紙、黄色はプラスチック、緑は缶とビンです。各デスク横の通常のゴミ箱は撤去されますので、ごみは正しく分別してください。昨年このビルでは20トン以上のごみが出ましたが、目標は12か月以内にそれを半分に減らすことです。質問があれば総務のラファエルに連絡してください。',
    questions: [
      {
        q: 'What is the announcement mainly about?',
        choices: ['A kitchen renovation', 'A cleaning schedule', 'A charity event', 'A recycling program'],
        answer: 3,
        explanation: '「I want to introduce our new office recycling program」と冒頭で主題を示している。',
      },
      {
        q: 'What change will be made in the office?',
        choices: ['New desks will be installed.', 'The kitchen will be closed.', 'Desk-side trash cans will be removed.', 'Bins will be moved outside.'],
        answer: 2,
        explanation: '「The regular trash cans next to each desk will be removed」= 各デスク横のゴミ箱が撤去される。',
      },
      {
        q: 'What is the goal of the program?',
        choices: ['To save money on supplies', 'To reduce garbage by half', 'To win an environmental award', 'To recycle twenty tons of paper'],
        answer: 1,
        explanation: '「our goal is to cut that in half within twelve months」= ごみを半分に減らすのが目標。cut in half = reduce by half。',
      },
    ],
  },
  {
    id: 'ls416',
    part: 4,
    title: '市内観光バスのガイド',
    script: [
      { speaker: 'M', text: "Welcome aboard the Harborline City Tour, everyone. My name is Doug, and I'll be your guide for the next two hours." },
      { speaker: 'M', text: "Our first stop will be the Old Lighthouse, where you'll have thirty minutes to take photos and explore the small museum inside." },
      { speaker: 'M', text: "After that, we'll drive along the coast to Fisherman's Wharf for lunch." },
      { speaker: 'M', text: 'One quick reminder: this bus leaves each stop exactly on time, so please keep an eye on your watch. If you do get left behind, the next tour bus comes by about an hour later.' },
    ],
    scriptJa:
      'ツアーガイド: ハーバーライン市内ツアーへようこそ。私はダグ、これから2時間皆様のガイドを務めます。最初の停留所は旧灯台で、30分間、写真撮影と内部の小さな博物館の見学ができます。その後、海岸沿いを走ってフィッシャーマンズワーフへ向かい、昼食となります。1つご注意を。このバスは各停留所を時間通りに出発しますので、時計をこまめにご確認ください。万一乗り遅れた場合は、次のツアーバスが約1時間後に来ます。',
    questions: [
      {
        q: 'Who most likely is the speaker?',
        choices: ['A bus driver', 'A tour guide', 'A museum curator', 'A photographer'],
        answer: 1,
        explanation: "「I'll be your guide for the next two hours」と自ら名乗っており、ツアーガイドである。",
      },
      {
        q: 'What will listeners do at the first stop?',
        choices: ['Take photos and visit a museum', 'Have lunch', 'Go fishing', 'Watch a film'],
        answer: 0,
        explanation: '「thirty minutes to take photos and explore the small museum」= 写真撮影と博物館見学ができる。',
      },
      {
        q: 'What does the speaker remind listeners to do?',
        choices: ['Buy tickets in advance', 'Wear comfortable shoes', 'Stay together as a group', 'Return to the bus on time'],
        answer: 3,
        explanation: '「this bus leaves each stop exactly on time, so please keep an eye on your watch」= 時間通りにバスへ戻るよう注意している。',
      },
    ],
  },
  {
    id: 'ls417',
    part: 4,
    title: '歴史的邸宅の見学ツアー',
    script: [
      { speaker: 'W', text: 'Good afternoon, and welcome to Ashford Manor. This house was built in 1885 by shipping merchant Charles Ashford and remained in his family for nearly a century.' },
      { speaker: 'W', text: "During today's forty-five minute tour, you'll see the grand ballroom, the library with its original furniture, and the rose garden." },
      { speaker: 'W', text: 'Please note that photography is allowed everywhere except the library, where flash can damage the antique books.' },
      { speaker: 'W', text: "At the end of the tour, you're welcome to visit our tearoom, where visitors with a tour ticket receive ten percent off." },
    ],
    scriptJa:
      'ツアーガイド: こんにちは、アシュフォード邸へようこそ。この邸宅は1885年に海運商人チャールズ・アシュフォードによって建てられ、約1世紀にわたり一族が所有してきました。本日の45分のツアーでは、大舞踏室、当時の家具が残る書斎、バラ園をご覧いただきます。写真撮影は書斎以外どこでも可能ですが、書斎ではフラッシュが貴重な古書を傷めるため禁止されていますのでご注意ください。ツアーの最後にはティールームにお立ち寄りください。ツアーチケットをお持ちの方は10%引きになります。',
    questions: [
      {
        q: 'Who was Charles Ashford?',
        choices: ['An architect', 'A gardener', 'A merchant', 'A librarian'],
        answer: 2,
        explanation: '「built in 1885 by shipping merchant Charles Ashford」= 海運商人だったと述べている。',
      },
      {
        q: 'Where is photography not allowed?',
        choices: ['In the ballroom', 'In the garden', 'In the tearoom', 'In the library'],
        answer: 3,
        explanation: '「photography is allowed everywhere except the library」= 書斎（library）のみ撮影禁止。except の後ろが答え。',
      },
      {
        q: 'What can listeners do with their tour ticket?',
        choices: ['Get a discount at the tearoom', 'Enter the garden after hours', 'Join a second tour for free', 'Borrow a book'],
        answer: 0,
        explanation: '「visitors with a tour ticket receive ten percent off」= チケット提示でティールームが1割引になる。',
      },
    ],
  },
  {
    id: 'ls418',
    part: 4,
    title: 'ラジオの天気予報',
    script: [
      { speaker: 'M', text: "And now for your local weather on Radio KTOM. It's a beautiful sunny morning across the region, with temperatures expected to reach twenty-eight degrees by early afternoon." },
      { speaker: 'M', text: "However, don't let the sunshine fool you—a cold front is moving in from the north, and we're expecting heavy rain and strong winds after six this evening." },
      { speaker: 'M', text: "If you're heading to tonight's baseball game at Cedar Stadium, be sure to bring a raincoat." },
      { speaker: 'M', text: "Tomorrow will be cooler and cloudy, with a high of only nineteen degrees. I'll be back with an update at noon." },
    ],
    scriptJa:
      '天気予報: ラジオKTOMの地域の天気です。今朝は地域全体で見事な晴天となっており、午後の早い時間には気温が28度に達する見込みです。しかし、この日差しに油断は禁物です。北から寒冷前線が近づいており、今夜6時以降は激しい雨と強風が予想されます。今夜シーダースタジアムでの野球観戦に出かける方は、必ずレインコートをお持ちください。明日は涼しく曇りで、最高気温はわずか19度です。正午に最新情報をお伝えします。',
    questions: [
      {
        q: 'Who most likely is the speaker?',
        choices: ['A radio weather reporter', 'A stadium announcer', 'A sports commentator', 'A travel agent'],
        answer: 0,
        explanation: '「your local weather on Radio KTOM」からラジオの気象キャスターだと分かる。',
      },
      {
        q: 'What will the weather be like this evening?',
        choices: ['Sunny and warm', 'Rainy and windy', 'Cold and snowy', 'Foggy'],
        answer: 1,
        explanation: '「heavy rain and strong winds after six this evening」= 今夜は雨と強風になる。',
      },
      {
        q: 'What are baseball fans advised to do?',
        choices: ['Arrive early', 'Buy tickets online', 'Bring a raincoat', 'Watch the game at home'],
        answer: 2,
        explanation: '「be sure to bring a raincoat」= レインコートを持参するよう勧めている。',
      },
    ],
  },
  {
    id: 'ls419',
    part: 4,
    title: 'ラジオの交通情報',
    script: [
      { speaker: 'W', text: "You're listening to the morning traffic report on 99.5 FM. Drivers heading downtown should avoid Highway 7, where a truck has broken down near the Kingston Bridge, blocking two lanes." },
      { speaker: 'W', text: 'Traffic is backed up for about three kilometers, and crews expect the road to be fully clear by nine o\'clock.' },
      { speaker: 'W', text: 'As an alternative, take Route 15 through Oakdale, which is moving smoothly.' },
      { speaker: 'W', text: "Also, remember that the Fifth Street tunnel remains closed for repairs until the end of the month. I'll have your next update in twenty minutes." },
    ],
    scriptJa:
      '交通情報: 99.5FMの朝の交通情報です。ダウンタウン方面へ向かうドライバーの皆さんは7号線を避けてください。キングストン橋付近でトラックが故障し、2車線をふさいでいます。渋滞は約3キロにわたり、作業班によると道路が完全に通れるのは9時頃の見込みです。代わりにオークデール経由の15号線をご利用ください。こちらは順調に流れています。また、5番街トンネルは補修工事のため今月末まで閉鎖中ですのでご注意ください。次の更新は20分後です。',
    questions: [
      {
        q: 'What is causing the delay on Highway 7?',
        choices: ['Road repairs', 'An accident between two cars', 'Heavy snow', 'A broken-down truck'],
        answer: 3,
        explanation: '「a truck has broken down near the Kingston Bridge, blocking two lanes」= トラックの故障が渋滞の原因。',
      },
      {
        q: 'What does the speaker suggest drivers do?',
        choices: ["Wait until nine o'clock", 'Use public transportation', 'Take Route 15 instead', 'Cross the Kingston Bridge'],
        answer: 2,
        explanation: '「As an alternative, take Route 15 through Oakdale」= 代替ルートとして15号線を勧めている。',
      },
      {
        q: 'What does the speaker say about the Fifth Street tunnel?',
        choices: ['It just reopened.', 'It is closed for repairs.', 'It is open only at night.', 'It has a new toll.'],
        answer: 1,
        explanation: '「the Fifth Street tunnel remains closed for repairs until the end of the month」= 月末まで補修のため閉鎖中。',
      },
    ],
  },
  {
    id: 'ls420',
    part: 4,
    title: '授賞スピーチ（年間最優秀社員）',
    script: [
      { speaker: 'M', text: "Thank you all for coming to our annual awards dinner. It's now time to present the Employee of the Year award." },
      { speaker: 'M', text: "This year's winner joined our customer support team just three years ago. Since then, she has trained a dozen new staff members and developed a response guide that cut our average reply time in half." },
      { speaker: 'M', text: 'Customers regularly mention her by name in their thank-you letters. Ladies and gentlemen, please give a warm round of applause to Angela Reyes.' },
      { speaker: 'M', text: 'Angela, please come up to the stage to accept your award and say a few words.' },
    ],
    scriptJa:
      'スピーチ: 年次授賞ディナーにお集まりいただきありがとうございます。それでは年間最優秀社員賞の発表です。今年の受賞者はわずか3年前にカスタマーサポートチームに加わりました。以来、12名の新人を指導し、平均返信時間を半分に短縮した対応ガイドを作成しました。お客様からの感謝の手紙にも頻繁に名前が挙がります。皆様、アンジェラ・レイエスさんに温かい拍手をお願いします。アンジェラさん、ステージに上がって賞をお受け取りになり、一言お願いします。',
    questions: [
      {
        q: 'What event is taking place?',
        choices: ['A retirement party', 'An awards ceremony', 'A product launch', 'A training session'],
        answer: 1,
        explanation: '「our annual awards dinner」「present the Employee of the Year award」から授賞式だと分かる。',
      },
      {
        q: 'What did Angela Reyes create?',
        choices: ['A response guide', 'A customer survey', 'A training video', 'A new product'],
        answer: 0,
        explanation: '「developed a response guide that cut our average reply time in half」= 返信時間を半減させた対応ガイドを作成した。',
      },
      {
        q: 'What is Angela asked to do?',
        choices: ['Hand out awards', 'Sing a song', 'Take a photo', 'Come up and give a speech'],
        answer: 3,
        explanation: '「please come up to the stage to accept your award and say a few words」= 登壇して一言述べるよう求められている。',
      },
    ],
  },
  {
    id: 'ls421',
    part: 4,
    title: '退職記念スピーチ',
    script: [
      { speaker: 'W', text: "Could I have everyone's attention, please? Tonight we're here to celebrate Frank Muller, who is retiring after thirty-five years with Dawson Engineering." },
      { speaker: 'W', text: 'Frank started here as a junior draftsman and went on to lead the design of the Harbor View Bridge, the project our company is best known for.' },
      { speaker: 'W', text: 'More than that, he has been a patient mentor to countless young engineers, including me.' },
      { speaker: 'W', text: "Frank, we've all signed this photo album of your projects over the years, and we hope it brings back good memories. Now, let's all raise our glasses to Frank." },
    ],
    scriptJa:
      'スピーチ: 皆さん、ご注目ください。今夜はドーソン・エンジニアリングに35年勤め、退職されるフランク・ミュラーさんをお祝いする会です。フランクさんは製図係としてここでキャリアを始め、当社が最も有名なプロジェクトであるハーバービュー橋の設計を率いるまでになりました。それ以上に、私を含む数え切れないほどの若手エンジニアの辛抱強い指導者でした。フランクさん、歴代のプロジェクトの写真アルバムに全員で寄せ書きをしました。良い思い出がよみがえることを願っています。それでは皆さん、フランクさんに乾杯しましょう。',
    questions: [
      {
        q: 'What is the purpose of the speech?',
        choices: ['To welcome a new employee', 'To announce a project', 'To honor a retiring colleague', 'To introduce a client'],
        answer: 2,
        explanation: '「to celebrate Frank Muller, who is retiring after thirty-five years」= 退職する同僚を称えるスピーチである。',
      },
      {
        q: 'What is Dawson Engineering best known for?',
        choices: ['A photo album', 'A training program', 'An office building', 'A bridge project'],
        answer: 3,
        explanation: '「the Harbor View Bridge, the project our company is best known for」= 橋の設計プロジェクトで最も有名。',
      },
      {
        q: 'What will the listeners most likely do next?',
        choices: ['Make a toast', 'Watch a video', 'Sign an album', 'Take a group photo'],
        answer: 0,
        explanation: "最後の「let's all raise our glasses to Frank」= 乾杯する。raise glasses = make a toast の言い換え。",
      },
    ],
  },
  {
    id: 'ls422',
    part: 4,
    title: '美術館の音声ガイド',
    script: [
      { speaker: 'W', text: 'Welcome to Gallery Six, home of our nineteenth-century landscape collection. The large painting in front of you, Morning on the River, was completed by Helen Foster in 1872.' },
      { speaker: 'W', text: 'Foster was unusual for her time because she painted outdoors instead of in a studio, capturing the changing light directly.' },
      { speaker: 'W', text: "Look closely at the water, and you'll see hundreds of tiny brushstrokes in different shades of blue and gold." },
      { speaker: 'W', text: "To learn about the artist's life, press number seven on your audio guide. Otherwise, continue to Gallery Seven for our sculpture collection." },
    ],
    scriptJa:
      '音声ガイド: 19世紀の風景画コレクションを収めた第6ギャラリーへようこそ。目の前の大きな絵画「川の朝」は、ヘレン・フォスターが1872年に完成させたものです。フォスターは当時としては珍しく、アトリエではなく屋外で描き、移り変わる光を直接とらえました。水面をよく見ると、青と金色のさまざまな色合いの小さな筆致が何百も見えます。画家の生涯について知りたい方は、音声ガイドの7番を押してください。そうでない方は、彫刻コレクションのある第7ギャラリーへお進みください。',
    questions: [
      {
        q: 'Where is this talk most likely being heard?',
        choices: ['In an art museum', "In an artist's studio", 'On a riverboat tour', 'In a paint store'],
        answer: 0,
        explanation: '「Gallery Six」「painting」「audio guide」から美術館の音声ガイドだと分かる。',
      },
      {
        q: 'According to the speaker, what was unusual about Helen Foster?',
        choices: ['She never sold her paintings.', 'She painted outdoors.', 'She used only blue paint.', 'She was self-taught.'],
        answer: 1,
        explanation: '「unusual for her time because she painted outdoors instead of in a studio」= 屋外で描いた点が当時珍しかった。',
      },
      {
        q: "How can listeners learn about the artist's life?",
        choices: ['By joining a guided tour', 'By reading a sign', 'By pressing number seven', 'By visiting Gallery Seven'],
        answer: 2,
        explanation: "「To learn about the artist's life, press number seven on your audio guide」と案内している。",
      },
    ],
  },
  {
    id: 'ls423',
    part: 4,
    title: '科学館の音声ガイド',
    script: [
      { speaker: 'M', text: "You've reached the Deep Ocean exhibit, one of the newest sections of the Harper Science Center. The model hanging above you shows a giant squid at its actual size—thirteen meters long." },
      { speaker: 'M', text: 'Scientists knew about these animals for centuries but only filmed one alive for the first time in 2004.' },
      { speaker: 'M', text: 'In the tank to your right, you can watch live deep-sea shrimp that glow in the dark. Feel free to touch the interactive screen to explore the ocean floor.' },
      { speaker: 'M', text: 'Please note that the exhibit hall closes thirty minutes before the rest of the museum.' },
    ],
    scriptJa:
      '音声ガイド: ここはハーパー科学センターで最も新しいセクションの一つ、深海展示です。頭上に吊るされた模型は、実物大13メートルのダイオウイカです。科学者たちは何世紀も前からこの生き物の存在を知っていましたが、生きた姿が初めて撮影されたのは2004年のことです。右側の水槽では、暗闇で光る生きた深海エビを観察できます。タッチパネルに自由に触れて、海底を探検してみてください。なお、この展示ホールは館内の他の場所より30分早く閉まりますのでご注意ください。',
    questions: [
      {
        q: 'What is the topic of the exhibit?',
        choices: ['Space exploration', 'Ancient fish fossils', 'Ships and sailing', 'Deep-sea life'],
        answer: 3,
        explanation: '「the Deep Ocean exhibit」「giant squid」「deep-sea shrimp」から深海の生き物に関する展示である。',
      },
      {
        q: 'According to the speaker, what happened in 2004?',
        choices: ['The museum opened.', 'A model was built.', 'A giant squid was filmed alive.', 'A new species was named.'],
        answer: 2,
        explanation: '「only filmed one alive for the first time in 2004」= 生きたダイオウイカが初めて撮影されたのが2004年。',
      },
      {
        q: 'What does the speaker say about the exhibit hall?',
        choices: ['It is free to enter.', 'It closes earlier than the museum.', 'It is being renovated.', 'It opens at noon.'],
        answer: 1,
        explanation: '「closes thirty minutes before the rest of the museum」= 館内の他の場所より早く閉まる。',
      },
    ],
  },
  {
    id: 'ls424',
    part: 4,
    title: '電話の保留メッセージ（銀行）',
    script: [
      { speaker: 'W', text: 'Thank you for calling Meridian Bank. All of our representatives are currently helping other customers. Your call is important to us, and it will be answered in the order it was received.' },
      { speaker: 'W', text: 'The current wait time is approximately eight minutes.' },
      { speaker: 'W', text: 'Did you know that many services are available without waiting? Through our mobile app, you can check your balance, transfer money, and even deposit checks by taking a photo.' },
      { speaker: 'W', text: "If you're calling to report a lost or stolen card, please press one now to be connected immediately. Otherwise, please stay on the line." },
    ],
    scriptJa:
      '保留メッセージ: メリディアン銀行にお電話いただきありがとうございます。ただいまオペレーターは全員他のお客様の対応中です。お電話は受付順におつなぎいたします。現在の待ち時間は約8分です。お待ちいただかなくてもご利用いただけるサービスが多数あるのをご存じですか？モバイルアプリでは残高照会、送金、さらに写真を撮るだけで小切手の預け入れもできます。カードの紛失・盗難のご連絡の場合は、今すぐ1を押していただければ直ちにおつなぎします。それ以外の方はそのままお待ちください。',
    questions: [
      {
        q: 'What type of business recorded the message?',
        choices: ['A phone company', 'A bank', 'An insurance agency', 'A photo studio'],
        answer: 1,
        explanation: '「Thank you for calling Meridian Bank」「check your balance」から銀行の保留メッセージである。',
      },
      {
        q: 'What can callers do with the mobile app?',
        choices: ['Deposit checks', 'Order new cards', 'Apply for a loan', 'Make an appointment'],
        answer: 0,
        explanation: '「even deposit checks by taking a photo」= 写真を撮って小切手を預け入れできる。',
      },
      {
        q: 'Why should some callers press one?',
        choices: ['To hear the menu again', 'To leave a message', 'To change the language', 'To report a lost card'],
        answer: 3,
        explanation: '「to report a lost or stolen card, please press one now」= カード紛失・盗難の連絡は1を押す。',
      },
    ],
  },
  {
    id: 'ls425',
    part: 4,
    title: '電話の保留メッセージ（電力会社）',
    script: [
      { speaker: 'M', text: "Thank you for calling Northgate Power and Light. Due to last night's storm, we are receiving a very high number of calls, and wait times may be longer than usual." },
      { speaker: 'M', text: "If you are calling to report a power outage in your area, there's no need to wait—our crews are already aware of outages in the Fairview and Elm Hill districts and expect to restore service by four P.M. today." },
      { speaker: 'M', text: 'For updates, visit our website, where an outage map is refreshed every fifteen minutes.' },
      { speaker: 'M', text: 'To discuss your bill or start new service, please remain on the line.' },
    ],
    scriptJa:
      '保留メッセージ: ノースゲート電力にお電話いただきありがとうございます。昨夜の嵐の影響で大変多くのお電話をいただいており、待ち時間が通常より長くなる場合があります。お住まいの地域の停電のご連絡でしたら、お待ちいただく必要はありません。フェアビュー地区とエルムヒル地区の停電はすでに把握しており、本日午後4時までの復旧を見込んでいます。最新情報は当社ウェブサイトをご覧ください。停電マップが15分ごとに更新されます。ご請求や新規契約のご相談は、そのまま電話を切らずにお待ちください。',
    questions: [
      {
        q: 'Why are wait times longer than usual?',
        choices: ['A computer system is down.', 'It is a national holiday.', 'A storm caused many calls.', 'The office is short-staffed.'],
        answer: 2,
        explanation: "「Due to last night's storm, we are receiving a very high number of calls」= 嵐の影響で電話が集中している。",
      },
      {
        q: 'What does the speaker say about the Fairview and Elm Hill districts?',
        choices: ['They have new offices.', 'Bills there will increase.', 'Crews cannot reach them.', 'Power will be restored by 4 P.M.'],
        answer: 3,
        explanation: '「expect to restore service by four P.M. today」= 両地区は午後4時までに復旧見込みである。',
      },
      {
        q: 'How can callers get the latest information?',
        choices: ['By checking a map on the website', 'By pressing two', 'By sending an email', 'By calling back later'],
        answer: 0,
        explanation: '「visit our website, where an outage map is refreshed every fifteen minutes」= ウェブサイトの停電マップで確認できる。',
      },
    ],
  },
  {
    id: 'ls426',
    part: 4,
    title: 'ポッドキャストの冒頭（ビジネス）',
    script: [
      { speaker: 'M', text: "Hello, and welcome back to Small Steps, the weekly podcast for small business owners. I'm your host, Victor Chan." },
      { speaker: 'M', text: "Last week we talked about hiring your first employee, and so many of you wrote in with follow-up questions that we've decided to continue the topic today." },
      { speaker: 'M', text: 'My guest is Priya Nair, who runs a chain of three coffee shops and manages more than forty staff members. Later in the show, she\'ll share her checklist for training new hires.' },
      { speaker: 'M', text: "But first, a quick word from this episode's sponsor, Ledgerly accounting software." },
    ],
    scriptJa:
      'ポッドキャスト: こんにちは。中小企業経営者のための週刊ポッドキャスト「スモール・ステップス」へお帰りなさい。ホストのビクター・チャンです。先週は初めての従業員の採用について話しましたが、非常に多くの追加質問が寄せられたため、今日もこのテーマを続けることにしました。ゲストはプリヤ・ナイールさん。3店舗のコーヒーショップを経営し、40人以上のスタッフを管理しています。番組の後半で、新人研修のチェックリストを紹介してくれます。その前に、今回のスポンサー、会計ソフトのレジャリーからのお知らせです。',
    questions: [
      {
        q: 'Who is the intended audience of the podcast?',
        choices: ['Small business owners', 'Coffee lovers', 'Job seekers', 'Accountants'],
        answer: 0,
        explanation: '「the weekly podcast for small business owners」と冒頭で対象リスナーを明言している。',
      },
      {
        q: 'Why is the topic being continued from last week?',
        choices: ['The guest canceled.', 'Many listeners sent questions.', 'The host was on vacation.', 'A new law was passed.'],
        answer: 1,
        explanation: '「so many of you wrote in with follow-up questions」= 多くのリスナーから質問が届いたため。',
      },
      {
        q: 'What will listeners most likely hear next?',
        choices: ['An interview with Priya Nair', 'A training checklist', "A sponsor's advertisement", 'Listener questions'],
        answer: 2,
        explanation: "最後の「But first, a quick word from this episode's sponsor」= 次に流れるのはスポンサーの広告である。",
      },
    ],
  },
  {
    id: 'ls427',
    part: 4,
    title: 'ポッドキャストの冒頭（旅行）',
    script: [
      { speaker: 'W', text: "Welcome to Passport Diaries, the show that takes you around the world one city at a time. I'm Monica Reed." },
      { speaker: 'W', text: "In today's episode, we're heading to Lisbon, Portugal—a city famous for its yellow trams, tiled buildings, and, of course, custard tarts." },
      { speaker: 'W', text: "I spent two weeks there last spring, and I'll share how to enjoy the city on just fifty dollars a day. I'll also tell you about a common mistake tourists make when buying tram tickets." },
      { speaker: 'W', text: "Before we begin, don't forget to subscribe so you never miss an episode." },
    ],
    scriptJa:
      'ポッドキャスト: 世界の都市を一つずつ巡る番組「パスポート・ダイアリーズ」へようこそ。モニカ・リードです。今日のエピソードで訪れるのはポルトガルのリスボン。黄色いトラム、タイル張りの建物、そしてもちろんエッグタルトで有名な街です。私は昨年の春に2週間滞在しました。1日わずか50ドルでこの街を楽しむ方法をお伝えします。また、観光客がトラムの切符を買うときにやりがちな失敗についてもお話しします。始める前に、聞き逃しがないよう番組の登録をお忘れなく。',
    questions: [
      {
        q: "What is the main topic of today's episode?",
        choices: ['Portuguese cooking', 'European history', 'Train travel', 'Traveling to Lisbon'],
        answer: 3,
        explanation: "「In today's episode, we're heading to Lisbon, Portugal」= リスボン旅行が今回のテーマである。",
      },
      {
        q: 'What will the speaker explain?',
        choices: ['How to learn Portuguese', 'Where to buy tiles', 'How to travel on a budget', 'How to rent a car'],
        answer: 2,
        explanation: '「how to enjoy the city on just fifty dollars a day」= 少ない予算で楽しむ方法。on fifty dollars a day = on a budget の言い換え。',
      },
      {
        q: 'What does the speaker ask listeners to do?',
        choices: ['Leave a review', 'Subscribe to the show', 'Send in questions', 'Visit a website'],
        answer: 1,
        explanation: "「don't forget to subscribe so you never miss an episode」= 番組の登録を促している。",
      },
    ],
  },
  {
    id: 'ls428',
    part: 4,
    title: '工場見学の安全説明',
    script: [
      { speaker: 'M', text: 'Good morning, everyone, and welcome to the Brennan Manufacturing plant. Before we enter the production floor, I need to go over a few safety rules.' },
      { speaker: 'M', text: "First, hard hats and safety glasses must be worn at all times; you'll find yours in the bins by the door." },
      { speaker: 'M', text: 'Second, please stay inside the yellow walking lanes painted on the floor—forklifts have the right of way outside those lines. Finally, photography is strictly prohibited because some of the equipment involves confidential designs.' },
      { speaker: 'M', text: 'If you hear the alarm at any point, follow me calmly to the nearest exit.' },
    ],
    scriptJa:
      '安全説明: おはようございます。ブレナン製造工場へようこそ。生産フロアに入る前に、いくつか安全ルールを説明します。第一に、ヘルメットと保護メガネは常時着用してください。ドア横のケースに用意してあります。第二に、床に塗られた黄色い歩行レーンの内側を歩いてください。線の外側はフォークリフトが優先です。最後に、一部の設備には機密性の高い設計が含まれるため、撮影は固く禁止されています。警報が鳴った場合は、落ち着いて私について最寄りの出口へ向かってください。',
    questions: [
      {
        q: 'Who most likely are the listeners?',
        choices: ['New forklift drivers', 'Visitors to a factory', 'Safety inspectors', 'Equipment designers'],
        answer: 1,
        explanation: '「welcome to the Brennan Manufacturing plant」「Before we enter the production floor」から工場の見学者への説明である。',
      },
      {
        q: 'Why is photography prohibited?',
        choices: ['Some designs are confidential.', 'Flash disturbs the workers.', 'Cameras are not allowed by law.', 'It slows down the tour.'],
        answer: 0,
        explanation: '「because some of the equipment involves confidential designs」= 機密の設計が含まれるため撮影禁止。',
      },
      {
        q: 'What should listeners do if they hear an alarm?',
        choices: ['Call security', 'Put on a hard hat', 'Stay where they are', 'Follow the speaker to an exit'],
        answer: 3,
        explanation: '「follow me calmly to the nearest exit」= 話し手について最寄りの出口へ向かう。',
      },
    ],
  },
  {
    id: 'ls429',
    part: 4,
    title: '避難訓練の館内放送',
    script: [
      { speaker: 'W', text: "May I have your attention, please. This is a message for all employees of the Colton Building. As announced in last week's email, we will hold our annual fire drill this morning at ten thirty." },
      { speaker: 'W', text: 'When the alarm sounds, please stop your work, leave your belongings at your desk, and walk down the nearest stairway—do not use the elevators.' },
      { speaker: 'W', text: 'Once outside, gather in the parking lot across the street, where your floor leader will take attendance.' },
      { speaker: 'W', text: 'The whole drill should take no more than twenty minutes. Thank you for your cooperation.' },
    ],
    scriptJa:
      '館内放送: ご案内申し上げます。コルトンビルにお勤めの皆様へのお知らせです。先週のメールでお知らせした通り、本日午前10時30分に年次避難訓練を実施します。警報が鳴りましたら作業を止め、持ち物はデスクに置いたまま、最寄りの階段で降りてください。エレベーターは使用しないでください。屋外に出たら、通りの向かいの駐車場に集合してください。各フロアのリーダーが点呼を行います。訓練全体は20分以内に終わる見込みです。ご協力をお願いいたします。',
    questions: [
      {
        q: 'What is the purpose of the announcement?',
        choices: ['To report a real fire', 'To introduce new staff', 'To explain a fire drill', 'To announce building repairs'],
        answer: 2,
        explanation: '「we will hold our annual fire drill this morning」= 避難訓練の実施を知らせる放送である。',
      },
      {
        q: 'What should employees avoid doing?',
        choices: ['Leaving their desks', 'Walking down the stairs', 'Talking during the drill', 'Using the elevators'],
        answer: 3,
        explanation: '「do not use the elevators」= エレベーターの使用が禁止されている。',
      },
      {
        q: 'What will happen in the parking lot?',
        choices: ['Attendance will be taken.', 'A speech will be given.', 'Fire equipment will be tested.', 'Coffee will be served.'],
        answer: 0,
        explanation: '「your floor leader will take attendance」= 駐車場でフロアリーダーが点呼を取る。',
      },
    ],
  },
  {
    id: 'ls430',
    part: 4,
    title: '新入社員オリエンテーション（初日）',
    script: [
      { speaker: 'M', text: "Good morning, and welcome to your first day at Halden Insurance. I'm Greg from the human resources department, and I'll be guiding you through today's orientation." },
      { speaker: 'M', text: "This morning, we'll start with a tour of the building, including the cafeteria and fitness room, both of which are free for employees." },
      { speaker: 'M', text: "After lunch, you'll receive your ID badges and laptops in Room 204. Please keep your badge with you at all times—you'll need it to enter the building and to print documents." },
      { speaker: 'M', text: 'If you have any questions during your first weeks, my door is always open.' },
    ],
    scriptJa:
      'オリエンテーション: おはようございます。ハルデン保険での初日へようこそ。人事部のグレッグです。本日のオリエンテーションをご案内します。午前中はまず社屋の見学から始めます。社員食堂とフィットネスルームも回りますが、どちらも社員は無料で利用できます。昼食後は204号室で社員証とノートパソコンをお渡しします。社員証は常に携帯してください。建物への入館と書類の印刷に必要です。最初の数週間で質問があれば、いつでも私のところへ来てください。',
    questions: [
      {
        q: 'Who most likely is the speaker?',
        choices: ['A human resources employee', 'A security guard', 'A company president', 'An IT technician'],
        answer: 0,
        explanation: "「I'm Greg from the human resources department」と冒頭で人事部の社員だと名乗っている。",
      },
      {
        q: 'What will the listeners do after lunch?',
        choices: ['Tour the cafeteria', 'Receive badges and laptops', 'Meet their managers', 'Take ID photos'],
        answer: 1,
        explanation: "「After lunch, you'll receive your ID badges and laptops in Room 204」= 昼食後に社員証とパソコンを受け取る。",
      },
      {
        q: 'Why do employees need their badges?',
        choices: ['To ride the elevator', 'To get free meals', 'To enter the building', 'To park their cars'],
        answer: 2,
        explanation: "「you'll need it to enter the building and to print documents」= 入館と印刷に社員証が必要である。",
      },
    ],
  },
  {
    id: 'ls431',
    part: 4,
    title: '新入社員オリエンテーション（福利厚生）',
    script: [
      { speaker: 'W', text: "Next, let's talk about your employee benefits. Everyone here is eligible for health insurance starting on the first day of next month—you should have received the enrollment forms in your welcome packet." },
      { speaker: 'W', text: 'The company also matches whatever you put into your retirement account, up to five percent of your salary, so I strongly encourage you to sign up.' },
      { speaker: 'W', text: 'Finally, after one full year with us, you can use our tuition support program, which covers up to two thousand dollars of classes related to your job.' },
      { speaker: 'W', text: 'Please return the completed forms to me by Friday.' },
    ],
    scriptJa:
      'オリエンテーション: 次に福利厚生について説明します。皆さんは来月1日から健康保険に加入できます。加入申込書はウェルカムパックに入っているはずです。また、会社は皆さんが退職金口座に積み立てた額と同額を、給与の5%を上限に上乗せしますので、加入を強くお勧めします。最後に、勤続1年を過ぎると学費支援制度が利用でき、業務に関連する講座の受講料が2,000ドルまで補助されます。記入済みの書類は金曜日までに私に提出してください。',
    questions: [
      {
        q: 'What is the speaker mainly discussing?',
        choices: ['Company history', 'Job responsibilities', 'Office equipment', 'Employee benefits'],
        answer: 3,
        explanation: "冒頭の「let's talk about your employee benefits」から福利厚生の説明が主題である。",
      },
      {
        q: 'What does the speaker strongly encourage listeners to do?',
        choices: ['Buy company stock', 'Take classes right away', 'Sign up for the retirement plan', 'Choose a doctor'],
        answer: 2,
        explanation: '会社の上乗せ拠出を説明した上で「I strongly encourage you to sign up」= 退職金制度への加入を勧めている。',
      },
      {
        q: 'What must employees do to use the tuition program?',
        choices: ["Get a manager's permission", 'Work for the company for a year', 'Pay half the cost', 'Pass an exam'],
        answer: 1,
        explanation: '「after one full year with us, you can use our tuition support program」= 利用には勤続1年が条件である。',
      },
    ],
  },
  {
    id: 'ls432',
    part: 4,
    title: '新製品発表（スマートウォッチ）',
    script: [
      { speaker: 'M', text: "Thank you all for joining us today. I'm thrilled to introduce the Pulse Five, the newest smartwatch from Vertex Electronics." },
      { speaker: 'M', text: 'Our customers told us that battery life was their biggest frustration, so our engineers redesigned the power system from the ground up.' },
      { speaker: 'M', text: "The result: the Pulse Five runs for ten full days on a single charge—three times longer than our previous model. It's also fully waterproof down to fifty meters." },
      { speaker: 'M', text: 'The watch goes on sale on March first, but everyone in this room will receive a sample unit on your way out today.' },
    ],
    scriptJa:
      '製品発表: 本日はお集まりいただきありがとうございます。バーテックス・エレクトロニクスの最新スマートウォッチ「パルス・ファイブ」を紹介できることを嬉しく思います。お客様から最大の不満はバッテリー持続時間だと伺い、当社のエンジニアが電源システムを一から設計し直しました。その結果、パルス・ファイブは1回の充電で丸10日間動作します。前モデルの3倍です。さらに水深50メートルまでの完全防水です。発売は3月1日ですが、この会場の皆様にはお帰りの際にサンプル機を差し上げます。',
    questions: [
      {
        q: 'What product is being introduced?',
        choices: ['A smartphone', 'A smartwatch', 'A battery charger', 'A diving computer'],
        answer: 1,
        explanation: '「the Pulse Five, the newest smartwatch from Vertex Electronics」= 発表されているのはスマートウォッチである。',
      },
      {
        q: 'What problem did customers report about earlier models?',
        choices: ['Short battery life', 'High prices', 'Weak waterproofing', 'Small screens'],
        answer: 0,
        explanation: '「battery life was their biggest frustration」= バッテリー持続時間が最大の不満だった。',
      },
      {
        q: 'What will the listeners receive today?',
        choices: ['A discount coupon', 'A brochure', 'A free battery', 'A sample product'],
        answer: 3,
        explanation: '「everyone in this room will receive a sample unit on your way out today」= 帰り際にサンプル機がもらえる。',
      },
    ],
  },
  {
    id: 'ls433',
    part: 4,
    title: '新製品発表（キッチン家電）',
    script: [
      { speaker: 'W', text: "Good afternoon, everyone, and thank you for coming to today's press event. At Novara Home, we believe cooking should be simple, and that's why we created the ChefMate One." },
      { speaker: 'W', text: 'This single machine chops, steams, blends, and even weighs your ingredients—replacing five separate appliances on your kitchen counter.' },
      { speaker: 'W', text: 'It connects to an app with over a thousand step-by-step recipes, and the built-in screen guides you through every stage.' },
      { speaker: 'W', text: 'In a moment, our head of product design will give a live cooking demonstration, so please move closer to the stage where you can see clearly.' },
    ],
    scriptJa:
      '製品発表: こんにちは。本日のプレス発表会にお越しいただきありがとうございます。ノヴァラ・ホームは料理はシンプルであるべきだと考え、「シェフメイト・ワン」を開発しました。この1台で刻む、蒸す、混ぜる、さらには材料の計量までこなし、キッチンカウンターの5つの家電の代わりになります。1,000以上のステップ形式レシピを収録したアプリと連携し、内蔵スクリーンがすべての工程をガイドします。まもなく製品デザイン責任者が実演調理を行いますので、よく見えるようステージの近くへお寄りください。',
    questions: [
      {
        q: 'Who most likely are the listeners?',
        choices: ['Professional chefs', 'Store owners', 'Members of the press', 'New employees'],
        answer: 2,
        explanation: "「thank you for coming to today's press event」= プレス発表会なので、聞き手は報道関係者である。",
      },
      {
        q: 'What is special about the ChefMate One?',
        choices: ['It is the cheapest on the market.', 'It cleans itself.', 'It was designed by a famous chef.', 'It performs the work of several appliances.'],
        answer: 3,
        explanation: '「replacing five separate appliances」= 1台で複数の家電の役割を果たす点が特長である。',
      },
      {
        q: 'What are the listeners asked to do?',
        choices: ['Move closer to the stage', 'Download an app', 'Taste some dishes', 'Ask questions'],
        answer: 0,
        explanation: '最後に「please move closer to the stage where you can see clearly」と依頼している。',
      },
    ],
  },
  {
    id: 'ls434',
    part: 4,
    title: '空港の欠航案内',
    script: [
      { speaker: 'M', text: 'Attention in the terminal, please. Due to heavy fog, Coastal Airways regrets to announce that Flight 88 to Portland has been canceled.' },
      { speaker: 'M', text: 'Passengers holding tickets for this flight have been automatically rebooked on Flight 92, which departs tomorrow morning at seven fifteen.' },
      { speaker: 'M', text: 'If this new flight does not suit your schedule, you may request a full refund at the Coastal Airways ticket counter.' },
      { speaker: 'M', text: 'The airline will also provide hotel vouchers for tonight; to receive one, please see an agent at Gate 15 with your boarding pass. We sincerely apologize for the disruption.' },
    ],
    scriptJa:
      '空港アナウンス: ターミナル内の皆様にご案内いたします。濃霧のため、コースタル航空はポートランド行き88便の欠航を決定いたしました。当便のチケットをお持ちのお客様は、明朝7時15分発の92便に自動的に振り替えられています。新しい便のご都合が悪い場合は、コースタル航空チケットカウンターで全額払い戻しを承ります。また、本日の宿泊用ホテルクーポンをご用意しています。搭乗券をお持ちの上、15番ゲートの係員までお越しください。ご迷惑をおかけして誠に申し訳ございません。',
    questions: [
      {
        q: 'Why was the flight canceled?',
        choices: ['Because of fog', 'Because of a mechanical problem', 'Because of a strike', 'Because of strong winds'],
        answer: 0,
        explanation: '「Due to heavy fog ... Flight 88 to Portland has been canceled」= 濃霧が欠航の理由である。',
      },
      {
        q: 'What has the airline already done for passengers?',
        choices: ['Refunded all tickets', 'Rebooked them on another flight', 'Arranged bus transportation', 'Upgraded their seats'],
        answer: 1,
        explanation: '「have been automatically rebooked on Flight 92」= すでに別便へ自動的に振り替え済みである。',
      },
      {
        q: 'How can passengers get a hotel voucher?',
        choices: ['By calling the airline', 'By waiting at the ticket counter', 'By showing a boarding pass at Gate 15', 'By filling out an online form'],
        answer: 2,
        explanation: '「see an agent at Gate 15 with your boarding pass」= 搭乗券を持って15番ゲートの係員へ行く。',
      },
    ],
  },
  {
    id: 'ls435',
    part: 4,
    title: '留守番電話（ホテルの予約確認）',
    script: [
      { speaker: 'W', text: "Hello, this message is for Mr. Okada. This is Renee calling from the front desk of the Bayview Grand Hotel. We're confirming your reservation for two nights starting this Saturday." },
      { speaker: 'W', text: "You requested a room with an ocean view, and I'm happy to say we've been able to upgrade you to a corner suite at no additional cost." },
      { speaker: 'W', text: 'One more thing—the hotel pool will be closed for maintenance during your stay, but guests may use the pool at our sister hotel next door for free.' },
      { speaker: 'W', text: 'If you have any questions, please call us back at extension 3.' },
    ],
    scriptJa:
      '留守電: もしもし、オカダ様へのメッセージです。ベイビュー・グランドホテルのフロント、レネエと申します。今週土曜から2泊のご予約の確認でお電話しました。オーシャンビューのお部屋をご希望でしたが、追加料金なしで角部屋のスイートにアップグレードできましたのでお知らせいたします。もう1点、ご滞在中は当ホテルのプールがメンテナンスのため閉鎖されますが、隣の系列ホテルのプールを無料でご利用いただけます。ご質問がございましたら、内線3までお電話ください。',
    questions: [
      {
        q: 'Where does the speaker most likely work?',
        choices: ['At a swimming pool', 'At a travel agency', 'At a maintenance company', 'At a hotel'],
        answer: 3,
        explanation: '「calling from the front desk of the Bayview Grand Hotel」= ホテルのフロント係である。',
      },
      {
        q: 'What good news does the speaker share?',
        choices: ['The rate has been lowered.', 'Breakfast will be free.', 'The room has been upgraded.', 'The stay has been extended.'],
        answer: 2,
        explanation: '「upgrade you to a corner suite at no additional cost」= 無料でスイートにアップグレードされた。',
      },
      {
        q: 'What does the speaker say about the hotel pool?',
        choices: ['It has just reopened.', 'It will be closed for maintenance.', 'It is on the top floor.', 'It costs extra to use.'],
        answer: 1,
        explanation: '「the hotel pool will be closed for maintenance during your stay」= 滞在中はメンテナンスで閉鎖される。',
      },
    ],
  },
  {
    id: 'ls436',
    part: 4,
    title: 'チョコレート工場の見学ツアー',
    script: [
      { speaker: 'M', text: "Welcome to the Delacroix Chocolate Factory, and thank you for joining our two o'clock tour. My name is Sam." },
      { speaker: 'M', text: 'Before we begin, please put on the hairnets provided in the basket to your left—everyone must wear one in the production areas.' },
      { speaker: 'M', text: "During the tour, you'll see how our chocolate travels from raw cocoa beans to finished bars, and at the tasting station you can sample three of our newest flavors." },
      { speaker: 'M', text: "The tour ends at the gift shop, where today's visitors get fifteen percent off anything in the store. All right, please follow me through the blue doors." },
    ],
    scriptJa:
      'ツアーガイド: ドラクロワ・チョコレート工場へようこそ。2時のツアーにご参加いただきありがとうございます。私はサムです。始める前に、左側のかごにあるヘアネットを着用してください。製造エリアでは全員着用が必要です。ツアーでは、チョコレートが生のカカオ豆から完成した板チョコになるまでの工程をご覧いただき、試食コーナーでは最新の3種類のフレーバーをお試しいただけます。ツアーはギフトショップで終了し、本日の見学者は店内全品15%引きです。それでは、青い扉から私についてお進みください。',
    questions: [
      {
        q: 'Where is the tour taking place?',
        choices: ['At a coffee farm', 'At a chocolate factory', 'At a bakery', 'At a candy store'],
        answer: 1,
        explanation: '「Welcome to the Delacroix Chocolate Factory」と冒頭で場所を明言している。',
      },
      {
        q: 'What must all visitors do before entering the production areas?',
        choices: ['Put on a hairnet', 'Wash their hands', 'Turn off their phones', 'Sign a form'],
        answer: 0,
        explanation: '「please put on the hairnets ... everyone must wear one in the production areas」= ヘアネットの着用が必須である。',
      },
      {
        q: 'What can visitors do at the end of the tour?',
        choices: ['Watch a video', 'Meet the chocolate makers', 'Take free samples home', 'Shop at a discount'],
        answer: 3,
        explanation: "「The tour ends at the gift shop, where today's visitors get fifteen percent off」= 最後にギフトショップで割引価格で買い物ができる。",
      },
    ],
  },
  {
    id: 'ls437',
    part: 4,
    title: '会議の抜粋（ボランティア活動）',
    script: [
      { speaker: 'W', text: "One last item before we close today's meeting. As part of our community outreach program, the company will take part in the Riverside Park cleanup on Saturday, April twelfth." },
      { speaker: 'W', text: "We're hoping at least thirty volunteers from our office will join. The event runs from nine to noon, and gloves, trash bags, and drinks will be provided—just wear clothes you don't mind getting dirty." },
      { speaker: 'W', text: 'Everyone who participates will receive a company T-shirt and a paid half day off to use later this year.' },
      { speaker: 'W', text: "If you'd like to join, add your name to the sign-up sheet by the elevator before Wednesday." },
    ],
    scriptJa:
      '会議発言: 本日の会議を締める前に最後の連絡です。地域貢献プログラムの一環として、当社は4月12日土曜のリバーサイド公園清掃活動に参加します。当オフィスから少なくとも30名のボランティア参加を期待しています。活動は9時から正午までで、手袋、ごみ袋、飲み物は支給されます。汚れてもよい服装で来てください。参加者全員に会社のTシャツと、年内に使える有給の半日休暇が付与されます。参加希望の方は、水曜日までにエレベーター横の申込用紙に名前を書いてください。',
    questions: [
      {
        q: 'What is the speaker announcing?',
        choices: ['A company picnic', 'A park renovation', 'A volunteer event', 'A sports tournament'],
        answer: 2,
        explanation: '「the company will take part in the Riverside Park cleanup」= 公園清掃のボランティア活動への参加を告知している。',
      },
      {
        q: 'What will participants receive?',
        choices: ['A free lunch', 'A gift card', 'A cash bonus', 'A T-shirt and a half day off'],
        answer: 3,
        explanation: '「a company T-shirt and a paid half day off」= Tシャツと有給の半日休暇がもらえる。',
      },
      {
        q: 'How can listeners sign up?',
        choices: ['By writing their name on a sheet', 'By emailing the speaker', 'By calling the park office', 'By visiting the intranet'],
        answer: 0,
        explanation: '「add your name to the sign-up sheet by the elevator」= エレベーター横の用紙に名前を書いて申し込む。',
      },
    ],
  },
  {
    id: 'ls438',
    part: 4,
    title: 'デパートの店内放送（顧客感謝イベント）',
    script: [
      { speaker: 'M', text: "Good afternoon, Winslow's shoppers, and thank you for visiting us today. We'd like to remind you that our annual customer appreciation event is now underway on the fifth floor." },
      { speaker: 'M', text: "Until six o'clock, chef Antonio Ruiz will be giving free cooking demonstrations in the kitchenware department, with samples for everyone attending." },
      { speaker: 'M', text: 'Also, customers who spend one hundred dollars or more anywhere in the store today can pick up a free canvas tote bag at the first-floor service counter.' },
      { speaker: 'M', text: "Simply show your receipts to a staff member there. Enjoy your shopping at Winslow's." },
    ],
    scriptJa:
      '店内放送: ウィンズローズをご利用のお客様、本日はご来店ありがとうございます。恒例の顧客感謝イベントを5階で開催中です。午後6時まで、シェフのアントニオ・ルイスがキッチン用品売り場で無料の料理実演を行っており、ご参加の皆様に試食をご用意しています。また、本日店内で100ドル以上お買い上げのお客様は、1階サービスカウンターで無料のキャンバストートバッグをお受け取りいただけます。レシートを係員にご提示いただくだけで結構です。ウィンズローズでのお買い物をお楽しみください。',
    questions: [
      {
        q: 'Where is the announcement being made?',
        choices: ['At a department store', 'At a cooking school', 'At a farmers market', 'At a hotel restaurant'],
        answer: 0,
        explanation: '「Winslow\'s shoppers」「kitchenware department」「first-floor service counter」などから複数の売り場を持つデパートの店内放送である。',
      },
      {
        q: 'What is happening on the fifth floor?',
        choices: ['A clearance sale', 'A cooking demonstration', 'A book signing', 'A fashion show'],
        answer: 1,
        explanation: '「chef Antonio Ruiz will be giving free cooking demonstrations」= 5階で料理の実演が行われている。',
      },
      {
        q: 'How can customers receive a tote bag?',
        choices: ['By attending the demonstration', 'By joining a membership program', 'By showing receipts of $100 or more', 'By making an online purchase'],
        answer: 2,
        explanation: '「spend one hundred dollars or more ... Simply show your receipts」= 100ドル以上のレシート提示でトートバッグがもらえる。',
      },
    ],
  },
];
