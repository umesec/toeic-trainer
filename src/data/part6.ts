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
];
