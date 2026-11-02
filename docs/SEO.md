# 凪 居酒屋｜SEO設定

作業日：2026-11-02（日本時間）

対象URL： https://nagi-izakaya.pages.dev/

## 実装内容

| 対象 | 設定 |
| --- | --- |
| 公開URL | src/config/seo.mjsのSITE_URLを管理元としてAstroのsiteにも設定 |
| title | 凪 居酒屋｜日暮里駅直結・魚料理と日本酒、宴会に |
| description | 店舗名、日暮里駅直結、魚と米、日本酒20種以上、鍋・お造り・土鍋ご飯、飲み放題付きコース、40席と予約導線を自然な文章で紹介 |
| canonical | https://nagi-izakaya.pages.dev/ に固定。クエリや閲覧ホスト名を混在させない |
| OGP | title／description／site_name／locale／url／image／画像寸法／画像形式／alt |
| X向けカード | summary_large_image、title、description、image、image:alt |
| favicon | 生成ロゴをAstroで64px PNGへ最適化 |
| 構造化データ | Restaurant、WebSite、WebPage、ImageObjectをJSON-LDで関連付け |
| robots.txt | クロール許可とサイトマップの場所を出力 |
| sitemap.xml | トップページの正規URLだけを出力 |
| 見出し | H1のアクセシブルな名前に店舗名を含める。ヒーローの見た目と文字量は維持 |

## 店舗の構造化データ

名称・電話・住所・営業時間・支払い方法・予約先・Instagram・食べログ・メニューへのリンクを記載。本文に表示する営業時間と構造化データの営業時間はsrc/data/site.tsの同じデータを参照する。

- 平日：17:00〜23:00
- 土日祝：15:00〜23:00
- 祝日はSchema.orgのPublicHolidaysとして設定。祝日の営業時間が通常の曜日より優先される意味を持つ。各検索サービスでの解釈・表示は未検証。
- 店舗名・営業時間・席数等はクライアント提供内容を基準とする。以前確認した食べログとの相違を自動で上書きしない。
- Restaurantのimageには提供された料理集合写真と内観を使用する。生成ヒーローを実際の商品・店舗写真として登録しない。
- 架空の口コミ、aggregateRating、未確認の座標、予算帯、料理写真の品名対応、在庫状況は追加しない。
- 構造化データは基本情報を整理するもので、検索結果への特別な表示を保証するものではない。

## OGP画像

src/assets/S__49111058_0.jpgの料理集合写真を使用。元画像660×370pxを尊重してJPEGを生成し、正規ドメインの絶対URLとして出力。低解像度の画像を1200pxへ引き伸ばしていない。WebPageの主画像とOGPで同じ実写を参照する。

## サイトマップとrobots.txt

- https://nagi-izakaya.pages.dev/sitemap.xml
- https://nagi-izakaya.pages.dev/robots.txt

src/pages内の静的エンドポイントからビルド時に生成する。メニューやコースのアンカーは独立ページではないためサイトマップに列挙しない。食べログ等の外部URLもサイトマップには含めない。正確な更新日を管理していないため、ビルド日をlastmodとして出力しない。

## 編集箇所

- 公開URL・検索用文章：src/config/seo.mjs
- 店舗情報・表示／構造化データ共用の営業時間：src/data/site.ts
- メタデータとJSON-LD：src/components/Seo.astro
- サイト設定：astro.config.mjs
- robots.txt：src/pages/robots.txt.ts
- sitemap.xml：src/pages/sitemap.xml.ts

## 反映・確認の状態

今回はソースへの実装まで。公開URL・robots.txt・sitemap.xmlの取得を試みたが、取得ツールではアクセスできず、公開中のHTMLやHTTPレスポンスの状態を確認できなかった。これをサイトの不具合・404・未公開の証拠とは扱わない。

ユーザーの指示を引き継ぎ、変更後のビルド・型チェック・ブラウザ確認・構造化データ検証・再デプロイは実施していない。公開サイトへ反映するには、この変更を含むCloudflare Pagesのデプロイが必要。

反映後にユーザーが行う作業：Search ConsoleでURLプレフィックス https://nagi-izakaya.pages.dev/ の所有権を確認し、sitemap.xmlを送信する。URL検査でGoogleによる取得状況とインデックス登録を確認する。所有権確認コードは未提供のため、仮のタグを追加していない。

## 参照した公式資料

- Astro Routing: https://docs.astro.build/en/guides/routing/
- Astro Endpoints: https://docs.astro.build/en/guides/endpoints/
- Google LocalBusiness: https://developers.google.com/search/docs/appearance/structured-data/local-business
- Google Site names: https://developers.google.com/search/docs/appearance/site-names
- Schema.org PublicHolidays: https://schema.org/PublicHolidays
