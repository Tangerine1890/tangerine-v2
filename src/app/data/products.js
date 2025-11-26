const withMediaSources = (media = []) => media.map((url) => ([
  { url, quality: 1 },
]));

export const PRODUCTS = [
  {
    id: 't1',
    category: 'wpff',
    name: 'Tropicali',
    emoji: '🥭',
    badge: 'SOLD OUT 🔥',
    media: [
      'https://file.garden/aRCOOh-cGER2BR_t/PICALI00%20(1)%20(1).mp4',
      'https://file.garden/aRCOOh-cGER2BR_t/tropicali_2.mp4',
      'https://file.garden/aRCOOh-cGER2BR_t/tropicali_3.mp4'
    ],
    mediaSources: withMediaSources([
      'https://file.garden/aRCOOh-cGER2BR_t/PICALI00%20(1)%20(1).mp4',
      'https://file.garden/aRCOOh-cGER2BR_t/tropicali_2.mp4',
      'https://file.garden/aRCOOh-cGER2BR_t/tropicali_3.mp4'
    ]),
    posters: [
      'https://file.garden/aRCOOh-cGER2BR_t/IMG_1258_converted.avif',
      'https://file.garden/aRCOOh-cGER2BR_t/IMG_1259_converted.avif',
      'https://file.garden/aRCOOh-cGER2BR_t/IMG_1248.avif'
    ],
    thumbnail: 'https://file.garden/aRCOOh-cGER2BR_t/IMG_1241.avif',
    desc: 'Profil tropical intense avec notes de mangue fraîche et fruits exotiques. Effet énergisant et créatif.'
  },
  {
    id: 't2',
    category: 'wpff',
    name: 'Kush Mints',
    emoji: '🍵',
    media: [
      'https://file.garden/aRCOOh-cGER2BR_t/kush_1.mp4',
      'https://file.garden/aRCOOh-cGER2BR_t/kush_2.mp4'
    ],
    mediaSources: withMediaSources([
      'https://file.garden/aRCOOh-cGER2BR_t/kush_1.mp4',
      'https://file.garden/aRCOOh-cGER2BR_t/kush_2.mp4'
    ]),
    posters: [
      'https://file.garden/aRCOOh-cGER2BR_t/IMG_1239.avif',
      'https://file.garden/aRCOOh-cGER2BR_t/IMG_1243.avif'
    ],
    thumbnail: 'https://file.garden/aRCOOh-cGER2BR_t/IMG_1239.avif',
    desc: 'Arômes mentholés et terreux avec notes de cookies. Relaxation profonde et sensation apaisante prolongée.'
  },
  {
    id: 'ds5',
    category: 'doublestatic',
    name: 'Tropicana Cherry',
    emoji: '🍒',
    media: ['https://file.garden/aRCOOh-cGER2BR_t/cherry.mp4'],
    mediaSources: withMediaSources(['https://file.garden/aRCOOh-cGER2BR_t/cherry.mp4']),
    posters: ['https://file.garden/aRCOOh-cGER2BR_t/IMG_1252.avif'],
    thumbnail: 'https://file.garden/aRCOOh-cGER2BR_t/IMG_1252.avif',
    desc: 'Cerise tropicale juteuse et sucrée avec finale rafraîchissante. Équilibre parfait.'
  },
  {
    id: 'ds1',
    category: 'doublestatic',
    name: 'Tropi Tangie',
    emoji: '🍊',
    badge: 'SOLD OUT 🔥',
    media: ['https://file.garden/aRCOOh-cGER2BR_t/tropi_tangie.mp4'],
    mediaSources: withMediaSources(['https://file.garden/aRCOOh-cGER2BR_t/tropi_tangie.mp4']),
    posters: ['https://file.garden/aRCOOh-cGER2BR_t/IMG_1254.avif'],
    thumbnail: 'https://file.garden/aRCOOh-cGER2BR_t/IMG_1254.avif',
    desc: "Explosion d'agrumes et tangerine juteuse. Parfait pour la journée, énergisant et euphorisant."
  },
  {
    id: 'ds2',
    category: 'doublestatic',
    name: 'Miracle Alien Cookies',
    emoji: '🍪',
    media: ['https://file.garden/aRCOOh-cGER2BR_t/mac.mp4'],
    mediaSources: withMediaSources(['https://file.garden/aRCOOh-cGER2BR_t/mac.mp4']),
    posters: ['https://file.garden/aRCOOh-cGER2BR_t/IMG_1245%20(1).avif'],
    thumbnail: 'https://file.garden/aRCOOh-cGER2BR_t/IMG_1245%20(1).avif',
    desc: 'Saveur gourmande de cookies fraîchement cuits et crème onctueuse. Une expérience douce et réconfortante.'
  },
  {
    id: 'ds3',
    category: 'doublestatic',
    name: 'Tchikita Banana',
    emoji: '🍌',
    media: ['https://file.garden/aRCOOh-cGER2BR_t/banana.mp4'],
    mediaSources: withMediaSources(['https://file.garden/aRCOOh-cGER2BR_t/banana.mp4']),
    posters: ['https://file.garden/aRCOOh-cGER2BR_t/IMG_1247.avif'],
    thumbnail: 'https://file.garden/aRCOOh-cGER2BR_t/IMG_1247.avif',
    desc: 'Douceur fruitée de banane mûre avec finale sucrée. Effet relaxant et apaisant.'
  },
  {
    id: 'ds4',
    category: 'doublestatic',
    name: 'Gelato Cheesecake',
    emoji: '🍰',
    media: ['https://file.garden/aRCOOh-cGER2BR_t/cheesecake.mp4'],
    mediaSources: withMediaSources(['https://file.garden/aRCOOh-cGER2BR_t/cheesecake.mp4']),
    posters: ['https://file.garden/aRCOOh-cGER2BR_t/IMG_1253.avif'],
    thumbnail: 'https://file.garden/aRCOOh-cGER2BR_t/IMG_1253.avif',
    desc: 'Texture crémeuse et profil sucré avec arômes de dessert raffiné. Une douceur irrésistible.'
  },
  {
    id: 'ff1',
    category: 'freshfrozen',
    name: 'Grape Pie X Biscotti',
    emoji: '🍇',
    media: ['https://file.garden/aRCOOh-cGER2BR_t/grape.mp4'],
    mediaSources: withMediaSources(['https://file.garden/aRCOOh-cGER2BR_t/grape.mp4']),
    posters: ['https://file.garden/aRCOOh-cGER2BR_t/IMG_1246.avif'],
    thumbnail: 'https://file.garden/aRCOOh-cGER2BR_t/IMG_1246.avif',
    desc: 'Raisin doux mélangé à des notes de biscuits croquants. Harmonie subtile et saveur élégante.'
  },
  {
    id: 'acc1',
    category: 'accessoires',
    name: 'TerpWrap',
    emoji: '🟠',
    catalogOnly: true,
    media: ['https://file.garden/aRCOOh-cGER2BR_t/WRAP.mp4'],
    mediaSources: withMediaSources(['https://file.garden/aRCOOh-cGER2BR_t/WRAP.mp4']),
    posters: ['https://file.garden/aRCOOh-cGER2BR_t/IMG_1279.JPG'],
    thumbnail: 'https://file.garden/aRCOOh-cGER2BR_t/IMG_1279.JPG',
    desc: 'Protégez le drip. Préservez les terpènes. Emballage premium conçu pour garder vos concentrés purs, puissants et riches en terpènes.'
  },
  {
    id: 'acc2',
    category: 'accessoires',
    name: 'Wipes',
    emoji: '🧼',
    catalogOnly: true,
    media: ['https://file.garden/aRCOOh-cGER2BR_t/wipes.mp4'],
    mediaSources: withMediaSources(['https://file.garden/aRCOOh-cGER2BR_t/wipes.mp4']),
    posters: ['https://file.garden/aRCOOh-cGER2BR_t/IMG_1279.JPG'],
    thumbnail: 'https://file.garden/aRCOOh-cGER2BR_t/IMG_1279.JPG',
    desc: 'Fini les soucis collants. Élimine facilement les traces 🍯 ou 🍫 pour garder vos doigts impeccables.'
  },
  // --- PACKS CAN 2025 ---
  // --- PACKS CAN 2025 ---
  {
    id: 'pack_decouverte',
    category: 'packs_can',
    name: 'Pack Découverte',
    emoji: '🎁',
    price: 130,
    isPack: true,
    badge: 'NOUVEAU ✨',
    media: ['https://file.garden/aRCOOh-cGER2BR_t/D%C3%A9couverte.mp4'],
    posters: ['https://file.garden/aRCOOh-cGER2BR_t/D%C3%A9couverte.mp4'],
    thumbnail: 'https://file.garden/aRCOOh-cGER2BR_t/D%C3%A9couverte.mp4',
    desc: 'Ce pack contient : 7.5g Fresh Frozen + 7.5g Double Static. Profitez de cette sélection spéciale CAN 2025.',
    details: [
      '7.5g Fresh Frozen',
      '7.5g Double Static',
      'Sélection Variée'
    ]
  },
  {
    id: 'pack_supporter',
    category: 'packs_can',
    name: 'Pack Supporter',
    emoji: '⚽',
    price: 200,
    isPack: true,
    badge: 'POPULAIRE 🔥',
    media: ['https://file.garden/aRCOOh-cGER2BR_t/Supporters'],
    posters: ['https://file.garden/aRCOOh-cGER2BR_t/Supporters'],
    thumbnail: 'https://file.garden/aRCOOh-cGER2BR_t/Supporters',
    desc: 'Ce pack contient : 7.5g Fresh Frozen + 7.5g Double Static + 5g WPFF. La sélection idéale pour les supporters.',
    details: [
      '7.5g Fresh Frozen',
      '7.5g Double Static',
      '5g WPFF'
    ]
  },
  {
    id: 'pack_mvp',
    category: 'packs_can',
    name: 'Pack MVP',
    emoji: '🏆',
    price: 360,
    isPack: true,
    badge: 'PREMIUM 💎',
    media: ['https://file.garden/aRCOOh-cGER2BR_t/MVP.mp4'],
    posters: ['https://file.garden/aRCOOh-cGER2BR_t/MVP.mp4'],
    thumbnail: 'https://file.garden/aRCOOh-cGER2BR_t/MVP.mp4',
    desc: 'Ce pack contient : 20g Double Static + 10g WPFF. Le choix ultime pour les connaisseurs.',
    details: [
      '20g Double Static (4 variétés)',
      '10g WPFF',
      'Expérience Complète'
    ]
  }
];
