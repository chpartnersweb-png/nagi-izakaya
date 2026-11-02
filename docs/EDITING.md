# 凪 居酒屋｜実装・編集メモ

2026-11-02：既存AstroプロジェクトにLPを実装。ユーザーの指示により、実装後のビルド・型チェック・ブラウザ表示・リンクの動作確認は実施していない。開発サーバーの起動、公開・デプロイも行っていない。

同日追記：ユーザー指定の食べログ店舗ページを参照して3プランのコースを追加。ヘッダー・コース欄・アクセス・フッターに食べログへのリンクを配置した。ヒーローは固定最小高・モバイルの高さ差し引きを廃止し、100dvhを優先する全画面表示へ変更。詳細はCOURSE-SOURCES.mdを参照。今回も実装後の確認は省略。

同日追記：アクセス欄を「看板写真と店舗情報 → 横幅いっぱいのGoogleマップ → 予約・問い合わせ」の順に調整した。地図は住所を検索対象にしたiframe埋め込みで、店舗Place IDは未指定。PCでは地図上部に案内と経路リンクを横並び、スマートフォンでは縦並びにする。遅延読み込み・固定の表示領域・iframeのタイトルを設定。地図の表示確認はユーザー指定により省略。

## 主要な編集箇所

| 内容 | ファイル |
| --- | --- |
| ページ構成 | src/pages/index.astro |
| 店舗情報・電話・営業時間・SNS・地図 | src/data/site.ts |
| 指定5品の名称・価格 | src/data/menu.ts |
| ヒーロー | src/components/Hero.astro |
| お品書きと料理写真 | src/components/SignatureMenu.astro |
| 日本酒・店内・追加の料理写真 | src/components/SakeSection.astro、InteriorSection.astro、FoodGallery.astro |
| 店舗情報と電話CTA | src/components/AccessSection.astro |
| 色・余白・文字・レスポンシブ | src/styles/global.css |
| GSAP・Lenis・ナビゲーション | src/scripts/main.ts |
| title・description・OGP・favicon | src/layouts/BaseLayout.astro |

## 写真と商品名について

ユーザーから「どれがどの画像かは不明」との回答があり、指定5品と素材写真の対応は未確定。誤った商品写真の表示を避けるため、メニュー内の写真は独立した料理ギャラリーとし、「写真は料理の一例です」と表示した。各写真に指定商品の名前や価格は付けていない。5品の名称・価格は別のお品書きとして掲載している。

エビ麻辣鍋・土鍋ご飯の代用写真や、商品に見せかけた生成画像は作成していない。src/data/menu.tsのphotoは全てnullとしてある。正しい写真が判明した際は、画像のimport、商品データとの紐付け、SignatureMenu.astroの表示を更新する。単にphotoを設定するだけではレイアウトは変わらない。

素材の候補はasset-inventory.mdを参照。価格の税込／税別・注文単位・「通風鍋」の正式表記は未確認のため、提供情報をそのまま使用した。最大50名の利用条件は不明のため、席数は40席・全席テーブル・貸切可を掲載した。

## 画像

- 生成ヒーロー：src/assets/generated/nagi-hero-concept-v1.png
- 新規ロゴ：src/assets/generated/nagi-logo-sumi-v1.png
- その他はクライアント提供画像。原本の加工・上書きなし。
- ヒーローには「イメージビジュアル」と表示し、実際の商品・店内写真と区別。
- AstroのImageでWebP出力、画像寸法指定、下部画像の遅延読み込みを実装。
- ロゴは透明PNGを利用し、ヒーロー上の白版はCSSで表示。
- faviconはロゴからAstroのgetImageで64pxのPNGを生成する。

## アニメーションと操作

GSAP／ScrollTriggerでヒーローと各セクションの穏やかな表示アニメーションを実装。写真の器や具材が切れるのを避けるため、本文写真のパララックスは採用していない。PCの細かいポインター操作環境ではLenisを有効にし、GSAP tickerを共通の更新ループとして使う。スマートフォンは標準スクロール。prefers-reduced-motionではGSAPの移動・フェードとLenis、CSSアニメーションを停止する。

CSSの初期状態では本文は表示される。モバイルナビゲーションはdetails／summaryを使用し、JavaScript無効時でも開閉可能。JavaScriptではリンク選択・Esc・外側クリック・PC幅への変更で閉じる。スマートフォン下部は電話・地図の固定ボタン。セーフエリアと本文下余白を設けている。

## リンクとSEO

- 電話：tel:08020350948
- Instagram：提供されたNagiizakaya1から作成したURL。実在・店舗の対応は未検証。
- 地図：住所を検索対象にしたGoogleマップiframeを埋め込み。経路リンクも併設。src/data/site.tsのmapAddressを埋め込みと経路リンクで共用する。Place ID・店舗ピン・建物内の入口経路は未確認。
- 公開URL https://nagi-izakaya.pages.dev/ をsrc/config/seo.mjsに設定し、astro.config.mjsとSEO出力で共用する。
- title・description・canonical・OGP・X向けカード・Restaurant等のJSON-LDをsrc/components/Seo.astroへ集約。OGPには提供された実写の料理集合写真を使用する。
- robots.txtとsitemap.xmlを静的エンドポイントで追加。サイトマップはトップの正規URLのみを掲載する。
- SEOの実装内容・公開反映前の状態・引き継ぎはSEO.mdを参照。
- 検索順位・Search Console・インデックス登録は未確認。

## 開発サーバー

プロジェクトのAGENTS.mdに従い、起動はバックグラウンドで行う。

```powershell
npm run dev -- --background
```

管理は以下を使用する。

```powershell
npm run astro -- dev status
npm run astro -- dev logs
npm run astro -- dev stop
```

本作業ではこれらのコマンドを実行していない。
