// モックAPI - メニューデータ
export const mockMenuData = {
  categories: [
    { id: 1, name: 'ビール', icon: '🍺' },
    { id: 2, name: 'ハイボール', icon: '🥃' },
    { id: 3, name: '唐揚げ', icon: '🍗' },
    { id: 4, name: 'おつまみ', icon: '🍢' },
    { id: 5, name: 'デザート', icon: '🍰' },
  ],
  products: [
    {
      id: 1,
      name: 'ビール大瓶',
      categoryId: 1,
      price: 650,
      image: '🍺',
      description: 'キンキンに冷えたビール',
    },
    {
      id: 2,
      name: 'ビール小瓶',
      categoryId: 1,
      price: 450,
      image: '🍺',
      description: '小ぶりなビール',
    },
    {
      id: 3,
      name: 'ハイボール',
      categoryId: 2,
      price: 550,
      image: '🥃',
      description: 'ウイスキーソーダ割り',
    },
    {
      id: 4,
      name: 'から揚げ盛り合わせ',
      categoryId: 3,
      price: 850,
      image: '🍗',
      description: 'ジューシーな唐揚げ3種盛り',
    },
    {
      id: 5,
      name: 'チキン竜田揚げ',
      categoryId: 3,
      price: 750,
      image: '🍗',
      description: 'みどり亭の特製竜田揚げ',
    },
    {
      id: 6,
      name: 'えだまめ',
      categoryId: 4,
      price: 380,
      image: '🍢',
      description: '塩茹でえだまめ',
    },
    {
      id: 7,
      name: 'ナッツミックス',
      categoryId: 4,
      price: 420,
      image: '🍢',
      description: '塩味ナッツの盛り合わせ',
    },
    {
      id: 8,
      name: 'チョコレートケーキ',
      categoryId: 5,
      price: 480,
      image: '🍰',
      description: '濃厚なチョコレートケーキ',
    },
    {
      id: 9,
      name: 'フルーツポンチ',
      categoryId: 5,
      price: 520,
      image: '🍰',
      description: 'フルーツいっぱいのデザート',
    },
  ],
};

// API呼び出しのシミュレーション
export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const mockApi = {
  // メニューカテゴリ取得
  getCategories: async () => {
    await delay(300);
    return mockMenuData.categories;
  },

  // カテゴリ内の商品取得
  getProductsByCategory: async (categoryId) => {
    await delay(300);
    return mockMenuData.products.filter(
      (p) => p.categoryId === categoryId
    );
  },

  // 注文を送信（モック）
  submitOrder: async (orderData) => {
    await delay(500);
    return {
      success: true,
      orderId: `ORD-${Date.now()}`,
      message: '注文が送信されました',
    };
  },
};
