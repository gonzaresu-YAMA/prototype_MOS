export function LoginScreen({ loginId, loginPassword, loginError, onChangeLoginId, onChangeLoginPassword, onLogin }) {
  return (
    <section className="screen login-screen">
      <div className="screen-body auth-shell">
        <div className="auth-card">
          <div>
            <p className="card-kicker">従業員ログイン</p>
            <h2>ID とパスワードでログイン</h2>
            <p>バックエンド連携は後で追加します。まずは画面フローを確認してください。</p>
          </div>

          <div className="login-form">
            <label className="form-row">
              <span>ID</span>
              <input type="text" value={loginId} onChange={onChangeLoginId} placeholder="スタッフID" />
            </label>

            <label className="form-row">
              <span>パスワード</span>
              <input type="password" value={loginPassword} onChange={onChangeLoginPassword} placeholder="パスワード" />
            </label>

            {loginError && <p className="login-error">{loginError}</p>}
          </div>

          <button type="button" className="footer-button primary full-width" onClick={onLogin}>
            ログイン
          </button>
        </div>
      </div>
    </section>
  );
}

export function WelcomeScreen({ setDrinkPlan, setScreen }) {
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
          <h1>まず飲み放題の確認をしてください</h1>
          <p>そのあとにメニューへ進むシンプルな注文画面です。</p>
        </div>
      </div>

      <div className="screen-body">
        <div className="prompt-card">
          <div>
            <p className="card-kicker">最初の確認</p>
            <h2>飲み放題ですか？</h2>
            <p>先に選んでもらうことで、ドリンク画面の案内を分かりやすくします。</p>
          </div>

          <div className="choice-row">
            <button
              type="button"
              className="choice-button primary"
              onClick={() => {
                setDrinkPlan('all');
                setScreen('home');
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
        </div>
      </div>
    </section>
  );
}

export function HomeScreen({ categories, drinkPlan, cartCount, cartTotal, openCategory, setScreen }) {
  return (
    <section className="screen home-screen">
      <header className="screen-header sticky">
        <div>
          <p className="eyebrow">Midori-tei</p>
          <h2>注文画面</h2>
        </div>
        <div className="status-stack">
          <span className={`status-pill ${drinkPlan === 'all' ? 'accent' : 'muted'}`}>
            {drinkPlan === 'all' ? '飲み放題あり' : '飲み放題なし'}
          </span>
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
            <button key={category.id} type="button" className="category-card" onClick={() => openCategory(category.id)}>
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
}

export function CategoryScreen({ categories, activeCategory, selectedCategory, items, cartCount, cartTotal, addToCart, setScreen }) {
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
                  <strong>{item.price === 0 ? '無料' : `¥${item.price.toLocaleString()}`}</strong>
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
}

export function CartScreen({ cart, cartCount, cartTotal, updateQuantity, submitOrder, setScreen }) {
  return (
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
                      <span className="status-chip">{item.price === 0 ? '無料' : `¥${item.price.toLocaleString()}`}</span>
                    </div>
                    <p>{item.description}</p>
                    <div className="quantity-row">
                      <button type="button" className="qty-button" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                        −
                      </button>
                      <span className="qty-value">{item.quantity}</span>
                      <button type="button" className="qty-button" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
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
        <button type="button" className="footer-button primary" onClick={submitOrder} disabled={cart.length === 0}>
          注文する
        </button>
      </footer>
    </section>
  );
}

export function HistoryScreen({ history, setScreen }) {
  return (
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
                      <span>{item.price === 0 ? '無料' : `¥${(item.price * item.quantity).toLocaleString()}`}</span>
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
}

export function CompleteScreen({ lastOrder }) {
  return (
    <section className="screen complete-screen">
      <div className="screen-body complete-body">
        <div className="completion-card">
          <div className="completion-mark">✓</div>
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
                    <span>{item.price === 0 ? '無料' : `¥${(item.price * item.quantity).toLocaleString()}`}</span>
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
}

export function PlaceholderScreen({ title, description, onBack, onLogout }) {
  return (
    <section className="screen list-screen">
      <header className="screen-header sticky employee-header">
        <button type="button" className="back-button text-button" onClick={onBack}>
          ← 戻る
        </button>
        <div>
          <p className="eyebrow">管理画面</p>
          <h2>{title}</h2>
        </div>
        <button type="button" className="user-icon-button" onClick={onLogout}>
          👤
        </button>
      </header>

      <div className="screen-body scrollable">
        <div className="placeholder-card">
          <h3>{title}</h3>
          <p>{description}</p>
          <p>バックエンド連携は後ほど追加します。</p>
        </div>
      </div>
    </section>
  );
}
