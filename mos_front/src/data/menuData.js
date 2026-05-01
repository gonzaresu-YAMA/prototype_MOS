export const categories = [
  {
    id: 'yakitori',
    name: '焼き鳥',
    icon: '串',
    image:
      'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80',
    description: '炭火の香りが立つ、席で選びやすい看板メニュー',
  },
  {
    id: 'drinks',
    name: 'ドリンク',
    icon: '杯',
    image:
      'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80',
    description: '飲み放題の有無に合わせて見やすく整理したドリンク一覧',
  },
  {
    id: 'supplies',
    name: '無料備品',
    icon: '無料',
    image:
      'https://images.unsplash.com/photo-1532635241-17e820acc59f?auto=format&fit=crop&w=900&q=80',
    description: 'おしぼり・取り皿・お箸は無料で追加できます',
  },
  {
    id: 'dessert',
    name: 'デザート',
    icon: '甘',
    image:
      'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=900&q=80',
    description: '食後に軽く楽しめる甘味を用意しました',
  },
];

export const menuItems = {
  yakitori: [
    {
      id: 1,
      name: 'ねぎま串',
      price: 320,
      status: '販売中',
      image:
        './images/negima.jpg',
      description: '香ばしい鶏肉とねぎの定番串',
    },
    {
      id: 2,
      name: 'つくね串',
      price: 360,
      status: '販売中',
      image:
        './images/tsukune.jpg',
      description: 'ふっくら食感でたれがよく絡む人気串',
    },
    {
      id: 3,
      name: '皮串',
      price: 280,
      status: '販売中',
      image:
        './images/kawa.jpg',
      description: '外は香ばしく中はジューシー',
    },
  ],
  drinks: [
    {
      id: 11,
      name: '生ビール',
      price: 580,
      status: '販売中',
      image:
        './images/beer.jpg',
      description: 'キレのある定番ビール',
    },
    {
      id: 12,
      name: 'ハイボール',
      price: 520,
      status: '販売中',
      image:
        './images/highball.jpg',
      description: 'すっきり飲みやすい一杯',
    },
    {
      id: 13,
      name: '烏龍茶',
      price: 280,
      status: '販売中',
      image:
        './images/oolong_tea.jpg',
      description: '食事に合わせやすいノンアル',
    },
  ],
  supplies: [
    {
      id: 21,
      name: 'おしぼり',
      price: 0,
      status: '無料',
      image:
        'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80',
      description: '必要な数だけ無料で追加できます',
    },
    {
      id: 22,
      name: '取り皿',
      price: 0,
      status: '無料',
      image:
        'https://images.unsplash.com/photo-1453606845775-bb9a3a8b9c5e?auto=format&fit=crop&w=900&q=80',
      description: 'シェア用の皿を無料でお届けします',
    },
    {
      id: 23,
      name: '割り箸',
      price: 0,
      status: '無料',
      image:
        'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=900&q=80',
      description: 'お箸も追加料金なしで注文可能です',
    },
  ],
  dessert: [
    {
      id: 31,
      name: 'ガトーショコラ',
      price: 480,
      status: '販売中',
      image:
        'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=900&q=80',
      description: 'しっとり濃厚なチョコレートケーキ',
    },
    {
      id: 32,
      name: '季節のアイス',
      price: 320,
      status: '販売中',
      image:
        'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?auto=format&fit=crop&w=900&q=80',
      description: '最後にさっぱりと締める甘味',
    },
  ],
};
