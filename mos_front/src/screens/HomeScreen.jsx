export function HomeScreen({
  drinkPlan,
  drinkTimeStart,
  drinkTimeEnd,
  cartCount,
  categories,
  onCategoryClick,
  onCartClick,
  onHistoryClick,
  onCheckout,
}) {
  return (
    <section className="screen home-screen">
      <header className="screen-header sticky">
        <div>
          <p className="eyebrow">Midori-tei</p>
          <h2>注文画面</h2>
        </div>
        <button type="button" className="checkout-button" onClick={onCheckout}>
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
              onClick={() => onCategoryClick(category.id)}
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
        <button type="button" className="footer-button ghost" onClick={onHistoryClick}>
          履歴
        </button>
        <button type="button" className="footer-button primary" onClick={onCartClick}>
          カートを見る {cartCount > 0 ? `(${cartCount})` : ''}
        </button>
      </footer>
    </section>
  );
}
