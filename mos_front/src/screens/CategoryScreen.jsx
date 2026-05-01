import { formatPrice } from '../utils/helpers';

export function CategoryScreen({
  selectedCategory,
  activeCategory,
  items,
  cartCount,
  cartTotal,
  onAddToCart,
  onBack,
  onCartClick,
}) {
  return (
    <section className="screen list-screen">
      <header className="screen-header sticky">
        <button type="button" className="text-button" onClick={onBack}>
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
                  <button
                    type="button"
                    className="small-button"
                    onClick={() => onAddToCart(item)}
                  >
                    追加
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <footer className="screen-footer sticky">
        <button type="button" className="footer-button ghost" onClick={onBack}>
          メニュー
        </button>
        <button type="button" className="footer-button primary" onClick={onCartClick}>
          カート {cartCount > 0 ? `(${cartCount})` : ''} ・ ¥{cartTotal.toLocaleString()}
        </button>
      </footer>
    </section>
  );
}
