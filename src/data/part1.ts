import type { Part1Item } from './types';

const p = (
  id: string,
  scene: string,
  sceneJa: string,
  statements: [string, string, string, string],
  statementsJa: [string, string, string, string],
  answer: number,
  explanation: string
): Part1Item => ({ id, scene, sceneJa, statements, statementsJa, answer, explanation });

export const PART1_ITEMS: Part1Item[] = [
  p(
    'p1001',
    '👩‍💼💻📄',
    '女性がオフィスの机で、書類を見ながらパソコンに入力している',
    [
      'A woman is typing on a computer.',
      'A woman is filing documents in a cabinet.',
      'A woman is talking on the phone.',
      'A woman is cleaning her desk.',
    ],
    [
      '女性がパソコンに入力している。',
      '女性が書類をキャビネットにしまっている。',
      '女性が電話で話している。',
      '女性が机を掃除している。',
    ],
    0,
    '現在進行形 is typing が動作を正しく描写。書類は「見ている」だけでファイリング(B)はしていない。写っていない動作（C・D）は不正解。'
  ),
  p(
    'p1002',
    '👷‍♂️🧱🏗️',
    '作業員たちが建設現場でレンガを積んでいる',
    [
      'Workers are demolishing a wall.',
      'Workers are laying bricks at a construction site.',
      'Workers are painting a building.',
      'Workers are taking a break under a tree.',
    ],
    [
      '作業員たちが壁を取り壊している。',
      '作業員たちが建設現場でレンガを積んでいる。',
      '作業員たちが建物にペンキを塗っている。',
      '作業員たちが木の下で休憩している。',
    ],
    1,
    'lay bricks（レンガを積む）が場面と一致。demolish（取り壊す）は逆の動作。Part 1 では「似た場所で起こりうる別の動作」が定番の引っかけ。'
  ),
  p(
    'p1003',
    '👨‍💼🖨️📄',
    '男性がオフィスのコピー機で書類をコピーしている',
    [
      'A man is repairing a copy machine.',
      'A man is stacking paper on a shelf.',
      'A man is making copies of some documents.',
      'A man is handing out flyers to coworkers.',
    ],
    [
      '男性がコピー機を修理している。',
      '男性が紙を棚に積み上げている。',
      '男性が書類のコピーを取っている。',
      '男性が同僚にチラシを配っている。',
    ],
    2,
    'make copies（コピーを取る）が動作と一致。A はコピー機を「使う」のではなく「修理する」で、同じ物に対する別動作の引っかけ。B・D は写っていない動作。'
  ),
  p(
    'p1004',
    '👨‍💼🖥️👥',
    '会議室で男性がスクリーンを指し示し、参加者が着席して聞いている',
    [
      'A man is pointing at a screen.',
      'A man is drawing a graph on a whiteboard.',
      'Participants are leaving the meeting room.',
      'Chairs are being stacked in a corner.',
    ],
    [
      '男性がスクリーンを指し示している。',
      '男性がホワイトボードにグラフを描いている。',
      '参加者が会議室から出ていくところだ。',
      '椅子が隅に積み重ねられているところだ。',
    ],
    0,
    'point at a screen が動作を正しく描写。B はプレゼン会場で起こりうる別の動作。D の are being stacked は「今まさに積んでいる最中」を表す進行受動態で、写真の状態とは合わない。'
  ),
  p(
    'p1005',
    '👩☕🫖',
    'カフェで女性店員がカップにコーヒーを注いでいる',
    [
      'A woman is wiping a table with a cloth.',
      'A woman is taking an order from a customer.',
      'Cups are being washed in a sink.',
      'A woman is pouring coffee into a cup.',
    ],
    [
      '女性が布でテーブルを拭いている。',
      '女性が客から注文を取っている。',
      'カップがシンクで洗われているところだ。',
      '女性がカップにコーヒーを注いでいる。',
    ],
    3,
    'pour coffee（コーヒーを注ぐ）が場面と一致。A・B はカフェで起こりうる別の動作という定番の引っかけ。C は写っていない場所（シンク）への言及。'
  ),
  p(
    'p1006',
    '🧑‍💼🛒🏪',
    '店員が店の棚に商品を並べている',
    [
      'A customer is paying at the register.',
      'A clerk is arranging items on shelves.',
      'Shopping carts are being repaired.',
      'The store has been closed for the day.',
    ],
    [
      '客がレジで支払いをしている。',
      '店員が棚に商品を並べている。',
      'ショッピングカートが修理されているところだ。',
      '店はその日の営業を終えている。',
    ],
    1,
    'arrange items on shelves（棚に商品を並べる）が正解。A は店内で起こりうる別の場面。D は営業中の店と矛盾する状態の描写で、has been closed（完了の受動態）の意味を問う引っかけ。'
  ),
  p(
    'p1007',
    '🧳✈️🪑',
    '空港の搭乗ゲート前で、旅行者たちが荷物を持って座って待っている',
    [
      'Passengers are boarding an airplane.',
      'Travelers are waiting in a seating area.',
      'Luggage is being loaded onto a cart.',
      'A plane is taking off from the runway.',
    ],
    [
      '乗客たちが飛行機に搭乗している。',
      '旅行者たちが待合スペースで待っている。',
      '荷物がカートに積み込まれているところだ。',
      '飛行機が滑走路から離陸している。',
    ],
    1,
    'wait in a seating area が状態を正しく描写。A は空港で連想しやすい「次に起こりそうな動作」の引っかけ。C は荷物は写っているが「積み込む」動作は行われていない。'
  ),
  p(
    'p1008',
    '🚶‍♀️🚶‍♂️🚦',
    '歩行者たちが横断歩道を渡っている',
    [
      'Cars are parked on the sidewalk.',
      'People are waiting for a bus at a bus stop.',
      'A cyclist is riding through the crowd.',
      'Pedestrians are crossing the street.',
    ],
    [
      '車が歩道に駐車されている。',
      '人々がバス停でバスを待っている。',
      '自転車に乗った人が人混みの中を走っている。',
      '歩行者たちが通りを渡っている。',
    ],
    3,
    'cross the street（通りを渡る）が動作と一致。B は「待っている」という別の状態の引っかけ。A・C は写っていない物・人物への言及で不正解。'
  ),
  p(
    'p1009',
    '🏭🚜📦',
    '倉庫でフォークリフトがパレットを持ち上げている',
    [
      'A forklift is lifting some pallets.',
      'Boxes are scattered across the floor.',
      'A worker is sealing a carton with tape.',
      'A truck is being unloaded at a dock.',
    ],
    [
      'フォークリフトがパレットを持ち上げている。',
      '箱が床一面に散らばっている。',
      '作業員が段ボール箱をテープで封をしている。',
      'トラックの荷物が搬入口で降ろされているところだ。',
    ],
    0,
    'lift pallets（パレットを持ち上げる）が動作を正しく描写。B は整然と置かれた荷物を scattered（散乱）とする状態の誤り。C・D は倉庫で起こりうるが写っていない動作。'
  ),
  p(
    'p1010',
    '🏗️🧰👷',
    '建設現場でクレーンが建築資材を吊り上げている',
    [
      'Workers are digging a hole in the ground.',
      'Scaffolding is being dismantled.',
      'A crane is lifting building materials.',
      'A road is being paved with asphalt.',
    ],
    [
      '作業員たちが地面に穴を掘っている。',
      '足場が解体されているところだ。',
      'クレーンが建築資材を吊り上げている。',
      '道路がアスファルトで舗装されているところだ。',
    ],
    2,
    'crane is lifting が場面と一致。A・D は建設現場で起こりうる別の作業という定番の引っかけ。B の dismantle（解体する）は組み立てとは逆方向の動作。'
  ),
  p(
    'p1011',
    '🏃‍♂️🌳🛤️',
    '公園の小道を男性がジョギングしている',
    [
      'A man is jogging along a path.',
      'A man is mowing the lawn in a park.',
      'Benches are being painted.',
      'Leaves are being raked into a pile.',
    ],
    [
      '男性が小道に沿ってジョギングしている。',
      '男性が公園で芝を刈っている。',
      'ベンチにペンキが塗られているところだ。',
      '落ち葉が集められて山にされているところだ。',
    ],
    0,
    'jog along a path が動作を正しく描写。B・D は公園で連想しやすい別の作業。C の are being painted は「塗装作業中」を意味し、写真に作業者がいなければ不正解になる進行受動態の引っかけ。'
  ),
  p(
    'p1012',
    '🏨🔑🛎️',
    'ホテルのフロントで受付係が宿泊客に鍵を手渡している',
    [
      'Guests are waiting for an elevator.',
      'A bellhop is carrying suitcases up the stairs.',
      'A receptionist is answering the telephone.',
      'A receptionist is handing a key to a guest.',
    ],
    [
      '宿泊客たちがエレベーターを待っている。',
      'ベルボーイがスーツケースを持って階段を上がっている。',
      '受付係が電話に出ている。',
      '受付係が宿泊客に鍵を手渡している。',
    ],
    3,
    'hand a key to a guest（鍵を手渡す）が動作と一致。C は同じ人物（受付係）の別動作という引っかけ。A・B はホテルで起こりうるが写っていない場面。'
  ),
  p(
    'p1013',
    '💊🧑‍⚕️🗄️',
    '薬局で薬剤師が棚に薬を並べている',
    [
      'A patient is being examined by a doctor.',
      'A pharmacist is writing a prescription.',
      'A pharmacist is arranging medicine on a shelf.',
      'Wheelchairs are lined up in a hallway.',
    ],
    [
      '患者が医師の診察を受けているところだ。',
      '薬剤師が処方箋を書いている。',
      '薬剤師が棚に薬を並べている。',
      '車椅子が廊下に一列に並べられている。',
    ],
    2,
    'arrange medicine on a shelf が正解。B は薬剤師から連想される別の動作（処方箋は医師が書く点でも誤り）。A・D は写っていない人物・物への言及。'
  ),
  p(
    'p1014',
    '👩📚🗄️',
    '図書館で女性が棚の本に手を伸ばしている',
    [
      'A woman is checking out some books.',
      'A woman is reaching for a book on a shelf.',
      'Books are being packed into boxes.',
      'A librarian is reading to some children.',
    ],
    [
      '女性が本の貸出手続きをしている。',
      '女性が棚の本に手を伸ばしている。',
      '本が箱に詰められているところだ。',
      '司書が子どもたちに読み聞かせをしている。',
    ],
    1,
    'reach for a book（本に手を伸ばす）が動作を正しく描写。A は図書館で連想される別の行為。C は写っていない動作、D は写っていない人物への言及。'
  ),
  p(
    'p1015',
    '👨‍🍳🔪🥕',
    '厨房でシェフがまな板の上で野菜を切っている',
    [
      'A chef is washing dishes in a sink.',
      'Pots are boiling over on a stove.',
      'A chef is tasting some soup.',
      'A chef is chopping vegetables on a cutting board.',
    ],
    [
      'シェフがシンクで皿を洗っている。',
      '鍋がコンロで吹きこぼれている。',
      'シェフがスープの味見をしている。',
      'シェフがまな板の上で野菜を刻んでいる。',
    ],
    3,
    'chop vegetables（野菜を刻む）が場面と一致。A・C は厨房の同一人物が行いそうな別の動作という定番の引っかけ。B は写っていない状況の描写。'
  ),
  p(
    'p1016',
    '🚗🚙🅿️',
    '駐車場に車が一列に並んで停められている（人は写っていない）',
    [
      'Cars are parked in a row.',
      'A car is being towed away.',
      'Drivers are waiting inside their vehicles.',
      'A parking attendant is directing traffic.',
    ],
    [
      '車が一列に駐車されている。',
      '車が1台レッカー移動されているところだ。',
      '運転手たちが車内で待っている。',
      '駐車場の係員が車を誘導している。',
    ],
    0,
    '人のいない写真では受動態の状態描写 are parked が正解になりやすい。B の is being towed は「移動中」という動作を表し状態と混同させる引っかけ。C・D は写っていない人物への言及。'
  ),
  p(
    'p1017',
    '🪑🪑🟫',
    '誰もいない会議室で、テーブルの周りに椅子が並べられている',
    [
      'People are seated around a table.',
      'A table is being moved into a room.',
      'Chairs have been arranged around a table.',
      'Documents are spread across the floor.',
    ],
    [
      '人々がテーブルの周りに着席している。',
      'テーブルが部屋に運び込まれているところだ。',
      '椅子がテーブルの周りに配置されている。',
      '書類が床一面に広げられている。',
    ],
    2,
    '完了の受動態 have been arranged が「配置済みの状態」を正しく表す。B の is being moved は「今運んでいる最中」で、状態と動作の混同を狙う典型パターン。A は人が写っていないため不正解。'
  ),
  p(
    'p1018',
    '🤝👨‍💼👨‍💼',
    'オフィスで2人の男性が握手している',
    [
      'Two men are exchanging business cards.',
      'Two men are shaking hands.',
      'A man is putting on his jacket.',
      'Papers are being distributed to attendees.',
    ],
    [
      '2人の男性が名刺を交換している。',
      '2人の男性が握手している。',
      '男性が上着を着ようとしている。',
      '資料が出席者に配られているところだ。',
    ],
    1,
    'shake hands（握手する）が動作と一致。A はビジネスの場面で連想されやすい別の動作という引っかけ。C・D は写っていない動作への言及。'
  ),
  p(
    'p1019',
    '🍽️🧑‍🍳🍷',
    'レストランでウェイターがテーブルに料理を置いている',
    [
      'A server is placing dishes on a table.',
      'Diners are paying their bill.',
      'Tables are being set up for a banquet.',
      'A chef is grilling meat outdoors.',
    ],
    [
      '給仕係がテーブルに料理を置いている。',
      '食事客が会計をしている。',
      '宴会のためにテーブルが設営されているところだ。',
      'シェフが屋外で肉を焼いている。',
    ],
    0,
    'place dishes on a table（料理を置く）が正解。B はレストランで起こりうる別の場面。C は setting（設営中）という別の動作、D は写っていない場所（屋外）への言及。'
  ),
  p(
    'p1020',
    '🚆🧍‍♀️🧍‍♂️',
    '駅のホームで人々が電車に乗り込んでいる',
    [
      'A train is departing from the station.',
      'Passengers are purchasing tickets at a machine.',
      'People are boarding a train.',
      'Railroad tracks are being repaired.',
    ],
    [
      '電車が駅から発車している。',
      '乗客たちが券売機で切符を買っている。',
      '人々が電車に乗り込んでいる。',
      '線路が修理されているところだ。',
    ],
    2,
    'board a train（電車に乗り込む）が動作を正しく描写。A は電車が「停車中」なので状態の誤り。B は駅で起こりうる別の動作、D は写っていない作業への言及。'
  ),
  p(
    'p1021',
    '🏭👷‍♀️⚙️',
    '工場のラインで作業員たちが製品を組み立てている',
    [
      'Machines are being installed in a factory.',
      'Workers are assembling products on a line.',
      'Workers are loading boxes into a truck.',
      'A conveyor belt is being taken apart.',
    ],
    [
      '工場に機械が設置されているところだ。',
      '作業員たちがラインで製品を組み立てている。',
      '作業員たちがトラックに箱を積み込んでいる。',
      'ベルトコンベアが分解されているところだ。',
    ],
    1,
    'assemble products（製品を組み立てる）が場面と一致。A・D は稼働中の設備を「設置・分解中」とする状態の誤り。C は工場で連想される別の作業。'
  ),
  p(
    'p1022',
    '🍎⚖️🧑‍🌾',
    '露店で店主が果物を量りにかけている',
    [
      'Fruit is being loaded into a van.',
      'A vendor is closing his stall for the day.',
      'Customers are sampling some cheese.',
      'A vendor is weighing some fruit.',
    ],
    [
      '果物がバンに積み込まれているところだ。',
      '店主が店じまいをしている。',
      '客たちがチーズを試食している。',
      '店主が果物を量っている。',
    ],
    3,
    'weigh fruit（果物を量る）が動作と一致。A は同じ物（果物）に対する別の動作という引っかけ。C は写っていない商品（チーズ）への言及で不正解。'
  ),
  p(
    'p1023',
    '👩‍💼🗄️📁',
    '女性がオフィスのキャビネットに書類をしまっている',
    [
      'A woman is shredding some documents.',
      'A woman is filing documents in a cabinet.',
      'A woman is photocopying a report.',
      'Drawers have been left open on a desk.',
    ],
    [
      '女性が書類をシュレッダーにかけている。',
      '女性が書類をキャビネットにしまっている。',
      '女性が報告書をコピーしている。',
      '机の引き出しが開けっ放しになっている。',
    ],
    1,
    'file documents（書類をファイリングする）が動作と一致。A・C は同じ書類に対する別の動作という定番の引っかけ。D は写っていない状態の描写。'
  ),
  p(
    'p1024',
    '👩‍🏫🖊️📊',
    '女性が会議室のホワイトボードに文字を書いている',
    [
      'A woman is erasing a whiteboard.',
      'A woman is hanging a poster on a wall.',
      'A projector is being set up.',
      'A woman is writing on a whiteboard.',
    ],
    [
      '女性がホワイトボードを消している。',
      '女性が壁にポスターを貼っている。',
      'プロジェクターが設置されているところだ。',
      '女性がホワイトボードに書き込んでいる。',
    ],
    3,
    'write on a whiteboard が動作を正しく描写。A は同じ物に対する逆方向の動作（書く vs 消す）という引っかけ。B・C は写っていない物・動作への言及。'
  ),
  p(
    'p1025',
    '☕🪑🌤️',
    'カフェのテラス席で客たちが座って飲み物を飲んでいる',
    [
      'Some people are seated at outdoor tables.',
      'Chairs are being carried inside.',
      'A server is opening a patio umbrella.',
      'Customers are lining up at the entrance.',
    ],
    [
      '何人かの人が屋外のテーブル席に座っている。',
      '椅子が店内に運び込まれているところだ。',
      '給仕係がパラソルを開いている。',
      '客たちが入口に並んでいる。',
    ],
    0,
    'are seated（着席している）という状態の受動態が正解。B の are being carried は「運んでいる最中」で状態と動作の混同を狙う。C・D は写っていない動作への言及。'
  ),
  p(
    'p1026',
    '🛒👩🏪',
    'スーパーマーケットで女性がショッピングカートを押している',
    [
      'A woman is handing cash to a cashier.',
      'Grocery bags are being carried to a car.',
      'A woman is pushing a shopping cart.',
      'A woman is weighing some vegetables.',
    ],
    [
      '女性がレジ係に現金を手渡している。',
      '食料品の袋が車まで運ばれているところだ。',
      '女性がショッピングカートを押している。',
      '女性が野菜を量っている。',
    ],
    2,
    'push a shopping cart が動作と一致。A・D はスーパーで起こりうる別の動作という引っかけ。B は写っていない場所（駐車場）への言及。'
  ),
  p(
    'p1027',
    '🧳🛫🧑‍✈️',
    '空港のカウンターで男性がスーツケースを預けている',
    [
      'A man is going through a security check.',
      'A suitcase is being wrapped in plastic.',
      'A man is boarding an airplane.',
      'A man is checking in his luggage at a counter.',
    ],
    [
      '男性が保安検査を受けている。',
      'スーツケースがビニールで梱包されているところだ。',
      '男性が飛行機に搭乗している。',
      '男性がカウンターで荷物を預けている。',
    ],
    3,
    'check in luggage（荷物を預ける）が場面と一致。A・C は空港で連想される別の場面という引っかけ。B は同じ物（スーツケース）への写っていない動作。'
  ),
  p(
    'p1028',
    '🧹👨🛣️',
    '男性がほうきで歩道を掃いている',
    [
      'A man is sweeping a sidewalk.',
      'A man is watering some flowers.',
      'Trash cans are being emptied into a truck.',
      'A man is shoveling snow off the road.',
    ],
    [
      '男性が歩道を掃いている。',
      '男性が花に水をやっている。',
      'ゴミ箱の中身がトラックに空けられているところだ。',
      '男性が道路の雪かきをしている。',
    ],
    0,
    'sweep a sidewalk（歩道を掃く）が動作を正しく描写。D は同じ「清掃」でも道具と対象が異なる引っかけ。B・C は写っていない動作への言及。'
  ),
  p(
    'p1029',
    '📦🧑‍🔧🗄️',
    '倉庫で作業員たちが棚に箱を積み上げている',
    [
      'Workers are wheeling carts down an aisle.',
      'Empty shelves are being removed.',
      'Workers are stacking boxes on shelves.',
      'Packages are being weighed on a scale.',
    ],
    [
      '作業員たちが通路でカートを押している。',
      '空の棚が撤去されているところだ。',
      '作業員たちが棚に箱を積み上げている。',
      '荷物が秤で量られているところだ。',
    ],
    2,
    'stack boxes on shelves（棚に箱を積む）が正解。A は倉庫で起こりうる別の動作。B は商品の載った棚を「空」「撤去中」とする状態の誤り、D は写っていない動作。'
  ),
  p(
    'p1030',
    '👷🪜🏢',
    '建設現場で作業員がはしごを登っている',
    [
      'A ladder is lying on the ground.',
      'A worker is climbing a ladder.',
      'A worker is installing a window.',
      'Bricks are being unloaded from a truck.',
    ],
    [
      'はしごが地面に横たえられている。',
      '作業員がはしごを登っている。',
      '作業員が窓を取り付けている。',
      'レンガがトラックから降ろされているところだ。',
    ],
    1,
    'climb a ladder（はしごを登る）が動作と一致。A は使用中のはしごを「置かれている」とする状態の誤り。C・D は現場で起こりうるが写っていない作業。'
  ),
  p(
    'p1031',
    '🧺👨‍👩‍👧🌳',
    '公園の芝生で家族がピクニックをしている',
    [
      'People are having a picnic on the grass.',
      'A family is riding bicycles on a trail.',
      'Food is being grilled on a barbecue.',
      'Tents are being set up in a field.',
    ],
    [
      '人々が芝生の上でピクニックをしている。',
      '家族が小道で自転車に乗っている。',
      '食べ物がバーベキューグリルで焼かれているところだ。',
      '広場でテントが設営されているところだ。',
    ],
    0,
    'have a picnic が場面を正しく描写。B は公園で連想される別の活動。C・D は屋外の食事から連想させる写っていない物（グリル・テント）への言及。'
  ),
  p(
    'p1032',
    '🏨🛋️🧳',
    'ホテルのロビーで宿泊客たちがソファに座っている',
    [
      'Guests are checking out at the front desk.',
      'Suitcases are being loaded onto a shuttle bus.',
      'A lobby is being decorated for an event.',
      'Some guests are sitting on sofas in a lobby.',
    ],
    [
      '宿泊客たちがフロントでチェックアウトしている。',
      'スーツケースがシャトルバスに積み込まれているところだ。',
      'ロビーがイベント用に飾り付けられているところだ。',
      '何人かの宿泊客がロビーのソファに座っている。',
    ],
    3,
    'sit on sofas（ソファに座っている）という状態の描写が正解。A はロビーで起こりうる別の場面という引っかけ。B・C は写っていない動作への言及。'
  ),
  p(
    'p1033',
    '🏥👩‍⚕️🦽',
    '病院の廊下で看護師が車椅子を押している',
    [
      'A patient is walking with a cane.',
      'A nurse is pushing a wheelchair.',
      'Medical supplies are being delivered.',
      'A doctor is examining an X-ray.',
    ],
    [
      '患者が杖をついて歩いている。',
      '看護師が車椅子を押している。',
      '医療用品が配達されているところだ。',
      '医師がレントゲン写真を確認している。',
    ],
    1,
    'push a wheelchair（車椅子を押す）が動作と一致。A は「移動」に関する別の手段の引っかけ。C・D は病院で連想されるが写っていない場面。'
  ),
  p(
    'p1034',
    '📖🧑‍🎓🪑',
    '図書館の机で学生たちが本を読んで勉強している',
    [
      'Students are returning books to the shelves.',
      'A study room is being cleaned.',
      'Some people are studying at tables.',
      'Students are talking loudly in a hallway.',
    ],
    [
      '学生たちが本を棚に戻している。',
      '自習室が清掃されているところだ。',
      '何人かの人が机で勉強している。',
      '学生たちが廊下で大声で話している。',
    ],
    2,
    'study at tables が場面を正しく描写。A は図書館で本に対して行われる別の動作という引っかけ。B・D は写っていない動作・場所への言及。'
  ),
  p(
    'p1035',
    '🍳🫕🍴',
    '誰もいない厨房で、調理器具がカウンターの上の棚に吊るされている',
    [
      'A cook is hanging up his apron.',
      'Dishes are piled up in a sink.',
      'Some pots are hanging above a counter.',
      'Utensils are being put into a drawer.',
    ],
    [
      '料理人がエプロンを掛けている。',
      '皿がシンクに積み重なっている。',
      'いくつかの鍋がカウンターの上に吊るされている。',
      '調理器具が引き出しにしまわれているところだ。',
    ],
    2,
    '人のいない写真では are hanging（吊るされている）という状態描写が正解。D の are being put は「しまっている最中」で人が必要。A は写っていない人物、B は写っていない状態への言及。'
  ),
  p(
    'p1036',
    '🚗👨📦',
    '駐車場で男性が車のトランクに荷物を積み込んでいる',
    [
      'A man is loading some boxes into a car.',
      'A car is being filled with gasoline.',
      'A man is changing a flat tire.',
      'Vehicles are lined up at an exit gate.',
    ],
    [
      '男性が車に箱を積み込んでいる。',
      '車にガソリンが給油されているところだ。',
      '男性がパンクしたタイヤを交換している。',
      '車が出口ゲートに並んでいる。',
    ],
    0,
    'load boxes into a car（荷物を積み込む）が動作と一致。B・C は車に対する別の動作という引っかけ。D は写っていない場所（出口ゲート）への言及。'
  ),
  p(
    'p1037',
    '🍽️🥄🕯️',
    '誰もいないレストランで、各テーブルに食器がセットされている',
    [
      'Diners are enjoying their meals.',
      'Plates are being cleared from the tables.',
      'A waiter is folding some napkins.',
      'The tables have been set for a meal.',
    ],
    [
      '食事客が食事を楽しんでいる。',
      '皿がテーブルから下げられているところだ。',
      'ウェイターがナプキンを折りたたんでいる。',
      'テーブルに食事の用意が整えられている。',
    ],
    3,
    '完了の受動態 have been set が「セット済みの状態」を正しく表す。B の are being cleared は進行中の動作で人が必要。A・C は人のいない写真では不正解。'
  ),
  p(
    'p1038',
    '📄👨‍💼👥',
    '会議室で男性が出席者に資料を配っている',
    [
      'Attendees are signing a document.',
      'A man is distributing handouts to attendees.',
      'A presentation screen is being lowered.',
      'A man is collecting questionnaires.',
    ],
    [
      '出席者たちが文書に署名している。',
      '男性が出席者に資料を配っている。',
      'プレゼン用スクリーンが降ろされているところだ。',
      '男性がアンケートを回収している。',
    ],
    1,
    'distribute handouts（資料を配る）が動作と一致。D の collect（回収する）は配布とは逆方向の動作という引っかけ。A・C は写っていない動作への言及。'
  ),
  p(
    'p1039',
    '🥐🧑‍🍳🥖',
    'パン屋で店員がショーケースにパンを並べている',
    [
      'Bread is being baked in an oven.',
      'A customer is pointing at a cake.',
      'Loaves of bread are being sliced.',
      'A clerk is placing bread in a display case.',
    ],
    [
      'パンがオーブンで焼かれているところだ。',
      '客がケーキを指さしている。',
      'パンがスライスされているところだ。',
      '店員がショーケースにパンを並べている。',
    ],
    3,
    'place bread in a display case が動作を正しく描写。A・C は同じ物（パン）に対する別の工程という引っかけ。B は写っていない人物・商品への言及。'
  ),
  p(
    'p1040',
    '⛵🌊🪢',
    '桟橋に数隻のボートが係留されている（人は写っていない）',
    [
      'Some boats are docked at a pier.',
      'A boat is sailing across a lake.',
      'People are fishing from a pier.',
      'A boat is being repainted.',
    ],
    [
      '数隻のボートが桟橋に係留されている。',
      'ボートが湖を帆走している。',
      '人々が桟橋で釣りをしている。',
      'ボートが塗り直されているところだ。',
    ],
    0,
    '人のいない写真では are docked（係留されている）という状態の受動態が正解。B は停泊中の船を「航行中」とする動作の誤り。C は写っていない人物、D は行われていない作業への言及。'
  ),
  p(
    'p1041',
    '🏭👨‍🏭🔍',
    '工場で作業員が機械を点検している',
    [
      'A machine is being replaced.',
      'A worker is inspecting some equipment.',
      'A worker is sweeping the factory floor.',
      'Spare parts are scattered on a workbench.',
    ],
    [
      '機械が交換されているところだ。',
      '作業員が設備を点検している。',
      '作業員が工場の床を掃いている。',
      '予備部品が作業台に散らばっている。',
    ],
    1,
    'inspect equipment（設備を点検する）が動作と一致。A は同じ機械に対する別の作業という引っかけ。C は同一人物の別動作、D は写っていない状態への言及。'
  ),
  p(
    'p1042',
    '🚗🚕🚦',
    '交差点で車が信号待ちのため停止している',
    [
      'Cars are speeding down a highway.',
      'A traffic light is being installed.',
      'Some vehicles have stopped at an intersection.',
      'Pedestrians are blocking the road.',
    ],
    [
      '車が高速道路を猛スピードで走っている。',
      '信号機が設置されているところだ。',
      '数台の車が交差点で停止している。',
      '歩行者たちが道路をふさいでいる。',
    ],
    2,
    'have stopped（停止した状態にある）が場面と一致。A は停止中の車を「走行中」とする動作の誤り。B は既設の信号を「設置中」とする状態と動作の混同、D は写っていない人物への言及。'
  ),
  p(
    'p1043',
    '👨‍💼👩‍💼🖥️',
    'オフィスで2人の社員がモニターの画面を一緒に見ている',
    [
      'Two people are looking at a monitor.',
      'A monitor is being mounted on a wall.',
      'Two people are moving a desk.',
      'A computer is being taken out of a box.',
    ],
    [
      '2人の人がモニターを見ている。',
      'モニターが壁に取り付けられているところだ。',
      '2人の人が机を動かしている。',
      'コンピューターが箱から取り出されているところだ。',
    ],
    0,
    'look at a monitor が動作を正しく描写。B・D は同じ機器に対する「設置・開梱」という別の動作の引っかけ。C は写っていない動作への言及。'
  ),
  p(
    'p1044',
    '👩‍💼🖥️🌐',
    '女性がオフィスでビデオ会議の画面に向かって話している',
    [
      'A woman is adjusting a camera.',
      'A meeting room is being renovated.',
      'A woman is speaking to people on a screen.',
      'A woman is unplugging some cables.',
    ],
    [
      '女性がカメラの位置を調整している。',
      '会議室が改装されているところだ。',
      '女性が画面の向こうの人たちに話しかけている。',
      '女性がケーブルを抜いている。',
    ],
    2,
    'speak to people on a screen がビデオ会議の場面と一致。A・D は同じ機材に対する別の動作という引っかけ。B は写っていない状況の描写。'
  ),
  p(
    'p1045',
    '📋🍽️👫',
    'レストランで客たちがメニューを眺めている',
    [
      'Menus are being printed.',
      'Diners are looking at menus.',
      'A server is recommending a dish.',
      'Customers are waiting to be seated.',
    ],
    [
      'メニューが印刷されているところだ。',
      '食事客がメニューを眺めている。',
      '給仕係が料理を薦めている。',
      '客たちが席への案内を待っている。',
    ],
    1,
    'look at menus が動作を正しく描写。C・D はレストランで起こりうる別の場面という引っかけ。A は同じ物（メニュー）への写っていない動作。'
  ),
  p(
    'p1046',
    '🧥👩🪞',
    '衣料品店で女性が鏡の前で上着を試着している',
    [
      'A woman is folding some sweaters.',
      'Clothes are being loaded onto a rack.',
      'A woman is paying for a jacket.',
      'A woman is trying on a jacket.',
    ],
    [
      '女性がセーターをたたんでいる。',
      '衣類がラックに掛けられているところだ。',
      '女性が上着の代金を払っている。',
      '女性が上着を試着している。',
    ],
    3,
    'try on a jacket（試着する）が動作と一致。C は同じ商品に対する「次に起こりそうな」動作の引っかけ。A・B は店内で起こりうるが写っていない動作。'
  ),
  p(
    'p1047',
    '🚉👩🖥️',
    '駅で女性が電光掲示板の発車案内を見上げている',
    [
      'A woman is running to catch a train.',
      'A schedule board is being repaired.',
      'A woman is looking up at a departure board.',
      'A woman is asking for directions.',
    ],
    [
      '女性が電車に間に合うように走っている。',
      '時刻表の掲示板が修理されているところだ。',
      '女性が発車案内板を見上げている。',
      '女性が道を尋ねている。',
    ],
    2,
    'look up at a departure board が動作を正しく描写。A・D は駅で連想される別の動作という引っかけ。B は正常に稼働中の掲示板を「修理中」とする誤り。'
  ),
  p(
    'p1048',
    '🚕🙋‍♂️🏙️',
    '街の通りで男性が手を挙げてタクシーを止めようとしている',
    [
      'A man is hailing a taxi.',
      'A man is getting out of a taxi.',
      'A taxi is being washed at a station.',
      'A man is crossing at a crosswalk.',
    ],
    [
      '男性がタクシーを呼び止めている。',
      '男性がタクシーから降りている。',
      'タクシーが洗車場で洗われているところだ。',
      '男性が横断歩道を渡っている。',
    ],
    0,
    'hail a taxi（タクシーを呼び止める）が動作と一致。B は同じタクシーに関する逆方向の動作（乗る vs 降りる）の引っかけ。C・D は写っていない場面への言及。'
  ),
  p(
    'p1049',
    '📦🧑‍🔧📱',
    '倉庫で作業員が荷物のラベルを端末でスキャンしている',
    [
      'Labels are being printed out.',
      'A worker is taping a box shut.',
      'Packages are falling off a shelf.',
      'A worker is scanning a package with a device.',
    ],
    [
      'ラベルが印刷されているところだ。',
      '作業員が箱をテープで閉じている。',
      '荷物が棚から落ちている。',
      '作業員が端末で荷物をスキャンしている。',
    ],
    3,
    'scan a package（荷物をスキャンする）が動作を正しく描写。B は同じ荷物に対する別の作業という引っかけ。A・C は写っていない動作・状況への言及。'
  ),
  p(
    'p1050',
    '👷🏗️🪣',
    '建設現場で作業員たちがコンクリートを流し込んでいる',
    [
      'A building is being demolished.',
      'Workers are pouring concrete.',
      'Workers are putting up a fence.',
      'A cement mixer has been left unattended.',
    ],
    [
      '建物が取り壊されているところだ。',
      '作業員たちがコンクリートを流し込んでいる。',
      '作業員たちがフェンスを設置している。',
      'ミキサー車が無人のまま放置されている。',
    ],
    1,
    'pour concrete（コンクリートを流し込む）が場面と一致。A・C は建設現場で起こりうる別の作業という定番の引っかけ。D は使用中の機材を「放置」とする状態の誤り。'
  ),
  p(
    'p1051',
    '🛝👧👦',
    '公園の遊具で子どもたちが遊んでいる',
    [
      'A playground is being constructed.',
      'Children are drawing pictures on the ground.',
      'Parents are pushing strollers along a path.',
      'Children are playing on playground equipment.',
    ],
    [
      '遊び場が建設されているところだ。',
      '子どもたちが地面に絵を描いている。',
      '親たちが小道でベビーカーを押している。',
      '子どもたちが遊具で遊んでいる。',
    ],
    3,
    'play on playground equipment が場面を正しく描写。A は完成済みの遊具を「建設中」とする状態と動作の混同。B・C は写っていない動作・人物への言及。'
  ),
  p(
    'p1052',
    '🛏️🧹🏨',
    'ホテルの客室で清掃係がベッドを整えている',
    [
      'Curtains are being taken down.',
      'A guest is unpacking a suitcase.',
      'A housekeeper is making a bed.',
      'Towels are piled on the floor.',
    ],
    [
      'カーテンが取り外されているところだ。',
      '宿泊客がスーツケースの荷ほどきをしている。',
      '客室係がベッドを整えている。',
      'タオルが床に積み重なっている。',
    ],
    2,
    'make a bed（ベッドを整える）が動作と一致する慣用表現。B は客室で連想される別の人物・動作の引っかけ。A・D は写っていない動作・状態への言及。'
  ),
  p(
    'p1053',
    '🩺👨‍⚕️🧑',
    '診察室で医師が患者を診察している',
    [
      'A doctor is examining a patient.',
      'A patient is filling out a form.',
      'Medicine is being handed to a patient.',
      'A doctor is washing his hands.',
    ],
    [
      '医師が患者を診察している。',
      '患者が用紙に記入している。',
      '薬が患者に手渡されているところだ。',
      '医師が手を洗っている。',
    ],
    0,
    'examine a patient（患者を診察する）が場面と一致。B・C は病院で連想される別の場面という引っかけ。D は同一人物（医師）の写っていない別動作。'
  ),
  p(
    'p1054',
    '📚🧑‍💼🛒',
    '図書館で司書が返却された本を棚に戻している',
    [
      'A librarian is stamping some books.',
      'A librarian is returning books to the shelves.',
      'Bookshelves are being assembled.',
      'A cart is being pushed into an elevator.',
    ],
    [
      '司書が本にスタンプを押している。',
      '司書が本を棚に戻している。',
      '本棚が組み立てられているところだ。',
      'カートがエレベーターに押し入れられているところだ。',
    ],
    1,
    'return books to the shelves が動作を正しく描写。A は司書が行いそうな別の作業という引っかけ。C は既設の棚を「組立中」とする誤り、D は写っていない場所への言及。'
  ),
  p(
    'p1055',
    '👩‍🍳🥘🥄',
    'キッチンで女性が鍋の中身をかき混ぜている',
    [
      'A woman is setting the table.',
      'A woman is stirring a pot on the stove.',
      'Ingredients are being delivered to a kitchen.',
      'A woman is turning off the oven.',
    ],
    [
      '女性が食卓の準備をしている。',
      '女性がコンロの鍋をかき混ぜている。',
      '食材がキッチンに配達されているところだ。',
      '女性がオーブンの火を消している。',
    ],
    1,
    'stir a pot（鍋をかき混ぜる）が動作と一致。A・D は台所の同一人物が行いそうな別の動作という引っかけ。C は写っていない場面への言及。'
  ),
  p(
    'p1056',
    '🚗🧽💦',
    '男性がホースとスポンジで車を洗っている',
    [
      'A car is being driven into a garage.',
      'A man is vacuuming the inside of a car.',
      'A man is polishing his shoes.',
      'A man is washing a car with a hose.',
    ],
    [
      '車がガレージに入れられているところだ。',
      '男性が車内に掃除機をかけている。',
      '男性が靴を磨いている。',
      '男性がホースで車を洗っている。',
    ],
    3,
    'wash a car（車を洗う）が動作を正しく描写。B は同じ車に対する別の清掃動作の引っかけ。C は polish（磨く）を使った似た動作・別対象の引っかけ、A は写っていない動作。'
  ),
  p(
    'p1057',
    '💻📄🖊️',
    '誰もいない机の上にノートパソコンと書類が置かれている',
    [
      'A man is closing his laptop.',
      'Papers are being stapled together.',
      'A laptop has been placed on a desk.',
      'A desk is being moved to another office.',
    ],
    [
      '男性がノートパソコンを閉じている。',
      '書類がホチキスで留められているところだ。',
      'ノートパソコンが机の上に置かれている。',
      '机が別のオフィスに移動されているところだ。',
    ],
    2,
    '人のいない写真では完了の受動態 has been placed（置かれた状態）が正解。B・D の is being 〜 は進行中の動作で人が必要。A は写っていない人物への言及。'
  ),
  p(
    'p1058',
    '🧳🚶‍♂️🛫',
    '空港のロビーで男性がスーツケースを引いて歩いている',
    [
      'A man is pulling a suitcase.',
      'A man is putting a bag on a scale.',
      'Boarding passes are being printed.',
      'A man is looking for a lost bag.',
    ],
    [
      '男性がスーツケースを引いて歩いている。',
      '男性がかばんを秤に載せている。',
      '搭乗券が印刷されているところだ。',
      '男性がなくしたかばんを探している。',
    ],
    0,
    'pull a suitcase（スーツケースを引く）が動作と一致。B は同じ荷物に対する別の動作という引っかけ。D の「探している」は写真からは判断できない解釈で、Part 1 では不正解になる。'
  ),
  p(
    'p1059',
    '🌷🚿🧑‍🌾',
    '庭師が花壇の植物に水をやっている',
    [
      'Flowers are being planted in pots.',
      'A gardener is trimming some bushes.',
      'A lawn mower has been left on the grass.',
      'A gardener is watering some plants.',
    ],
    [
      '花が鉢に植えられているところだ。',
      '庭師が低木を刈り込んでいる。',
      '芝刈り機が芝生の上に置かれたままになっている。',
      '庭師が植物に水をやっている。',
    ],
    3,
    'water some plants（植物に水をやる）が動作を正しく描写。A・B は庭で行われる別の作業という定番の引っかけ。C は写っていない物への言及。'
  ),
  p(
    'p1060',
    '🏭👨‍🏭🔥',
    '工場で作業員が保護面を着けて金属を溶接している',
    [
      'A worker is taking off his helmet.',
      'A worker is welding some metal.',
      'Sparks are being swept off the floor.',
      'Tools are being handed out to workers.',
    ],
    [
      '作業員がヘルメットを脱いでいる。',
      '作業員が金属を溶接している。',
      '火花の跡が床から掃き取られているところだ。',
      '工具が作業員たちに配られているところだ。',
    ],
    1,
    'weld metal（金属を溶接する）が場面と一致。A は装着中の保護具を「脱いでいる」とする逆方向の動作の引っかけ。C・D は写っていない動作への言及。'
  ),
  p(
    'p1061',
    '☕👨🎛️',
    'カフェでバリスタがエスプレッソマシンを操作している',
    [
      'A barista is operating a coffee machine.',
      'Coffee beans are being ground by hand.',
      'A barista is wiping the counter.',
      'A customer is picking up a drink.',
    ],
    [
      'バリスタがコーヒーマシンを操作している。',
      'コーヒー豆が手で挽かれているところだ。',
      'バリスタがカウンターを拭いている。',
      '客が飲み物を受け取っている。',
    ],
    0,
    'operate a coffee machine が動作を正しく描写。B は「マシンで」ではなく「手で」とする手段のすり替え。C は同一人物の別動作、D は写っていない人物への言及。'
  ),
  p(
    'p1062',
    '🛍️🏬🛗',
    'ショッピングモールで人々がエスカレーターに乗っている',
    [
      'An escalator is out of service.',
      'Shoppers are carrying bags up the stairs.',
      'People are riding an escalator.',
      'A store window is being decorated.',
    ],
    [
      'エスカレーターが運転を休止している。',
      '買い物客が袋を持って階段を上っている。',
      '人々がエスカレーターに乗っている。',
      '店のショーウィンドウが飾り付けられているところだ。',
    ],
    2,
    'ride an escalator が場面と一致。A は稼働中の設備を「休止中」とする状態の誤り。B はエスカレーターを stairs（階段）にすり替える引っかけ、D は写っていない動作。'
  ),
  p(
    'p1063',
    '🪴👩‍💼💧',
    'オフィスで女性が観葉植物に水をやっている',
    [
      'A plant has been knocked over.',
      'A woman is opening the blinds.',
      'Flowers are being arranged in a vase.',
      'A woman is watering an office plant.',
    ],
    [
      '観葉植物が倒れている。',
      '女性がブラインドを開けている。',
      '花が花瓶に生けられているところだ。',
      '女性がオフィスの観葉植物に水をやっている。',
    ],
    3,
    'water an office plant が動作を正しく描写。A は立っている植物を「倒れている」とする状態の誤り。C は同じ植物から連想させる別の動作、B は写っていない動作への言及。'
  ),
  p(
    'p1064',
    '👏👥🎤',
    '講演会場で聴衆が話し手に拍手を送っている',
    [
      'A speaker is adjusting a microphone.',
      'An audience is applauding a speaker.',
      'People are filing out of an auditorium.',
      'Chairs are being folded and stored.',
    ],
    [
      '講演者がマイクを調整している。',
      '聴衆が講演者に拍手を送っている。',
      '人々が講堂から順に退出している。',
      '椅子が折りたたまれて片付けられているところだ。',
    ],
    1,
    'applaud a speaker（拍手を送る）が場面と一致。A は写っている人物（講演者）の別の動作という引っかけ。C・D は講演後に起こりそうな写っていない場面への言及。'
  ),
  p(
    'p1065',
    '🍽️🧑‍💼🧺',
    'レストランでウェイターがテーブルから食器を下げている',
    [
      'A table is being wiped with a cloth.',
      'A waiter is taking a customer\'s order.',
      'A waiter is clearing dishes from a table.',
      'Leftovers are being packed into containers.',
    ],
    [
      'テーブルが布で拭かれているところだ。',
      'ウェイターが客の注文を取っている。',
      'ウェイターがテーブルから食器を下げている。',
      '食べ残しが容器に詰められているところだ。',
    ],
    2,
    'clear dishes from a table（食器を下げる）が動作と一致。B は同一人物（ウェイター）の別の業務という引っかけ。A・D は食後の場面から連想される写っていない動作。'
  ),
  p(
    'p1066',
    '🥬🍅🧺',
    '食料品店の陳列台に野菜が並べられている（人は写っていない）',
    [
      'Vegetables are displayed in bins.',
      'A clerk is spraying water on lettuce.',
      'Produce is being weighed at a register.',
      'Shopping baskets are stacked by the door.',
    ],
    [
      '野菜が陳列台に並べられている。',
      '店員がレタスに水を吹きかけている。',
      '青果がレジで量られているところだ。',
      '買い物かごがドアのそばに積まれている。',
    ],
    0,
    '人のいない写真では are displayed（陳列されている）という状態の受動態が正解。B・C は人が必要な動作で不正解。D は写っていない物（買い物かご）への言及。'
  ),
  p(
    'p1067',
    '🛫🧑‍✈️🧺',
    '空港の保安検査場で乗客たちがトレーに手荷物を入れている',
    [
      'Passengers are picking up their boarding passes.',
      'People are placing their belongings in trays.',
      'Security officers are closing a checkpoint.',
      'Suitcases are being weighed at a counter.',
    ],
    [
      '乗客たちが搭乗券を受け取っている。',
      '人々がトレーに持ち物を入れている。',
      '保安検査員が検査場を閉鎖している。',
      'スーツケースがカウンターで量られているところだ。',
    ],
    1,
    'place belongings in trays が動作を正しく描写。A・D は空港の別の場所で起こる動作という引っかけ。C は稼働中の検査場を「閉鎖中」とする状態の誤り。'
  ),
  p(
    'p1068',
    '🎸🎩🏙️',
    '路上でミュージシャンがギターを弾いて演奏している',
    [
      'A guitar is leaning against a wall.',
      'A crowd is entering a concert hall.',
      'A man is packing up his instrument.',
      'A musician is performing on a sidewalk.',
    ],
    [
      'ギターが壁に立てかけられている。',
      '観客がコンサートホールに入っていく。',
      '男性が楽器を片付けている。',
      'ミュージシャンが歩道で演奏している。',
    ],
    3,
    'perform on a sidewalk が場面と一致。A は演奏中のギターを「立てかけられている」とする状態の誤り。C は演奏とは逆の「片付け」という動作、B は写っていない場所への言及。'
  ),
  p(
    'p1069',
    '🗄️📦🏭',
    '倉庫の棚に商品がぎっしりと収められている（人は写っていない）',
    [
      'Shelves are stocked with merchandise.',
      'Workers are taking inventory.',
      'Boxes are being lowered from a shelf.',
      'An aisle is blocked by a ladder.',
    ],
    [
      '棚に商品が収められている。',
      '作業員たちが棚卸しをしている。',
      '箱が棚から降ろされているところだ。',
      '通路がはしごでふさがれている。',
    ],
    0,
    '人のいない写真では are stocked（商品が収められている）という状態描写が正解。C の are being lowered は進行中の動作で人が必要。B・D は写っていない人物・物への言及。'
  ),
  p(
    'p1070',
    '👷📏🧱',
    '建設現場で作業員がメジャーで壁の寸法を測っている',
    [
      'A wall is being torn down.',
      'A worker is drilling a hole in the ceiling.',
      'A worker is measuring a wall.',
      'Paint cans are lined up along a wall.',
    ],
    [
      '壁が取り壊されているところだ。',
      '作業員が天井に穴を開けている。',
      '作業員が壁の寸法を測っている。',
      'ペンキ缶が壁沿いに並べられている。',
    ],
    2,
    'measure a wall（壁を測る）が動作を正しく描写。A・B は同じ場所（壁・天井）に対する別の作業という引っかけ。D は写っていない物への言及。'
  ),
  p(
    'p1071',
    '🐕🚶‍♂️🌳',
    '公園で男性が犬を連れて散歩している',
    [
      'A dog is being given a bath.',
      'A man is feeding some birds.',
      'A man is walking a dog in a park.',
      'A dog is running after a ball.',
    ],
    [
      '犬が体を洗われているところだ。',
      '男性が鳥に餌をやっている。',
      '男性が公園で犬を散歩させている。',
      '犬がボールを追いかけて走っている。',
    ],
    2,
    'walk a dog（犬を散歩させる）が動作と一致。D は同じ犬の別の動作という引っかけ。A・B は写っていない動作への言及。'
  ),
  p(
    'p1072',
    '🛎️🧳🏨',
    'ホテルでベルスタッフが荷物を載せたカートを押している',
    [
      'A bellhop is pushing a luggage cart.',
      'Suitcases are piled up at an entrance.',
      'A guest is signing a registration form.',
      'An elevator is being repaired.',
    ],
    [
      'ベルスタッフが荷物用カートを押している。',
      'スーツケースが入口に積み上げられている。',
      '宿泊客が宿泊カードに記入している。',
      'エレベーターが修理されているところだ。',
    ],
    0,
    'push a luggage cart が動作を正しく描写。B はカートに載っている荷物を「入口に積まれている」とする場所のすり替え。C・D は写っていない場面への言及。'
  ),
  p(
    'p1073',
    '💊🧾👩',
    '薬局のカウンターで客が薬剤師に処方箋を手渡している',
    [
      'A pharmacist is counting some pills.',
      'Medicine bottles are being labeled.',
      'A customer is reading a product label.',
      'A customer is handing a prescription to a pharmacist.',
    ],
    [
      '薬剤師が錠剤を数えている。',
      '薬の瓶にラベルが貼られているところだ。',
      '客が商品のラベルを読んでいる。',
      '客が薬剤師に処方箋を手渡している。',
    ],
    3,
    'hand a prescription（処方箋を手渡す）が動作と一致。A は受け取った後に起こりそうな別の動作という引っかけ。B・C は写っていない動作への言及。'
  ),
  p(
    'p1074',
    '💻📚🧑',
    '図書館の検索コーナーで男性がパソコンを使っている',
    [
      'Computers are being set up on desks.',
      'A man is using a computer in a library.',
      'A man is photocopying some pages.',
      'Keyboards have been unplugged from the monitors.',
    ],
    [
      'コンピューターが机に設置されているところだ。',
      '男性が図書館でコンピューターを使っている。',
      '男性がページをコピーしている。',
      'キーボードがモニターから外されている。',
    ],
    1,
    'use a computer が動作を正しく描写。A は既設の機器を「設置中」とする状態と動作の混同。C は図書館で起こりうる別の動作、D は写っていない状態への言及。'
  ),
  p(
    'p1075',
    '🥖👨‍🍳🫓',
    'パン職人が作業台で生地をこねている',
    [
      'A baker is kneading some dough.',
      'Bread is being taken out of an oven.',
      'A baker is decorating a cake.',
      'Flour is being poured into a bowl.',
    ],
    [
      'パン職人が生地をこねている。',
      'パンがオーブンから取り出されているところだ。',
      'パン職人がケーキをデコレーションしている。',
      '小麦粉がボウルに注がれているところだ。',
    ],
    0,
    'knead dough（生地をこねる）が動作と一致。B・D はパン作りの別の工程という引っかけ。C は同一人物の写っていない別の作業への言及。'
  ),
  p(
    'p1076',
    '🚗🅿️🏢',
    '車が1台、立体駐車場の入口に入ろうとしている',
    [
      'A parking lot is completely full.',
      'A driver is paying at a toll booth.',
      'A car is being lifted by a crane.',
      'A car is entering a parking garage.',
    ],
    [
      '駐車場が満車になっている。',
      '運転手が料金所で支払いをしている。',
      '車がクレーンで吊り上げられているところだ。',
      '車が立体駐車場に入ろうとしている。',
    ],
    3,
    'enter a parking garage が動作を正しく描写。A は写真からは断定できない状態の言及。B は駐車場から連想される別の場面、C は写っていない動作への言及。'
  ),
  p(
    'p1077',
    '🚣🌊🌲',
    '湖で人々がボートを漕いでいる',
    [
      'Boats are tied up at a dock.',
      'Some people are rowing a boat.',
      'People are swimming across a lake.',
      'A boat is being loaded onto a trailer.',
    ],
    [
      'ボートが桟橋につながれている。',
      '何人かの人がボートを漕いでいる。',
      '人々が湖を泳いで渡っている。',
      'ボートがトレーラーに載せられているところだ。',
    ],
    1,
    'row a boat（ボートを漕ぐ）が動作と一致。A は使用中のボートを「係留されている」とする状態の誤り。C は湖で連想される別の活動、D は写っていない動作への言及。'
  ),
  p(
    'p1078',
    '📚👨‍💼🗄️',
    'オフィスで男性が棚のバインダーを整理している',
    [
      'Binders are being thrown away.',
      'A man is searching through a drawer.',
      'A man is organizing binders on a shelf.',
      'A bookcase is being carried into an office.',
    ],
    [
      'バインダーが捨てられているところだ。',
      '男性が引き出しの中を探している。',
      '男性が棚のバインダーを整理している。',
      '本棚がオフィスに運び込まれているところだ。',
    ],
    2,
    'organize binders on a shelf が動作を正しく描写。A は同じ物（バインダー）に対する別の動作という引っかけ。B は場所（棚 vs 引き出し）のすり替え、D は写っていない動作。'
  ),
  p(
    'p1079',
    '🚃📰🧑',
    '電車の車内で乗客たちが新聞や本を読んでいる',
    [
      'Passengers are getting off a train.',
      'Some passengers are reading in a train car.',
      'Newspapers are being sold on a platform.',
      'A conductor is checking tickets.',
    ],
    [
      '乗客たちが電車から降りている。',
      '何人かの乗客が車内で読み物をしている。',
      '新聞がホームで売られているところだ。',
      '車掌が切符を確認している。',
    ],
    1,
    'read in a train car が場面を正しく描写。A・D は電車で連想される別の場面という引っかけ。C は写っている物（新聞）を使った別の場所・動作へのすり替え。'
  ),
  p(
    'p1080',
    '⛱️🪑🌤️',
    '誰もいないテラスで、テーブルの上にパラソルが開かれている',
    [
      'Umbrellas have been opened above the tables.',
      'People are dining on a patio.',
      'Umbrellas are being folded up.',
      'Tables are being wiped by a server.',
    ],
    [
      'テーブルの上にパラソルが開かれている。',
      '人々がテラスで食事をしている。',
      'パラソルがたたまれているところだ。',
      'テーブルが給仕係に拭かれているところだ。',
    ],
    0,
    '完了の受動態 have been opened が「開かれた状態」を正しく表す。C の are being folded は逆方向の動作かつ進行中で不正解。B・D は人のいない写真では成立しない。'
  ),
  p(
    'p1081',
    '📦🏭➡️',
    '工場でベルトコンベアの上を箱が流れている（人は写っていない）',
    [
      'Workers are placing boxes on a belt.',
      'A conveyor belt has broken down.',
      'Boxes are being transported on a conveyor belt.',
      'Cartons are being opened for inspection.',
    ],
    [
      '作業員たちがベルトに箱を載せている。',
      'ベルトコンベアが故障して止まっている。',
      '箱がベルトコンベアで運ばれているところだ。',
      '段ボール箱が検品のために開けられているところだ。',
    ],
    2,
    '機械が動かす場面では進行受動態 are being transported が人がいなくても成立する点がポイント。B は稼働中の設備を「故障」とする状態の誤り。A・D は写っていない人物・動作への言及。'
  ),
  p(
    'p1082',
    '🏥🪑🧑‍🤝‍🧑',
    '病院の待合室で患者たちが座って順番を待っている',
    [
      'Patients are being led into examination rooms.',
      'A receptionist is calling out a name.',
      'Magazines are scattered on the floor.',
      'People are waiting in a waiting area.',
    ],
    [
      '患者たちが診察室に案内されているところだ。',
      '受付係が名前を呼んでいる。',
      '雑誌が床に散らばっている。',
      '人々が待合スペースで待っている。',
    ],
    3,
    'wait in a waiting area が状態を正しく描写。A・B は待合室で連想される「次に起こりそうな」場面の引っかけ。C は写っていない状態への言及。'
  ),
  p(
    'p1083',
    '✉️👩‍💼📮',
    'オフィスで女性が手紙を封筒に入れている',
    [
      'A woman is putting letters into envelopes.',
      'A woman is opening her mail.',
      'Envelopes are being dropped into a mailbox.',
      'Stamps are being sorted into boxes.',
    ],
    [
      '女性が手紙を封筒に入れている。',
      '女性が届いた郵便物を開けている。',
      '封筒がポストに投函されているところだ。',
      '切手が箱に仕分けされているところだ。',
    ],
    0,
    'put letters into envelopes が動作と一致。B は同じ物（郵便物）に対する逆方向の動作（封入 vs 開封）の引っかけ。C・D は写っていない場所・動作への言及。'
  ),
  p(
    'p1084',
    '📄👨‍💼👨‍💼',
    '会議室で2人の男性が1つの書類を一緒に確認している',
    [
      'Two men are shaking hands across a table.',
      'Two men are reviewing a document together.',
      'A contract is being signed.',
      'One of the men is answering a phone call.',
    ],
    [
      '2人の男性がテーブル越しに握手している。',
      '2人の男性が一緒に書類を確認している。',
      '契約書に署名されているところだ。',
      '男性の1人が電話に出ている。',
    ],
    1,
    'review a document together が場面を正しく描写。C は同じ書類に対する「次に起こりそうな」動作の引っかけ。A・D はビジネスの場面で連想される写っていない動作。'
  ),
  p(
    'p1085',
    '☕🧑💳',
    'カフェのカウンターで客が店員に注文している',
    [
      'A customer is carrying a tray to a table.',
      'A menu board is being updated.',
      'A customer is ordering at a counter.',
      'A barista is restocking some cups.',
    ],
    [
      '客がトレーをテーブルに運んでいる。',
      'メニューボードが書き換えられているところだ。',
      '客がカウンターで注文している。',
      'バリスタがカップを補充している。',
    ],
    2,
    'order at a counter が動作と一致。A は注文後に起こりそうな別の動作という引っかけ。B・D は写っていない動作への言及。'
  ),
  p(
    'p1086',
    '🧾🏪🛒',
    'レジで店員が商品のバーコードをスキャンしている',
    [
      'A customer is counting her change.',
      'Groceries are being put into paper bags.',
      'A price tag is being attached to an item.',
      'A cashier is scanning items at a register.',
    ],
    [
      '客がお釣りを数えている。',
      '食料品が紙袋に詰められているところだ。',
      '商品に値札が付けられているところだ。',
      'レジ係がレジで商品をスキャンしている。',
    ],
    3,
    'scan items at a register が動作を正しく描写。B は会計時に連想される別の作業という引っかけ。A・C は写っていない動作への言及。'
  ),
  p(
    'p1087',
    '🧳🛬🔄',
    '空港の手荷物受取所で旅行者たちがターンテーブルから荷物を取っている',
    [
      'Luggage is being checked in at a counter.',
      'Travelers are picking up bags from a carousel.',
      'Carts are being pushed toward an exit.',
      'A traveler is opening his suitcase on the floor.',
    ],
    [
      '荷物がカウンターで預けられているところだ。',
      '旅行者たちがターンテーブルから荷物を取っている。',
      'カートが出口に向かって押されているところだ。',
      '旅行者が床でスーツケースを開けている。',
    ],
    1,
    'pick up bags from a carousel が動作と一致。A は同じ荷物に対する逆方向の場面（受け取り vs 預け入れ）の引っかけ。C・D は写っていない動作への言及。'
  ),
  p(
    'p1088',
    '🚲🛑🏙️',
    '通り沿いの柵に自転車が数台つながれて停められている（人は写っていない）',
    [
      'Bicycles are chained to a railing.',
      'A man is riding a bicycle on the street.',
      'Bicycles are being repaired at a shop.',
      'A cyclist is putting on a helmet.',
    ],
    [
      '自転車が柵につながれている。',
      '男性が通りで自転車に乗っている。',
      '自転車が店で修理されているところだ。',
      '自転車に乗る人がヘルメットをかぶろうとしている。',
    ],
    0,
    '人のいない写真では are chained（つながれている）という状態の受動態が正解。B・D は写っていない人物への言及。C は同じ物（自転車）への写っていない動作の引っかけ。'
  ),
  p(
    'p1089',
    '📦🧑‍🔧🎁',
    '倉庫で作業員がパレットの荷物をラップで巻いている',
    [
      'Pallets are stacked near a loading dock.',
      'A worker is cutting open a package.',
      'A shipment is being canceled.',
      'A worker is wrapping a pallet in plastic.',
    ],
    [
      'パレットが搬入口の近くに積まれている。',
      '作業員が荷物を切り開けている。',
      '出荷が取り消されているところだ。',
      '作業員がパレットをラップで巻いている。',
    ],
    3,
    'wrap a pallet in plastic が動作を正しく描写。B は梱包とは逆方向の動作（包む vs 開ける）の引っかけ。A は動作中の対象を単なる状態とする誤り、C は写真から判断できない内容。'
  ),
  p(
    'p1090',
    '🏢🏗️🪜',
    '建物の周囲に足場が組まれている（人は写っていない）',
    [
      'Workers are climbing up scaffolding.',
      'A building is being painted.',
      'Scaffolding has been erected around a building.',
      'Construction equipment is being delivered.',
    ],
    [
      '作業員たちが足場を登っている。',
      '建物にペンキが塗られているところだ。',
      '建物の周囲に足場が組まれている。',
      '建設機材が搬入されているところだ。',
    ],
    2,
    '完了の受動態 has been erected が「組まれた状態」を正しく表す。A は人のいない写真では不正解。B・D の is being 〜 は進行中の作業を表し、写真の静的な状態と合わない。'
  ),
  p(
    'p1091',
    '⛲🪑🧑‍🤝‍🧑',
    '広場の噴水のそばで人々がベンチに座っている',
    [
      'People are sitting near a fountain.',
      'A fountain is being cleaned.',
      'Children are throwing coins into a fountain.',
      'Water is being turned off for maintenance.',
    ],
    [
      '人々が噴水の近くに座っている。',
      '噴水が清掃されているところだ。',
      '子どもたちが噴水に硬貨を投げ入れている。',
      '点検のため水が止められているところだ。',
    ],
    0,
    'sit near a fountain が状態を正しく描写。B・D は稼働中の噴水を「清掃・停止中」とする状態の誤り。C は噴水から連想される写っていない動作への言及。'
  ),
  p(
    'p1092',
    '🏨🍽️🚪',
    'ホテルの廊下で従業員がルームサービスのトレーを運んでいる',
    [
      'Trays have been left outside the doors.',
      'A server is carrying a tray down a hallway.',
      'A guest is ordering room service by phone.',
      'Dishes are being collected from the rooms.',
    ],
    [
      'トレーがドアの外に置かれたままになっている。',
      '従業員が廊下でトレーを運んでいる。',
      '宿泊客が電話でルームサービスを注文している。',
      '食器が客室から回収されているところだ。',
    ],
    1,
    'carry a tray down a hallway が動作と一致。A は運ばれているトレーを「置かれたまま」とする状態と動作の混同。D は逆方向の場面（配膳 vs 回収）、C は写っていない人物への言及。'
  ),
  p(
    'p1093',
    '🩺👩‍⚕️💪',
    '診察室で看護師が患者の血圧を測っている',
    [
      'A patient is rolling up his sleeve.',
      'An injection is being prepared.',
      'A nurse is taking a patient\'s blood pressure.',
      'A nurse is updating a medical chart.',
    ],
    [
      '患者が袖をまくり上げている。',
      '注射の準備がされているところだ。',
      '看護師が患者の血圧を測っている。',
      '看護師がカルテを更新している。',
    ],
    2,
    'take a patient\'s blood pressure（血圧を測る）が動作と一致。A は測定前に起こる別の動作という引っかけ。B・D は診察室で連想される写っていない動作への言及。'
  ),
  p(
    'p1094',
    '📚🛒🏛️',
    '図書館の通路にあるカートに本が積まれている（人は写っていない）',
    [
      'A librarian is pushing a cart between shelves.',
      'Books are being checked out at a desk.',
      'Book covers are being replaced.',
      'Books have been piled on a cart.',
    ],
    [
      '司書が棚の間でカートを押している。',
      '本がカウンターで貸し出されているところだ。',
      '本のカバーが交換されているところだ。',
      '本がカートに積まれている。',
    ],
    3,
    '完了の受動態 have been piled が「積まれた状態」を正しく表す。A は人のいない写真では不正解。B・C の is being 〜 は進行中の動作で人が必要になるため誤り。'
  ),
  p(
    'p1095',
    '🍽️👨🫧',
    'キッチンで男性が食器洗い機に皿を入れている',
    [
      'A man is drying dishes with a towel.',
      'A man is loading a dishwasher.',
      'A faucet has been left running.',
      'Glasses are being lined up on a shelf.',
    ],
    [
      '男性がタオルで皿を拭いている。',
      '男性が食器洗い機に皿を入れている。',
      '蛇口の水が出しっぱなしになっている。',
      'グラスが棚に並べられているところだ。',
    ],
    1,
    'load a dishwasher（食器洗い機に入れる）が動作と一致。A は同じ食器に対する別の動作という引っかけ。C・D は写っていない状態・動作への言及。'
  ),
  p(
    'p1096',
    '🚗🔧👨‍🔧',
    '整備工場で整備士が持ち上げられた車の下を点検している',
    [
      'A mechanic is working underneath a vehicle.',
      'A car is being test-driven on a road.',
      'Tires are stacked outside a garage.',
      'A mechanic is filling out an invoice.',
    ],
    [
      '整備士が車の下で作業している。',
      '車が路上で試運転されているところだ。',
      'タイヤがガレージの外に積まれている。',
      '整備士が請求書に記入している。',
    ],
    0,
    'work underneath a vehicle が場面を正しく描写。B は整備中の車を「走行中」とする動作の誤り。C は写っていない物、D は同一人物の写っていない別動作への言及。'
  ),
  p(
    'p1097',
    '🥾⛰️🌲',
    'ハイカーたちが山道を歩いている',
    [
      'Climbers are setting up a campsite.',
      'A trail is being cleared of fallen trees.',
      'People are taking photos of a waterfall.',
      'Some hikers are walking along a trail.',
    ],
    [
      '登山者たちがキャンプ場を設営している。',
      '倒木が山道から取り除かれているところだ。',
      '人々が滝の写真を撮っている。',
      '何人かのハイカーが山道を歩いている。',
    ],
    3,
    'walk along a trail（山道を歩く）が動作と一致。A・C は山で連想される別の活動という引っかけ。B は写っていない作業への言及。'
  ),
  p(
    'p1098',
    '🖥️🪑🌃',
    '誰もいない夜のオフィスで、椅子が机の下に押し込まれ、モニターの電源が消えている',
    [
      'Employees are working overtime.',
      'The lights are being switched off.',
      'Some chairs have been pushed under the desks.',
      'Computers are being shut down.',
    ],
    [
      '従業員たちが残業している。',
      '照明が消されているところだ。',
      '椅子が机の下に押し込まれている。',
      'コンピューターの電源が落とされているところだ。',
    ],
    2,
    '完了の受動態 have been pushed が「片付けられた状態」を正しく表す。B・D の are being 〜 は「今まさに消している最中」で人が必要。A は人のいない写真と矛盾する。'
  ),
  p(
    'p1099',
    '🥤🧑‍💼🍽️',
    'レストランで給仕係が客のグラスに水を注ぎ足している',
    [
      'A server is refilling a glass with water.',
      'A pitcher has been placed on a counter.',
      'A customer is asking for the check.',
      'Ice is being scooped into a bucket.',
    ],
    [
      '給仕係がグラスに水を注ぎ足している。',
      'ピッチャーがカウンターに置かれている。',
      '客が会計を頼んでいる。',
      '氷がバケツにすくい入れられているところだ。',
    ],
    0,
    'refill a glass with water が動作を正しく描写。B は使用中のピッチャーを「置かれている」とする状態の誤り。C・D はレストランで連想される写っていない動作への言及。'
  ),
  p(
    'p1100',
    '🚌🧍🧍‍♀️',
    'バス停で人々が列を作ってバスに乗ろうとしている',
    [
      'A bus is pulling away from a curb.',
      'People are lining up to board a bus.',
      'Passengers are paying their fares.',
      'A bus schedule is being posted.',
    ],
    [
      'バスが縁石から発車している。',
      '人々がバスに乗るために列を作っている。',
      '乗客たちが運賃を払っている。',
      'バスの時刻表が掲示されているところだ。',
    ],
    1,
    'line up to board a bus が場面を正しく描写。A は停車中のバスを「発車中」とする動作の誤り。C は乗車後に起こる別の場面、D は写っていない動作への言及。'
  ),
];
