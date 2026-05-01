import { useEffect, useMemo, useState } from 'react';
import './App.css';

const categories = [
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

const menuItems = {
  yakitori: [
    {
      id: 1,
      name: 'ねぎま串',
      price: 320,
      status: '販売中',
      image:
        'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=900&q=80',
      description: '香ばしい鶏肉とねぎの定番串',
    },
    {
      id: 2,
      name: 'つくね串',
      price: 360,
      status: '販売中',
      image:
        'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?auto=format&fit=crop&w=900&q=80',
      description: 'ふっくら食感でたれがよく絡む人気串',
    },
    {
      id: 3,
      name: '皮串',
      price: 280,
      status: '販売中',
      image:
        'https://images.unsplash.com/photo-1564834744159-ff0ea41ba4b7?auto=format&fit=crop&w=900&q=80',
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
        'https://images.unsplash.com/photo-1558640476-4370f6d6e1d9?auto=format&fit=crop&w=900&q=80',
      description: 'キレのある定番ビール',
    },
    {
      id: 12,
      name: 'ハイボール',
      price: 520,
      status: '販売中',
      image:
        'https://images.unsplash.com/photo-1514361892635-eae31f9d1b54?auto=format&fit=crop&w=900&q=80',
      description: 'すっきり飲みやすい一杯',
    },
    {
      id: 13,
      name: '烏龍茶',
      price: 280,
      status: '販売中',
      image:
        'https://images.unsplash.com/photo-1517701550927-30cf4ba1b47f?auto=format&fit=crop&w=900&q=80',
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

function formatPrice(price) {
  return price === 0 ? '無料' : `¥${price.toLocaleString()}`;
}

function createOrderId() {
  return `ORD-${Date.now()}`;
}

function calculateDrinkTimes(durationHours) {
  const now = new Date();
  const startHour = now.getHours();
  const startMinute = now.getMinutes();
  const endHour = (startHour + durationHours) % 24;
  
  const formatTime = (hour, minute) => {
    return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
  };
  
  return {
    start: formatTime(startHour, startMinute),
    end: formatTime(endHour, startMinute)
  };
}

function App() {
  const [screen, setScreen] = useState('qr');
  const [drinkPlan, setDrinkPlan] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('yakitori');
  const [cart, setCart] = useState([]);
  const [history, setHistory] = useState([]);
  const [lastOrder, setLastOrder] = useState(null);
  const [tableId, setTableId] = useState(null);
  const [drinkTimeStart, setDrinkTimeStart] = useState(null);
  const [drinkTimeEnd, setDrinkTimeEnd] = useState(null);

  useEffect(() => {
    if (screen !== 'complete') {
      return undefined;
    }

    const timer = window.setTimeout(() => {
      setScreen('home');
      setLastOrder(null);
    }, 2600);

    return () => window.clearTimeout(timer);
  }, [screen]);

  const activeCategory = useMemo(
    () => categories.find((category) => category.id === selectedCategory) ?? categories[0],
    [selectedCategory]
  );

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const addToCart = (item) => {
    setCart((currentCart) => {
      const existing = currentCart.find((cartItem) => cartItem.id === item.id);
      if (existing) {
        return currentCart.map((cartItem) =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        );
      }

      return [...currentCart, { ...item, quantity: 1 }];
    });
  };

  const updateQuantity = (itemId, nextQuantity) => {
    setCart((currentCart) =>
      currentCart
        .map((item) => (item.id === itemId ? { ...item, quantity: nextQuantity } : item))
        .filter((item) => item.quantity > 0)
    );
  };

  const submitOrder = () => {
    if (cart.length === 0) {
      return;
    }

    const order = {
      id: createOrderId(),
      items: cart,
      totalPrice: cartTotal,
      timestamp: new Date(),
      drinkPlan,
    };

    setHistory((currentHistory) => [order, ...currentHistory]);
    setLastOrder(order);
    setCart([]);
    setScreen('complete');
  };

  const openCategory = (categoryId) => {
    setSelectedCategory(categoryId);
    setScreen('category');
  };

  const renderQRScreen = () => (
    <section className="screen qr-screen">
      <div className="hero-banner">
        <img
          src="https://images.unsplash.com/photo-1526318896980-cf78c088247c?auto=format&fit=crop&w=1200&q=80"
          alt="居酒屋の雰囲気"
        />
        <div className="hero-overlay" />
        <div className="hero-copy">
          <p className="eyebrow">Customer Order</p>
          <h1>QRコードを読み取ってください</h1>
          <p>卓番と来店情報が確認できます。</p>
        </div>
      </div>

      <div className="screen-body">
        <div className="prompt-card">
          <div>
            <p className="card-kicker">QRコード読み取り</p>
            <h2>テーブル情報の確認</h2>
            <p>QRコードを読み取ると、卓番と飲み放題プランの確認画面に進みます。</p>
          </div>

          <div className="choice-row">
            <button
              type="button"
              className="choice-button primary"
              onClick={() => {
                // プロトタイプなので固定値を使用
                setTableId(1);
                setScreen('welcome');
              }}
            >
            QRコードを読み取る
            </button>
          </div>
        </div>
      </div>
    </section>
  );

  const renderWelcome = () => {
    const hasSelectedPlan = drinkPlan !== null;
    
    return (
      <section className="screen welcome-screen">
        <div className="hero-banner">
          <img
            src="https://images.unsplash.com/photo-1526318896980-cf78c088247c?auto=format&fit=crop&w=1200&q=80"
            alt="居酒屋の雰囲気"
          />
          <div className="hero-overlay" />
          <div className="hero-copy">
            <p className="eyebrow">Customer Order</p>
            <h1>{hasSelectedPlan ? '飲み放題時間を選択' : 'プランを選択してください'}</h1>
            <p>{hasSelectedPlan ? '飲み放題の時間をご選択ください' : '飲み放題プランをお選びください'}</p>
          </div>
        </div>

        <div className="screen-body">
          <div className="prompt-card">
            <div>
              <p className="card-kicker">テーブル情報</p>
              <h2>卓番：{tableId}</h2>
              
              {!hasSelectedPlan ? (
                <>
                  <hr style={{ margin: '16px 0', border: 'none', borderTop: '1px solid #e0e0e0' }} />
                  <p className="card-kicker" style={{ marginTop: '16px' }}>飲み放題プラン</p>
                  <h3 style={{ marginTop: '8px' }}>どちらのプランですか？</h3>
                  <p>先に選んでもらうことで、ドリンク画面の案内を分かりやすくします。</p>
                  
                  <div className="choice-row">
                    <button
                      type="button"
                      className="choice-button primary"
                      onClick={() => {
                        setDrinkPlan('all');
                      }}
                    >
                      はい、飲み放題です
                    </button>
                    <button
                      type="button"
                      className="choice-button secondary"
                      onClick={() => {
                        setDrinkPlan('none');
                        setScreen('home');
                      }}
                    >
                      いいえ、都度注文です
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <p className="table-info-detail">選択プラン：{drinkPlan === 'all' ? '飲み放題' : '都度注文'}</p>
                  <hr style={{ margin: '16px 0', border: 'none', borderTop: '1px solid #e0e0e0' }} />
                  <p className="card-kicker" style={{ marginTop: '16px' }}>飲み放題時間選択</p>
                  <h3 style={{ marginTop: '8px' }}>いつまで飲み放題ですか？</h3>
                  <p>開始時刻からの時間をお選びください</p>
                  
                  <div className="choice-row">
                    <button
                      type="button"
                      className="choice-button primary"
                      onClick={() => {
                        const times = calculateDrinkTimes(2);
                        setDrinkTimeStart(times.start);
                        setDrinkTimeEnd(times.end);
                        setScreen('home');
                      }}
                    >
                      2時間
                    </button>
                    <button
                      type="button"
                      className="choice-button primary"
                      onClick={() => {
                        const times = calculateDrinkTimes(3);
                        setDrinkTimeStart(times.start);
                        setDrinkTimeEnd(times.end);
                        setScreen('home');
                      }}
                    >
                      3時間
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  };

  const renderHome = () => (
    <section className="screen home-screen">
      <header className="screen-header sticky">
        <div>
          <p className="eyebrow">Midori-tei</p>
          <h2>注文画面</h2>
        </div>
        <button
          type="button"
          className="checkout-button"
          onClick={() => setScreen('checkout')}
        >
          会計
        </button>
        <div className="status-stack">
          <span className={`status-pill ${drinkPlan === 'all' ? 'accent' : 'muted'}`}>
            {drinkPlan === 'all' ? '飲み放題あり' : '飲み放題なし'}
          </span>
          {drinkPlan === 'all' && drinkTimeStart && drinkTimeEnd && (
            <span className="status-pill accent">
              時間：{drinkTimeStart} ～ {drinkTimeEnd}
            </span>
          )}
          <span className="status-pill muted">売り切れなし</span>
        </div>
      </header>

      <div className="screen-body">
        <div className="notice-card">
          <div>
            <p className="card-kicker">おすすめ</p>
            <h3>画像だけの画面から、直接操作できる画面に変更しました</h3>
            <p>カードを押すと、その場で一覧に進みます。</p>
          </div>
          <img
            src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=900&q=80"
            alt="料理の盛り付け"
          />
        </div>

        <div className="category-grid">
          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              className="category-card"
              onClick={() => openCategory(category.id)}
            >
              <img src={category.image} alt={category.name} loading="lazy" />
              <div className="category-card-body">
                <div className="category-topline">
                  <span className="category-icon">{category.icon}</span>
                  <span className="status-chip">販売中</span>
                </div>
                <h3>{category.name}</h3>
                <p>{category.description}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      <footer className="screen-footer sticky">
        <button type="button" className="footer-button ghost" onClick={() => setScreen('history')}>
          履歴
        </button>
        <button type="button" className="footer-button primary" onClick={() => setScreen('cart')}>
          カートを見る {cartCount > 0 ? `(${cartCount})` : ''}
        </button>
      </footer>
    </section>
  );

  const renderCategory = () => {
    const items = menuItems[selectedCategory] ?? [];

    return (
      <section className="screen list-screen">
        <header className="screen-header sticky">
          <button type="button" className="text-button" onClick={() => setScreen('home')}>
            ← 戻る
          </button>
          <div>
            <p className="eyebrow">Menu</p>
            <h2>{activeCategory.name}</h2>
          </div>
          <span className={`status-pill ${selectedCategory === 'supplies' ? 'accent' : 'muted'}`}>
            {selectedCategory === 'supplies' ? '無料' : '販売中'}
          </span>
        </header>

        <div className="screen-body scrollable">
          <div className="category-hero">
            <img src={activeCategory.image} alt={activeCategory.name} />
            <div>
              <p className="card-kicker">{activeCategory.icon}</p>
              <h3>{activeCategory.description}</h3>
              <p>
                {selectedCategory === 'supplies'
                  ? '無料備品はすべて ¥0 です。'
                  : '販売中の状態を明示し、売り切れ表示は出さない構成にしています。'}
              </p>
            </div>
          </div>

          <div className="item-list">
            {items.map((item) => (
              <article key={item.id} className="item-card">
                <img src={item.image} alt={item.name} loading="lazy" />
                <div className="item-card-body">
                  <div className="item-card-topline">
                    <h3>{item.name}</h3>
                    <span className="status-chip">{item.status}</span>
                  </div>
                  <p>{item.description}</p>
                  <div className="item-card-footer">
                    <strong>{formatPrice(item.price)}</strong>
                    <button type="button" className="small-button" onClick={() => addToCart(item)}>
                      追加
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <footer className="screen-footer sticky">
          <button type="button" className="footer-button ghost" onClick={() => setScreen('home')}>
            メニュー
          </button>
          <button type="button" className="footer-button primary" onClick={() => setScreen('cart')}>
            カート {cartCount > 0 ? `(${cartCount})` : ''} ・ ¥{cartTotal.toLocaleString()}
          </button>
        </footer>
      </section>
    );
  };

  const renderCart = () => (
    <section className="screen cart-screen">
      <header className="screen-header sticky">
        <button type="button" className="text-button" onClick={() => setScreen('home')}>
          ← 戻る
        </button>
        <div>
          <p className="eyebrow">Cart</p>
          <h2>注文確認</h2>
        </div>
        <span className="status-pill muted">{cartCount}点</span>
      </header>

      <div className="screen-body scrollable">
        {cart.length === 0 ? (
          <div className="empty-state">
            <h3>カートは空です</h3>
            <p>商品を追加すると、ここに一覧が表示されます。</p>
            <button type="button" className="footer-button primary" onClick={() => setScreen('home')}>
              メニューへ戻る
            </button>
          </div>
        ) : (
          <>
            <div className="cart-list">
              {cart.map((item) => (
                <article key={item.id} className="cart-item">
                  <img src={item.image} alt={item.name} loading="lazy" />
                  <div className="cart-item-body">
                    <div className="item-card-topline">
                      <h3>{item.name}</h3>
                      <span className="status-chip">{formatPrice(item.price)}</span>
                    </div>
                    <p>{item.description}</p>
                    <div className="quantity-row">
                      <button
                        type="button"
                        className="qty-button"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        −
                      </button>
                      <span className="qty-value">{item.quantity}</span>
                      <button
                        type="button"
                        className="qty-button"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="cart-item-price">¥{(item.price * item.quantity).toLocaleString()}</div>
                </article>
              ))}
            </div>

            <div className="summary-card">
              <div className="summary-row">
                <span>小計</span>
                <strong>¥{cartTotal.toLocaleString()}</strong>
              </div>
              <div className="summary-row total">
                <span>合計</span>
                <strong>¥{cartTotal.toLocaleString()}</strong>
              </div>
            </div>
          </>
        )}
      </div>

      <footer className="screen-footer sticky">
        <button type="button" className="footer-button ghost" onClick={() => setScreen('home')}>
          メニューへ
        </button>
        <button
          type="button"
          className="footer-button primary"
          onClick={submitOrder}
          disabled={cart.length === 0}
        >
          注文する
        </button>
      </footer>
    </section>
  );

  const renderHistory = () => (
    <section className="screen history-screen">
      <header className="screen-header sticky">
        <button type="button" className="text-button" onClick={() => setScreen('home')}>
          ← 戻る
        </button>
        <div>
          <p className="eyebrow">History</p>
          <h2>注文履歴</h2>
        </div>
        <span className="status-pill muted">{history.length}件</span>
      </header>

      <div className="screen-body scrollable">
        {history.length === 0 ? (
          <div className="empty-state">
            <h3>まだ注文はありません</h3>
            <p>最初の注文を送信すると、ここに履歴が残ります。</p>
          </div>
        ) : (
          <div className="history-list">
            {history.map((order) => (
              <article key={order.id} className="history-card">
                <div className="item-card-topline">
                  <h3>{order.id}</h3>
                  <span className="status-chip">送信済み</span>
                </div>
                <p>{new Date(order.timestamp).toLocaleString('ja-JP')}</p>
                <div className="history-items">
                  {order.items.map((item) => (
                    <div key={item.id} className="history-line">
                      <span>
                        {item.name} × {item.quantity}
                      </span>
                      <span>{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>
                <div className="summary-row total">
                  <span>合計</span>
                  <strong>¥{order.totalPrice.toLocaleString()}</strong>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      <footer className="screen-footer sticky">
        <button type="button" className="footer-button ghost" onClick={() => setScreen('home')}>
          メニューへ
        </button>
        <button type="button" className="footer-button primary" onClick={() => setScreen('cart')}>
          カートを見る
        </button>
      </footer>
    </section>
  );

  const renderCheckout = () => (
    <section className="screen checkout-screen">
      <header className="screen-header sticky">
        <button type="button" className="text-button" onClick={() => setScreen('home')}>
          ← 戻る
        </button>
        <div>
          <p className="eyebrow">Checkout</p>
          <h2>会計</h2>
        </div>
        <span className="status-pill muted">確認中</span>
      </header>

      <div className="screen-body scrollable">
        <div className="checkout-card">
          <div>
            <p className="card-kicker">テーブル情報</p>
            <h3>卓番：{tableId}</h3>
            {drinkTimeStart && drinkTimeEnd && (
              <p className="table-info-detail">飲み放題時間：{drinkTimeStart} ～ {drinkTimeEnd}</p>
            )}
            
            <div style={{ marginTop: '24px' }}>
              <p className="card-kicker">注文内容</p>
              {cart.length === 0 ? (
                <p>カートに商品がありません</p>
              ) : (
                <div className="cart-list" style={{ marginTop: '12px' }}>
                  {cart.map((item) => (
                    <div key={item.id} className="history-line">
                      <span>{item.name} × {item.quantity}</span>
                      <span>{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="summary-card" style={{ marginTop: '24px' }}>
              <div className="summary-row">
                <span>小計</span>
                <strong>¥{cartTotal.toLocaleString()}</strong>
              </div>
              <div className="summary-row total">
                <span>合計</span>
                <strong>¥{cartTotal.toLocaleString()}</strong>
              </div>
            </div>

            <p className="card-kicker" style={{ marginTop: '24px' }}>支払い方法</p>
            <div className="choice-row" style={{ marginTop: '12px' }}>
              <button
                type="button"
                className="choice-button primary"
                onClick={() => {
                  // プロトタイプなので確認画面として表示
                  alert('スタッフにお呼びください。\n会計金額：¥' + cartTotal.toLocaleString());
                  setScreen('home');
                }}
              >
                スタッフを呼ぶ
              </button>
            </div>
          </div>
        </div>
      </div>

      <footer className="screen-footer sticky">
        <button type="button" className="footer-button ghost" onClick={() => setScreen('home')}>
          キャンセル
        </button>
        <button type="button" className="footer-button primary" onClick={() => setScreen('home')}>
          OK
        </button>
      </footer>
    </section>
  );

  const renderComplete = () => (
    <section className="screen complete-screen">
      <div className="screen-body complete-body">
        <div className="completion-card">
          <div className="completion-mark">OK</div>
          <p className="card-kicker">Order Complete</p>
          <h2>注文を送信しました</h2>
          {lastOrder && (
            <>
              <p className="completion-id">注文番号 {lastOrder.id}</p>
              <div className="summary-card compact">
                {lastOrder.items.map((item) => (
                  <div key={item.id} className="history-line">
                    <span>
                      {item.name} × {item.quantity}
                    </span>
                    <span>{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
                <div className="summary-row total">
                  <span>合計</span>
                  <strong>¥{lastOrder.totalPrice.toLocaleString()}</strong>
                </div>
              </div>
            </>
          )}
          <p>処理は即時反映するようにして、重い遷移を入れていません。</p>
        </div>
      </div>
    </section>
  );

  return (
    <main className="customer-root">
      <section className="app-shell" aria-label="顧客注文画面">
        {screen === 'qr' && renderQRScreen()}
        {screen === 'welcome' && renderWelcome()}
        {screen === 'home' && renderHome()}
        {screen === 'category' && renderCategory()}
        {screen === 'cart' && renderCart()}
        {screen === 'history' && renderHistory()}
        {screen === 'checkout' && renderCheckout()}
        {screen === 'complete' && renderComplete()}
      </section>
    </main>
  );
}

export default App;
