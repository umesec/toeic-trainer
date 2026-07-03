import type { Part6Set } from '@/data/types';

/**
 * TOEIC Part 6（長文穴埋め）形式。passage 内の [1]〜[4] が空所。
 */
export const PART6_SETS: Part6Set[] = [
  {
    id: 'p601',
    docType: 'Eメール',
    passage:
      'To: All Staff\nFrom: Facilities Management\nSubject: Elevator Maintenance\n\nPlease be advised that the main elevator will be out of service on Saturday, July 18, [1] annual maintenance. The work is expected to take approximately six hours. During this time, employees [2] to use the stairs or the freight elevator at the rear of the building. [3]. We apologize for any inconvenience and appreciate your [4].',
    passageJa:
      '宛先: 全社員\n差出人: 施設管理部\n件名: エレベーター保守点検\n\n7月18日（土）、年次保守点検のため、メインエレベーターが利用できなくなりますのでお知らせします。作業は約6時間かかる見込みです。この間、社員の皆様は階段または建物裏の業務用エレベーターをご利用ください。作業が予定より早く終わった場合は、追ってお知らせします。ご不便をおかけしますが、ご協力に感謝いたします。',
    blanks: [
      {
        no: 1,
        choices: ['despite', 'due to', 'instead of', 'as well as'],
        answer: 1,
        explanation: '空所の後ろは annual maintenance（名詞句）。「保守点検のため」という理由を表す前置詞句 due to が正解。',
      },
      {
        no: 2,
        choices: ['encourage', 'encouraging', 'are encouraged', 'encouragement'],
        answer: 2,
        explanation: '主語 employees は「使うよう勧められる」側なので受動態 are encouraged (to use) が正解。encourage A to do の受動形。',
      },
      {
        no: 3,
        choices: [
          'We will notify you if the work finishes ahead of schedule.',
          'The new elevator music has been well received.',
          'Job applications are due by the end of the month.',
          'The cafeteria menu will change next week.',
        ],
        answer: 0,
        explanation: '文挿入問題。前後は保守作業の話なので、「作業が早く終われば知らせる」が文脈に合う。他は無関係な話題。',
      },
      {
        no: 4,
        choices: ['cooperate', 'cooperative', 'cooperation', 'cooperatively'],
        answer: 2,
        explanation: '所有格 your の後ろには名詞が入る。cooperation（協力）が正解。品詞問題はPart 6でも頻出。',
      },
    ],
  },
  {
    id: 'p602',
    docType: 'お知らせ',
    passage:
      'Attention Greenfield Fitness Members\n\nBeginning August 1, our club will extend its weekday operating hours. The facility will open at 5:30 A.M. and close at 11:00 P.M. [1] members can exercise before or after work more easily. Weekend hours will remain [2]. In addition, two new yoga classes will be offered every Tuesday evening. [3] for these classes is limited to fifteen people per session, so early registration is recommended. To sign up, [4] visit the front desk or use our mobile app.',
    passageJa:
      'グリーンフィールド・フィットネス会員の皆様へ\n\n8月1日より、当クラブは平日の営業時間を延長します。施設は午前5時30分に開館し、午後11時に閉館します。これにより、会員の皆様は仕事の前後により運動しやすくなります。週末の営業時間は変わりません。さらに、毎週火曜夜に新しいヨガクラスを2つ開講します。これらのクラスの定員は各回15名のため、早めの登録をおすすめします。お申し込みはフロントデスクまたはモバイルアプリをご利用ください。',
    blanks: [
      {
        no: 1,
        choices: ['As a result,', 'For example,', 'In contrast,', 'Nevertheless,'],
        answer: 0,
        explanation: '前文（営業時間延長）の結果として「運動しやすくなる」と続くので As a result（その結果）が正解。接続語句は前後の論理関係で選ぶ。',
      },
      {
        no: 2,
        choices: ['unchanging', 'unchanged', 'changing', 'changeable'],
        answer: 1,
        explanation: 'remain + 形容詞/過去分詞で「〜のままである」。remain unchanged（変更されないまま）が定型表現。',
      },
      {
        no: 3,
        choices: ['Enrollment', 'Equipment', 'Employment', 'Environment'],
        answer: 0,
        explanation: '「クラスの◯◯は15名まで」→ Enrollment（登録者数・定員）。語彙問題は文脈から判断する。',
      },
      {
        no: 4,
        choices: ['pleased', 'pleasing', 'please', 'pleasure'],
        answer: 2,
        explanation: '命令文の丁寧表現「please + 動詞の原形」。please visit ... が正解。',
      },
    ],
  },
  {
    id: 'p603',
    docType: '手紙（顧客宛）',
    passage:
      'Dear Ms. Alvarez,\n\nThank you for your recent purchase of the Nordica NX-200 coffee maker. We are writing to inform you that the product you purchased [1] part of a voluntary recall due to a faulty power switch. Although no injuries have been reported, we ask that you stop using the product [2]. You may return it to any of our stores for a full refund or a free replacement. [3]. If you have any questions, please contact our customer service team, [4] is available seven days a week.',
    passageJa:
      'アルバレス様\n\nこの度はノルディカNX-200コーヒーメーカーをお買い上げいただきありがとうございます。お買い上げいただいた製品が、電源スイッチの不具合による自主回収の対象となったことをお知らせいたします。けがの報告はありませんが、直ちに製品の使用を中止してくださいますようお願いいたします。当社のいずれの店舗でも、全額返金または無償交換の対応をいたします。交換品は現在すべての店舗に在庫がございます。ご質問がございましたら、年中無休のカスタマーサービスまでお問い合わせください。',
    blanks: [
      {
        no: 1,
        choices: ['is', 'are', 'be', 'being'],
        answer: 0,
        explanation: '主語は the product（単数）。関係詞節 you purchased を挟んでいるが、動詞は単数の is。主述の一致問題。',
      },
      {
        no: 2,
        choices: ['immediately', 'recently', 'previously', 'lately'],
        answer: 0,
        explanation: 'リコールで使用中止を求める文脈なので immediately（直ちに）。recently/previously/lately は過去を表し stop の指示と合わない。',
      },
      {
        no: 3,
        choices: [
          'Replacement units are currently in stock at all locations.',
          'The coffee maker won a design award last year.',
          'Our stores will be closed for the holidays.',
          'Prices are subject to change without notice.',
        ],
        answer: 0,
        explanation: '文挿入問題。直前の「返金または交換」を受けて「交換品は全店に在庫あり」が自然。',
      },
      {
        no: 4,
        choices: ['who', 'which', 'where', 'when'],
        answer: 1,
        explanation: '先行詞は customer service team（モノ扱いの組織）で、空所は主格の関係代名詞。which が正解。',
      },
    ],
  },
  {
    id: 'p604',
    docType: '求人広告',
    passage:
      'ADMINISTRATIVE ASSISTANT — MERIDIAN LAW GROUP\n\nMeridian Law Group is seeking a full-time administrative assistant for its downtown office. The successful candidate will manage schedules, prepare documents, and greet clients. Applicants must have at least two years of office experience and strong computer skills. [1] with legal terminology is preferred but not required. We offer a competitive salary, health insurance, and twenty days of paid vacation [2]. [3], employees receive an annual allowance for professional development courses. To apply, send your resume and a cover letter to careers@meridianlaw.com [4] May 15.',
    passageJa:
      '事務アシスタント募集 — メリディアン法律事務所\n\nメリディアン法律事務所では、ダウンタウンオフィスで働く常勤の事務アシスタントを募集しています。採用者はスケジュール管理、書類作成、来客対応を担当します。応募者は2年以上のオフィス勤務経験と高いPCスキルが必要です。法律用語に精通していれば尚可ですが、必須ではありません。競争力のある給与、健康保険、年20日の有給休暇を提供します。さらに、社員は専門能力開発講座のための年間手当を受け取れます。応募は5月15日までに履歴書とカバーレターを careers@meridianlaw.com へお送りください。',
    blanks: [
      {
        no: 1,
        choices: ['Familiar', 'Familiarity', 'Familiarize', 'Familiarly'],
        answer: 1,
        explanation: '文の主語になる名詞 Familiarity（精通）が正解。Familiarity with〜「〜に詳しいこと」。',
      },
      {
        no: 2,
        choices: ['per year', 'at once', 'so far', 'in turn'],
        answer: 0,
        explanation: '「年20日の有給休暇」なので per year（1年につき）。待遇欄の定番表現。',
      },
      {
        no: 3,
        choices: ['Otherwise', 'However', 'In addition', 'For instance'],
        answer: 2,
        explanation: '前文の待遇（給与・保険・休暇）にさらに手当を追加しているので In addition（加えて）。',
      },
      {
        no: 4,
        choices: ['by', 'until', 'at', 'since'],
        answer: 0,
        explanation: '応募書類の提出は1回の動作なので期限の by。until は継続する状態に使う。',
      },
    ],
  },
  {
    id: 'p605',
    docType: '社内メモ',
    passage:
      'MEMO\nTo: All Sales Staff\nFrom: Victor Huang, Sales Director\nRe: Monthly Reporting Procedure\n\nEffective immediately, all sales reports must be submitted through the new online portal [1] by email. The portal automatically checks figures for errors, [2] the review process much faster. Reports are still due on the last business day of each month. [3]. Anyone who has not yet received login information should contact the IT help desk. Thank you for your [4] cooperation during this transition.',
    passageJa:
      '社内メモ\n宛先: 営業部全員\n差出人: ビクター・ホァン営業部長\n件名: 月次報告の手順について\n\n本日より、すべての営業報告書はメールではなく新しいオンラインポータルから提出してください。ポータルは数値の誤りを自動チェックするため、確認作業が大幅に速くなります。提出期限は従来通り毎月の最終営業日です。締め切りに遅れると月次集計に反映されない場合があります。ログイン情報をまだ受け取っていない方はITヘルプデスクに連絡してください。移行期間中のご協力に感謝します。',
    blanks: [
      {
        no: 1,
        choices: ['because of', 'instead of', 'in case of', 'on behalf of'],
        answer: 1,
        explanation: '「メールではなくポータルで」という置き換えなので instead of（〜の代わりに）。',
      },
      {
        no: 2,
        choices: ['make', 'made', 'making', 'makes'],
        answer: 2,
        explanation: 'カンマの後で「〜し、その結果…にする」という分詞構文。making the review process faster が正解。',
      },
      {
        no: 3,
        choices: [
          'Late submissions may not be included in the monthly summary.',
          'The cafeteria will be closed for renovations.',
          'Sales increased sharply in the overseas market.',
          'The portal was designed by an outside vendor.',
        ],
        answer: 0,
        explanation: '文挿入問題。直前の「締め切りは月末」を受けて「遅れると集計に含まれない」と続くのが自然。',
      },
      {
        no: 4,
        choices: ['continue', 'continued', 'continuing', 'continuation'],
        answer: 1,
        explanation: '名詞 cooperation を修飾する分詞。your continued cooperation「引き続きのご協力」は定型表現。',
      },
    ],
  },
  {
    id: 'p606',
    docType: 'Eメール',
    passage:
      'Dear Mr. Tanaka,\n\nThank you for choosing the Harborview Hotel. This message confirms that your reservation [1] to include an additional night, with checkout now on Sunday, October 12. The rate for the extra night is $145, [2] taxes. Your room type and all other details of your stay remain the same. [3]. Should you require an airport shuttle, please inform the front desk at least two hours [4] your departure. We look forward to welcoming you soon.\n\nSincerely,\nReservations Team, Harborview Hotel',
    passageJa:
      'タナカ様\n\nハーバービュー・ホテルをお選びいただきありがとうございます。本メールは、お客様のご予約が1泊追加の内容に[1]、チェックアウトが10月12日（日）となったことを確認するものです。追加宿泊分の料金は145ドル（税[2]）です。お部屋のタイプやその他のご滞在内容に変更はありません。[3]。空港シャトルをご希望の場合は、ご出発の少なくとも2時間[4]にフロントデスクへお知らせください。お会いできるのを楽しみにしております。\n\n敬具\nハーバービュー・ホテル予約担当',
    blanks: [
      {
        no: 1,
        choices: ['updates', 'is updating', 'has been updated', 'to update'],
        answer: 2,
        explanation:
          '主語は your reservation で、予約は「更新される」側なので受動態が必要だ。直後で新しいチェックアウト日が示されており、変更が既に完了していることが分かるため、現在完了の受動態 has been updated が正解である。',
      },
      {
        no: 2,
        choices: ['excluding', 'estimating', 'purchasing', 'delivering'],
        answer: 0,
        explanation:
          '空所は料金 $145 と taxes の関係を示す語である。ホテル料金の表示では税込みか税別かを明示するのが通例で、excluding taxes（税別）が文脈に合う。他の選択肢では意味が通らない。',
      },
      {
        no: 3,
        choices: [
          'The hotel gym was renovated by a local construction firm.',
          'Applications for the front desk position are no longer accepted.',
          'The city museum is closed on national holidays.',
          'Breakfast will also be provided on the additional morning at no extra charge.',
        ],
        answer: 3,
        explanation:
          '文挿入問題。前後は追加宿泊の料金や滞在内容の話であり、「追加の朝も無料で朝食を提供する」という文が最も自然につながる。ジムの改装や求人、美術館の話は文脈と無関係だ。',
      },
      {
        no: 4,
        choices: ['other than', 'prior to', 'instead of', 'according to'],
        answer: 1,
        explanation:
          '「ご出発の2時間前までにフロントに知らせる」という意味になる prior to（〜の前に）が正解だ。シャトルの手配は出発前に行う必要があるという文脈から判断できる。',
      },
    ],
  },
  {
    id: 'p607',
    docType: '社内通知',
    passage:
      'NOTICE TO ALL EMPLOYEES\n\nOur company will relocate its headquarters to the Riverside Tower on Monday, September 8. The new office offers larger meeting rooms and more [1] access to public transportation. [2]. Packing boxes will be distributed on Thursday, and each department is responsible for labeling [3] own equipment. During the move, the customer service line will remain open, [4] some responses may be slightly delayed. Further details, including a floor map of the new building, will be shared next week.',
    passageJa:
      '全社員への通知\n\n当社は9月8日（月）に本社をリバーサイド・タワーへ移転します。新オフィスにはより広い会議室があり、公共交通機関へのアクセスもより[1]です。[2]。梱包用の箱は木曜日に配布され、各部署は[3]の備品にラベルを貼る責任があります。移転作業中もカスタマーサービス窓口は開いていますが、[4]返答が多少遅れる場合があります。新ビルのフロアマップを含む詳細は来週お知らせします。',
    blanks: [
      {
        no: 1,
        choices: ['confident', 'convenient', 'dependent', 'frequent'],
        answer: 1,
        explanation:
          '空所は access を修飾する形容詞である。公共交通機関への「便利な」アクセスという意味になる convenient が正解だ。新オフィスの利点を列挙している文脈から判断する。',
      },
      {
        no: 2,
        choices: [
          'The cafeteria menu has been updated for the summer.',
          'Sales figures for August exceeded expectations.',
          'Visitors must sign in at the security desk.',
          'All staff should finish packing their desks by Friday afternoon.',
        ],
        answer: 3,
        explanation:
          '文挿入問題。直後の文で「梱包用の箱を木曜に配布する」と続くため、引っ越し準備を指示する「金曜午後までに各自の机の梱包を終えること」が文脈に合う。他は移転と無関係な話題だ。',
      },
      {
        no: 3,
        choices: ['its', 'it', 'itself', 'it is'],
        answer: 0,
        explanation:
          '空所の後ろの own equipment につながる所有格が必要だ。each department（各部署）を受ける単数の所有格 its が正解である。',
      },
      {
        no: 4,
        choices: ['because', 'unless', 'although', 'once'],
        answer: 2,
        explanation:
          '前半「窓口は開き続ける」と後半「返答が遅れる場合がある」は対照的な内容なので、譲歩を表す although が正解だ。前後の論理関係を読み取る問題である。',
      },
    ],
  },
  {
    id: 'p608',
    docType: '広告',
    passage:
      'CELEBRATE WITH HAYWOOD FURNITURE!\n\nFor twenty years, Haywood Furniture has provided quality sofas, tables, and beds at [1] prices. To thank our loyal customers, we are holding an anniversary sale from March 3 [2] March 9. Every item in the store will be discounted by at least 25 percent, and selected floor models will be marked down even further. Customers [3] more than $500 will also receive free delivery within the city. [4]. Visit our showroom on Kent Avenue today—doors open at 9 A.M.!',
    passageJa:
      'ヘイウッド家具と一緒にお祝いしましょう！\n\n20年間、ヘイウッド家具は高品質のソファ、テーブル、ベッドを[1]な価格で提供してきました。日頃のご愛顧に感謝して、3月3日[2]3月9日まで記念セールを開催します。店内全品が25％以上割引になり、一部の展示品はさらに値下げされます。500ドル以上[3]お客様には市内無料配送も提供します。[4]。本日ケント通りのショールームへぜひお越しください。開店は午前9時です！',
    blanks: [
      {
        no: 1,
        choices: ['temporary', 'curious', 'portable', 'affordable'],
        answer: 3,
        explanation:
          '空所は prices を修飾する形容詞だ。品質の良い家具を「手頃な」価格で提供してきたという宣伝文になる affordable が正解である。',
      },
      {
        no: 2,
        choices: ['among', 'through', 'within', 'along'],
        answer: 1,
        explanation:
          'from March 3 [2] March 9 で期間の終わりを示す前置詞が入る。from A through B（AからBまで）となる through が正解だ。',
      },
      {
        no: 3,
        choices: ['spend', 'spent', 'spending', 'spends'],
        answer: 2,
        explanation:
          'Customers を後ろから修飾する語が必要だ。「500ドルを超えて使う顧客」という能動の意味なので現在分詞 spending が正解である。文の述語動詞は will receive なので動詞の定形は入らない。',
      },
      {
        no: 4,
        choices: [
          'This offer cannot be combined with any other promotion.',
          'Our delivery trucks were purchased three years ago.',
          'The store will be closed for a private event.',
          'Employees must park behind the building.',
        ],
        answer: 0,
        explanation:
          '文挿入問題。直前まで割引や無料配送の特典を説明しているため、その条件として「本特典は他のプロモーションと併用できない」と続くのが自然だ。',
      },
    ],
  },
  {
    id: 'p609',
    docType: '手紙',
    passage:
      'Dear Mr. Bennett,\n\n[1]. We hope you have enjoyed the special exhibitions and lectures offered over the past year. To renew, simply complete the enclosed form and return it in the prepaid envelope [2] the end of this month. Members who renew early will receive two guest passes as a token of our [3]. Please also note that membership fees will increase slightly next year, so renewing now [4] you the current rate for another full year.\n\nSincerely,\nLaura Simmons\nMembership Coordinator, Clearwater Art Museum',
    passageJa:
      'ベネット様\n\n[1]。この1年間、特別展や講演会をお楽しみいただけたなら幸いです。更新するには、同封の用紙にご記入のうえ、今月末[2]料金支払済み封筒でご返送ください。早期に更新された会員には、[3]のしるしとしてゲストパスを2枚差し上げます。また、来年度は会費がわずかに値上がりしますので、今更新すれば現在の料金がもう1年間[4]。\n\n敬具\nローラ・シモンズ\nクリアウォーター美術館 会員担当',
    blanks: [
      {
        no: 1,
        choices: [
          'Your membership at the Clearwater Art Museum will expire on July 31.',
          'The museum cafe now serves a seasonal lunch menu.',
          'Parking passes must be renewed at city hall.',
          'Our gift shop is looking for part-time staff.',
        ],
        answer: 0,
        explanation:
          '文挿入問題。直後に「更新するには同封の用紙を〜」と続くため、冒頭で「会員資格が7月31日に期限切れになる」と知らせる文が最も自然だ。更新案内の手紙の導入である。',
      },
      {
        no: 2,
        choices: ['until', 'at', 'by', 'from'],
        answer: 2,
        explanation:
          '用紙の返送は1回の動作なので、期限を表す by（〜までに）が正解だ。until は状態の継続に使うためここでは不適切である。',
      },
      {
        no: 3,
        choices: ['permission', 'appreciation', 'destination', 'foundation'],
        answer: 1,
        explanation:
          'a token of our appreciation で「感謝のしるし」という定型表現になる。早期更新者への特典という文脈からも appreciation（感謝）が正解だ。',
      },
      {
        no: 4,
        choices: ['guarantee', 'guaranteeing', 'to guarantee', 'guarantees'],
        answer: 3,
        explanation:
          '主語は動名詞句 renewing now で、動名詞は単数扱いだ。したがって三人称単数現在の guarantees が正解である。guarantee A B「AにBを保証する」の形。',
      },
    ],
  },
  {
    id: 'p610',
    docType: '案内文',
    passage:
      'WELCOME TO THE 12TH GLOBAL MARKETING FORUM\n\nRegistration will take place in the main lobby of the Beaumont Convention Center. Attendees should wear their name badges [1] all sessions, as staff will check them at each entrance. A detailed schedule is printed in your welcome packet, and any last-minute changes [2] on the screens near the elevators. [3]. Lunch will be served in Hall B from noon to 1:30 P.M. If you have any dietary restrictions, please [4] a member of the catering team in advance. We hope you enjoy the forum.',
    passageJa:
      '第12回グローバル・マーケティング・フォーラムへようこそ\n\n受付はボーモント・コンベンションセンターのメインロビーで行います。スタッフが各入口で確認しますので、参加者は全セッション[1]名札を着用してください。詳細なスケジュールはウェルカムパケットに印刷されており、直前の変更はエレベーター近くのスクリーンに[2]。[3]。昼食は正午から午後1時30分までホールBで提供されます。食事制限のある方は、事前にケータリングチームのスタッフに[4]ください。フォーラムをお楽しみください。',
    blanks: [
      {
        no: 1,
        choices: ['besides', 'beyond', 'throughout', 'despite'],
        answer: 2,
        explanation:
          '「すべてのセッションの間ずっと名札を着用する」という意味になる throughout（〜の間中）が正解だ。各入口でスタッフが確認するという後続の説明とも合う。',
      },
      {
        no: 2,
        choices: ['display', 'displayed', 'displaying', 'will be displayed'],
        answer: 3,
        explanation:
          '主語は any last-minute changes で、変更は「表示される」側なので受動態が必要だ。今後の案内について述べているため未来の受動態 will be displayed が正解である。',
      },
      {
        no: 3,
        choices: [
          'The convention center opened in 1998.',
          'Please check them regularly throughout the day.',
          'Hotel reservations are the responsibility of each speaker.',
          'The forum was canceled due to bad weather.',
        ],
        answer: 1,
        explanation:
          '文挿入問題。直前の「エレベーター近くのスクリーンに変更が表示される」を受けて、「1日を通してこまめに確認してほしい」と促す文が自然につながる。them はスクリーンを指す。',
      },
      {
        no: 4,
        choices: ['notify', 'remove', 'compare', 'deliver'],
        answer: 0,
        explanation:
          '「食事制限がある場合は事前にケータリング担当者に知らせる」という文脈なので notify（知らせる）が正解だ。昼食の提供に関する直前の文の流れから判断できる。',
      },
    ],
  },
  {
    id: 'p611',
    docType: '記事',
    passage:
      'MILLBROOK — Sweet Oak Bakery, a family-owned business on Main Street, announced plans to open a second location in the Fairview district this fall. Owner Dana Ruiz said the decision was made [1] response to growing demand for the bakery\'s handmade breads and pastries. [2]. The new shop will employ about ten people and feature a small seating area where customers can enjoy coffee. Ms. Ruiz, who founded the bakery in 2015, [3] several regional baking awards over the years. "We are excited to serve a new neighborhood," she [4] in a statement released on Monday.',
    passageJa:
      'ミルブルック発 — メインストリートの家族経営の店、スイートオーク・ベーカリーは、今秋フェアビュー地区に2号店を開く計画を発表した。オーナーのダナ・ルイス氏は、同店の手作りパンと菓子への需要の高まり[1]応えての決断だと述べた。[2]。新店舗は約10名を雇用し、客がコーヒーを楽しめる小さな座席スペースを備える予定だ。2015年に同店を創業したルイス氏は、これまでに地域のベーカリー賞をいくつも[3]。「新しい地域の皆様にお届けできることに興奮しています」と、月曜に発表された声明の中で彼女は[4]。',
    blanks: [
      {
        no: 1,
        choices: ['for', 'in', 'on', 'to'],
        answer: 1,
        explanation:
          'in response to〜「〜に応えて」という定型表現である。需要の高まりを受けて2号店を出すという文脈に合うのは in だ。',
      },
      {
        no: 2,
        choices: [
          'The original store often sells out of its most popular items before noon.',
          'The bakery will close permanently at the end of the year.',
          'Fairview is known for its annual film festival.',
          'Ms. Ruiz previously worked as an accountant.',
        ],
        answer: 0,
        explanation:
          '文挿入問題。直前の「需要の高まり」を具体的に裏付ける「本店では人気商品が昼前に売り切れることが多い」が最も自然だ。閉店の話は事業拡大という記事の流れと矛盾する。',
      },
      {
        no: 3,
        choices: ['wins', 'winning', 'has won', 'is won'],
        answer: 2,
        explanation:
          'over the years（長年にわたり）という語句があるため、過去から現在までの経験・継続を表す現在完了 has won が正解だ。',
      },
      {
        no: 4,
        choices: ['told', 'spoke', 'talked', 'said'],
        answer: 3,
        explanation:
          '発言内容を直接引用して「〜と述べた」とする動詞は said である。told は直後に人を表す目的語が必要で、spoke / talked は引用文を直接目的語に取れない。',
      },
    ],
  },
  {
    id: 'p612',
    docType: 'メモ',
    passage:
      'MEMO\nTo: All Department Heads\nFrom: Olivia Chen, Operations Manager\nRe: Printing Costs\n\nA recent review showed that printing expenses have risen sharply over the past six months. To reduce costs, all employees are asked to print documents in black and white [1] color is absolutely necessary. Double-sided printing should [2] whenever possible. In addition, please recycle used paper in the bins located next to each printer. Together, these small changes are expected to [3] our supply costs by nearly 20 percent this year. [4]. Thank you for your support.',
    passageJa:
      '社内メモ\n宛先: 各部門長\n差出人: オリビア・チェン業務部長\n件名: 印刷コストについて\n\n最近の調査で、過去6か月間に印刷費が急増していることが分かりました。コスト削減のため、カラーがどうしても必要な場合[1]、全社員は書類を白黒で印刷するようお願いします。可能な場合は常に両面印刷を[2]。さらに、使用済みの用紙は各プリンター横の回収箱でリサイクルしてください。これらの小さな変更により、今年の消耗品費を20％近く[3]ことが見込まれます。[4]。ご協力に感謝します。',
    blanks: [
      {
        no: 1,
        choices: ['while', 'whether', 'so that', 'unless'],
        answer: 3,
        explanation:
          '「カラーがどうしても必要な場合を除いて白黒で印刷する」という意味になる unless（〜でない限り）が正解だ。コスト削減という目的から判断できる。',
      },
      {
        no: 2,
        choices: ['select', 'selecting', 'be selected', 'to select'],
        answer: 2,
        explanation:
          '主語は Double-sided printing で、印刷設定は「選ばれる」側なので受動態が必要だ。助動詞 should の後ろは動詞の原形なので be selected が正解である。',
      },
      {
        no: 3,
        choices: ['lower', 'raise', 'waste', 'earn'],
        answer: 0,
        explanation:
          '一連の取り組みは経費削減が目的なので、コストを「下げる」という意味の lower が正解だ。冒頭の「印刷費が急増した」という文脈と対応している。',
      },
      {
        no: 4,
        choices: [
          'New printers will be installed in every office.',
          'Progress will be reviewed at the next quarterly meeting.',
          'The company picnic has been moved to September.',
          'Ink cartridges are stored in the supply cabinet.',
        ],
        answer: 1,
        explanation:
          '文挿入問題。経費削減策とその効果の見込みを述べた後なので、「進捗は次の四半期会議で確認する」と締めくくるのが自然だ。新しいプリンターの設置はコスト削減の趣旨と合わない。',
      },
    ],
  },
  {
    id: 'p613',
    docType: '求人広告',
    passage:
      'HEAD CHEF WANTED — THE LANTERN BISTRO\n\nThe Lantern Bistro, an award-winning restaurant in downtown Avondale, is seeking an experienced head chef. Responsibilities include designing seasonal menus, training kitchen staff, and [1] food quality standards. Candidates should have a culinary degree and a minimum of five years of experience in a [2] role. [3]. The position offers an excellent salary, paid holidays, and a yearly bonus based [4] restaurant performance. Interested candidates should send a resume and two professional references to jobs@lanternbistro.com by August 30.',
    passageJa:
      '料理長募集 — ザ・ランタン・ビストロ\n\nアヴォンデール中心街の受賞歴のあるレストラン、ザ・ランタン・ビストロでは、経験豊富な料理長を募集しています。職務には季節メニューの考案、キッチンスタッフの指導、食品品質基準の[1]が含まれます。応募者には調理学の学位と、[2]な職務での5年以上の経験が求められます。[3]。優れた給与、有給休暇、店の業績[4]年次ボーナスを提供します。ご興味のある方は8月30日までに履歴書と職務上の推薦者2名の情報を jobs@lanternbistro.com へお送りください。',
    blanks: [
      {
        no: 1,
        choices: ['maintaining', 'maintains', 'maintained', 'maintenance'],
        answer: 0,
        explanation:
          'designing, training と並列される動名詞が必要だ。include の目的語として designing / training / maintaining が並ぶ形になるため maintaining が正解である。',
      },
      {
        no: 2,
        choices: ['temporary', 'supervisory', 'voluntary', 'preliminary'],
        answer: 1,
        explanation:
          '料理長はスタッフを指導・管理する立場なので、「監督的な」役職での経験を求める supervisory が正解だ。職務内容に training kitchen staff とあることもヒントになる。',
      },
      {
        no: 3,
        choices: [
          'The restaurant closed its kitchen last year.',
          'Parking is not available for customers.',
          'The bistro is open only for breakfast.',
          'Experience with international cuisine is a plus.',
        ],
        answer: 3,
        explanation:
          '文挿入問題。直前で応募資格（学位と経験年数）を述べているため、追加の歓迎条件として「多国籍料理の経験があれば尚可」と続くのが自然だ。求人広告の定番の流れである。',
      },
      {
        no: 4,
        choices: ['at', 'for', 'on', 'of'],
        answer: 2,
        explanation:
          'based on〜「〜に基づいて」という定型表現である。ボーナスがレストランの業績に基づいて支払われるという意味になる on が正解だ。',
      },
    ],
  },
  {
    id: 'p614',
    docType: 'プレスリリース',
    passage:
      'FOR IMMEDIATE RELEASE\n\nBrightpath Software Launches Mobile Banking App\n\nSEATTLE — Brightpath Software today announced the official release of PayGo, a mobile application that allows users to manage multiple bank accounts in one place. [1]. The app also sends instant alerts [2] unusual account activity is detected. "Customers want simple and secure tools," said CEO Marta Villanueva. "PayGo was designed with [3] needs in mind." The application can be [4] free of charge on all major app stores, and a premium version with budgeting features is planned for next year.',
    passageJa:
      '報道関係者各位（即時解禁）\n\nブライトパス・ソフトウェア、モバイルバンキングアプリを発表\n\nシアトル発 — ブライトパス・ソフトウェアは本日、複数の銀行口座を1か所で管理できるモバイルアプリ「PayGo」の正式リリースを発表した。[1]。本アプリは、不審な口座の動きが検知される[2]即時に通知も送信する。「顧客はシンプルで安全なツールを求めています」とCEOのマルタ・ビジャヌエバ氏は述べた。「PayGoは[3]ニーズを念頭に設計されました。」本アプリは主要なアプリストアで無料で[4]でき、家計管理機能を備えた有料版が来年に予定されている。',
    blanks: [
      {
        no: 1,
        choices: [
          'The company\'s headquarters will move to Portland.',
          'Paper bank statements will be discontinued.',
          'During a three-month trial period, more than 50,000 people downloaded the app.',
          'The CEO will retire at the end of the year.',
        ],
        answer: 2,
        explanation:
          '文挿入問題。新アプリの発表という文脈で、その注目度を裏付ける「3か月の試験期間中に5万人以上がダウンロードした」が最も自然だ。本社移転やCEOの退任はアプリの紹介と無関係である。',
      },
      {
        no: 2,
        choices: ['despite', 'whenever', 'in spite of', 'due to'],
        answer: 1,
        explanation:
          '後ろに主語と動詞（activity is detected）が続くので接続詞が必要だ。「不審な動きが検知されるたびに通知を送る」という意味になる whenever が正解である。despite と in spite of は前置詞。',
      },
      {
        no: 3,
        choices: ['they', 'them', 'theirs', 'their'],
        answer: 3,
        explanation:
          '空所の後ろの名詞 needs につながる所有格が必要だ。customers を受ける their が正解である。with their needs in mind「顧客のニーズを念頭に置いて」。',
      },
      {
        no: 4,
        choices: ['downloaded', 'postponed', 'interrupted', 'manufactured'],
        answer: 0,
        explanation:
          'アプリストアで「無料でダウンロードできる」という文脈なので downloaded が正解だ。ここまでアプリの機能や入手方法を説明している流れから判断する。',
      },
    ],
  },
  {
    id: 'p615',
    docType: 'お知らせ',
    passage:
      'NOTICE — WESTFIELD PUBLIC LIBRARY\n\nThe Westfield Public Library will be closed from August 4 to August 17 [1] renovation work on the second floor. The project will create a larger children\'s area and several quiet study rooms, as well as improved lighting. [2]. During the closure, borrowed materials may be returned through the outdoor book drop, and all due dates [3] automatically by two weeks. We thank patrons for their patience and look forward to [4] you in our improved facility on August 18.',
    passageJa:
      'お知らせ — ウェストフィールド公共図書館\n\nウェストフィールド公共図書館は、2階の改装工事[1]、8月4日から8月17日まで閉館します。この工事により、より広い児童書コーナーと複数の静かな学習室が新設され、照明も改善されます。[2]。閉館中、借りた資料は屋外の返却ポストに返すことができ、すべての返却期限は自動的に2週間[3]。ご利用者の皆様のご理解に感謝するとともに、8月18日に改装された館内で皆様を[4]のを楽しみにしています。',
    blanks: [
      {
        no: 1,
        choices: ['except for', 'owing to', 'regardless of', 'as far as'],
        answer: 1,
        explanation:
          '空所の後ろは renovation work という名詞句で、「改装工事のため」という理由を表す前置詞句 owing to が正解だ。閉館の理由を説明する文脈である。',
      },
      {
        no: 2,
        choices: [
          'Library cards cost five dollars to replace.',
          'The second floor was added in 1985.',
          'Volunteers are needed for the summer book sale.',
          'Online services, including e-books, will remain available as usual.',
        ],
        answer: 3,
        explanation:
          '文挿入問題。閉館の告知に続き、直後の文でも閉館中の対応（返却方法）を説明しているため、「電子書籍などのオンラインサービスは通常どおり利用できる」と補足する文が自然だ。',
      },
      {
        no: 3,
        choices: ['extend', 'extending', 'will be extended', 'have extended'],
        answer: 2,
        explanation:
          '主語は all due dates で、返却期限は「延長される」側なので受動態が必要だ。閉館に伴う今後の措置なので will be extended が正解である。',
      },
      {
        no: 4,
        choices: ['welcoming', 'purchasing', 'repairing', 'translating'],
        answer: 0,
        explanation:
          'look forward to の後ろは動名詞で、「改装された施設で皆様をお迎えするのを楽しみにしている」という結びの挨拶になる welcoming が正解だ。',
      },
    ],
  },
  {
    id: 'p616',
    docType: 'Eメール',
    passage:
      'To: Marketing Team\nFrom: Elena Ortiz, Training Coordinator\nSubject: Webinar Invitation\n\nDear colleagues,\n\nYou are invited to attend an online workshop titled "Writing Effective Social Media Posts" on Friday, June 12, at 2:00 P.M. The session will be led by consultant Priya Nair, [1] has advised several leading retail brands. Participation is optional, [2] highly recommended for anyone who creates content for our customers. The webinar will [3] approximately ninety minutes, including a question-and-answer session at the end. [4]. Please register through the training portal by Wednesday.\n\nBest regards,\nElena',
    passageJa:
      '宛先: マーケティングチーム\n差出人: エレナ・オルティス（研修コーディネーター）\n件名: ウェビナーのご案内\n\n皆様\n\n6月12日（金）午後2時開催のオンラインワークショップ「効果的なSNS投稿の書き方」にご招待します。セッションを担当するコンサルタントのプリヤ・ナイル氏は、複数の大手小売ブランドに助言してきた人物[1]。参加は任意です[2]、顧客向けコンテンツを作成する方には強くおすすめします。ウェビナーは最後の質疑応答を含めて約90分[3]予定です。[4]。水曜日までに研修ポータルからご登録ください。\n\nエレナ',
    blanks: [
      {
        no: 1,
        choices: ['who', 'whose', 'whom', 'which'],
        answer: 0,
        explanation:
          '先行詞は人物 Priya Nair で、空所は関係詞節内で主語の働きをするため主格の関係代名詞 who が正解だ。which は人以外に使う。',
      },
      {
        no: 2,
        choices: ['or', 'so', 'nor', 'but'],
        answer: 3,
        explanation:
          '「参加は任意だが、強く推奨される」という対照的な内容をつなぐ but が正解だ。optional と highly recommended の対比を読み取る。',
      },
      {
        no: 3,
        choices: ['spend', 'last', 'pass', 'stay'],
        answer: 1,
        explanation:
          '「ウェビナーは約90分続く」という意味になる自動詞 last（続く）が正解だ。所要時間を述べる際の定番表現である。',
      },
      {
        no: 4,
        choices: [
          'The marketing budget will be finalized next quarter.',
          'Ms. Nair joined our company as an intern.',
          'A recording will be shared with anyone who cannot attend live.',
          'The training portal will be shut down permanently.',
        ],
        answer: 2,
        explanation:
          '文挿入問題。直後に「水曜までにポータルで登録を」と続く案内の流れで、参加できない人への配慮として「録画を共有する」と述べる文が自然だ。ポータル閉鎖は登録の指示と矛盾する。',
      },
    ],
  },
  {
    id: 'p617',
    docType: '社内通知',
    passage:
      'NOTICE: GREEN OFFICE INITIATIVE\n\n[1]. As a first step, new recycling stations have been installed on every floor near the kitchen areas. Please separate paper, plastic, and cans [2] the posted instructions. Disposable cups will no longer be provided in the break rooms; instead, employees are encouraged [3] their own mugs. Next month, the environmental committee will also introduce measures to reduce electricity use, such as motion-sensor lighting. Questions or suggestions may be [4] to the committee at greenteam@corvex.com. Thank you for helping us build a greener workplace.',
    passageJa:
      'お知らせ: グリーンオフィス活動\n\n[1]。第一歩として、各フロアの給湯室付近に新しいリサイクルステーションが設置されました。紙、プラスチック、缶は掲示された指示[2]分別してください。休憩室での使い捨てカップの提供は終了します。代わりに、社員の皆さんはマイマグカップを[3]よう推奨されます。来月には、環境委員会が人感センサー照明などの節電策も導入します。質問や提案は greenteam@corvex.com で委員会宛てに[4]ことができます。より環境にやさしい職場づくりへのご協力に感謝します。',
    blanks: [
      {
        no: 1,
        choices: [
          'The parking garage will be repaved this weekend.',
          'Several employees were promoted last quarter.',
          'The kitchen areas will be closed until further notice.',
          'Corvex Industries is launching a company-wide effort to reduce waste.',
        ],
        answer: 3,
        explanation:
          '文挿入問題。冒頭の文であり、この後にリサイクルステーションの設置や使い捨てカップの廃止といった具体策が続くため、全体方針を示す「全社的な廃棄物削減の取り組みを開始する」が正解だ。',
      },
      {
        no: 2,
        choices: ['according to', 'in exchange for', 'on behalf of', 'by means of'],
        answer: 0,
        explanation:
          '「掲示された指示に従って分別する」という意味になる according to（〜に従って）が正解だ。分別方法を案内する文脈から判断する。',
      },
      {
        no: 3,
        choices: ['bring', 'bringing', 'to bring', 'brought'],
        answer: 2,
        explanation:
          'encourage A to do「Aに〜するよう勧める」の受動態 be encouraged to do の形である。したがって to bring が正解だ。',
      },
      {
        no: 4,
        choices: ['reminded', 'directed', 'appointed', 'expressed'],
        answer: 1,
        explanation:
          '「質問や提案は委員会宛てに送ってほしい」という意味になる directed が正解だ。be directed to〜「〜に向けられる」。問い合わせ先を示す結びの定型表現である。',
      },
    ],
  },
  {
    id: 'p618',
    docType: '広告',
    passage:
      'DISCOVER THE COAST WITH SUNWAY TRAVEL\n\nThis autumn, escape the city with Sunway Travel\'s five-day coastal tour. The package [1] round-trip train tickets, four nights at a seaside hotel, and guided visits to three historic fishing villages. Travelers will also enjoy a relaxing sunset cruise at no extra [2]. [3]. Because group sizes are limited to twenty people, tours often fill up quickly. Book [4] October 1 and receive a 10 percent early-bird discount. Call 555-0177 or visit www.sunwaytravel.com to reserve your seat today.',
    passageJa:
      'サンウェイトラベルで海岸を発見しよう\n\nこの秋は、サンウェイトラベルの5日間海岸ツアーで街を離れませんか。パッケージには往復列車チケット、シーサイドホテル4泊、歴史ある3つの漁村へのガイド付き訪問が[1]。さらに、追加[2]なしでゆったりとしたサンセットクルーズもお楽しみいただけます。[3]。グループの人数は20名までのため、ツアーはすぐに満席になることがよくあります。10月1日[4]にご予約いただくと、10％の早期割引が受けられます。お電話（555-0177）または www.sunwaytravel.com で今すぐお席をご予約ください。',
    blanks: [
      {
        no: 1,
        choices: ['include', 'includes', 'including', 'included'],
        answer: 1,
        explanation:
          '主語は The package（単数）で、現在の事実を述べる文なので三人称単数現在の includes が正解だ。パッケージの内容を列挙する文である。',
      },
      {
        no: 2,
        choices: ['effort', 'space', 'charge', 'notice'],
        answer: 2,
        explanation:
          'at no extra charge「追加料金なしで」という定型表現になる charge が正解だ。ツアーの特典を宣伝する文脈に合う。',
      },
      {
        no: 3,
        choices: [
          'All meals are prepared with fresh, locally caught seafood.',
          'The train station will be demolished next year.',
          'Sunway Travel was founded by two brothers.',
          'Passports must be renewed every ten years.',
        ],
        answer: 0,
        explanation:
          '文挿入問題。ツアーの魅力を列挙している流れなので、「食事はすべて地元で水揚げされた新鮮な魚介で用意される」と特典を続けるのが自然だ。駅の取り壊しや会社の沿革は宣伝の流れに合わない。',
      },
      {
        no: 4,
        choices: ['along', 'onto', 'past', 'before'],
        answer: 3,
        explanation:
          '「10月1日より前に予約すれば早期割引が受けられる」という意味になる before が正解だ。early-bird discount（早期割引）という語がヒントになる。',
      },
    ],
  },
  {
    id: 'p619',
    docType: '手紙',
    passage:
      'Dear Ms. Whitfield,\n\nOn behalf of the Harper Valley Food Bank, I would like to thank you for your generous donation of $250. Contributions like yours allow us to provide meals to hundreds of local families [1] the year. [2]. Thanks to this expansion, we can now accept larger deliveries from area farms and reduce food waste [3]. As a token of our gratitude, your name will be listed in our annual report unless you [4] otherwise. We are deeply grateful for your continued support.\n\nWarm regards,\nSamuel Okafor, Executive Director',
    passageJa:
      'ウィットフィールド様\n\nハーパーバレー・フードバンクを代表して、250ドルの寛大なご寄付に感謝申し上げます。皆様のようなご寄付のおかげで、私たちは1年[1]何百もの地元家庭に食事を提供できています。[2]。この拡張のおかげで、現在では地域の農場からより大量の配送を受け入れ、食品廃棄を[3]減らすことができます。感謝のしるしとして、別途[4]がない限り、お名前を年次報告書に掲載いたします。継続的なご支援に深く感謝いたします。\n\n敬具\nサミュエル・オカフォー（事務局長）',
    blanks: [
      {
        no: 1,
        choices: ['between', 'under', 'throughout', 'inside'],
        answer: 2,
        explanation:
          '「1年を通して食事を提供する」という意味になる throughout the year が正解だ。継続的な支援活動を説明する文脈である。',
      },
      {
        no: 2,
        choices: [
          'Last month, we completed construction of a new storage facility.',
          'Donations can no longer be accepted at this time.',
          'Ms. Whitfield has volunteered here for ten years.',
          'The food bank will close early on Fridays.',
        ],
        answer: 0,
        explanation:
          '文挿入問題。直後の文が Thanks to this expansion（この拡張のおかげで）と始まるため、その this expansion が指す内容として「先月、新しい貯蔵施設が完成した」が入る必要がある。',
      },
      {
        no: 3,
        choices: ['accidentally', 'significantly', 'previously', 'tightly'],
        answer: 1,
        explanation:
          '施設の拡張により食品廃棄を「大幅に」減らせるという文脈なので significantly が正解だ。動詞 reduce を修飾する副詞である。',
      },
      {
        no: 4,
        choices: ['requested', 'requesting', 'to request', 'request'],
        answer: 3,
        explanation:
          'unless に続く節の主語は you で、現在の条件を表すため動詞の現在形（原形と同形）の request が正解だ。「別途お申し出がない限り」という定型表現である。',
      },
    ],
  },
  {
    id: 'p620',
    docType: '案内文',
    passage:
      'PARKING INFORMATION — GRANDVIEW OFFICE TOWER\n\nThe parking garage at Grandview Office Tower is reserved for tenants and their guests. All vehicles must display a valid permit, [1] may be obtained from the building management office on the ground floor. Guests should park on levels three and four only, [2] the lower levels are assigned to monthly permit holders. Vehicles [3] a permit after 6:00 P.M. may be towed at the owner\'s expense. [4]. For questions, please call the management office at extension 400.',
    passageJa:
      '駐車場のご案内 — グランドビュー・オフィスタワー\n\nグランドビュー・オフィスタワーの駐車場は、テナントとその来客専用です。すべての車両は有効な許可証を掲示しなければなりません。許可証は1階の建物管理事務所で入手[1]できます。下の階は月極許可証保有者に割り当てられている[2]、来客は3階と4階のみに駐車してください。午後6時以降に許可証[3]車両は、所有者の負担でレッカー移動されることがあります。[4]。ご質問は内線400の管理事務所までお電話ください。',
    blanks: [
      {
        no: 1,
        choices: ['what', 'who', 'whose', 'which'],
        answer: 3,
        explanation:
          '先行詞は a valid permit（モノ）で、コンマの後に続く非制限用法の主格の関係代名詞が必要だ。which が正解である。',
      },
      {
        no: 2,
        choices: ['despite', 'as', 'yet', 'either'],
        answer: 1,
        explanation:
          '後ろに節が続き、「下の階は月極利用者に割り当てられているので」という理由を表す接続詞 as が正解だ。来客が3・4階に停めるべき理由を説明している。',
      },
      {
        no: 3,
        choices: ['lacking', 'earning', 'causing', 'following'],
        answer: 0,
        explanation:
          '「許可証のない車両はレッカー移動されることがある」という意味になる lacking（〜を欠いている）が正解だ。許可証の掲示を義務付ける前文の流れから判断する。',
      },
      {
        no: 4,
        choices: [
          'The elevators are inspected every January.',
          'Tenants may reserve the rooftop terrace for events.',
          'Electric vehicle charging stations are available on level two.',
          'The management office sells snacks and beverages.',
        ],
        answer: 2,
        explanation:
          '文挿入問題。駐車場の利用案内という文脈なので、駐車場設備に関する「2階に電気自動車の充電ステーションがある」が最も自然だ。他の選択肢は駐車場と関係がない。',
      },
    ],
  },
  {
    id: 'p621',
    docType: '記事',
    passage:
      'RIVERTON — [1]. The improvements, which include new walking trails, additional benches, and a modern playground, were funded by a combination of city money and private donations. Mayor Alice Chen noted that the park had not been updated [2] it first opened nearly forty years ago. Local residents appear pleased with the results. "My children want to visit the playground almost [3] day," said resident Tom Barrett. City officials expect the renovated park [4] more than 100,000 visitors each year.',
    passageJa:
      'リバートン発 — [1]。新しい遊歩道、ベンチの増設、最新の遊具広場を含むこの改修は、市の予算と民間の寄付によって賄われた。アリス・チェン市長は、公園が約40年前の開園[2]一度も改修されていなかったと述べた。地元住民は結果に満足している様子だ。「子どもたちはほぼ[3]日、遊具広場に行きたがります」と住民のトム・バレット氏は語った。市当局は、改修された公園が年間10万人以上の来園者を[4]と見込んでいる。',
    blanks: [
      {
        no: 1,
        choices: [
          'Hundreds of residents gathered on Saturday to celebrate the reopening of Riverton Central Park.',
          'The city council election will be held in November.',
          'Riverton\'s population has declined in recent years.',
          'A new shopping mall opened downtown last month.',
        ],
        answer: 0,
        explanation:
          '文挿入問題。記事の第1文であり、直後の The improvements（この改修）が指す内容が必要だ。公園の再オープンを祝う住民の集まりを伝える文が導入として最も自然である。',
      },
      {
        no: 2,
        choices: ['while', 'until', 'since', 'before'],
        answer: 2,
        explanation:
          'had not been updated [2] it first opened「開園以来更新されていなかった」となる since（〜以来）が正解だ。nearly forty years ago という時の表現がヒントになる。',
      },
      {
        no: 3,
        choices: ['all', 'most', 'any', 'every'],
        answer: 3,
        explanation:
          '単数名詞 day の前に置いて「ほぼ毎日」という意味になる every が正解だ。all や most は複数名詞を伴う。',
      },
      {
        no: 4,
        choices: ['attract', 'to attract', 'attracting', 'attracted'],
        answer: 1,
        explanation:
          'expect A to do「Aが〜すると見込む」の形である。したがって to attract が正解だ。年間10万人以上の来園者を見込むという文意になる。',
      },
    ],
  },
  {
    id: 'p622',
    docType: 'メモ',
    passage:
      'MEMO\nTo: All Employees\nFrom: Accounting Department\nRe: Travel Expense Reports\n\nStarting next month, all travel expense reports must be submitted within ten business days of returning from a trip. Reports submitted after this deadline [1] additional approval from a department manager. Please attach original receipts for every expense [2] $25; smaller purchases may simply be listed on the form. [3]. Employees who travel frequently are [4] encouraged to attend, as the new reporting software will be demonstrated in detail. Please contact accounting@delmarco.com with any questions.',
    passageJa:
      '社内メモ\n宛先: 全社員\n差出人: 経理部\n件名: 出張旅費報告書について\n\n来月より、すべての出張旅費報告書は出張から戻ってから10営業日以内に提出してください。この期限を過ぎて提出された報告書には、部門長の追加承認が[1]。25ドル[2]の支出には領収書の原本を添付してください。それより少額の購入は用紙に記載するだけで構いません。[3]。新しい報告ソフトが詳しく実演されるため、出張の多い社員は[4]参加を推奨されます。ご質問は accounting@delmarco.com までご連絡ください。',
    blanks: [
      {
        no: 1,
        choices: ['requires', 'will require', 'requiring', 'to require'],
        answer: 1,
        explanation:
          '来月から始まる新ルールについて述べているため、未来を表す will require が正解だ。Starting next month という冒頭の表現がヒントになる。',
      },
      {
        no: 2,
        choices: ['over', 'among', 'minus', 'versus'],
        answer: 0,
        explanation:
          '「25ドルを超える支出には領収書の原本を添付する」という意味になる over（〜を超える）が正解だ。直後の smaller purchases（それより少額の購入）との対比からも判断できる。',
      },
      {
        no: 3,
        choices: [
          'Receipts should be thrown away after submission.',
          'The accounting department is on the fifth floor.',
          'Airfare prices have increased this year.',
          'A training session on the new system will be held on May 6.',
        ],
        answer: 3,
        explanation:
          '文挿入問題。直後の文に「出張の多い社員は特に参加を勧められる」とあるため、参加の対象となる出来事、すなわち「新システムの研修会が5月6日に開かれる」という文が必要だ。',
      },
      {
        no: 4,
        choices: ['rarely', 'tightly', 'especially', 'evenly'],
        answer: 2,
        explanation:
          '出張が多い社員は新しい報告システムを使う機会も多いため、「特に」参加が推奨されるという意味になる especially が正解だ。',
      },
    ],
  },
  {
    id: 'p623',
    docType: '求人広告',
    passage:
      'WAREHOUSE SUPERVISOR — NORTHGATE LOGISTICS\n\nNorthgate Logistics is seeking a warehouse supervisor for its distribution center in Deleford. The supervisor will oversee a team of fifteen workers, monitor inventory levels, and ensure that all shipments leave the facility [1] schedule. [2]. Applicants must have at least three years of warehouse experience, and a forklift certification is [3] required. The role involves occasional evening shifts, [4] which an additional allowance is paid. To apply, visit www.northgatelogistics.com/careers and submit an application by July 20.',
    passageJa:
      '倉庫スーパーバイザー募集 — ノースゲート・ロジスティクス\n\nノースゲート・ロジスティクスでは、デルフォードの物流センターで働く倉庫スーパーバイザーを募集しています。スーパーバイザーは15名のチームを統括し、在庫水準を管理し、すべての出荷が予定[1]に施設を出るようにします。[2]。応募者には3年以上の倉庫勤務経験が必須で、フォークリフトの資格[3]必要です。この職には時折の夜間シフトがあり、それに[4]追加手当が支払われます。応募は7月20日までに www.northgatelogistics.com/careers からお願いします。',
    blanks: [
      {
        no: 1,
        choices: ['in', 'by', 'on', 'with'],
        answer: 2,
        explanation:
          'on schedule「予定どおりに」という定型表現になる on が正解だ。すべての出荷が予定どおりに施設を出るようにするという職務内容である。',
      },
      {
        no: 2,
        choices: [
          'The warehouse was built near the harbor.',
          'Uniforms must be returned upon resignation.',
          'Deleford is a popular tourist destination.',
          'Strong communication skills are essential, as the supervisor works closely with drivers and office staff.',
        ],
        answer: 3,
        explanation:
          '文挿入問題。直前で職務内容を、直後で応募資格を述べているため、その間に求められる能力として「ドライバーや事務スタッフと密に連携するため高いコミュニケーション能力が不可欠」と続くのが自然だ。',
      },
      {
        no: 3,
        choices: ['also', 'once', 'soon', 'ever'],
        answer: 0,
        explanation:
          '倉庫勤務経験に加えてフォークリフトの資格「も」必要だという意味になる also が正解だ。and で応募条件が追加されている流れから判断する。',
      },
      {
        no: 4,
        choices: ['at', 'for', 'to', 'of'],
        answer: 1,
        explanation:
          '先行詞 evening shifts を受けた「前置詞＋関係代名詞」の形で、「そのシフトに対して追加手当が支払われる」という意味になる for which が正解だ。pay an allowance for〜の for である。',
      },
    ],
  },
  {
    id: 'p624',
    docType: 'プレスリリース',
    passage:
      'FOR IMMEDIATE RELEASE\n\nCalverton Foods and Miyara Beverages Announce Partnership\n\nCHICAGO — Calverton Foods, one of the nation\'s largest snack manufacturers, announced today that it has entered [1] a partnership with Miyara Beverages of Osaka, Japan. Under the agreement, Calverton will distribute Miyara\'s popular green tea drinks in North American supermarkets [2] early next year. "This partnership [3] our long-term goal of offering healthier choices to consumers," said Calverton president Dana Wells. [4]. A joint press conference is scheduled to take place in Chicago on November 3.',
    passageJa:
      '報道関係者各位（即時解禁）\n\nカルバートン・フーズとミヤラ・ビバレッジズが提携を発表\n\nシカゴ発 — 全米最大級のスナック菓子メーカー、カルバートン・フーズは本日、日本の大阪に本社を置くミヤラ・ビバレッジズと提携を[1]と発表した。契約に基づき、カルバートンは来年初め[2]、ミヤラの人気の緑茶飲料を北米のスーパーマーケットで販売する。「この提携は、消費者により健康的な選択肢を提供するという当社の長期目標を[3]ものです」とカルバートンのダナ・ウェルズ社長は述べた。[4]。合同記者会見は11月3日にシカゴで開催される予定だ。',
    blanks: [
      {
        no: 1,
        choices: ['onto', 'upon', 'across', 'into'],
        answer: 3,
        explanation:
          'enter into a partnership「提携を結ぶ」という定型表現である。契約や協定を「結ぶ」場合の enter into が正解だ。',
      },
      {
        no: 2,
        choices: ['begin', 'begins', 'beginning', 'begun'],
        answer: 2,
        explanation:
          '「来年初めから」という開始時期を表す分詞 beginning（= starting）が正解だ。beginning early next year で「来年初めを開始時期として」という意味になる。',
      },
      {
        no: 3,
        choices: ['delays', 'supports', 'removes', 'divides'],
        answer: 1,
        explanation:
          '「この提携は、より健康的な選択肢を提供するという当社の長期目標を支える」という意味になる supports が正解だ。社長の前向きなコメントという文脈から判断する。',
      },
      {
        no: 4,
        choices: [
          'Financial terms of the agreement were not disclosed.',
          'Green tea was first imported to Chicago in 1900.',
          'Calverton\'s snack sales fell sharply last year.',
          'Mr. Wells will step down as president next week.',
        ],
        answer: 0,
        explanation:
          '文挿入問題。提携発表のプレスリリースでは、「契約の金銭的条件は公表されていない」と補足するのが定番の流れだ。他の選択肢は発表の趣旨と合わない。',
      },
    ],
  },
  {
    id: 'p625',
    docType: 'お知らせ',
    passage:
      'NOTICE TO RESIDENTS OF MAPLE COURT APARTMENTS\n\n[1]. The interruption is necessary so that crews can replace an aging pipe beneath the parking area. Work will begin at 9:00 A.M. and is expected to be finished [2] 4:00 P.M. the same day. Residents are advised [3] enough water for drinking and cooking before the work begins. Once service resumes, tap water may appear slightly cloudy for a short time; this is normal and is not [4] to your health. We appreciate your patience and understanding.\n\nBuilding Management',
    passageJa:
      'メープルコート・アパートメンツにお住まいの皆様へ\n\n[1]。この停止は、駐車場の下にある老朽化した配管を交換するために必要なものです。作業は午前9時に始まり、同日午後4時[2]終わる見込みです。作業開始前に、飲用・調理用の水を十分に[3]ことをおすすめします。供給再開後、水道水がしばらく少し濁って見えることがありますが、これは正常であり健康に[4]ではありません。皆様のご理解とご協力に感謝いたします。\n\n建物管理会社',
    blanks: [
      {
        no: 1,
        choices: [
          'Water service will be temporarily shut off on Tuesday, April 14.',
          'The fitness room will receive new equipment.',
          'Rent payments are due on the first of each month.',
          'A community barbecue will be held in the courtyard.',
        ],
        answer: 0,
        explanation:
          '文挿入問題。冒頭の文であり、直後の The interruption（この停止）が指す内容が必要だ。断水の予告である「4月14日（火）に水道の供給を一時停止する」が正解である。',
      },
      {
        no: 2,
        choices: ['on', 'by', 'to', 'in'],
        answer: 1,
        explanation:
          '「同日午後4時までに終わる見込み」という完了の期限を表す by が正解だ。作業の開始時刻と対で終了の見込みを示している。',
      },
      {
        no: 3,
        choices: ['store', 'storing', 'to store', 'stored'],
        answer: 2,
        explanation:
          'advise A to do「Aに〜するよう勧める」の受動態 be advised to do の形である。したがって to store が正解だ。',
      },
      {
        no: 4,
        choices: ['grateful', 'capable', 'familiar', 'harmful'],
        answer: 3,
        explanation:
          '「濁りは正常なもので健康に有害ではない」という意味になる harmful が正解だ。直前の this is normal が住民を安心させる文脈であることを示している。',
      },
    ],
  },
  {
    id: 'p626',
    docType: 'Eメール',
    passage:
      'Dear Valued Customer,\n\nThank you for shopping at Orion Electronics. Our records show that you recently purchased a wireless speaker from our online store. We would appreciate it if you could take a few minutes to share your opinion of your shopping [1]. Your feedback helps us improve both our products and our delivery service. The survey [2] of ten short questions and takes less than five minutes to complete. [3]. Simply click the link below to begin. We thank you [4] advance for your time.\n\nCustomer Relations Team\nOrion Electronics',
    passageJa:
      'お客様各位\n\nオリオン・エレクトロニクスをご利用いただきありがとうございます。当社の記録によると、お客様は最近オンラインストアでワイヤレススピーカーをご購入されました。数分のお時間をいただき、お買い物[1]についてのご意見をお聞かせいただければ幸いです。皆様のご意見は、製品と配送サービスの両方の改善に役立ちます。アンケートは10問の短い質問で[2]、5分以内で完了します。[3]。下のリンクをクリックするだけで開始できます。お時間をいただけることに[4]感謝いたします。\n\nカスタマーリレーションズチーム\nオリオン・エレクトロニクス',
    blanks: [
      {
        no: 1,
        choices: ['appearance', 'allowance', 'experience', 'insurance'],
        answer: 2,
        explanation:
          'shopping experience「買い物体験」という定型表現になる experience が正解だ。購入後のアンケート依頼という文脈から判断する。',
      },
      {
        no: 2,
        choices: ['consisting', 'consists', 'consist', 'to consist'],
        answer: 1,
        explanation:
          '主語は The survey（単数）で、文の述語動詞が必要だ。consist of〜「〜から成る」の三人称単数現在 consists が正解である。',
      },
      {
        no: 3,
        choices: [
          'As a thank-you, participants will receive a coupon for 15 percent off their next order.',
          'The speaker is available in three colors.',
          'Our store hours will change in December.',
          'Delivery drivers are required to wear uniforms.',
        ],
        answer: 0,
        explanation:
          '文挿入問題。アンケートへの協力を依頼する流れなので、回答を促す特典として「お礼に次回注文が15％割引になるクーポンを進呈する」が最も自然だ。',
      },
      {
        no: 4,
        choices: ['for', 'on', 'at', 'in'],
        answer: 3,
        explanation:
          'in advance「前もって」という定型表現である。thank you in advance「あらかじめ感謝します」となる in が正解だ。',
      },
    ],
  },
  {
    id: 'p627',
    docType: '社内通知',
    passage:
      'ATTENTION ALL PERSONNEL\n\nBeginning Monday, October 5, the company will introduce a new electronic badge system at all building entrances. Employees must scan their badges [1] entering or leaving the premises, even outside regular business hours. [2]. Photos for the new badges will be taken in Conference Room 1B between September 21 and September 25. Current badges will remain [3] until the end of October, after which they will no longer open any doors. Employees [4] badges are lost or damaged should contact the security office immediately.',
    passageJa:
      '全職員への通知\n\n10月5日（月）より、当社はすべての建物入口に新しい電子入館証システムを導入します。社員は、通常の営業時間外であっても、敷地に出入りする[1]に入館証をスキャンしなければなりません。[2]。新しい入館証用の写真撮影は、9月21日から9月25日の間に会議室1Bで行います。現在の入館証は10月末まで[3]なままですが、その後はどのドアも開かなくなります。入館証を紛失または破損した[4]社員は、直ちに警備室に連絡してください。',
    blanks: [
      {
        no: 1,
        choices: ['during', 'when', 'among', 'until'],
        answer: 1,
        explanation:
          '「敷地に出入りする際に」という意味の接続詞 when が正解だ。when の後ろでは主語と be 動詞（they are）が省略されている。during は前置詞なのでこの形では使えない。',
      },
      {
        no: 2,
        choices: [
          'The old badges were introduced in 2010.',
          'Visitors may park in any available space.',
          'The security office will be closed during October.',
          'The upgrade is intended to improve building security and simplify visitor management.',
        ],
        answer: 3,
        explanation:
          '文挿入問題。新しい入館証システムの導入を告知した直後なので、その目的を説明する「この更新はビルの安全性向上と来訪者管理の簡素化が目的だ」が自然に続く。警備室の閉鎖は最終文の指示と矛盾する。',
      },
      {
        no: 3,
        choices: ['valid', 'vacant', 'visible', 'various'],
        answer: 0,
        explanation:
          'remain valid「有効なままである」という意味になる valid が正解だ。直後の「その後はどのドアも開かなくなる」という説明との対比から判断できる。',
      },
      {
        no: 4,
        choices: ['who', 'which', 'whose', 'whom'],
        answer: 2,
        explanation:
          '先行詞 Employees と badges の間に所有関係（社員の入館証）があるため、所有格の関係代名詞 whose が正解だ。',
      },
    ],
  },
  {
    id: 'p628',
    docType: '広告',
    passage:
      'SPARKLE PRO CLEANING SERVICES\n\nIs your office too busy to keep clean? Sparkle Pro has provided [1] cleaning services to businesses across the Fairmont area for over a decade. Our trained staff can clean your workspace daily, weekly, or monthly, [2] on your needs and budget. We use only environmentally friendly products that are safe for both people and pets, and our supervisors inspect every job to make sure high standards [3]. [4]. Call 555-0142 today for a free estimate, and mention this advertisement to receive 20 percent off your first month of service.',
    passageJa:
      'スパークル・プロ清掃サービス\n\nオフィスが忙しすぎて清掃まで手が回らないとお困りですか？スパークル・プロは10年以上にわたり、フェアモント地域の企業に[1]な清掃サービスを提供してきました。訓練を受けたスタッフが、お客様のニーズと予算[2]、毎日・毎週・毎月のいずれかの頻度で職場を清掃します。人にもペットにも安全な環境配慮型の洗剤のみを使用し、高い基準が[3]よう、監督者がすべての作業を点検します。[4]。今すぐ555-0142にお電話いただき、無料見積もりをご依頼ください。この広告を見たとお伝えいただくと、初月のサービスが20％割引になります。',
    blanks: [
      {
        no: 1,
        choices: ['spacious', 'portable', 'previous', 'reliable'],
        answer: 3,
        explanation:
          '10年以上にわたり企業にサービスを提供してきたという実績を示す文脈なので、「信頼できる」清掃サービスという意味になる reliable が正解だ。',
      },
      {
        no: 2,
        choices: ['depending', 'depended', 'depends', 'dependent'],
        answer: 0,
        explanation:
          'depending on〜「〜に応じて」という定型表現である。清掃の頻度が顧客のニーズと予算に応じて選べるという文意に合う。',
      },
      {
        no: 3,
        choices: ['meet', 'are met', 'have met', 'meeting'],
        answer: 1,
        explanation:
          '主語は high standards で、基準は「満たされる」側なので受動態 are met が正解だ。meet high standards「高い基準を満たす」の受動形である。',
      },
      {
        no: 4,
        choices: [
          'Our office furniture is imported from Italy.',
          'The Fairmont area has many parks.',
          'References from satisfied clients are available upon request.',
          'Employees must submit time sheets every Friday.',
        ],
        answer: 2,
        explanation:
          '文挿入問題。サービスの品質を宣伝した直後なので、その裏付けとして「ご希望があれば満足いただいた顧客の推薦をご紹介できる」と続くのが自然だ。直後の見積もり案内への流れとも合う。',
      },
    ],
  },
  {
    id: 'p629',
    docType: '手紙',
    passage:
      'Dear Mr. Delgado,\n\n[1]. Unusually high demand during the holiday season has caused temporary delays at our distribution center. Your order, [2] two desk lamps and an office chair, is now scheduled to arrive on December 19. As an apology for the [3], we have added a $15 credit to your account, which may be used toward any future purchase. If you would prefer to cancel the order instead, please reply to this letter [4] December 12, and we will issue a full refund promptly.\n\nSincerely,\nRita Moreau\nCustomer Care Manager',
    passageJa:
      'デルガド様\n\n[1]。ホリデーシーズン中の異例の需要増により、当社の配送センターで一時的な遅延が発生しております。デスクランプ2点とオフィスチェア[2]お客様のご注文は、現在12月19日に到着する予定です。ご[3]のお詫びとして、お客様のアカウントに15ドルのクレジットを追加いたしました。今後のご購入にご利用いただけます。ご注文のキャンセルをご希望の場合は、12月12日[4]本状にご返信ください。速やかに全額を返金いたします。\n\n敬具\nリタ・モロー\nカスタマーケア・マネージャー',
    blanks: [
      {
        no: 1,
        choices: [
          'We are writing to inform you that your recent order will arrive later than expected.',
          'Thank you for applying for a position at our store.',
          'Your subscription has been successfully renewed.',
          'We are pleased to announce the opening of a new branch.',
        ],
        answer: 0,
        explanation:
          '文挿入問題。手紙の冒頭であり、直後に遅延の原因と新しい到着予定日が説明されているため、「ご注文の品の到着が予定より遅れることをお知らせする」という導入文が正解だ。',
      },
      {
        no: 2,
        choices: ['consists', 'consisted', 'consisting of', 'to consist'],
        answer: 2,
        explanation:
          'コンマに挟まれた挿入句で Your order を説明する分詞が必要だ。consisting of〜「〜から成る」が正解である。述語動詞は後ろの is scheduled なので、動詞の定形は入らない。',
      },
      {
        no: 3,
        choices: ['attendance', 'equipment', 'permission', 'inconvenience'],
        answer: 3,
        explanation:
          '配送遅延のお詫びとしてクレジットを付与するという文脈なので、「ご不便」という意味の inconvenience が正解だ。As an apology for the inconvenience は謝罪文の定型表現である。',
      },
      {
        no: 4,
        choices: ['during', 'by', 'among', 'until'],
        answer: 1,
        explanation:
          '返信という1回の動作の期限を表す by（〜までに）が正解だ。12月12日までに連絡すれば全額返金するという条件を示している。',
      },
    ],
  },
  {
    id: 'p630',
    docType: '案内文',
    passage:
      'VISITOR GUIDELINES — HARTWELL CERAMICS FACTORY TOUR\n\nThank you for joining a guided tour of the Hartwell Ceramics factory. For your safety, all visitors must wear the helmets and protective glasses [1] at the entrance. Comfortable, closed-toe shoes are strongly recommended, as the tour involves about one hour of walking. [2]. Photography is permitted in most areas; [3], please refrain from taking pictures in the design studio, where next season\'s products are developed. At the end of the tour, visitors may [4] discounted items at the factory shop located next to the main gate.',
    passageJa:
      '見学者向けガイドライン — ハートウェル製陶所工場見学\n\nハートウェル製陶所のガイド付き工場見学にご参加いただきありがとうございます。安全のため、すべての見学者は入口で[1]ヘルメットと保護メガネを着用しなければなりません。見学では約1時間歩くため、歩きやすいつま先の閉じた靴を強くおすすめします。[2]。撮影はほとんどのエリアで可能です。[3]、来季の製品が開発されているデザインスタジオでの撮影はお控えください。見学の最後には、正門横の工場直売店で割引商品を[4]ことができます。',
    blanks: [
      {
        no: 1,
        choices: ['provide', 'provided', 'providing', 'provision'],
        answer: 1,
        explanation:
          'helmets and protective glasses を後ろから修飾する分詞が必要だ。装備は「入口で提供される」という受動の関係なので過去分詞 provided が正解である。',
      },
      {
        no: 2,
        choices: [
          'The factory was founded by a famous painter.',
          'Tickets for the tour are nonrefundable.',
          'Please stay with your guide at all times during the visit.',
          'The design studio hires new artists every spring.',
        ],
        answer: 2,
        explanation:
          '文挿入問題。安全のための注意事項（ヘルメット着用、歩きやすい靴）が並ぶ流れなので、「見学中は常にガイドと一緒に行動してほしい」という注意が最も自然に続く。',
      },
      {
        no: 3,
        choices: ['moreover', 'therefore', 'likewise', 'however'],
        answer: 3,
        explanation:
          '「ほとんどの場所で撮影可能だが、デザインスタジオでは控えてほしい」という対照的な内容をつなぐ however が正解だ。セミコロンの後で逆接の副詞として使われている。',
      },
      {
        no: 4,
        choices: ['purchase', 'measure', 'announce', 'decrease'],
        answer: 0,
        explanation:
          'ツアーの最後に工場直売店で「割引商品を購入できる」という意味になる purchase が正解だ。factory shop（直売店）という語がヒントになる。',
      },
    ],
  },
];
