import type { Part7Set } from '@/data/types';

/**
 * TOEIC Part 7（長文読解）形式。
 */
export const PART7_SETS: Part7Set[] = [
  {
    id: 'p701',
    docType: 'Eメール',
    passage:
      'From: Rachel Kim <rkim@delmarhotel.com>\nTo: James Porter <jporter@vexatech.com>\nSubject: Your Reservation Change\nDate: March 3\n\nDear Mr. Porter,\n\nThank you for contacting us about your upcoming stay. As requested, we have changed your reservation from March 15-17 to March 22-24. Your room type remains the same: a deluxe single room with a harbor view.\n\nPlease note that the rate for your new dates is $145 per night, $10 less than the original rate, because your new stay does not include a Friday night. The difference will be reflected in your final bill.\n\nAs a member of our loyalty program, you will continue to receive complimentary breakfast and free access to the fitness center. Should you need airport transportation, our shuttle runs every thirty minutes and can be reserved through the front desk.\n\nWe look forward to welcoming you.\n\nRachel Kim\nGuest Services, Del Mar Hotel',
    passageJa:
      '差出人: レイチェル・キム（デルマーホテル）\n宛先: ジェームズ・ポーター様\n件名: ご予約の変更\n\nポーター様\n\nご滞在についてご連絡いただきありがとうございます。ご依頼の通り、ご予約を3月15〜17日から3月22〜24日に変更いたしました。お部屋タイプは変わらず、ハーバービューのデラックスシングルです。\n\n新しい日程の料金は1泊145ドルで、金曜の宿泊が含まれないため元の料金より10ドル安くなります。差額は最終請求書に反映されます。\n\nロイヤルティプログラム会員として、無料朝食とフィットネスセンターの無料利用を引き続きご利用いただけます。空港送迎が必要な場合、シャトルは30分ごとに運行しており、フロントデスクでご予約いただけます。\n\nお越しをお待ちしております。',
    questions: [
      {
        q: 'Why was the email sent?',
        choices: [
          'To confirm a change to a reservation',
          'To advertise a new hotel service',
          'To request a payment',
          'To apologize for an error',
        ],
        answer: 0,
        explanation: '第1段落「As requested, we have changed your reservation」= 依頼された予約変更の確認。目的は冒頭にあることが多い。',
      },
      {
        q: 'What is indicated about the new room rate?',
        choices: [
          'It is higher than the original rate.',
          'It is lower than the original rate.',
          'It includes airport transportation.',
          'It must be paid in advance.',
        ],
        answer: 1,
        explanation: '「$145 per night, $10 less than the original rate」= 元より10ドル安い。金額と比較表現の読み取り。',
      },
      {
        q: 'What is NOT mentioned as a benefit for Mr. Porter?',
        choices: ['Free breakfast', 'Fitness center access', 'A room upgrade', 'Shuttle service availability'],
        answer: 2,
        explanation: 'NOT問題。朝食・フィットネス・シャトルは本文に記載があるが、部屋のアップグレードは書かれていない（部屋タイプは「同じまま」）。',
      },
    ],
  },
  {
    id: 'p702',
    docType: '広告',
    passage:
      'GRAND OPENING — TERRA VERDE MARKET\n\nFresh. Local. Affordable.\n\nTerra Verde Market opens its doors on Saturday, June 7, at 9 A.M. at 48 Willow Lane, just two blocks from Riverside Station.\n\nOpening week specials (June 7-13):\n- 20% off all organic produce\n- Buy one, get one free on all bakery items\n- Free reusable shopping bag for the first 200 customers each day\n\nWe carry fruits and vegetables from more than thirty local farms, a full-service butcher counter, and a wide selection of international foods. Our café on the second floor serves coffee, sandwiches, and daily lunch specials made with ingredients from the store.\n\nParking is free for the first ninety minutes. Members of our Harvest Club earn points on every purchase, redeemable for store credit. Sign up online at terraverdemarket.com or at the customer service counter.',
    passageJa:
      'グランドオープン — テラヴェルデ・マーケット\n\n新鮮・地元産・お手頃価格\n\nテラヴェルデ・マーケットは6月7日（土）午前9時、リバーサイド駅から2ブロックのウィロー通り48番地にオープンします。\n\nオープン記念週間の特典（6月7〜13日）:\n・オーガニック農産物全品20%オフ\n・ベーカリー商品はひとつ買うともうひとつ無料\n・毎日先着200名様にエコバッグ進呈\n\n30以上の地元農場の青果、対面式精肉カウンター、豊富な輸入食品を取り揃えています。2階のカフェでは、店内の食材を使ったコーヒー、サンドイッチ、日替わりランチを提供します。\n\n駐車場は最初の90分間無料。ハーベストクラブ会員はお買い物ごとにポイントが貯まり、店内クレジットと交換できます。ウェブサイトまたはカスタマーサービスカウンターでご登録ください。',
    questions: [
      {
        q: 'What is being advertised?',
        choices: ['A restaurant', 'A grocery store', 'A farmers\' association', 'A cooking school'],
        answer: 1,
        explanation: '「Market」「organic produce」「butcher counter」など食料品店（grocery store）の特徴が並ぶ。カフェは2階の付帯設備。',
      },
      {
        q: 'How can customers receive a free bag?',
        choices: [
          'By spending more than $20',
          'By joining the Harvest Club',
          'By being among the first 200 customers of the day',
          'By ordering online',
        ],
        answer: 2,
        explanation: '「Free reusable shopping bag for the first 200 customers each day」= 毎日先着200名。条件の読み取り問題。',
      },
      {
        q: 'What is suggested about the Harvest Club?',
        choices: [
          'It requires an annual fee.',
          'Points can be exchanged for store credit.',
          'It is only for local farmers.',
          'Members park free all day.',
        ],
        answer: 1,
        explanation: '「earn points on every purchase, redeemable for store credit」。redeemable（交換可能）が exchange の言い換え。',
      },
    ],
  },
  {
    id: 'p703',
    docType: '社内告知',
    passage:
      'NOTICE TO ALL EMPLOYEES\n\nSubject: Office Recycling Program\nEffective Date: October 1\n\nAs part of our sustainability initiative, Hollis & Warner will introduce a new recycling program at the head office. Color-coded bins will be placed in every kitchen area and beside the printers on each floor: blue for paper, yellow for plastics, and green for cans and bottles. Individual desk-side trash cans will be removed on September 30.\n\nConfidential documents should NOT be placed in the blue bins. Instead, continue to use the locked shredding consoles located near the mail room.\n\nThe cleaning staff will empty the new bins daily. Questions about the program may be directed to Dana Fuller, Office Manager, at extension 4102. A short information session will be held in the main conference room on September 25 at 3 P.M., and attendance is optional.',
    passageJa:
      '全社員への告知\n\n件名: オフィスリサイクルプログラム\n開始日: 10月1日\n\nサステナビリティ活動の一環として、ホリス&ワーナーは本社に新しいリサイクルプログラムを導入します。各キッチンエリアと各フロアのプリンター横に色分けされたゴミ箱を設置します（青=紙、黄=プラスチック、緑=缶・ビン）。個人のデスク横のゴミ箱は9月30日に撤去されます。\n\n機密書類は青いゴミ箱に入れないでください。引き続き、メール室近くの施錠式シュレッダーボックスをご利用ください。\n\n清掃スタッフが新しいゴミ箱を毎日空にします。プログラムに関する質問はオフィスマネージャーのデイナ・フラー（内線4102）まで。9月25日午後3時に大会議室で短い説明会を開催します（参加は任意）。',
    questions: [
      {
        q: 'What will happen on September 30?',
        choices: [
          'A recycling program will begin.',
          'Desk-side trash cans will be removed.',
          'An information session will be held.',
          'New printers will be installed.',
        ],
        answer: 1,
        explanation: '日付の対応関係を問う問題。10/1=開始、9/30=デスク横ゴミ箱の撤去、9/25=説明会。日付は狙われやすい。',
      },
      {
        q: 'According to the notice, where should confidential documents be placed?',
        choices: ['In the blue bins', 'In locked shredding consoles', 'In the green bins', 'In the mail room boxes'],
        answer: 1,
        explanation: '「continue to use the locked shredding consoles」。NOT the blue bins という否定表現に注意。',
      },
      {
        q: 'What is indicated about the information session?',
        choices: [
          'It is mandatory for all staff.',
          'It will be held online.',
          'Employees are not required to attend.',
          'It will last three hours.',
        ],
        answer: 2,
        explanation: '「attendance is optional」= 参加は任意。optional ↔ mandatory の対比はTOEIC頻出。',
      },
    ],
  },
  {
    id: 'p704',
    docType: '記事',
    passage:
      'LOCAL BUSINESS NEWS — Marbury Times, May 12\n\nCatering Company Expands to Second Location\n\nOlive & Thyme Catering, founded five years ago by chef Amelia Ross, will open a second kitchen in the Eastgate district this July. The company, which started with just three employees preparing lunches for nearby offices, now employs twenty-eight people and serves events across the region.\n\n"Demand has grown far beyond what our original kitchen can handle," Ms. Ross said. "The new facility will double our capacity and cut delivery times for clients on the east side of the city."\n\nThe expansion is expected to create fifteen new jobs, including positions for cooks, drivers, and event coordinators. Applications will be accepted online starting June 1.\n\nOlive & Thyme was named Small Business of the Year by the Marbury Chamber of Commerce last November, largely due to its partnerships with local farms and its program of donating unsold food to community centers.',
    passageJa:
      '地域ビジネスニュース — マーベリー・タイムズ 5月12日\n\nケータリング会社が2号店へ拡大\n\nシェフのアメリア・ロスが5年前に創業したオリーブ&タイム・ケータリングは、今年7月、イーストゲート地区に2つ目のキッチンを開設する。近隣オフィス向けのランチを3人の従業員で作ることから始まった同社は、現在28人を雇用し、地域全体のイベントにサービスを提供している。\n\n「需要は元のキッチンで対応できる範囲をはるかに超えました」とロス氏は語る。「新施設で生産能力は2倍になり、市東部の顧客への配達時間も短縮されます。」\n\nこの拡大により、調理師、ドライバー、イベントコーディネーターなど15の新規雇用が見込まれる。応募は6月1日からオンラインで受け付ける。\n\n同社は昨年11月、地元農場との提携や売れ残り食品を地域センターに寄付する取り組みが評価され、マーベリー商工会議所から年間最優秀中小企業に選ばれた。',
    questions: [
      {
        q: 'What is the article mainly about?',
        choices: [
          'A restaurant changing its menu',
          'A company opening a new facility',
          'A cooking competition',
          'A farm seeking new partners',
        ],
        answer: 1,
        explanation: '見出しと第1段落「will open a second kitchen」= 新施設の開設が主題。',
      },
      {
        q: 'According to Ms. Ross, what is one benefit of the expansion?',
        choices: [
          'Lower food prices',
          'Faster delivery to some clients',
          'Longer business hours',
          'A larger menu selection',
        ],
        answer: 1,
        explanation: '発言中の「cut delivery times for clients on the east side」= 配達時間の短縮。cut = 短縮の言い換え。',
      },
      {
        q: 'What is suggested about Olive & Thyme?',
        choices: [
          'It has won an award.',
          'It will close its original kitchen.',
          'It imports most ingredients.',
          'It was founded by three chefs.',
        ],
        answer: 0,
        explanation: '最終段落「was named Small Business of the Year」= 賞を受賞した。named ... = won an award の言い換え。',
      },
    ],
  },
  {
    id: 'p705',
    docType: 'チャット',
    passage:
      'Nina Okafor [10:12 A.M.]\nHi Tom, the projector in Room 3 isn\'t working, and my product demo for the Keller Group starts at 11.\n\nTom Reyes [10:13 A.M.]\nDid you try the spare cable in the supply cabinet?\n\nNina Okafor [10:14 A.M.]\nYes, no luck. I think it\'s the bulb.\n\nTom Reyes [10:16 A.M.]\nWe don\'t have a replacement on hand. It would take at least a day to order one. Why not move your demo to Room 7? Its projector was serviced last week.\n\nNina Okafor [10:17 A.M.]\nGood thinking. Could you update the room booking system so nobody takes it?\n\nTom Reyes [10:18 A.M.]\nAlready done. I\'ll also put a sign on Room 3 so no one else gets caught by surprise.',
    passageJa:
      'ニナ [10:12] トム、第3会議室のプロジェクターが動かないの。11時からケラーグループ向けの製品デモがあるのに。\nトム [10:13] 備品棚の予備ケーブルは試した？\nニナ [10:14] うん、ダメだった。電球（ランプ）だと思う。\nトム [10:16] 交換品の在庫はないよ。取り寄せに最低1日かかる。デモを第7会議室に移したら？先週プロジェクターを整備したばかりだよ。\nニナ [10:17] いい考えね。誰にも取られないように予約システムを更新してくれる？\nトム [10:18] もうやったよ。第3会議室には貼り紙もしておくね。',
    questions: [
      {
        q: 'What problem does Ms. Okafor report?',
        choices: [
          'A meeting room is double-booked.',
          'A piece of equipment is not working.',
          'A client canceled a demonstration.',
          'A supply cabinet is locked.',
        ],
        answer: 1,
        explanation: '冒頭「the projector ... isn\'t working」= 機器の故障。equipment への言い換え。',
      },
      {
        q: 'What does Mr. Reyes suggest?',
        choices: [
          'Ordering a new projector',
          'Postponing the demonstration',
          'Using a different room',
          'Calling a repair service',
        ],
        answer: 2,
        explanation: '「Why not move your demo to Room 7?」= 別の部屋の利用を提案。Why not〜? は提案表現。',
      },
      {
        q: 'At 10:18 A.M., what does Mr. Reyes mean when he writes, "Already done"?',
        choices: [
          'He has repaired the projector.',
          'He has updated the booking system.',
          'He has ordered a replacement bulb.',
          'He has contacted the Keller Group.',
        ],
        answer: 1,
        explanation: '意図問題。直前のニナの依頼「予約システムを更新してくれる？」への返答なので、更新済みという意味。',
      },
    ],
  },
  {
    id: 'p706',
    docType: 'お知らせ + Eメール（ダブルパッセージ）',
    passage:
      '--- お知らせ ---\nWESTBROOK PUBLIC LIBRARY\nAuthor Talk Series — Spring Schedule\n\nApril 12: Mia Torres, "Gardens of the City" (travel writing)\nMay 10: Dr. Alan Reeves, "The Data Age" (science)\nJune 14: Keiko Yamada, "Quiet Harbors" (fiction)\n\nAll talks begin at 6:30 P.M. in the Community Hall. Admission is free, but seating is limited to 80 guests. Reserve your seat online. Each talk is followed by a book signing; copies will be sold at a 15% discount by Pageturner Books.\n\n--- Eメール ---\nFrom: Keiko Yamada\nTo: events@westbrooklibrary.org\nDate: June 2\nSubject: My talk\n\nDear Events Team,\n\nI am looking forward to visiting your library this month. Unfortunately, my publisher has scheduled an overseas book tour that conflicts with the original date. Would it be possible to move my talk to June 28? My presentation itself needs no changes — the slides and handouts are ready.\n\nAlso, could you tell me how many seats have been reserved so far? I would like to bring enough signed bookplates for everyone.\n\nBest regards,\nKeiko Yamada',
    passageJa:
      '【お知らせ】ウェストブルック公立図書館 著者トークシリーズ 春の日程\n4月12日: ミア・トレス（紀行文）／5月10日: アラン・リーブス博士（科学）／6月14日: 山田恵子（小説）\n全トークは午後6時30分にコミュニティホールで開始。入場無料・先着80席。オンラインで要予約。各トーク後にサイン会があり、ページターナー書店が本を15%引きで販売。\n\n【Eメール】差出人: 山田恵子／宛先: 図書館イベント担当／日付: 6月2日\nイベントご担当者様\n今月の貴館訪問を楽しみにしています。あいにく出版社が海外ブックツアーを入れてしまい、当初の日程と重なってしまいました。私のトークを6月28日に変更していただくことは可能でしょうか。プレゼン自体の変更は不要です（スライドと配布資料は準備済みです）。\nまた、現時点で何席予約が入っているか教えていただけますか。全員分のサイン入り蔵書票を持参したいと思います。',
    questions: [
      {
        q: 'What is indicated about the Author Talk Series?',
        choices: [
          'Talks are held in the morning.',
          'Attendance costs 15 dollars.',
          'Seating is limited.',
          'Books cannot be purchased on site.',
        ],
        answer: 2,
        explanation: 'お知らせに「seating is limited to 80 guests」とある。本は会場で15%引き販売なので(B)(D)は誤り。',
      },
      {
        q: 'Why did Ms. Yamada send the email?',
        choices: [
          'To cancel her appearance',
          'To request a date change',
          'To ask for a larger room',
          'To change her presentation topic',
        ],
        answer: 1,
        explanation: '「Would it be possible to move my talk to June 28?」= 日程変更の依頼。',
      },
      {
        q: 'What was the original date of Ms. Yamada\'s talk?',
        choices: ['April 12', 'May 10', 'June 14', 'June 28'],
        answer: 2,
        explanation: 'ダブルパッセージ問題。メールの差出人（山田恵子）をお知らせの日程表と照合すると6月14日。2文書の情報を組み合わせて解く。',
      },
    ],
  },
];
