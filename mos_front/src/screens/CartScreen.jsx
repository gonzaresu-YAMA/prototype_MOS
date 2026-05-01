import { formatPrice } from '../utils/helpers';

export function CartScreen({ cart, cartCount, cartTotal, onUpdateQuantity, onSubmitOrder, onBack }) {
  return (
    <section className="screen cart-screen">
      <header className="screen-header sticky">
        <button type="button" className="text-button" onClick={onBack}>
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
            <button type="button" className="footer-button primary" onClick={onBack}>
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
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                      >
                        −
                      </button>
                      <span className="qty-value">{item.quantity}</span>
                      <button
                        type="button"
                        className="qty-button"
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="cart-item-price">
                    ¥{(item.price * item.quantity).toLocaleString()}
                  </div>
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
        <button type="button" className="footer-button ghost" onClick={onBack}>
          メニューへ
        </button>
        <button
          type="button"
          className="footer-button primary"
          onClick={onSubmitOrder}
          disabled={cart.length === 0}
        >
          注文する
        </button>
      </footer>
    </section>
  );
}
