import type { Part7Set } from '@/data/types';

const s = (
  id: string,
  docType: string,
  text: string,
  textJa: string,
  questions: Part7Set['questions'],
): Part7Set => ({ id, passages: [{ docType, text, textJa }], questions });

export const SINGLE_EXTRA_A: Part7Set[] = [
  // p707 — Eメール (office / IT)
  s(
    'p707',
    'Eメール',
    `From: Sandra Lee <slee@novanetworks.com>
To: All Staff <allstaff@novanetworks.com>
Subject: Scheduled System Maintenance — Saturday, August 9
Date: August 5

Dear Team,

Please be advised that the IT department will conduct scheduled maintenance on our internal network and file servers this coming Saturday, August 9, from 10:00 P.M. to 2:00 A.M. Sunday. During this window, access to shared drives, the employee portal, and internal email will be unavailable.

To minimize disruption, please ensure that all critical files are downloaded to your local device before 9:00 P.M. on Saturday. Any documents currently stored only on the shared drive may be inaccessible until maintenance is complete.

The maintenance is necessary to install security patches and expand storage capacity on the primary server. We do not anticipate any data loss, but as a precaution, a full backup will be performed before work begins.

If you have urgent work that requires server access over the weekend, please contact your department head by Friday afternoon to make alternative arrangements.

We apologize for the inconvenience and thank you for your understanding.

Sandra Lee
IT Operations Manager, Nova Networks`,
    `差出人: サンドラ・リー（ノバネットワークス IT部門）
宛先: 全スタッフ
件名: 定期システムメンテナンス — 8月9日（土）

チームの皆様

IT部門は今週土曜日8月9日の午後10時から翌日曜日午前2時にかけて、社内ネットワークおよびファイルサーバーの定期メンテナンスを実施します。この時間帯は共有ドライブ、従業員ポータル、社内メールが利用できません。

影響を最小限にするため、土曜日午後9時までに重要なファイルをローカルデバイスにダウンロードしておいてください。共有ドライブのみに保存されている書類は、メンテナンス完了まで利用できない場合があります。

今回のメンテナンスはセキュリティパッチの適用と主要サーバーのストレージ容量拡張のために必要です。データ損失は想定していませんが、念のため作業開始前に完全バックアップを取得します。

週末にサーバーアクセスが必要な緊急業務がある場合は、金曜日午後までに部門長に連絡して代替手段を手配してください。

ご不便をおかけして申し訳ありません。ご理解のほどよろしくお願いいたします。

サンドラ・リー
ITオペレーションマネージャー、ノバネットワークス`,
    [
      {
        q: 'What is the purpose of the email?',
        choices: [
          'To announce a new software system',
          'To notify staff of a planned service interruption',
          'To request employees work overtime on Saturday',
          'To report a security breach',
        ],
        answer: 1,
        explanation:
          '第1段落「IT department will conduct scheduled maintenance」＝予定されたサービス停止の通知。purpose（目的）問題は冒頭に答えがあることが多い。',
      },
      {
        q: 'What are employees advised to do before 9:00 P.M. on Saturday?',
        choices: [
          'Update their passwords',
          'Contact the IT department',
          'Back up the primary server',
          'Download necessary files to their local devices',
        ],
        answer: 3,
        explanation:
          '「ensure that all critical files are downloaded to your local device before 9:00 P.M.」が直接の根拠。download → save locallyの言い換えに注意。',
      },
      {
        q: 'What is NOT mentioned as a reason for the maintenance?',
        choices: [
          'Installing security patches',
          'Expanding server storage',
          'Replacing outdated hardware',
          'Both A and C',
        ],
        answer: 2,
        explanation:
          'NOT問題。「install security patches」「expand storage capacity」は本文に記載されているが、ハードウェアの交換（replacing hardware）については言及がない。',
      },
    ],
  ),

  // p708 — 広告 (retail / travel)
  s(
    'p708',
    '広告',
    `SUMMIT TRAIL OUTDOOR GEAR
End-of-Season Sale — Up to 50% Off!

Clear out the old, bring in the new. Summit Trail Outdoor Gear is holding its biggest clearance event of the year from September 1 through September 15 at all three of our metro locations.

HIGHLIGHTS:
• Hiking boots and trail shoes — 30–40% off
• Tents and sleeping bags — up to 50% off
• Technical outerwear — 20–35% off
• All backpacks — buy one, get one 30% off

Why shop at Summit Trail?
Our gear is rigorously tested by professional guides before it reaches our shelves. Every item carries a 90-day satisfaction guarantee: if you are not completely happy with a purchase, return it in original condition for a full refund or exchange.

Loyalty card holders receive an additional 10% off all sale prices. Not a member? Sign up for free at any register.

Store hours during the sale: Monday–Friday 9 A.M.–9 P.M., Saturday–Sunday 9 A.M.–7 P.M.

Visit summittrailgear.com for inventory details or call 1-800-555-0193.`,
    `サミットトレイル・アウトドアギア
シーズン末セール — 最大50%オフ！

古い在庫を一掃し、新商品を入れます。サミットトレイル・アウトドアギアは9月1日から15日まで、都内3店舗全店で年最大のクリアランスセールを開催します。

注目商品:
・ハイキングブーツ、トレイルシューズ — 30〜40%オフ
・テント、寝袋 — 最大50%オフ
・テクニカルアウターウェア — 20〜35%オフ
・全リュックサック — 1点購入でもう1点30%オフ

サミットトレイルを選ぶ理由:
弊社のギアは棚に並ぶ前にプロのガイドによる厳格なテストを受けています。全商品に90日間の満足保証付き。ご購入に完全にご満足いただけない場合、未使用の状態でご返品いただければ全額返金または交換に対応します。

ロイヤルティカード会員様はセール価格からさらに10%オフ。非会員の方はレジで無料登録できます。

セール期間中の営業時間: 月〜金 午前9時〜午後9時、土・日 午前9時〜午後7時

在庫の詳細はsummittrailgear.comまたはフリーダイヤル1-800-555-0193まで。`,
    [
      {
        q: 'What is indicated about Summit Trail Outdoor Gear?',
        choices: [
          'It has a single downtown location.',
          'Its products are tested by professionals before being sold.',
          'The sale lasts for one month.',
          'Loyalty cards cost a small annual fee.',
        ],
        answer: 1,
        explanation:
          '「rigorously tested by professional guides before it reaches our shelves」が根拠。tested by professionals に対応する選択肢。',
      },
      {
        q: 'How can customers save an additional 10% during the sale?',
        choices: [
          'By shopping on weekdays',
          'By purchasing two or more items',
          'By presenting a loyalty card',
          'By ordering online',
        ],
        answer: 2,
        explanation:
          '「Loyalty card holders receive an additional 10% off all sale prices」= ロイヤルティカード提示で追加10%オフ。',
      },
      {
        q: 'What is suggested about the satisfaction guarantee?',
        choices: [
          'It applies only to full-price items.',
          'Customers may receive a refund or an exchange.',
          'It covers a period of one year.',
          'It requires a receipt from the original purchase.',
        ],
        answer: 1,
        explanation:
          '「full refund or exchange」= 返金または交換。推測問題は本文の言い換えで解く。coverの期間は90日なので(C)は誤り。',
      },
    ],
  ),

  // p709 — 社内告知 (HR / office)
  s(
    'p709',
    '社内告知',
    `MERIDIAN CONSULTING GROUP
Internal Announcement

To: All Employees
From: Human Resources Department
Date: February 14
Re: Updated Flexible Work Policy

Effective March 1, Meridian Consulting Group will expand its flexible work options. The key changes are as follows:

Remote Work: Employees in eligible roles may work remotely up to three days per week. Approval must be obtained from your direct supervisor, and a Remote Work Agreement form must be completed and submitted to HR before your arrangement begins.

Core Hours: All employees, whether working remotely or on-site, are required to be available from 10:00 A.M. to 3:00 P.M., Monday through Thursday. Scheduling outside of core hours remains at the discretion of individual managers.

Home Office Stipend: Employees who work remotely at least two days per week are eligible to receive a one-time home office stipend of $300 to cover equipment or furniture costs. Receipts must be submitted within 60 days of purchase.

Employees who have questions about eligibility or the application process should contact HR representative Marcus Webb at mwebb@meridiancg.com.

Please note that client-facing roles and certain operational functions may be subject to different requirements as determined by department heads.`,
    `メリディアン・コンサルティング・グループ
社内告知

宛先: 全従業員
差出人: 人事部
日付: 2月14日
件名: フレキシブル勤務ポリシーの改定

3月1日より、メリディアン・コンサルティング・グループはフレキシブル勤務の選択肢を拡充します。主な変更点は以下の通りです。

在宅勤務: 対象職種の従業員は週最大3日まで在宅勤務が可能。直属の上司の承認を得て、在宅勤務契約書を人事部に提出することが必要。

コアタイム: 在宅・出社にかかわらず、全従業員は月〜木曜日の午前10時〜午後3時に対応可能な状態であることが求められる。コアタイム以外のスケジュールは各部門長の裁量に委ねる。

在宅勤務手当: 週2日以上在宅勤務する従業員は、機器や家具費用として300ドルの一時金の支給対象となる。購入後60日以内に領収書を提出すること。

資格や申請手続きに関する質問は、人事担当マーカス・ウェブ（mwebb@meridiancg.com）まで連絡のこと。

顧客対応職種や一部の業務機能については、部門長の判断により異なる要件が適用される場合がある。`,
    [
      {
        q: 'What must employees do before starting a remote work arrangement?',
        choices: [
          'Complete an online training course',
          'Submit a Remote Work Agreement form to HR',
          'Purchase home office equipment',
          'Obtain approval from HR directly',
        ],
        answer: 1,
        explanation:
          '「a Remote Work Agreement form must be completed and submitted to HR before your arrangement begins」が直接の根拠。',
      },
      {
        q: 'What is the home office stipend intended to cover?',
        choices: [
          'Internet service fees',
          'Travel expenses',
          'Equipment or furniture costs',
          'Mobile phone charges',
        ],
        answer: 2,
        explanation:
          '「$300 to cover equipment or furniture costs」= 機器や家具費用のための手当。intended to cover = 目的を問う語彙問題。',
      },
      {
        q: 'What is NOT stated about the new policy?',
        choices: [
          'Core hours apply to both remote and on-site workers.',
          'Some roles may have different requirements.',
          'The stipend is paid monthly.',
          'Receipts must be submitted within 60 days.',
        ],
        answer: 2,
        explanation:
          'NOT問題。「a one-time home office stipend」= 一時金。「monthly（毎月）」とは述べられておらず誤り。他の選択肢は本文に根拠がある。',
      },
    ],
  ),

  // p710 — 記事 (technology)
  s(
    'p710',
    '記事',
    `TECH HORIZON — MARCH EDITION

Start-Up Launches AI Tool for Small Business Inventory Management

SAN JOSE — A software start-up called Inventra has unveiled an artificial intelligence-powered platform designed to help small and medium-sized businesses manage their inventory more efficiently. The product, named StockSense, launched in beta last October and is now available for general release at a monthly subscription fee starting at $49.

According to Inventra CEO Linda Hara, the platform analyzes sales history, seasonal trends, and supplier lead times to generate automatic reorder recommendations. "Most small business owners spend hours every week manually tracking stock levels," Ms. Hara said at a press briefing. "StockSense reduces that time to minutes."

Early users report significant improvements. A bakery in Portland reduced its food waste by 18 percent within three months, and a hardware store in Austin reported a 25 percent drop in stockouts — situations where popular items run out of stock.

StockSense integrates with several popular point-of-sale systems, including Square and Shopify. Inventra plans to add support for additional platforms by the end of the year. A 30-day free trial is available at inventrasoftware.com.`,
    `テック・ホライズン — 3月号

スタートアップ、中小企業向けAI在庫管理ツールをリリース

サンノゼ — ソフトウェアスタートアップのInventraが、中小企業の在庫管理を効率化するAI搭載プラットフォームを発表した。「StockSense」と名付けられたこの製品は昨年10月にベータ版を公開し、現在は月額49ドルからのサブスクリプションで一般リリースされている。

Inventra CEOのリンダ・ハラ氏によると、このプラットフォームは販売履歴、季節トレンド、サプライヤーのリードタイムを分析し、自動再発注の提案を生成する。「多くの中小企業オーナーは毎週何時間もかけて在庫レベルを手動で管理しています。StockSenseはその時間を数分に短縮します」とハラ氏はプレスブリーフィングで語った。

初期ユーザーからは顕著な改善が報告されている。ポートランドのベーカリーは3ヵ月以内に食品廃棄物を18%削減し、オースティンのホームセンターでは品切れ（人気商品の在庫切れ）が25%減少したと報告している。

StockSenseはSquareやShopifyなど複数の主要POSシステムと連携する。Inventraは年内にさらに追加プラットフォームへの対応を予定している。inventrasoftware.comで30日間の無料トライアルが利用可能。`,
    [
      {
        q: 'What does StockSense primarily help businesses do?',
        choices: [
          'Process customer payments online',
          'Manage employee schedules',
          'Track and reorder inventory automatically',
          'Build an e-commerce website',
        ],
        answer: 2,
        explanation:
          '「analyzes sales history ... to generate automatic reorder recommendations」= 在庫の自動追跡と再発注支援が主な機能。',
      },
      {
        q: 'According to the article, what happened at a hardware store in Austin?',
        choices: [
          'Food waste decreased by 18 percent.',
          'Subscription costs were reduced.',
          'The number of stockouts dropped by 25 percent.',
          'Staff hours were cut by half.',
        ],
        answer: 2,
        explanation:
          '「a hardware store in Austin reported a 25 percent drop in stockouts」= 品切れが25%減少。ポートランドのベーカリーと混同しないよう注意。',
      },
      {
        q: 'What is suggested about StockSense?',
        choices: [
          'It is available only in the United States.',
          'It cannot yet integrate with all point-of-sale systems.',
          'Its monthly fee decreases with longer subscriptions.',
          'It requires dedicated hardware to operate.',
        ],
        answer: 1,
        explanation:
          '「plans to add support for additional platforms by the end of the year」= まだ対応していないPOSシステムがある、と示唆される。現時点での対応は「several popular」にとどまる。',
      },
    ],
  ),

  // p711 — お知らせ (healthcare / facility)
  s(
    'p711',
    'お知らせ',
    `NORTHSIDE MEDICAL CENTER
Patient Notice — Important Changes to Appointment Scheduling

Effective January 15, Northside Medical Center will transition to an online self-scheduling system for all routine and follow-up appointments. Patients can book, reschedule, or cancel appointments through the MyHealth patient portal at myhealthportal.org.

First-time users must register with their date of birth and patient ID number, which can be found on any billing statement or insurance card. Assistance with registration is available at the front desk or by calling our patient services line at 555-0247.

Same-day urgent care appointments and specialist referrals will continue to be arranged by calling the clinic directly. The online system is intended for scheduled visits only.

To minimize no-shows, the portal will send automatic email and text reminders 48 hours before each appointment. Patients who cancel at least 24 hours in advance will not be charged a cancellation fee. Late cancellations or missed appointments may result in a $25 administrative fee.

Paper appointment cards will no longer be issued after January 15. We encourage all patients to ensure their email address and mobile phone number are up to date in the portal.

For technical assistance with the portal, please contact support@myhealthportal.org.`,
    `ノースサイド・メディカルセンター
患者向けお知らせ — 予約スケジュールの変更について

1月15日より、ノースサイド・メディカルセンターは定期・フォローアップ診察の予約をオンライン自己スケジューリングシステムに移行します。患者様はMyHealthポータル（myhealthportal.org）から予約・変更・キャンセルが可能です。

初回利用時は、生年月日と患者IDが必要です。患者IDは請求書または保険証に記載されています。登録サポートは受付または患者サービスライン（555-0247）で受けられます。

当日の緊急ケア予約および専門医への紹介は、引き続きクリニックへの直接電話での対応となります。オンラインシステムは予約診察のみが対象です。

予約不履行を減らすため、ポータルは予約の48時間前に自動メール・SMS通知を送信します。24時間以上前のキャンセルにはキャンセル料はかかりません。直前キャンセルや予約不履行には25ドルの管理手数料が発生する場合があります。

1月15日以降は紙の予約カードは発行されません。メールアドレスと携帯番号をポータルで最新の状態にしておくことをお勧めします。

ポータルの技術サポートはsupport@myhealthportal.orgまでご連絡ください。`,
    [
      {
        q: 'What change is announced in the notice?',
        choices: [
          'Northside Medical Center is moving to a new building.',
          'Patients will no longer need referrals for specialists.',
          'Routine appointments will be booked through an online portal.',
          'The clinic will extend its operating hours.',
        ],
        answer: 2,
        explanation:
          '「will transition to an online self-scheduling system for all routine and follow-up appointments」= 定期予約がオンラインポータルに移行する。',
      },
      {
        q: 'What information do first-time users need to register on the portal?',
        choices: [
          'Their insurance provider name and policy number',
          'Their date of birth and patient ID number',
          'Their doctor\'s name and appointment history',
          'Their email address and a temporary password',
        ],
        answer: 1,
        explanation:
          '「must register with their date of birth and patient ID number」= 生年月日と患者ID番号が必要。',
      },
      {
        q: 'What will patients be charged if they miss an appointment without sufficient notice?',
        choices: [
          'No fee if they call within 24 hours',
          'A $25 administrative fee',
          'The full cost of the missed appointment',
          'A $48 late cancellation fee',
        ],
        answer: 1,
        explanation:
          '「missed appointments may result in a $25 administrative fee」= 予約不履行は25ドルの管理手数料。sufficient notice = 24時間以上前のキャンセル。',
      },
    ],
  ),

  // p712 — チャット (office / event planning) ← 書き手の意図問題
  s(
    'p712',
    'チャット',
    `Marco Diaz [2:05 P.M.]
Hey Julia, are we still on schedule for the client reception on Friday? I just heard the venue might have an issue.

Julia Park [2:07 P.M.]
I spoke with them this morning. There was a problem with the kitchen exhaust system, but they said it will be fixed by Thursday.

Marco Diaz [2:08 P.M.]
That's cutting it close. What if there's a delay?

Julia Park [2:10 P.M.]
I already asked them for a backup option. They can move us to their rooftop terrace at no extra cost if the main hall is unavailable.

Marco Diaz [2:11 P.M.]
That could actually work in our favor — clients love views.

Julia Park [2:13 P.M.]
Exactly. Either way, we're covered. Also, the catering order has been confirmed. Forty-two guests, three-course dinner, dietary options included.

Marco Diaz [2:14 P.M.]
Perfect. And the presentation slides?

Julia Park [2:15 P.M.]
I'm finalizing them now. I'll send you a draft by end of day.

Marco Diaz [2:16 P.M.]
Great. Let's touch base tomorrow morning just to make sure everything is locked in.

Julia Park [2:17 P.M.]
Sounds good. I'll book a quick call for 9.`,
    `マルコ [2:05] ジュリア、金曜のクライアントレセプションは予定通り？会場に問題があるって聞いたんだけど。
ジュリア [2:07] 今朝話したよ。キッチンの排気システムに問題があったけど、木曜までに直るって言ってた。
マルコ [2:08] ギリギリだね。もし遅れたら？
ジュリア [2:10] もうバックアップを聞いてある。メインホールが使えなければ追加費用なしで屋上テラスに移れるって。
マルコ [2:11] むしろそっちの方がいいかも — クライアントは眺めが好きだし。
ジュリア [2:13] そうそう。どっちにしても大丈夫。ケータリングも確認済み。42名、3コースディナー、食事制限対応も含めて。
マルコ [2:14] 完璧。プレゼンのスライドは？
ジュリア [2:15] 今仕上げてるところ。今日中に下書きを送るね。
マルコ [2:16] いいね。明日の朝に最終確認しよう。
ジュリア [2:17] わかった。9時に短い電話の予定を入れておくね。`,
    [
      {
        q: 'What problem does Marco mention at the start of the conversation?',
        choices: [
          'A catering order was canceled.',
          'A presentation is not ready.',
          'There may be an issue with the event venue.',
          'A client has canceled their attendance.',
        ],
        answer: 2,
        explanation:
          '「I just heard the venue might have an issue」= 会場に問題がある可能性があると伝えている。',
      },
      {
        q: 'At 2:11 P.M., what does Marco mean when he writes, "That could actually work in our favor"?',
        choices: [
          'The rooftop option would impress the clients.',
          'The repair costs less than expected.',
          'The catering company offers a discount.',
          'The main hall is larger than the terrace.',
        ],
        answer: 0,
        explanation:
          '書き手の意図問題。直前にジュリアが「屋上テラスに移れる」と伝えており、マルコは「クライアントは眺めが好き」と続けている。つまり「屋上の方がクライアントに好印象を与えられる」という意味。',
      },
      {
        q: 'What will Julia do before the end of the day?',
        choices: [
          'Contact the catering company',
          'Book the rooftop terrace',
          'Send a draft of the presentation slides',
          'Call the venue to confirm the repair',
        ],
        answer: 2,
        explanation:
          '「I\'ll send you a draft by end of day」= 今日中にスライドの下書きを送る。end of dayを用いたスケジュール確認。',
      },
    ],
  ),

  // p713 — FAQ (real estate / housing)
  s(
    'p713',
    'FAQ',
    `BRIGHTSTONE REALTY — Frequently Asked Questions for Prospective Tenants

Q: How do I apply for a rental property listed on your website?
A: Complete the online application form on our website. You will need to provide proof of income (recent pay stubs or a letter from your employer), a copy of a valid photo ID, and contact information for two references. A non-refundable application fee of $45 applies.

Q: How long does the application review take?
A: Applications are typically processed within two to three business days. If additional documentation is required, our leasing team will contact you directly.

Q: What is required to sign a lease?
A: Upon approval, tenants must pay the first month's rent and a security deposit equal to one month's rent before the lease is signed. Lease terms are available in 12-month and 24-month options.

Q: Are pets allowed?
A: Pet policies vary by property. Properties that allow pets require a refundable pet deposit of $250 per animal. Monthly pet rent of $35 per animal also applies. Please check individual listings for specific restrictions.

Q: Can I make modifications to the unit?
A: Minor modifications such as picture hooks and temporary fixtures are permitted. Painting walls or making structural changes requires written approval from Brightstone Realty. All modifications must be reversed or professionally restored upon move-out at the tenant's expense.

Q: What utilities are included in the rent?
A: Water and trash collection are included in the rent for all properties. Gas and electricity are the tenant's responsibility unless stated otherwise in the listing.`,
    `ブライトストーン・リアルティ — 入居希望者向けよくある質問

Q: ウェブサイトに掲載されている賃貸物件に申し込むには？
A: ウェブサイトのオンライン申込フォームに入力してください。収入証明（最近の給与明細または雇用主からの証明書）、有効な写真付きIDのコピー、2名の保証人の連絡先が必要です。45ドルの返金不可の申込料がかかります。

Q: 審査にはどのくらいかかりますか？
A: 通常2〜3営業日で処理されます。追加書類が必要な場合は担当者から直接連絡します。

Q: 賃貸契約を結ぶために必要なものは？
A: 承認後、契約締結前に初月の家賃と1ヵ月分の敷金を支払う必要があります。契約期間は12ヵ月または24ヵ月から選べます。

Q: ペットは可能ですか？
A: ペット方針は物件によって異なります。ペット可の物件では、1頭につき返金可能な250ドルのペットデポジットが必要です。また1頭につき月35ドルのペット賃料も発生します。各物件の詳細をご確認ください。

Q: 室内を改装することはできますか？
A: ピクチャーフックや取り外し可能な設備などの軽微な変更は許可されています。壁の塗装や構造変更にはブライトストーン・リアルティの書面による承認が必要です。退去時にはすべての変更を元に戻すか専門業者による修復が必要で、費用は借主負担です。

Q: 家賃に含まれる光熱費は何ですか？
A: 全物件で水道代とゴミ回収は家賃に含まれます。ガスと電気は物件情報に記載がない限り借主負担です。`,
    [
      {
        q: 'According to the FAQ, what must applicants provide when submitting a rental application?',
        choices: [
          'A credit report from a financial institution',
          'A copy of their current lease',
          'Proof of income and a valid photo ID',
          'A letter from a previous landlord',
        ],
        answer: 2,
        explanation:
          '「proof of income ... a copy of a valid photo ID」が申込に必要。選択肢の credit report や previous landlord letter は本文に記載なし。',
      },
      {
        q: 'What is indicated about the pet policy?',
        choices: [
          'All properties allow pets.',
          'The pet deposit is non-refundable.',
          'There is a monthly charge per pet in addition to a deposit.',
          'Tenants may keep only one pet.',
        ],
        answer: 2,
        explanation:
          '「refundable pet deposit ... Monthly pet rent of $35 per animal also applies」= 保証金に加えて月額費用も発生する。refundable（返金可）という点も(B)が誤りの根拠。',
      },
      {
        q: 'What is NOT included in the rent for all properties?',
        choices: [
          'Water',
          'Trash collection',
          'Electricity',
          'Both A and B',
        ],
        answer: 2,
        explanation:
          'NOT問題。「Water and trash collection are included ... Gas and electricity are the tenant\'s responsibility」= 電気は家賃に含まれない。',
      },
      {
        q: 'What is suggested about painting walls in a rental unit?',
        choices: [
          'It is freely permitted with any paint color.',
          'It requires written approval from the property manager.',
          'It must be done by Brightstone staff.',
          'It is included in the move-in inspection.',
        ],
        answer: 1,
        explanation:
          '推測問題。「Painting walls ... requires written approval from Brightstone Realty」= 書面による承認が必要、と明示されている。',
      },
    ],
  ),

  // p714 — 求人広告 (HR)
  s(
    'p714',
    '求人広告',
    `POSITION: Operations Coordinator
COMPANY: Verdant Logistics, Inc.
LOCATION: Denver, CO (On-site)
JOB TYPE: Full-time, Permanent

About Verdant Logistics:
Verdant Logistics provides supply chain solutions for manufacturers and retailers across the Mountain West region. We are a fast-growing company with over 200 employees and a strong commitment to innovation and employee development.

Role Summary:
The Operations Coordinator will support daily warehouse and transportation activities, liaise with carriers and suppliers, and assist the Operations Manager with scheduling, reporting, and process improvements.

Key Responsibilities:
• Coordinate shipment scheduling and tracking using our TMS software
• Communicate with carriers to resolve delays, discrepancies, and claims
• Prepare daily and weekly operational reports for senior management
• Assist in onboarding new logistics partners
• Maintain accurate records in inventory and shipment databases

Qualifications:
• Bachelor's degree in Supply Chain, Business, or a related field
• Minimum two years of experience in logistics or operations
• Proficiency in Microsoft Excel and experience with TMS or WMS platforms
• Strong communication and problem-solving skills
• Ability to work in a fast-paced environment

Compensation & Benefits:
• Salary: $52,000–$60,000 per year, commensurate with experience
• Health, dental, and vision insurance (employer covers 80% of premiums)
• 15 days of paid vacation annually, increasing to 20 days after three years
• Tuition reimbursement for relevant professional certifications

To apply, submit your resume and a cover letter to careers@verdantlogistics.com by July 31.`,
    `職種: オペレーションズコーディネーター
会社: ヴァーダント・ロジスティクス株式会社
勤務地: コロラド州デンバー（現地勤務）
雇用形態: 正社員・常勤

ヴァーダント・ロジスティクスについて:
マウンテンウェスト地域のメーカーや小売業者にサプライチェーンソリューションを提供しています。社員200名以上の急成長企業で、革新と社員育成を重視しています。

職務概要:
倉庫・輸送業務の日常サポート、キャリアとサプライヤーとの連絡調整、スケジューリング・レポーティング・業務改善の支援を行います。

主な業務:
・TMSソフトを用いた出荷スケジューリングと追跡の調整
・キャリアとの遅延・差異・クレームの解決
・上層部向けの日次・週次レポートの作成
・新規物流パートナーのオンボーディング支援
・在庫・出荷データベースの正確な記録管理

必要資格:
・サプライチェーン、ビジネスまたは関連分野の学士号
・物流またはオペレーション分野での最低2年の経験
・Microsoft Excel習熟、TMSまたはWMSプラットフォームの経験
・高いコミュニケーション能力と問題解決能力
・変化の速い環境での業務遂行能力

給与・福利厚生:
・年収52,000〜60,000ドル（経験に応じる）
・健康・歯科・視力保険（雇用主が保険料の80%を負担）
・年間有給休暇15日（3年後20日に増加）
・関連する専門資格の学費補助

応募は7月31日までに履歴書とカバーレターをcareers@verdantlogistics.comへ送付のこと。`,
    [
      {
        q: 'What is one requirement for the Operations Coordinator position?',
        choices: [
          'Five or more years of logistics experience',
          'Fluency in a second language',
          'A degree in supply chain or a related field',
          'Previous management experience',
        ],
        answer: 2,
        explanation:
          '「Bachelor\'s degree in Supply Chain, Business, or a related field」= 関連分野の学士号。経験年数は「minimum two years」なので(A)は誤り。',
      },
      {
        q: 'What benefit increases after an employee has worked for three years?',
        choices: [
          'The amount of health insurance coverage',
          'The number of paid vacation days',
          'The tuition reimbursement limit',
          'The employer contribution to premiums',
        ],
        answer: 1,
        explanation:
          '「15 days of paid vacation annually, increasing to 20 days after three years」= 有給休暇日数が3年後に増加。',
      },
      {
        q: 'What is NOT mentioned as a responsibility of the Operations Coordinator?',
        choices: [
          'Preparing reports for management',
          'Tracking shipments using software',
          'Supervising warehouse staff directly',
          'Assisting with onboarding new partners',
        ],
        answer: 2,
        explanation:
          'NOT問題。「Coordinate」「Communicate」「Prepare」「Assist」は記載があるが、warehouse staff の直接監督は職務内容に含まれていない。',
      },
    ],
  ),

  // p715 — レビュー (retail / travel)
  s(
    'p715',
    'レビュー',
    `Customer Review — Cedarwood Inn & Suites
Posted on TravelNest.com by GlobeTrotter_K ★★★★☆ (4/5)

I stayed at Cedarwood Inn for four nights in early September while attending a conference nearby. Overall, it was a very pleasant stay with only minor issues.

The location is excellent — five minutes on foot from the convention center and half a block from a variety of restaurants and cafés. Check-in was fast, and the front desk staff were friendly and knowledgeable about the area. My king suite was spacious, well-furnished, and very quiet despite being on the second floor facing a busy street.

The complimentary breakfast included hot items such as eggs and sausages, a wide fruit selection, and freshly baked pastries. However, it gets crowded between 8:00 and 9:00 A.M., so I recommend arriving before 7:30 if you prefer a calm experience.

My only real complaint is the parking situation. The hotel offers a self-parking garage for $22 per night, but it only has 40 spaces and fills up quickly. I had to park two blocks away on two evenings. The hotel should consider partnering with a nearby lot for overflow parking.

I would definitely return on my next visit to the city. The value for money is strong given the location and the quality of the room.`,
    `顧客レビュー — シダーウッド・イン＆スイーツ
TravelNest.comにGlobeTrotter_Kが投稿 ★★★★☆（4/5）

9月初旬、近くで行われたカンファレンス参加のためシダーウッドインに4泊しました。全体的に非常に快適な滞在でしたが、小さな問題もいくつかありました。

ロケーションは抜群で、コンベンションセンターから徒歩5分、レストランやカフェまで半ブロックの距離。チェックインはスムーズで、フロントスタッフは親切でエリアの情報に詳しかった。キングスイートは広く、家具も充実していて、繁忙な通りに面した2階にもかかわらず非常に静かでした。

無料の朝食には目玉焼き・ソーセージなどのホット料理、豊富な果物、焼きたてのペストリーが含まれていました。ただし午前8〜9時は混雑するため、ゆっくりしたい方は7時半前の来場をお勧めします。

唯一の本当の不満は駐車場です。ホテルは1泊22ドルのセルフパーキングガレージを提供していますが、わずか40台分しかなく、すぐに満杯になります。2晩は2ブロック離れた場所に駐車しなければなりませんでした。近くの駐車場と提携して溢れた車に対応すべきだと思います。

次の訪問でも必ずここに泊まります。立地と部屋のクオリティを考えると、コストパフォーマンスは高いです。`,
    [
      {
        q: 'Why did the reviewer stay at Cedarwood Inn?',
        choices: [
          'To celebrate a family occasion',
          'To attend a business conference',
          'To visit local tourist attractions',
          'To meet with a real estate agent',
        ],
        answer: 1,
        explanation:
          '「attending a conference nearby」= 近くで行われたカンファレンスへの参加のため。',
      },
      {
        q: 'What does the reviewer suggest about the breakfast?',
        choices: [
          'The selection is limited on weekdays.',
          'It is not included in the room rate.',
          'Arriving before 7:30 A.M. is recommended to avoid crowds.',
          'Hot items are only served on weekends.',
        ],
        answer: 2,
        explanation:
          '「I recommend arriving before 7:30 if you prefer a calm experience」= 混雑を避けるため7:30前の来場を勧めている。',
      },
      {
        q: 'What is the reviewer\'s main criticism of the hotel?',
        choices: [
          'The room was noisy.',
          'The staff were unhelpful.',
          'There was insufficient parking.',
          'The breakfast quality was poor.',
        ],
        answer: 2,
        explanation:
          '「My only real complaint is the parking situation」= 駐車場が唯一の本当の不満。main criticism = only real complaintの言い換え。',
      },
    ],
  ),

  // p716 — ウェブページ (technology / software)
  s(
    'p716',
    'ウェブページ',
    `PulseDesk | Help Center

Getting Started with PulseDesk — Quick Setup Guide

Welcome to PulseDesk, the all-in-one customer support platform. Follow these steps to set up your account and begin handling support tickets within minutes.

Step 1: Create Your Workspace
After completing your registration, you will be prompted to name your workspace and upload your company logo. Your workspace URL will be assigned automatically (e.g., yourcompany.pulsedesk.io). You can change the workspace name at any time from Settings > General.

Step 2: Invite Your Team
Go to Settings > Team Members and enter the email addresses of your colleagues. Each invitee will receive a welcome email with a link to set their password. You can assign roles: Admin, Agent, or Viewer.

Step 3: Connect Your Channels
PulseDesk supports email, live chat, and social media channels. To connect your company email, navigate to Settings > Channels > Email and follow the SMTP/IMAP setup instructions. For live chat, copy the widget code and paste it into your website's HTML.

Step 4: Set Up Automations
Use the Automations panel to create rules that automatically assign, tag, or escalate tickets. For example, you can route all tickets containing the word "billing" to your finance team.

Step 5: Import Existing Customer Data (Optional)
If you have existing customer records, you can import them via CSV from Settings > Contacts > Import.

Need more help? Browse our full documentation at pulsedesk.io/docs or contact our support team at help@pulsedesk.io. Live chat support is available Monday through Friday, 8 A.M.–8 P.M. EST.`,
    `PulseDesk | ヘルプセンター

PulseDesなの始め方 — クイック設定ガイド

オールインワンカスタマーサポートプラットフォーム、PulseDesへようこそ。以下の手順でアカウントを設定し、数分以内にサポートチケットの処理を開始できます。

ステップ1: ワークスペースを作成する
登録完了後、ワークスペース名と会社ロゴのアップロードを求められます。ワークスペースURLは自動で割り当てられます（例: yourcompany.pulsedesk.io）。ワークスペース名は「設定 > 全般」からいつでも変更可能。

ステップ2: チームを招待する
「設定 > チームメンバー」に移動し、同僚のメールアドレスを入力。招待者にはパスワード設定リンク付きのウェルカムメールが届きます。役割（Admin・Agent・Viewer）を割り当てられます。

ステップ3: チャンネルを接続する
PulseDesはメール・ライブチャット・SNSチャンネルに対応。会社メールを接続するには「設定 > チャンネル > メール」に移動してSMTP/IMAP設定の手順に従ってください。ライブチャットはウィジェットコードをWebサイトのHTMLに貼り付けます。

ステップ4: 自動化を設定する
自動化パネルでチケットの自動割り当て、タグ付け、エスカレーションのルールを作成。例えば「billing」というワードを含む全チケットを経理チームにルーティングできます。

ステップ5: 既存の顧客データをインポートする（任意）
既存の顧客データがある場合は「設定 > 連絡先 > インポート」からCSVでインポートできます。

さらにサポートが必要な場合は、pulsedesk.io/docsの完全ドキュメントを参照するか、help@pulsedesk.ioまでお問い合わせください。ライブチャットサポートは月〜金曜日の午前8時〜午後8時（東部標準時）に対応しています。`,
    [
      {
        q: 'What is the purpose of this webpage?',
        choices: [
          'To advertise pricing plans for PulseDesk',
          'To guide new users through the initial setup process',
          'To describe updates to an existing product',
          'To provide troubleshooting instructions for common errors',
        ],
        answer: 1,
        explanation:
          '「Quick Setup Guide」「Follow these steps to set up your account」= 初期設定手順のガイドが目的。',
      },
      {
        q: 'According to the guide, which step is described as optional?',
        choices: [
          'Setting up automations',
          'Connecting email channels',
          'Importing existing customer data',
          'Inviting team members',
        ],
        answer: 2,
        explanation:
          '「Step 5: Import Existing Customer Data (Optional)」= ステップ5は任意と明記。',
      },
      {
        q: 'What is suggested about contacting PulseDesk support?',
        choices: [
          'Support is available around the clock.',
          'Email is the only way to reach the support team.',
          'Live chat support is not available on weekends.',
          'Customers must purchase a premium plan for live chat.',
        ],
        answer: 2,
        explanation:
          '推測問題。「Live chat support is available Monday through Friday」= 月〜金のみ対応 → 週末はライブチャット不可。',
      },
    ],
  ),

  // p717 — メモ (office / travel logistics)  ← 文挿入問題
  s(
    'p717',
    'メモ',
    `MEMO

To: All Sales Representatives
From: Diane Foster, Regional Sales Manager
Date: November 3
Re: Updated Travel Expense Reimbursement Guidelines

Effective immediately, all business travel expenses must be submitted through the new online portal at expenses.harwoodcorp.com. [1] Reimbursement claims submitted by paper form will no longer be accepted after November 30.

When submitting a claim, all expenses over $25 must be accompanied by an original receipt. [2] Meals are reimbursable at a daily maximum of $75 per person. Receipts are required for any single meal exceeding $30. Entertainment expenses, including client dinners, require manager pre-approval before they are incurred.

Hotel accommodations are reimbursable up to $180 per night in standard markets and $225 per night in high-cost cities such as New York, San Francisco, and Boston. [3] If you are unsure whether your destination qualifies as a high-cost city, check the full list on the intranet under Finance > Travel Policy.

Airfare must be booked at least 14 days in advance to qualify for reimbursement at the standard rate. Last-minute bookings made within 14 days of travel will be reimbursed only up to the average fare for that route as determined by the Finance department. [4]

Questions regarding the new system should be directed to Accounting at ext. 2210.`,
    `メモ

宛先: 全営業担当者
差出人: ダイアン・フォスター、地域営業マネージャー
日付: 11月3日
件名: 出張経費精算ガイドライン改定

即時有効。全業務出張経費は新しいオンラインポータル（expenses.harwoodcorp.com）を通じて申請すること。[1] 紙の申請書による精算は11月30日以降受け付けない。

申請時、25ドルを超える経費にはすべて原本の領収書を添付すること。[2] 食事は1日最大75ドルまで精算可能。30ドルを超える単一の食事には領収書が必要。クライアント向けディナーを含む接待費は、発生前に上司の事前承認が必要。

ホテル宿泊は標準市場で1泊180ドル、ニューヨーク・サンフランシスコ・ボストンなどの高コスト都市では1泊225ドルまで精算可能。[3] 目的地が高コスト都市かどうか不明な場合は、イントラネットの「財務 > 出張ポリシー」で完全なリストを確認すること。

航空券は標準レートでの精算を受けるために、少なくとも14日前に予約すること。14日以内の直前予約は、財務部門が定めるそのルートの平均運賃までしか精算されない。[4]

新システムに関する質問は経理部内線2210まで。`,
    [
      {
        q: 'What is the main purpose of this memo?',
        choices: [
          'To announce a new expense submission system',
          'To introduce updated hotel booking procedures',
          'To warn employees about overspending',
          'To explain a new corporate travel booking tool',
        ],
        answer: 0,
        explanation:
          '「all business travel expenses must be submitted through the new online portal」= 新しい経費申請システムの告知が主旨。',
      },
      {
        q: 'According to the memo, when must airfare be booked to receive full reimbursement?',
        choices: [
          'At least 30 days before travel',
          'At least 14 days before travel',
          'On the same day as the trip',
          'Within 7 days of the trip',
        ],
        answer: 1,
        explanation:
          '「Airfare must be booked at least 14 days in advance to qualify for reimbursement at the standard rate」= 14日前までの予約が条件。',
      },
      {
        q: 'In which position [1]–[4] does the following sentence best belong?\n"All existing paper claims must be finalized and submitted before this deadline."',
        choices: [
          '[1]',
          '[2]',
          '[3]',
          '[4]',
        ],
        answer: 0,
        explanation:
          '文挿入問題。挿入文は「この締め切り前に既存の紙の申請を完了・提出すること」という内容。直前の[1]の位置の後に「紙の申請書は11月30日以降受け付けない」という文があり、その締め切りに言及している。したがって[1]の後（=第1段落の末尾）が最適。',
      },
      {
        q: 'What is indicated about entertainment expenses?',
        choices: [
          'They are not reimbursable under any circumstances.',
          'They follow the same $75 daily meal limit.',
          'They require approval from a manager before being spent.',
          'They must be submitted within 30 days of the event.',
        ],
        answer: 2,
        explanation:
          '「Entertainment expenses ... require manager pre-approval before they are incurred」= 発生前の事前承認が必要。',
      },
    ],
  ),

  // p718 — 手紙 (real estate / business)
  s(
    'p718',
    '手紙',
    `Hargrove & Associates Commercial Real Estate
1421 Commerce Boulevard, Suite 300
Chicago, IL 60601

October 17

Ms. Patricia Vance
Director of Operations
BluePeak Systems, Inc.
7 Innovation Drive
Evanston, IL 60201

Dear Ms. Vance,

Thank you for touring our available commercial spaces last week. It was a pleasure meeting you and your team, and we are glad to hear that the fourth-floor office at 440 Lakeview Tower suits BluePeak's requirements.

As discussed, the unit offers 4,200 square feet of open-plan space, two enclosed conference rooms, and a dedicated server room. The asking rent is $32 per square foot annually, which at your space equates to approximately $11,200 per month. This includes janitorial services, building security, and access to the common areas on the ground floor, including the tenant lounge and fitness room.

Utilities — specifically electricity and heating — are metered separately and billed directly to tenants. Based on comparable units in the building, you can expect these costs to average between $800 and $1,100 per month depending on the season.

The landlord is prepared to offer a tenant improvement allowance of $25 per square foot to help cover renovation costs, should you wish to customize the space. This allowance would be applied as a credit against your first months of rent.

If BluePeak wishes to proceed, please sign and return the attached Letter of Intent by October 31. Our team will then prepare the formal lease agreement for your review. Should you have any questions in the meantime, do not hesitate to call me at 312-555-0184.

Sincerely,
David Hargrove
Principal Broker, Hargrove & Associates`,
    `ハーグローブ＆アソシエイツ 商業不動産
1421 コマース・ブルバード Suite 300
シカゴ、IL 60601

10月17日

パトリシア・ヴァンス様
オペレーションズ・ディレクター
ブルーピーク・システムズ株式会社

ヴァンス様

先週、弊社の商業スペースをご見学いただきありがとうございます。あなたとチームにお会いできて光栄でした。440レイクビュータワーの4階オフィスがブルーピークのご要望に合うとのこと、大変うれしく思います。

ご説明の通り、この物件は4,200平方フィートのオープンプランスペース、2つの個室会議室、専用サーバー室を提供しています。希望賃料は年間1平方フィートあたり32ドルで、貴社のスペースに換算すると月額約11,200ドルになります。これには清掃サービス、建物のセキュリティ、1階の共有エリア（テナントラウンジとフィットネスルーム）へのアクセスが含まれます。

光熱費（特に電気と暖房）は個別に計量されテナントに直接請求されます。同建物の同等の物件に基づくと、季節によって月800〜1,100ドル程度が見込まれます。

スペースをカスタマイズされる場合、改装費用の一部として1平方フィートあたり25ドルのテナント改善手当を提供する用意があります。この手当は最初の数ヵ月分の賃料への控除として適用されます。

ブルーピークが進めることをご希望の場合、添付の仮契約書（LOI）に10月31日までに署名してご返送ください。その後、弊社チームが正式な賃貸借契約書を作成します。ご質問がありましたら、312-555-0184までお気軽にお電話ください。

敬具
デイビッド・ハーグローブ
主任ブローカー、ハーグローブ＆アソシエイツ`,
    [
      {
        q: 'Why was this letter written?',
        choices: [
          'To reject a rental application',
          'To follow up on a property viewing and outline lease terms',
          'To request payment for a previous service',
          'To announce the opening of a new office building',
        ],
        answer: 1,
        explanation:
          '「Thank you for touring our available commercial spaces」「the unit offers 4,200 square feet」= 内覧後のフォローアップと賃貸条件の提示が目的。',
      },
      {
        q: 'What is included in the monthly rent of $11,200?',
        choices: [
          'Electricity and heating costs',
          'Tenant improvement allowance',
          'Janitorial services and building security',
          'Parking spaces for BluePeak employees',
        ],
        answer: 2,
        explanation:
          '「This includes janitorial services, building security」= 清掃と警備が含まれる。電気・暖房は別途請求と明記されているので(A)は誤り。',
      },
      {
        q: 'What is suggested about the tenant improvement allowance?',
        choices: [
          'It must be paid back within one year.',
          'It will be deducted from future rent payments.',
          'It covers all renovation costs.',
          'It is only available for spaces over 5,000 square feet.',
        ],
        answer: 1,
        explanation:
          '推測問題。「applied as a credit against your first months of rent」= 最初の数ヵ月分の賃料から差し引かれる。deducted from rent = credit against rentの言い換え。',
      },
      {
        q: 'By what date must BluePeak return the Letter of Intent?',
        choices: [
          'October 17',
          'October 24',
          'October 31',
          'November 1',
        ],
        answer: 2,
        explanation:
          '「please sign and return the attached Letter of Intent by October 31」= 10月31日が締め切り。',
      },
    ],
  ),
];
