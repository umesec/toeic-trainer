import type { DictationItem, SoundChangeRule } from '@/data/types';

/**
 * 英語特有の音声変化ルールと実例集。
 * 音声はTTSで再生するため、実際の音声変化の再現度はOS音声に依存する。
 * 各例の audioUrl フィールドに録音音声を設定すれば将来差し替え可能。
 */
export const SOUND_CHANGE_RULES: SoundChangeRule[] = [
  {
    id: 'flap-t',
    name: 'フラップT',
    nameEn: 'Flap T',
    summary: '母音に挟まれた t が「ラ行/ダ行」のような音になる',
    description:
      'アメリカ英語では、強勢のある母音と弱い母音に挟まれた t は、舌先で軽くはじく「ラ行とダ行の中間」のような音（フラップ音）になります。water が「ワラー」、better が「ベラー」と聞こえるのはこのためです。単語の中だけでなく、get up のように単語をまたいでも起こります。TOEICのリスニングでは Part 2〜4 で頻出です。',
    examples: [
      { phrase: 'water', focus: 'water', literal: 'ウォーター', actual: 'ワーラー' },
      { phrase: 'better', focus: 'better', literal: 'ベター', actual: 'ベラー' },
      { phrase: 'letter', focus: 'letter', literal: 'レター', actual: 'レラー' },
      { phrase: 'Can you get it done by noon?', focus: 'get it', literal: 'ゲット イット', actual: 'ゲリッ(ト)', note: '単語をまたぐフラップT。get it → ゲリッ' },
      { phrase: 'Please shut it down before you leave.', focus: 'shut it', literal: 'シャット イット', actual: 'シャリッ(ト)' },
      { phrase: 'I need to get up early tomorrow.', focus: 'get up', literal: 'ゲット アップ', actual: 'ゲラップ' },
      { phrase: 'Put it on the table.', focus: 'Put it on', literal: 'プット イット オン', actual: 'プリロン', note: 'tが2連続でフラップ化し、さらに連結も起こる' },
      { phrase: 'The meeting starts at eight thirty.', focus: 'thirty', literal: 'サーティ', actual: 'サーリー', note: '数字の thirty/forty は聞き取りの落とし穴' },
      { phrase: 'We have a little bit of time.', focus: 'little bit of', literal: 'リトル ビット オブ', actual: 'リロー ビロヴ' },
    ],
  },
  {
    id: 'elision',
    name: '脱落（エリジョン）',
    nameEn: 'Elision',
    summary: '語尾の破裂音（t/d/p/k など）が発音されずに消える',
    description:
      '語尾の t, d, p, b, k, g などの破裂音は、次に子音が続くときや文末で、ほとんど発音されずに「飲み込まれる」ことがあります。good morning の d、next week の t などが典型です。音が完全に消えるというより「寸止め」される感覚で、直後に小さな間が残ります。聞こえない音を頭の中で補えるかがリスニングのカギです。',
    examples: [
      { phrase: 'Good morning, everyone.', focus: 'Good morning', literal: 'グッド モーニング', actual: 'グッ(ド) モーニン' },
      { phrase: "I'll see you next week.", focus: 'next week', literal: 'ネクスト ウィーク', actual: 'ネクス(ト) ウィーク' },
      { phrase: 'She just left the office.', focus: 'just left', literal: 'ジャスト レフト', actual: 'ジャス(ト) レフ(ト)' },
      { phrase: 'Thank you so much for coming.', focus: 'so much for', literal: 'ソー マッチ フォー', actual: 'ソー マッチフォ', note: 'chの後のfも弱まる' },
      { phrase: 'We need to act fast.', focus: 'act fast', literal: 'アクト ファスト', actual: 'アク(ト) ファス(ト)' },
      { phrase: 'He kept talking during the break.', focus: 'kept talking', literal: 'ケプト トーキング', actual: 'ケプ(ト) トーキン' },
      { phrase: 'The project deadline is next month.', focus: 'next month', literal: 'ネクスト マンス', actual: 'ネクス(ト) マンス' },
      { phrase: 'I should have called you first.', focus: 'should have', literal: 'シュッド ハブ', actual: 'シュダ(ヴ)', note: 'have が弱形になり d とつながる' },
    ],
  },
  {
    id: 'linking',
    name: '連結（リンキング）',
    nameEn: 'Linking',
    summary: '子音で終わる語と母音で始まる語がつながって1語のように聞こえる',
    description:
      '前の単語が子音で終わり、次の単語が母音で始まると、2語がつながって発音されます。an apple は「ア・ナポー」、check it out は「チェッキラウ(ト)」のように、単語の切れ目が耳では分からなくなります。知っている単語なのに聞き取れない場合、多くはこの連結が原因です。',
    examples: [
      { phrase: 'an apple', focus: 'an apple', literal: 'アン アップル', actual: 'アナポー' },
      { phrase: 'Check it out.', focus: 'Check it out', literal: 'チェック イット アウト', actual: 'チェッキラウ(ト)', note: '連結＋フラップTの合わせ技' },
      { phrase: 'Turn it off, please.', focus: 'Turn it off', literal: 'ターン イット オフ', actual: 'ターニロフ' },
      { phrase: 'Can I have a look at it?', focus: 'look at it', literal: 'ルック アット イット', actual: 'ルッカリッ(ト)' },
      { phrase: 'The store is open all day.', focus: 'open all', literal: 'オープン オール', actual: 'オープノール' },
      { phrase: 'Fill out this form, please.', focus: 'Fill out', literal: 'フィル アウト', actual: 'フィラウ(ト)', note: 'Part 1・案内文で頻出の fill out' },
      { phrase: 'Hand in your report by Friday.', focus: 'Hand in', literal: 'ハンド イン', actual: 'ハンディン' },
      { phrase: 'It takes about an hour.', focus: 'about an hour', literal: 'アバウト アン アワー', actual: 'アバウラナワー', note: '連結が2回続く。時間表現の聞き取りに直結' },
    ],
  },
  {
    id: 'assimilation',
    name: '同化（アシミレーション）',
    nameEn: 'Assimilation',
    summary: '隣り合う音が影響し合って別の音に変わる（did you → ディジュ）',
    description:
      '隣り合う音同士が影響し合い、元とは違う音に変化する現象です。代表例は t/d/s/z ＋ you の組み合わせで、did you は「ディジュ」、meet you は「ミーチュ」になります。疑問文の頻出パターンなので、Part 2 の聞き取りで特に重要です。',
    examples: [
      { phrase: 'Did you finish the report?', focus: 'Did you', literal: 'ディド ユー', actual: 'ディジュ' },
      { phrase: 'Nice to meet you.', focus: 'meet you', literal: 'ミート ユー', actual: 'ミーチュ' },
      { phrase: "I'll let you know by tomorrow.", focus: 'let you', literal: 'レット ユー', actual: 'レッチュ' },
      { phrase: "Can't you come a little earlier?", focus: "Can't you", literal: 'キャント ユー', actual: 'キャンチュ' },
      { phrase: 'Would you mind opening the window?', focus: 'Would you', literal: 'ウッド ユー', actual: 'ウッジュ' },
      { phrase: "What's your extension number?", focus: "What's your", literal: 'ワッツ ユア', actual: 'ワッチョァ' },
      { phrase: 'I miss you all very much.', focus: 'miss you', literal: 'ミス ユー', actual: 'ミシュー' },
      { phrase: 'Could you send me the file?', focus: 'Could you', literal: 'クッド ユー', actual: 'クッジュ', note: '依頼表現の定番。Part 2 で最頻出' },
    ],
  },
  {
    id: 'weak-forms',
    name: '弱形',
    nameEn: 'Weak Forms',
    summary: 'can / for / to / and などの機能語が弱く短く発音される',
    description:
      '前置詞・助動詞・冠詞・接続詞などの「機能語」は、文の中では弱く短く発音されます。can は「クン」、for は「ファ」、and は「ン」程度にしか聞こえません。特に can と can\'t の聞き分けは、can が弱形（クン）、can\'t が強形（キャン(ト)）で発音される、という強弱の違いがヒントになります。',
    examples: [
      { phrase: 'I can speak English.', focus: 'can', literal: 'キャン', actual: 'クン', note: '肯定文の can は弱形。強く「キャン」と聞こえたら can\'t を疑う' },
      { phrase: "I can't attend the meeting.", focus: "can't", literal: 'キャント', actual: 'キャン(ト)', note: "can't は強形のまま。t は脱落しがちなので強弱で判断" },
      { phrase: 'This gift is for you.', focus: 'for', literal: 'フォー', actual: 'ファ' },
      { phrase: 'I need to go to the bank.', focus: 'to', literal: 'トゥー', actual: 'タ' },
      { phrase: 'Bread and butter, please.', focus: 'and', literal: 'アンド', actual: 'ン', note: 'bread and butter → ブレッドンバラー' },
      { phrase: 'There are a lot of options.', focus: 'are a lot of', literal: 'アー ア ロット オブ', actual: 'アラ ロッロヴ' },
      { phrase: 'What do you want to do?', focus: 'want to', literal: 'ウォント トゥー', actual: 'ワナ', note: 'want to → wanna は弱形の代表例' },
      { phrase: 'You should have seen it.', focus: 'should have', literal: 'シュッド ハブ', actual: 'シュダ', note: 'have の h が落ちて「シュダ」に' },
    ],
  },
];

