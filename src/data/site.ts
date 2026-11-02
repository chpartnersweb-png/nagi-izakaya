const mapAddress = '東京都荒川区西日暮里2-25-1 ステーションガーデンタワー';

export const site = {
  name: '凪 居酒屋',
  telephone: '080-2035-0948',
  telephoneHref: 'tel:08020350948',
  postalCode: '116-0013',
  address: '東京都荒川区西日暮里2-25-1',
  building: 'ステーションガーデンタワー3階',
  access: '日暮里駅直結・徒歩1分',
  instagram: 'https://www.instagram.com/nagiizakaya1/',
  instagramHandle: '@nagiizakaya1',
  tabelog: 'https://tabelog.com/tokyo/A1311/A131105/13327359/',
  // Place ID未確認のため、提供住所を目的地として使用。
  map: 'https://www.google.com/maps/dir/?api=1&destination=' + encodeURIComponent(mapAddress),
  mapEmbed: 'https://www.google.com/maps?q=' + encodeURIComponent(mapAddress) + '&hl=ja&z=16&output=embed',
  hours: [
    { days: '平日', time: '17:00—23:00' },
    { days: '土日祝', time: '15:00—23:00' },
  ],
};

export const navigation = [
  { href: '#about', label: '凪について' },
  { href: '#menu', label: 'お品書き' },
  { href: '#course', label: 'コース' },
  { href: '#sake', label: '日本酒' },
  { href: '#space', label: '店内' },
  { href: '#access', label: 'アクセス' },
];
