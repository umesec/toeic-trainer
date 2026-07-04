# iOS リリース手順

App Store でのリリースに必要な手順のチェックリスト。上から順に進める。

## 0. 事前準備（アカウント）

- [ ] **Apple Developer Program に登録**（年間 $99 / 約15,000円）
  - https://developer.apple.com/programs/enroll/ から Apple ID で登録
  - 個人開発者として登録（法人でなければ「Individual」を選択）
  - **審査に1〜2営業日かかることがあるため最優先で申請する**
- [ ] **Expo アカウントを作成**（無料）: https://expo.dev/signup

## 1. プライバシーポリシーの公開（App Store 必須）

`docs/privacy-policy.html` を用意済み。GitHub Pages で公開する:

1. GitHub のリポジトリ → Settings → Pages
2. Source: 「Deploy from a branch」/ Branch: `main` / フォルダ: `/docs` → Save
3. 数分後に `https://umesec.github.io/toeic-trainer/privacy-policy.html` で公開される
4. この URL を App Store Connect の「プライバシーポリシーURL」に登録する

※ リポジトリが private の場合、GitHub Pages は有料プランが必要。
   その場合は Vercel / Netlify などで docs/ を公開しても良い。

## 2. EAS Build のセットアップ

```bash
npm install -g eas-cli     # または npx eas-cli で都度実行
eas login                  # Expo アカウントでログイン
eas build:configure        # プロジェクトを EAS にリンク（eas.json は作成済み）
```

## 3. 本番ビルド（Apple Developer 登録完了後）

```bash
eas build --platform ios --profile production
```

- 初回は Apple ID でのログインを求められ、証明書・プロビジョニングは EAS が自動管理する
- ビルドは Expo のクラウドで行われる（Mac のローカル環境は不要）
- 完了すると .ipa が生成される

## 4. TestFlight で動作確認

```bash
eas submit --platform ios --latest
```

- App Store Connect に自動アップロードされる
- App Store Connect → TestFlight → 内部テスターに自分を追加して実機確認
- **確認観点**: 音声再生（アクセントMIX含む）/ 通知許可と19時リマインド /
  模試のタイマー / データのエクスポート・インポート / ダークモード表示

## 5. App Store Connect でアプリ情報を登録

https://appstoreconnect.apple.com → マイアプリ → 新規アプリ

| 項目 | 内容（案） |
|------|-----------|
| 名前 | TOEICトレーナー — 900点対策 |
| サブタイトル | 単語6000語・模試・リスニング対策 |
| カテゴリ | 教育 |
| 価格 | 無料 |
| 年齢制限 | 4+ |

**説明文（案）**:

> TOEIC® L&R テストのスコアアップに必要な学習をこれ1本で。
>
> ◆ 900点レベルまで対応した6,000語の単語カード（SRS間隔反復）
> ◆ 全Part対応の演習問題 1,000問以上
> ◆ 本番と同じ200問・2時間のフル模試（推定スコア付き）
> ◆ 米・英・豪のアクセントを使い分けるリスニング練習
> ◆ 目標スコアと試験日から毎日の学習メニューを自動生成
> ◆ 間違えた問題は自動で「間違いノート」に。忘れた頃に再出題
> ◆ 実績バッジ・学習カレンダーで毎日続けたくなる
>
> 学習データはすべて端末内に保存。アカウント登録不要・広告なし。
>
> TOEIC is a registered trademark of ETS (Educational Testing Service).
> This app is not endorsed or approved by ETS.

**キーワード（案）**: `TOEIC,英語,単語,リスニング,模試,英単語,勉強,テスト対策,900点`

**App のプライバシー**（App Store Connect の質問への回答）:
- データ収集: **「データを収集しない」** を選択
  （すべての学習データは端末内のみ・外部送信なし・トラッキングなし）

**スクリーンショット**: 6.9インチ（iPhone 16 Pro Max 等）が必須。
シミュレータで以下の画面を撮ると内容が伝わりやすい:
1. ホーム（今日のメニュー + 学習プラン）
2. 単語カード（スワイプ画面）
3. 模試の結果（推定スコア）
4. マイページ（実績バッジ + 学習カレンダー）
5. リスニング練習

## 6. 審査提出時の注意

- **商標**: アプリ名に「TOEIC」を含むため、審査で商標関連の指摘を受ける可能性がある。
  説明文に上記の ETS 商標ディスクレーマーを必ず含めること。
  指摘された場合はアプリ名を「英語トレーナー — TOEIC®対策」のように
  「対策アプリであること」が明確な形へ変更して再提出する。
- **審査メモ**: 「すべての機能はオフラインで動作し、アカウントは不要です」と
  書いておくとデモアカウント要求を避けられる。

## 7. リリース後のバージョンアップ

```bash
# app.json の version を上げる（例: 1.0.1）。buildNumber は EAS が自動インクリメント
eas build --platform ios --profile production
eas submit --platform ios --latest
```

## 既知の未対応項目（今後）

- [ ] Android 版（`android.package` の追加と adaptive icon の差し替えが必要）
- [ ] Android のテンプレートアイコン（assets/images/android-icon-*.png）が未差し替え
- [ ] アプリ内から プライバシーポリシー への リンク追加（設定画面など・任意）
