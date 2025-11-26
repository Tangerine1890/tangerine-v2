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
  {
    id: 'pack_decouverte',
    category: 'packs_can',
    name: 'Pack Découverte CAN',
    emoji: '🍇',
    price: 285,
    isPack: true,
    badge: 'CAN 2025 🏆',
    media: ['https://file.garden/aRCOOh-cGER2BR_t/pack_decouverte_can_retry_1764173714326.png'],
    posters: ['https://file.garden/aRCOOh-cGER2BR_t/pack_decouverte_can_retry_1764173714326.png'],
    thumbnail: 'https://file.garden/aRCOOh-cGER2BR_t/pack_decouverte_can_retry_1764173714326.png',
    desc: '30g de pur plaisir : 10g Fresh Frozen + 15g Double Static + 5g WPFF. Économisez 100€ !',
    details: [
      '10g Fresh Frozen (Grape Pie)',
      '15g Double Static (Mix 3 variétés)',
      '5g WPFF (Tropicali/Kush Mints)'
    ]
  },
  {
    id: 'pack_supporter',
    category: 'packs_can',
    name: 'Pack Supporter CAN',
    emoji: '⚽',
    price: 300,
    isPack: true,
    badge: 'BEST SELLER 🔥',
    media: ['https://file.garden/aRCOOh-cGER2BR_t/pack_supporter_can_1764173643919.png'],
    posters: ['https://file.garden/aRCOOh-cGER2BR_t/pack_supporter_can_1764173643919.png'],
    thumbnail: 'https://file.garden/aRCOOh-cGER2BR_t/pack_supporter_can_1764173643919.png',
    desc: '30g de Double Static Premium. La valeur sûre pour les vrais fans. Économisez 120€ !',
    details: [
      '30g Double Static (3 variétés x 10g)',
      'Qualité Premium Garantie',
      'Idéal pour partager'
    ]
  },
  {
    id: 'pack_equipe_type',
    category: 'packs_can',
    name: 'Pack Équipe Type',
    emoji: '🦁',
    price: 470,
    isPack: true,
    badge: 'GROS FORMAT 📦',
    media: ['https://file.garden/aRCOOh-cGER2BR_t/pack_equipe_type_1764173662433.png'],
    posters: ['https://file.garden/aRCOOh-cGER2BR_t/pack_equipe_type_1764173662433.png'],
    thumbnail: 'https://file.garden/aRCOOh-cGER2BR_t/pack_equipe_type_1764173662433.png',
    desc: '50g pour tenir toute la compétition. Le choix des champions. Économisez 160€ !',
    details: [
      '20g Fresh Frozen',
      '20g Double Static',
      '10g WPFF'
    ]
  },
  {
    id: 'pack_mvp',
    category: 'packs_can',
    name: 'Pack MVP',
    emoji: '🏆',
    price: 260,
    isPack: true,
    badge: 'LUXE 💎',
    media: ['https://file.garden/aRCOOh-cGER2BR_t/pack_mvp_can_1764173683360.png'],
    posters: ['https://file.garden/aRCOOh-cGER2BR_t/pack_mvp_can_1764173683360.png'],
    thumbnail: 'https://file.garden/aRCOOh-cGER2BR_t/pack_mvp_can_1764173683360.png',
    desc: '20g de WPFF (Whole Plant Fresh Frozen). La crème de la crème. Économisez 100€ !',
    details: [
      '20g WPFF (Tropicali + Kush Mints)',
      'Extraction sans solvant',
      'Terpènes explosifs'
    ]
  }
];
