import type { Part7Set } from '@/data/types';

/**
 * TOEIC Part 7 トリプルパッセージ（5セット）
 */
export const TRIPLE_SETS: Part7Set[] = [
  // ── SET 1 ── 広告 + Eメール + レビュー ──────────────────────────────
  {
    id: 'p7t01',
    passages: [
      {
        docType: '広告',
        text: 'HomeBrewShop — NEW ARRIVAL\n\nBrewMaster Pro Coffee Maker\nUpgrade your morning routine with the BrewMaster Pro, our most advanced coffee maker yet.\n\nKey Features:\n- 12-cup programmable brewing\n- Built-in burr grinder for freshly ground beans\n- Keep-warm plate maintains temperature for up to 4 hours\n- Easy-to-clean removable parts\n\nRegular Price: $80.00\nSpecial Offer: Use code BREW10 at checkout to receive 10% off your order.\n\nOrder now at www.homebrewshop.com\nFree shipping is available on all orders exceeding $50.\nAll BrewMaster Pro units are backed by a 1-year limited warranty.\n\nFor product inquiries, call 1-800-555-0193.',
        textJa: 'HomeBrewShop — 新発売\n\nBrewMaster Pro コーヒーメーカー\n最先端コーヒーメーカー「BrewMaster Pro」で毎朝のルーティンをアップグレードしましょう。\n\n主な特長：\n- 12カップ対応プログラマブル機能\n- フレッシュな豆を挽けるバーグラインダー内蔵\n- 最長4時間の保温機能\n- 洗いやすい着脱パーツ\n\n通常価格：$80.00\n特別割引：チェックアウト時にコード「BREW10」を入力すると10%割引。\n\nご注文はwww.homebrewshop.comにて。\n$50以上のご注文で送料無料。\nBrewMaster Pro全機種に1年間の限定保証付き。\n\n製品に関するお問い合わせは1-800-555-0193まで。',
      },
      {
        docType: 'Eメール',
        text: 'From: sarah.thompson@email.com\nTo: support@homebrewshop.com\nDate: March 20\nSubject: Warranty Claim — Order #HBS-20240305\n\nDear Customer Support Team,\n\nI am writing to report a problem with the BrewMaster Pro coffee maker I purchased from your website on March 5. At checkout, I applied the promotional code BREW10 as advertised.\n\nUnfortunately, after only two weeks of regular use, the machine has stopped heating water to the proper temperature. As a result, the coffee produced is lukewarm rather than hot.\n\nSince the product is still within the 1-year warranty period, I would like to request a replacement unit. My order number is HBS-20240305. Please advise on the next steps I should take.\n\nI look forward to your prompt response.\n\nSincerely,\nSarah Thompson',
        textJa: '差出人：sarah.thompson@email.com\n宛先：support@homebrewshop.com\n日付：3月20日\n件名：保証請求 — 注文番号 #HBS-20240305\n\nカスタマーサポートチームの皆様、\n\n3月5日に貴サイトで購入したBrewMaster Proコーヒーメーカーについてご連絡しております。チェックアウト時には広告に掲載のプロモコード「BREW10」を適用しました。\n\n残念ながら、通常使用を始めてわずか2週間で、本機がお湯を適切な温度まで加熱しなくなりました。その結果、コーヒーがぬるい状態で出てしまいます。\n\n製品はまだ1年間の保証期間内ですので、交換品をご請求したく存じます。注文番号はHBS-20240305です。次のステップについてご案内いただけますでしょうか。\n\n迅速なご返答をお待ちしております。\n\n敬具\nSarah Thompson',
      },
      {
        docType: 'レビュー',
        text: 'Rating: 3 out of 5 — Posted by S. Thompson, April 8\nVerified Purchase\n\nI want to share a mixed experience with the BrewMaster Pro. After only two weeks of use, the machine stopped producing hot coffee. I contacted customer support via email and was pleased to find that they responded within one business day. A replacement unit was shipped and arrived within three business days at no additional cost.\n\nThe replacement machine has been working without any issues for the past three weeks. I am cautiously optimistic that this unit will prove more reliable. The coffee it produces is excellent when the machine is functioning correctly.\n\nI am giving this product three stars: points deducted for the initial product failure, and credit given for the responsive customer service that resolved the issue promptly.',
        textJa: '評価：5点中3点 — 投稿者：S. Thompson、4月8日\n購入確認済み\n\nBrewMaster Proについて賛否両論の体験をご報告します。使用開始からわずか2週間で、本機がホットコーヒーを淹れられなくなりました。メールでカスタマーサポートに連絡したところ、1営業日以内に返答があり安心しました。追加費用なしで交換品が発送され、3営業日以内に届きました。\n\n交換品はこの3週間、何の問題もなく動作しています。今後もこの機種が安定して使えることを期待しています。正常に動作しているときのコーヒーは絶品です。\n\nこの製品に3つ星を付けます。初期不良で評価を下げつつ、問題を迅速に解決してくれたカスタマーサービスに加点しました。',
      },
    ],
    questions: [
      {
        q: 'What is NOT mentioned in the HomeBrewShop advertisement?',
        choices: [
          'A promotional discount code',
          'A return policy',
          'A one-year warranty',
          'A free shipping offer',
        ],
        answer: 1,
        explanation: 'NOT問題。割引コード（BREW10）・1年保証・送料無料条件はいずれも広告に明記されている。返品ポリシーについては一切言及がないため、(B) "A return policy" が正解である。',
      },
      {
        q: 'Based on the advertisement and Ms. Thompson\'s email, how much did she most likely pay for the BrewMaster Pro?',
        choices: [
          '$80.00',
          '$75.00',
          '$78.00',
          '$72.00',
        ],
        answer: 3,
        explanation: '複数文書参照問題。広告には定価$80.00と「コードBREW10で10%割引」と記載されており、メールにはThompson氏がBREW10を使用したとある。$80.00 × 0.9 = $72.00 となるため、(D) が正解である。',
      },
      {
        q: 'Why did Ms. Thompson contact the customer support team?',
        choices: [
          'To report a malfunction and request a replacement',
          'To inquire about the status of her shipment',
          'To ask how to use the promotional code',
          'To request an extension of the warranty period',
        ],
        answer: 0,
        explanation: 'メール本文に「the machine has stopped heating water … I would like to request a replacement unit」とある。不具合を報告して交換品を求めたのが目的であり、(A) が正解である。',
      },
      {
        q: 'What can be inferred from the review posted by S. Thompson?',
        choices: [
          'She received a full refund for her purchase.',
          'She had the machine repaired at a local service center.',
          'She was sent a new unit after contacting customer support.',
          'She returned the product to a physical store.',
        ],
        answer: 2,
        explanation: '推測問題（メール＋レビューの複数文書参照）。レビューに「A replacement unit was shipped and arrived within three business days」とある。メールでThompson氏が交換を要請したことと合わせると、サポートへの連絡後に交換品が届いたと推測できる。(C) が正解である。',
      },
      {
        q: 'According to the review, what rating did S. Thompson give the BrewMaster Pro?',
        choices: [
          'Two out of five',
          'Three out of five',
          'Four out of five',
          'Five out of five',
        ],
        answer: 1,
        explanation: 'レビュー冒頭に「Rating: 3 out of 5」と明記されている。(B) "Three out of five" が正解である。',
      },
    ],
  },

  // ── SET 2 ── お知らせ + 申込フォーム + 確認メール ──────────────────────
  {
    id: 'p7t02',
    passages: [
      {
        docType: 'お知らせ',
        text: 'WESTGATE CORPORATION\nInternal Notice\n\nTo: All Staff\nFrom: Human Resources Department\nDate: August 8\nRe: Professional Development Workshop — Registration Open\n\nWe are pleased to announce that the Effective Business Communication Workshop will be held on Tuesday, September 9, from 9:00 A.M. to 5:00 P.M. at the Riverside Conference Center, Room 204.\n\nThis workshop is open to all employees at the supervisor level and above. The session will be facilitated by an external consultant and will cover written communication, presentation skills, and cross-departmental collaboration.\n\nRegistration is limited to 20 participants. To secure your place, please complete the registration form on the company intranet and submit it no later than Monday, August 25.\n\nFor further information, contact the HR Department at extension 305.',
        textJa: 'ウェストゲート・コーポレーション\n社内通知\n\n宛先：全スタッフ\n差出人：人事部\n日付：8月8日\n件名：専門能力開発ワークショップ — 参加受付開始\n\n9月9日（火）午前9時から午後5時まで、リバーサイド会議センター204号室にてビジネスコミュニケーション向上ワークショップを開催いたします。\n\nこのワークショップはスーパーバイザー以上の全従業員を対象としています。外部コンサルタントが進行し、文書コミュニケーション・プレゼンテーションスキル・部門横断的な協働をテーマに扱います。\n\n定員は20名です。参加枠を確保するには、社内イントラネットの申込フォームに必要事項を記入し、8月25日（月）までに提出してください。\n\n詳細については、内線305の人事部にお問い合わせください。',
      },
      {
        docType: '申込フォーム',
        text: 'WESTGATE CORPORATION\nProfessional Development Workshop — Registration Form\n\nDate Submitted: August 22\n\nFull Name: Daniel Park\nDepartment: Marketing\nJob Title: Marketing Manager\nEmployee ID: WG-4471\nYears with Company: 6\n\nWorkshop Selection: Effective Business Communication (September 9)\n\nDietary Requirements: Vegetarian\n\nEmergency Contact Name: Karen Park\nEmergency Contact Phone: 555-0187\n\nI confirm that I have obtained approval from my direct supervisor to attend this event.\n\nSignature: D. Park',
        textJa: 'ウェストゲート・コーポレーション\n専門能力開発ワークショップ — 申込フォーム\n\n提出日：8月22日\n\n氏名：Daniel Park\n部署：マーケティング\n役職：マーケティングマネージャー\n社員ID：WG-4471\n勤続年数：6年\n\nワークショップ選択：ビジネスコミュニケーション向上（9月9日）\n\n食事に関する特別要望：ベジタリアン対応\n\n緊急連絡先氏名：Karen Park\n緊急連絡先電話番号：555-0187\n\n私は直属の上司から本イベントへの参加承認を得ていることを確認します。\n\n署名：D. Park',
      },
      {
        docType: '確認メール',
        text: 'From: hr@westgate-corp.com\nTo: d.park@westgate-corp.com\nDate: August 23\nSubject: Workshop Registration Confirmed — September 9\n\nDear Mr. Park,\n\nWe are pleased to confirm your registration for the Effective Business Communication Workshop on September 9.\n\nPlease note that due to a scheduling conflict, the venue has been relocated from Room 204 to Room 210 at the Riverside Conference Center. All other details, including the start time of 9:00 A.M. and the full-day format, remain unchanged.\n\nLunch will be provided at no additional cost. As you indicated a vegetarian preference on your registration form, a vegetarian meal will be prepared for you.\n\nPlease arrive by 8:45 A.M. to allow time for check-in. Parking is available in Lot B adjacent to the conference center.\n\nIf you have any questions, please contact the HR Department at extension 305.\n\nBest regards,\nHuman Resources Department\nWestgate Corporation',
        textJa: '差出人：hr@westgate-corp.com\n宛先：d.park@westgate-corp.com\n日付：8月23日\n件名：ワークショップ登録確認 — 9月9日\n\nPark様\n\n9月9日開催のビジネスコミュニケーション向上ワークショップへのご登録を確認いたしました。\n\nスケジュールの都合により、会場がリバーサイド会議センターの204号室から210号室に変更となりましたのでご注意ください。開始時刻の午前9時および終日開催形式など、その他の詳細は変更ありません。\n\n昼食は追加費用なしでご提供いたします。申込フォームにベジタリアンとご記入いただきましたので、ベジタリアン対応の食事をご用意いたします。\n\n登録受付のため、午前8時45分までにご到着ください。会議センター隣接のBロットに駐車場がございます。\n\nご不明な点がございましたら、内線305の人事部までお問い合わせください。\n\n敬具\n人事部\nウェストゲート・コーポレーション',
      },
    ],
    questions: [
      {
        q: 'Which of the following is NOT mentioned in the notice?',
        choices: [
          'The registration deadline',
          'The maximum number of participants',
          'Whether lunch will be provided',
          'The location of the workshop',
        ],
        answer: 2,
        explanation: 'NOT問題。登録締切（8月25日）・定員（20名）・会場（リバーサイド会議センター204号室）はお知らせに明記されている。昼食の提供については確認メールに記載されているが、お知らせには一切言及がない。(C) が正解である。',
      },
      {
        q: 'What special requirement did Mr. Park indicate on his registration form?',
        choices: [
          'A vegetarian meal',
          'A wheelchair-accessible seat',
          'An early departure from the session',
          'A bilingual handout',
        ],
        answer: 0,
        explanation: '申込フォームの「Dietary Requirements: Vegetarian」より、ベジタリアン対応の食事を要望していることがわかる。(A) が正解である。',
      },
      {
        q: 'Based on the notice and the confirmation email, what change was made to the workshop arrangements?',
        choices: [
          'The date of the workshop was postponed.',
          'The workshop was changed to a half-day event.',
          'The registration deadline was extended.',
          'The room assignment was updated from 204 to 210.',
        ],
        answer: 3,
        explanation: '複数文書参照問題。お知らせには会場が「Room 204」と記載されているが、確認メールには「the venue has been relocated from Room 204 to Room 210」とある。部屋番号が変更されたため、(D) が正解である。',
      },
      {
        q: 'According to the confirmation email, what should Mr. Park do before the workshop begins?',
        choices: [
          'Contact HR to reconfirm his dietary requirements.',
          'Arrive at the venue 15 minutes before the scheduled start time.',
          'Submit a pre-workshop assessment form.',
          'Bring his own lunch due to venue restrictions.',
        ],
        answer: 1,
        explanation: '確認メールに「Please arrive by 8:45 A.M.」とあり、ワークショップ開始時刻は9:00 A.M.である。開始の15分前到着を求められているため、(B) が正解である。',
      },
      {
        q: 'Based on the notice and the registration form, why is Mr. Park eligible to attend the workshop?',
        choices: [
          'He submitted his form before the registration deadline.',
          'He has worked for Westgate Corporation for more than five years.',
          'His job title meets the participant eligibility requirement stated in the notice.',
          'He received special approval from the HR Department.',
        ],
        answer: 2,
        explanation: '複数文書参照問題（推測）。お知らせには「supervisor level and above」が対象と明記されており、申込フォームにはPark氏の役職が「Marketing Manager」と記載されている。管理職レベルを満たすことが参加資格の根拠であるため、(C) が正解である。(A)も事実だが参加資格の根拠ではない。',
      },
    ],
  },

  // ── SET 3 ── 求人広告 + 履歴書抜粋 + 面接日程メール ──────────────────
  {
    id: 'p7t03',
    passages: [
      {
        docType: '求人広告',
        text: 'BRIGHTWAY TECHNOLOGIES\nJoin Our Growing Team!\n\nPosition: Senior Software Engineer\nLocation: Austin, Texas (Hybrid — 3 days in office per week)\nEmployment Type: Full-Time\n\nAbout the Role:\nBrightway Technologies is seeking an experienced Senior Software Engineer to join our Product Development team. The successful candidate will design and maintain scalable cloud-based applications.\n\nRequirements:\n- Bachelor\'s degree in Computer Science or a related field\n- Minimum 5 years of software development experience\n- Proficiency in Python and JavaScript\n- Hands-on experience with cloud platforms (AWS or Azure preferred)\n- Excellent written and verbal communication skills\n\nCompensation: $90,000 – $110,000 per year\nBenefits: Comprehensive health insurance, 401(k) with company matching, 15 days paid time off\n\nApplication Deadline: June 30\nTo apply, send your resume and cover letter to: careers@brightway-tech.com',
        textJa: 'ブライトウェイ・テクノロジーズ\n成長中のチームに加わりましょう！\n\n職種：シニアソフトウェアエンジニア\n勤務地：テキサス州オースティン（ハイブリッド — 週3日出社）\n雇用形態：正社員\n\n業務内容：\nブライトウェイ・テクノロジーズは製品開発チームに加わる経験豊富なシニアソフトウェアエンジニアを募集しています。採用候補者はスケーラブルなクラウドベースアプリケーションの設計・保守を担当します。\n\n応募要件：\n- コンピュータサイエンスまたは関連分野の学士号\n- ソフトウェア開発経験5年以上\n- PythonおよびJavaScriptの習熟度\n- クラウドプラットフォーム（AWSまたはAzure優遇）の実務経験\n- 優れた文書・口頭コミュニケーション能力\n\n給与：年間$90,000〜$110,000\n福利厚生：総合医療保険・会社マッチング付き401(k)・有給休暇15日\n\n応募締切：6月30日\n応募はresumeとカバーレターをcareers@brightway-tech.comまで。',
      },
      {
        docType: '履歴書抜粋',
        text: 'Marcus Webb\nEmail: marcus.webb@email.com | Phone: 555-0142\n\nEDUCATION\nB.Sc. in Computer Science — State University, 2014\n\nPROFESSIONAL EXPERIENCE\n\nSenior Software Engineer\nNexus Solutions, Inc. | January 2021 – Present\n- Lead full-stack development projects using Python and JavaScript (React, Node.js)\n- Managed migration of legacy systems to Microsoft Azure cloud platform\n- Mentored a team of three junior engineers\n\nSoftware Engineer\nDataCore Inc. | May 2016 – December 2020\n- Developed Python-based backend services for data processing applications\n- Deployed and managed applications on Amazon Web Services (AWS)\n- Collaborated with cross-functional teams on product delivery\n\nTECHNICAL SKILLS\nPython, JavaScript, React, Node.js, AWS, Azure, Docker, Git\n\nReferences available upon request.',
        textJa: 'Marcus Webb\nEmail: marcus.webb@email.com | 電話：555-0142\n\n学歴\nコンピュータサイエンス学士 — 州立大学、2014年\n\n職歴\n\nシニアソフトウェアエンジニア\nNexus Solutions, Inc. | 2021年1月〜現在\n- PythonとJavaScript（React, Node.js）を使用したフルスタック開発プロジェクトのリード\n- レガシーシステムのMicrosoft Azureクラウドプラットフォームへの移行管理\n- ジュニアエンジニア3名のメンタリング\n\nソフトウェアエンジニア\nDataCore Inc. | 2016年5月〜2020年12月\n- データ処理アプリケーション向けPythonバックエンドサービスの開発\n- Amazon Web Services（AWS）上でのアプリケーションのデプロイと管理\n- 製品デリバリーにおける部門横断チームとの協働\n\n技術スキル\nPython、JavaScript、React、Node.js、AWS、Azure、Docker、Git\n\n推薦状：ご要望に応じてご提供いたします。',
      },
      {
        docType: '面接日程メール',
        text: 'From: hr@brightway-tech.com\nTo: marcus.webb@email.com\nDate: July 5\nSubject: Interview Invitation — Senior Software Engineer Position\n\nDear Mr. Webb,\n\nThank you for applying for the Senior Software Engineer position at Brightway Technologies. After reviewing your application, we are delighted to invite you to interview with our team.\n\nInterview Details:\nDate: Thursday, July 14\nTime: 10:00 A.M. – 11:30 A.M.\nFormat: Video conference (a link will be sent to you 24 hours in advance)\nInterviewer: Ms. Karen Liu, Head of Engineering\n\nPlease reply to this email to confirm your availability by Friday, July 8. If the proposed time is inconvenient, feel free to suggest an alternative time slot and we will do our best to accommodate you.\n\nWe look forward to speaking with you.\n\nBest regards,\nBrightway Technologies HR Team\ncareers@brightway-tech.com',
        textJa: '差出人：hr@brightway-tech.com\n宛先：marcus.webb@email.com\n日付：7月5日\n件名：面接のご案内 — シニアソフトウェアエンジニア職\n\nWebb様\n\nブライトウェイ・テクノロジーズのシニアソフトウェアエンジニア職にご応募いただきありがとうございます。書類選考の結果、ぜひ面接にお越しいただきたくご連絡いたします。\n\n面接詳細：\n日時：7月14日（木）\n時間：午前10時〜午前11時30分\n形式：ビデオ会議（URLは24時間前にお送りします）\n面接官：エンジニアリング責任者 Karen Liu様\n\n7月8日（金）までに、この日時の都合がつくかどうかをメールでご返答ください。ご提案の日時がご都合に合わない場合は、別の時間帯をご提案いただければ可能な限り対応いたします。\n\nご連絡をお待ちしております。\n\n敬具\nブライトウェイ・テクノロジーズ人事チーム\ncareers@brightway-tech.com',
      },
    ],
    questions: [
      {
        q: 'According to the job posting, what benefits are included in the compensation package?',
        choices: [
          'Health insurance, 401(k) matching, and paid time off',
          'Health insurance, a relocation allowance, and paid time off',
          'A 401(k) plan, flexible working hours, and health insurance',
          'Paid time off, dental insurance, and 401(k) matching',
        ],
        answer: 0,
        explanation: '求人広告に「Comprehensive health insurance, 401(k) with company matching, 15 days paid time off」と明記されている。転居手当・フレックス勤務・歯科保険はいずれも記載がない。(A) が正解である。',
      },
      {
        q: 'Based on the job posting and Mr. Webb\'s resume, which requirement does he appear to fulfill?',
        choices: [
          'He has exactly five years of software development experience.',
          'He holds a master\'s degree in Computer Science.',
          'He has practical experience with both AWS and Azure.',
          'He has not worked with Python or JavaScript.',
        ],
        answer: 2,
        explanation: '複数文書参照問題。求人広告には「AWS or Azure preferred」とある。履歴書を見ると、DataCore Inc.時代にAWSを、Nexus SolutionsにてAzureを使用していることが確認できる。両方の経験を持つため、(C) が正解である。',
      },
      {
        q: 'What does Mr. Webb need to do by July 8?',
        choices: [
          'Submit additional references to the HR team.',
          'Reply to confirm his availability for the interview.',
          'Prepare a technical presentation for the interview.',
          'Contact Ms. Liu directly to discuss the role.',
        ],
        answer: 1,
        explanation: '面接日程メールに「Please reply to this email to confirm your availability by Friday, July 8」とある。7月8日までに返信して都合を確認する必要があるため、(B) が正解である。',
      },
      {
        q: 'What can be inferred from the fact that Mr. Webb received an interview invitation dated July 5?',
        choices: [
          'He submitted his application on the last day of the deadline.',
          'Brightway Technologies extended its application deadline for him.',
          'The interview will take place at the company\'s Austin headquarters.',
          'Mr. Webb submitted his application before the June 30 deadline.',
        ],
        answer: 3,
        explanation: '複数文書参照問題（推測）。求人広告の応募締切は6月30日であり、面接招待メールは7月5日に発送されている。面接招待を受けた以上、Webb氏は締切までに応募書類を提出していたと推測できる。(D) が正解である。',
      },
      {
        q: 'Which of the following is NOT mentioned in the interview invitation email?',
        choices: [
          'The salary range to be discussed during the interview',
          'The name of the interviewer',
          'The format in which the interview will be conducted',
          'The deadline for Mr. Webb to confirm his availability',
        ],
        answer: 0,
        explanation: 'NOT問題。面接官名（Karen Liu）・形式（ビデオ会議）・確認期限（7月8日）は面接日程メールに記載されている。給与レンジについては一切言及がないため、(A) が正解である。',
      },
    ],
  },

  // ── SET 4 ── 記事 + 社内メモ + アンケート結果 ────────────────────────
  {
    id: 'p7t04',
    passages: [
      {
        docType: '記事',
        text: 'WORKLIFE TODAY\n\nRemote Work Becomes the Standard in Corporate America\nBy Staff Reporter | Published: September 15\n\nA new study by the WorkLife Institute reveals that 68 percent of U.S. companies now offer hybrid work options, a figure that has nearly doubled since 2020. The research, which surveyed 1,200 companies across various industries, found that employee productivity increased by an average of 12 percent in hybrid work environments compared to fully in-office settings.\n\nEmployee retention rates also saw a notable improvement. Companies that implemented flexible work policies reported a 23 percent decrease in voluntary staff turnover compared to those maintaining traditional office-only models.\n\nHowever, the study identified several challenges. Communication gaps between remote and in-office employees were cited as the most common difficulty, followed by challenges in onboarding new hires effectively.\n\nWorkplace experts recommend that companies adopting hybrid models establish clear written guidelines for remote work eligibility and maintain regular team check-ins to preserve a sense of cohesion.',
        textJa: 'ワークライフ・トゥデイ\n\nリモートワークが米国企業の新標準に\n記者：編集部 | 発行：9月15日\n\nワークライフ研究所の新しい調査によると、現在68%の米国企業がハイブリッド勤務オプションを提供しており、この数字は2020年以来ほぼ2倍に増加した。1,200社以上の多様な業界企業を対象とした同調査では、ハイブリッド勤務環境における従業員の生産性が完全出社と比較して平均12%向上したことが判明した。\n\n従業員定着率も顕著な改善を見せた。柔軟な勤務制度を導入した企業では、完全出社型モデルと比較して自発的な離職率が23%低下したと報告している。\n\nただし、調査ではいくつかの課題も明らかになった。リモートと出社の従業員間のコミュニケーションギャップが最も一般的な困難として挙げられ、次いで新入社員の効果的なオンボーディングにおける課題が続いた。\n\nハイブリッドモデルを採用する企業に対し、職場の専門家はリモート勤務の資格に関する明確なガイドラインを設け、チームの一体感を維持するために定期的なチームミーティングを実施することを推奨している。',
      },
      {
        docType: '社内メモ',
        text: 'HARTWELL & ASSOCIATES\nInternal Memorandum\n\nTo: All Staff\nFrom: Jennifer Walsh, Chief Operations Officer\nDate: October 3\nRe: New Hybrid Work Policy — Effective November 1\n\nEffective November 1, Hartwell & Associates will adopt a hybrid work model in alignment with evolving industry standards.\n\nPolicy Details:\n- Employees may work remotely for up to three days per week.\n- Core hours are 10:00 A.M. to 3:00 P.M. All staff must be available during these hours.\n- Remote work days must be pre-approved by your direct supervisor no later than the preceding Friday.\n- A one-time home office equipment stipend of $300 will be provided to eligible employees. To be eligible, employees must have been hired on or before October 1.\n- Attendance at the weekly all-hands meeting (Tuesdays, 9:00 A.M.) is mandatory regardless of work location.\n\nPlease submit any questions to hr@hartwell-associates.com by October 20.\n\nJennifer Walsh\nChief Operations Officer',
        textJa: 'ハートウェル・アンド・アソシエイツ\n社内メモ\n\n宛先：全スタッフ\n差出人：最高執行責任者 Jennifer Walsh\n日付：10月3日\n件名：新ハイブリッド勤務方針 — 11月1日施行\n\n11月1日より、ハートウェル・アンド・アソシエイツは業界の進化する標準に合わせてハイブリッド勤務モデルを採用します。\n\n方針詳細：\n- 従業員は週最大3日リモートワークが可能。\n- コアタイムは午前10時〜午後3時。全スタッフはこの時間帯に対応可能な状態を維持すること。\n- リモートワーク日は前週金曜日までに直属の上司の事前承認が必要。\n- 対象従業員には在宅勤務用機器として一回限りの$300補助金が支給される。対象は10月1日以前に入社した従業員のみ。\n- 週次の全体会議（毎週火曜日午前9時）への出席は勤務場所にかかわらず必須。\n\nご質問は10月20日までにhr@hartwell-associates.comにご連絡ください。\n\nJennifer Walsh\n最高執行責任者',
      },
      {
        docType: 'アンケート結果',
        text: 'HARTWELL & ASSOCIATES\nEmployee Survey: New Hybrid Work Policy\nConducted: October 10–14 | Respondents: 87 of 120 employees (73% response rate)\n\nQ1: Are you in favor of the new hybrid work policy?\nYes: 79% (69 respondents)\nNo: 14% (12 respondents)\nUndecided: 7% (6 respondents)\n\nQ2: Do you feel the policy guidelines are clearly communicated?\nYes: 61% (53 respondents)\nNo: 39% (34 respondents)\n\nQ3: Which aspect of the policy do you value most?\nFlexibility to choose work location: 54%\nReduced daily commute: 30%\nImproved work-life balance: 16%\n\nSelected Employee Comments:\nSeveral respondents noted that they were hired after October 1 and will therefore not qualify for the $300 equipment stipend. They expressed concern about being expected to set up a home office without financial assistance. One respondent suggested the company consider extending the stipend to all employees regardless of hire date.',
        textJa: 'ハートウェル・アンド・アソシエイツ\n従業員アンケート：新ハイブリッド勤務方針\n実施期間：10月10日〜14日 | 回答者数：120名中87名（回答率73%）\n\nQ1：新しいハイブリッド勤務方針に賛成ですか？\nはい：79%（69名）\nいいえ：14%（12名）\n未定：7%（6名）\n\nQ2：方針のガイドラインは明確に伝達されていると感じますか？\nはい：61%（53名）\nいいえ：39%（34名）\n\nQ3：この方針の中で最も評価する点はどれですか？\n勤務場所を選べる柔軟性：54%\n毎日の通勤が減る：30%\nワークライフバランスの向上：16%\n\n従業員コメント（一部抜粋）：\n複数の従業員が10月1日以降に入社したため$300の機器補助金の対象外となることを指摘し、財政的支援なしで在宅勤務環境を整えることへの懸念を示した。補助金の対象を全従業員に拡大するよう提案する回答者もいた。',
      },
    ],
    questions: [
      {
        q: 'Which of the following is NOT cited in the article as a finding related to hybrid work?',
        choices: [
          'A rise in employee productivity in hybrid settings',
          'An improvement in staff retention rates',
          'Difficulty in onboarding new employees',
          'A reduction in company operating costs',
        ],
        answer: 3,
        explanation: 'NOT問題。記事には生産性向上（12%）・定着率改善（23%）・新入社員オンボーディングの困難が明記されている。企業の運営コスト削減については一切言及がないため、(D) が正解である。',
      },
      {
        q: 'According to the memorandum, which employees are eligible for the equipment stipend?',
        choices: [
          'All employees who work from home more than twice a week',
          'Employees who joined the company on or before October 1',
          'Employees in managerial positions only',
          'Employees who have worked at the company for more than one year',
        ],
        answer: 1,
        explanation: '社内メモに「employees must have been hired on or before October 1」と明記されている。管理職や勤続年数は条件とされていない。(B) が正解である。',
      },
      {
        q: 'Which element of Hartwell & Associates\' new policy reflects the expert recommendations mentioned in the article?',
        choices: [
          'The limit of three remote work days per week',
          'The one-time equipment stipend of $300',
          'The mandatory weekly all-hands meeting',
          'The requirement for supervisor pre-approval of remote days',
        ],
        answer: 2,
        explanation: '複数文書参照問題。記事には「maintain regular team check-ins」という専門家の推奨が示されている。社内メモでは「毎週火曜日午前9時の全体会議（mandatory）」が設けられており、これが定期的なチェックインに相当する。(C) が正解である。',
      },
      {
        q: 'What can be inferred about the company\'s communication of the new policy based on the survey results?',
        choices: [
          'Further clarification may be needed, as a significant portion of employees found the guidelines unclear.',
          'The majority of employees oppose the hybrid work policy.',
          'All responding employees found the core hours arrangement acceptable.',
          'The equipment stipend was the top reason employees supported the policy.',
        ],
        answer: 0,
        explanation: '複数文書参照問題（推測）。アンケートでは39%の回答者がガイドラインは明確に伝達されていないと回答している。この数値から、方針の詳細についてさらなる説明が必要であると推測できる。(A) が正解である。',
      },
      {
        q: 'According to the survey, what percentage of respondents indicated they were in favor of the new hybrid work policy?',
        choices: [
          '7%',
          '14%',
          '61%',
          '79%',
        ],
        answer: 3,
        explanation: 'アンケート結果のQ1に「Yes: 79%（69 respondents）」と明記されている。(D) が正解である。',
      },
    ],
  },

  // ── SET 5 ── 会議アジェンダ + 議事録 + フォローアップメール ────────────
  {
    id: 'p7t05',
    passages: [
      {
        docType: '会議アジェンダ',
        text: 'MERIDIAN GROUP\nQ3 Strategy Meeting — Agenda\n\nDate: Wednesday, August 7\nTime: 2:00 P.M. – 4:00 P.M.\nLocation: Head Office, Conference Room B\nFacilitator: Angela Reeves, VP of Operations\n\nAgenda Items:\n1. Review of Q2 Sales Performance (2:00 – 2:30 P.M.)\n   Presenter: Tom Bradley, Director of Sales\n2. Q3 Marketing Budget Proposal (2:30 – 3:00 P.M.)\n   Presenter: Linda Cho, Marketing Manager\n3. New Product Launch Timeline (3:00 – 3:30 P.M.)\n   Presenter: James Park, Head of Product Development\n4. Client Feedback Analysis (3:30 – 4:00 P.M.)\n   Presenter: Rita Okafor, Director of Customer Relations\n\nNote: All department heads are requested to come prepared with their Q2 performance data.\n\nContact: a.reeves@meridian-group.com',
        textJa: 'メリディアン・グループ\n第3四半期戦略会議 — アジェンダ\n\n日時：8月7日（水）\n時間：午後2時〜午後4時\n場所：本社、会議室B\n進行：オペレーション担当副社長 Angela Reeves\n\n議題：\n1. 第2四半期売上実績レビュー（午後2:00〜2:30）\n   発表者：営業部長 Tom Bradley\n2. 第3四半期マーケティング予算案（午後2:30〜3:00）\n   発表者：マーケティングマネージャー Linda Cho\n3. 新製品発売スケジュール（午後3:00〜3:30）\n   発表者：製品開発責任者 James Park\n4. 顧客フィードバック分析（午後3:30〜4:00）\n   発表者：顧客関係部長 Rita Okafor\n\n注：全部門長は第2四半期の実績データを準備の上ご参加ください。\n\n連絡先：a.reeves@meridian-group.com',
      },
      {
        docType: '議事録',
        text: 'MERIDIAN GROUP\nQ3 Strategy Meeting — Minutes\n\nDate: August 7 | Time: 2:00 – 4:05 P.M.\nLocation: Conference Room B\nAttendees: Angela Reeves (VP Ops), Tom Bradley (Sales), Linda Cho (Marketing), James Park (Product Development), Rita Okafor (Customer Relations)\n\n1. Q2 Sales Review\nTom reported a 15% decline in product sales in the Northeast region. Key contributing factors were increased competition from new market entrants and delayed shipments due to supply chain disruptions.\nAction Item: Tom to prepare and distribute a detailed root-cause analysis report by August 14.\n\n2. Q3 Marketing Budget Proposal\nLinda proposed a 20% increase in the digital advertising budget. The proposal was approved in principle, pending final authorization from the CFO.\nAction Item: Linda to submit the revised budget proposal to CFO Kevin Morris by August 12.\n\n3. New Product Launch\nJames announced that Model X200 is scheduled for a full launch on October 15. A soft launch event for key clients will be held on October 10.\nNo action items recorded.\n\n4. Client Feedback\nRita presented results from a recent client satisfaction survey. Overall, 72% of clients rated the company\'s service as "Excellent." The primary area identified for improvement was response time to client inquiries.\nAction Item: Rita to develop a response time improvement plan for team review.\n\nNext Meeting: September 4',
        textJa: 'メリディアン・グループ\n第3四半期戦略会議 — 議事録\n\n日時：8月7日 | 時間：午後2:00〜4:05\n場所：会議室B\n出席者：Angela Reeves（VP Ops）、Tom Bradley（営業）、Linda Cho（マーケティング）、James Park（製品開発）、Rita Okafor（顧客関係）\n\n1. 第2四半期売上レビュー\nTomは北東部地域の製品売上が15%減少したと報告した。主な要因として、新規参入競合他社による競争激化とサプライチェーン混乱による出荷遅延が挙げられた。\nアクションアイテム：Tomは8月14日までに詳細な根本原因分析レポートを作成・配布すること。\n\n2. 第3四半期マーケティング予算案\nLindaはデジタル広告予算の20%増を提案した。提案はCFOによる最終承認を条件として原則承認された。\nアクションアイテム：Lindaは8月12日までに修正済み予算案をCFOのKevin Morrisに提出すること。\n\n3. 新製品発売\nJamesはModel X200が10月15日にフルローンチ予定であることを発表した。主要クライアント向けソフトローンチイベントは10月10日に開催予定。\nアクションアイテムなし。\n\n4. 顧客フィードバック\nRitaは最近の顧客満足度調査結果を発表した。全体として、72%のクライアントが同社のサービスを「優秀」と評価した。改善が必要な主な領域として顧客問い合わせへの対応時間が特定された。\nアクションアイテム：Ritaはチームレビュー用の対応時間改善計画を作成すること。\n\n次回会議：9月4日',
      },
      {
        docType: 'フォローアップメール',
        text: 'From: a.reeves@meridian-group.com\nTo: t.bradley@meridian-group.com; l.cho@meridian-group.com; j.park@meridian-group.com; r.okafor@meridian-group.com\nDate: August 8\nSubject: Follow-Up: Q3 Strategy Meeting — Action Items and Deadlines\n\nDear Team,\n\nThank you for your participation in yesterday\'s Q3 Strategy Meeting. Please find below a summary of all assigned action items and their respective deadlines.\n\nAction Items:\n1. Tom Bradley — Submit the detailed Q2 sales root-cause analysis for the Northeast region by August 14.\n2. Linda Cho — Submit the revised Q3 digital marketing budget proposal to CFO Kevin Morris by August 12.\n3. James Park — Prepare and distribute the Model X200 soft launch event invitation to the approved client contact list by August 20.\n4. Rita Okafor — Develop a response time improvement plan and share it with the full team by August 21.\n\nPlease note that items 1 and 2 have the earliest deadlines. If you anticipate any difficulty meeting your deadline, please contact me as soon as possible.\n\nBest regards,\nAngela Reeves\nVP of Operations, Meridian Group',
        textJa: '差出人：a.reeves@meridian-group.com\n宛先：t.bradley@meridian-group.com; l.cho@meridian-group.com; j.park@meridian-group.com; r.okafor@meridian-group.com\n日付：8月8日\n件名：フォローアップ：第3四半期戦略会議 — アクションアイテムと締切\n\nチームの皆さん、\n\n昨日の第3四半期戦略会議にご参加いただきありがとうございました。以下に、割り当てられた全アクションアイテムとその締切をまとめました。\n\nアクションアイテム：\n1. Tom Bradley — 8月14日までに北東部地域の第2四半期売上根本原因分析を提出。\n2. Linda Cho — 8月12日までに修正済み第3四半期デジタルマーケティング予算案をCFOのKevin Morrisに提出。\n3. James Park — 8月20日までに承認済みクライアントリストにModel X200ソフトローンチイベントの招待状を作成・配布。\n4. Rita Okafor — 8月21日までに対応時間改善計画を作成しチーム全員と共有。\n\nアイテム1と2が最も締切が早いことに注意してください。締切の達成が難しい場合は、できるだけ早急にご連絡ください。\n\n敬具\nAngela Reeves\nメリディアン・グループ オペレーション担当副社長',
      },
    ],
    questions: [
      {
        q: 'What is stated in the meeting agenda?',
        choices: [
          'All department heads are asked to bring their Q2 performance data.',
          'The meeting will be conducted via video conference.',
          'A final decision on the marketing budget will be made at the meeting.',
          'The meeting is scheduled to last three hours.',
        ],
        answer: 0,
        explanation: 'アジェンダ末尾に「All department heads are requested to come prepared with their Q2 performance data」と明記されている。会議は対面（会議室B）かつ2時間（2:00〜4:00）の予定であり、(B)(D)は誤りである。(A) が正解である。',
      },
      {
        q: 'Based on the minutes and the follow-up email, which action item assigned to Mr. Park in the follow-up email was NOT recorded in the meeting minutes?',
        choices: [
          'Reporting the Model X200 launch date to management',
          'Postponing the full launch date from October 15',
          'Distributing the soft launch event invitation to the client list',
          'Presenting a product demonstration at the soft launch',
        ],
        answer: 2,
        explanation: '複数文書参照問題。議事録ではJamesに対するアクションアイテムは「なし」と記録されている。一方、フォローアップメールには「Prepare and distribute the Model X200 soft launch event invitation … by August 20」という新たな具体的タスクが追加されている。(C) が正解である。',
      },
      {
        q: 'Which of the following was NOT discussed at the Q3 Strategy Meeting according to the minutes?',
        choices: [
          'A decline in sales in a particular region',
          'A proposal to increase the digital advertising budget',
          'Results from a client satisfaction survey',
          'Topics to be covered at the September 4 meeting',
        ],
        answer: 3,
        explanation: 'NOT問題。議事録には北東部地域の売上低下・デジタル広告予算増額の提案・顧客満足度調査の結果がいずれも記載されている。9月4日の次回会議については開催日のみ言及されており、議題については一切触れられていない。(D) が正解である。',
      },
      {
        q: 'What can be inferred about the Q3 digital marketing budget proposal after the meeting?',
        choices: [
          'It has been fully approved and will be implemented starting September 1.',
          'It still requires authorization from a company executive before it can be finalized.',
          'It was rejected and must be significantly reduced before resubmission.',
          'It will be put to a vote by all attendees at the next meeting.',
        ],
        answer: 1,
        explanation: '複数文書参照問題（推測）。議事録には「approved in principle, pending final authorization from the CFO」とあり、フォローアップメールではLindaに「CFO Kevin Morrisに提出」するよう指示している。これらから、予算案はCFOの最終承認を経るまで正式決定には至っていないと推測できる。(B) が正解である。',
      },
      {
        q: 'According to the follow-up email, by what date must Ms. Okafor complete her assigned task?',
        choices: [
          'August 12',
          'August 14',
          'August 21',
          'August 20',
        ],
        answer: 2,
        explanation: 'フォローアップメールの4番目のアクションアイテムに「Rita Okafor — … share it with the full team by August 21」と明記されている。(C) が正解である。',
      },
    ],
  },
];
