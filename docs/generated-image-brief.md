# 生成画像の記録

作成日：2026-11-02。組み込み image_gen ツールを使用。両画像とも今回新規生成した試作素材で、ページへの組み込みは未実施。

## ヒーロー

- 保存先：src/assets/generated/nagi-hero-concept-v1.png
- 用途：フルスクリーンヒーローの背景候補
- 実店舗の撮影画像・実際の商品写真ではない。具体的なメニュー名や価格と結び付けず、掲載時は「イメージビジュアル」と表示する。
- PCとスマートフォンの実際の切り抜き・ロゴの読みやすさは実装時に確認する。

### 使用プロンプト（原文）

Use case: photorealistic-natural. Asset type: wide full-viewport background concept image for the Japanese izakaya restaurant 凪 居酒屋, a mood illustration, not documentation of the real premises or an actual menu item. Primary request: communicate the intimate warmth of a Japanese meal through light, natural steam and tactile ceramics. Landscape 16:9 composition, dark warm wooden dining table, a simple rustic earthenware donabe with its lid slightly lifted by an anonymous hand at the far right edge, a modest plume of natural steam, one plain clear sake glass catching amber light in the foreground. Only a little indistinct cooked white rice visible at the lid opening; no invented elaborate seafood dish. Close low photographic viewpoint, intimate real-life editorial food photography with imperfect natural textures, inviting and approachable rather than luxury fine dining. Pot occupies the lower middle, organically balanced objects across the frame; upper center has calm, low-detail dark negative space for a centered website logo. Warm honey highlights, deep brown shadows, a subtle muted blue-gray ceramic accent, soft practical lighting. Background is abstract deep blur without identifiable architecture, people or signage. No lettering, logos, watermark, graphical frames, price tags, website UI, collage or split-screen. Keep image usable under a restrained dark overlay, preserve visible texture and food warmth. This is a standalone atmosphere concept.

## ロゴ

- 保存先：src/assets/generated/nagi-logo-sumi-v1.png
- 用途：大きな「凪」の下に小さな「居酒屋」を配置した新規ロゴ候補
- 透明背景指定の墨色版。看板を切り抜いたものではない。
- 白系表示はCSSで処理し、原本を保持する。

### 使用プロンプト（原文）

Use case: logo-brand. Asset type: transparent PNG master logo for Japanese restaurant 凪 居酒屋. Design one single original typographic mark only on a genuinely transparent background. Exact text: a very large Japanese kanji "凪" on top, and the smaller Japanese word "居酒屋" horizontally centered beneath it. The character 凪 must have the correct readable strokes, especially the inner 止 under the enclosing wind radical 几. Confident hand-brushed Japanese sumi ink, warm human rhythm, restrained and contemporary, balanced broad strokes with subtle dry-brush edges, very clear even at small website-header size. Smaller 居酒屋 in readable restrained Japanese lettering, about one fourth the large character's width per text line, spaced evenly and centered below. All ink is dark charcoal near #28231E. Compact portrait composition with modest transparent margins, isolated mark, no white paper rectangle, no wood, no sign photograph, no mockup, no wave or fish drawing, no red stamp, no English, no decorative border, no tagline, no extra characters. Do not reproduce an existing storefront sign; generate fresh lettering.

