// 2026-11-02：ユーザー指定の食べログ店舗トップに掲載された情報。
// 個別詳細ページは取得できていないため、時間制限・L.O.・献立全品等は補完しない。
export const courseSource = 'https://tabelog.com/tokyo/A1311/A131105/13327359/';
export const courses = [
  {
    number: '01',
    name: '凪の極上魚宴コース',
    label: '魚料理を楽しむなら',
    price: 6600,
    dishes: '全8品',
    people: '4〜50名様',
    includes: '飲み放題付き',
    description: 'お刺身盛り合わせ、本日の牡蠣、鮮魚月見ユッケなど。魚料理を楽しみたい集まりに。',
  },
  {
    number: '02',
    name: '凪の贅沢魚鍋コース',
    label: 'みんなで鍋を囲むなら',
    price: 5500,
    dishes: '全7品',
    people: '4〜40名様',
    includes: '飲み放題付き',
    description: '海鮮鍋やお刺身盛り合わせを、種類豊富なドリンクとともに。食卓を囲んで楽しむコースです。',
  },
  {
    number: '03',
    name: '日本酒も飲める飲み放題コース',
    label: '料理はお好みで選びたい方へ',
    price: 2748,
    dishes: null,
    people: '4〜50名様',
    includes: '飲み放題プラン',
    description: '獺祭純米大吟醸・紀土純米吟醸など、厳選した20種類の日本酒を楽しめるプラン。料理はご自身で選びたい方に。',
  },
];