/** ディクテーション練習用の例文 */
export const DICTATION_ITEMS: DictationItem[] = [
  { id: 'd01', ruleId: 'flap-t', sentence: 'Can you get it done by noon?', sentenceJa: '正午までにそれを終わらせられますか？', focus: 'get it', explanation: 'get it の t がフラップ化して「ゲリッ」と聞こえる。' },
  { id: 'd02', ruleId: 'flap-t', sentence: 'The meeting starts at eight thirty.', sentenceJa: '会議は8時30分に始まります。', focus: 'thirty', explanation: 'thirty の t がフラップ化して「サーリー」。数字の聞き取りに注意。' },
  { id: 'd03', ruleId: 'elision', sentence: 'I will see you next week.', sentenceJa: 'また来週会いましょう。', focus: 'next week', explanation: 'next の語尾 t が脱落して「ネクスウィーク」と聞こえる。' },
  { id: 'd04', ruleId: 'elision', sentence: 'She just left the office.', sentenceJa: '彼女はちょうどオフィスを出たところです。', focus: 'just left', explanation: 'just と left の語尾 t がどちらも脱落する。' },
  { id: 'd05', ruleId: 'linking', sentence: 'Fill out this form, please.', sentenceJa: 'この用紙にご記入ください。', focus: 'Fill out', explanation: 'fill と out が連結して「フィラウト」と1語のように聞こえる。' },
  { id: 'd06', ruleId: 'linking', sentence: 'It takes about an hour.', sentenceJa: '約1時間かかります。', focus: 'about an hour', explanation: 'about-an-hour が連結し「アバウラナワー」に。フラップTも同時に起こる。' },
  { id: 'd07', ruleId: 'assimilation', sentence: 'Did you finish the report?', sentenceJa: '報告書は終わりましたか？', focus: 'Did you', explanation: 'Did you が同化して「ディジュ」になる。疑問文の頻出パターン。' },
  { id: 'd08', ruleId: 'assimilation', sentence: 'Could you send me the file?', sentenceJa: 'ファイルを送っていただけますか？', focus: 'Could you', explanation: 'Could you が同化して「クッジュ」。依頼表現の定番。' },
  { id: 'd09', ruleId: 'weak-forms', sentence: 'I can speak English.', sentenceJa: '私は英語を話せます。', focus: 'can', explanation: '肯定文の can は弱形「クン」。強く聞こえたら can\'t の可能性が高い。' },
  { id: 'd10', ruleId: 'weak-forms', sentence: 'What do you want to do?', sentenceJa: '何がしたいですか？', focus: 'want to', explanation: 'want to が弱形で「ワナ」になる。' },
];
