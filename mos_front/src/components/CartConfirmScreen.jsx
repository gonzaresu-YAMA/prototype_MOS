// カート確認画面
export function CartConfirmScreen({
  cart,
  totalPrice,
  onBack,
  onUpdateQuantity,
  onRemoveItem,
  onSubmit,
  isLoading,
}) {
  if (cart.length === 0) {
    return (
      <div className="screen cart-screen">
        <div className="screen-header">
          <button className="back-button" onClick={onBack}>
            ← 戻る
          </button>
          <h2>注文確認</h2>
        </div>

        <div className="screen-content">
          <div className="empty-cart">
            <p className="empty-icon">🛒</p>
            <p className="empty-message">カートは空です</p>
            <button className="secondary-button" onClick={onBack}>
              メニューに戻る
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="screen cart-screen">
      <div className="screen-header">
        <button className="back-button" onClick={onBack} disabled={isLoading}>
          ← 戻る
        </button>
        <h2>注文確認</h2>
      </div>

      <div className="screen-content">
        <div className="cart-items">
          {cart.map((item) => (
            <div key={item.productId} className="cart-item">
              <div className="item-image">{item.product.image}</div>
              <div className="item-details">
                <h4>{item.product.name}</h4>
                <p className="item-price">
                  ¥{item.product.price.toLocaleString()} × {item.quantity}
                </p>
              </div>
              <div className="item-controls">
                <div className="quantity-controls-mini">
                  <button
                    className="qty-btn-mini"
                    onClick={() =>
                      onUpdateQuantity(
                        item.productId,
                        Math.max(1, item.quantity - 1)
                      )
                    }
                    disabled={isLoading}
                  >
                    −
                  </button>
                  <span className="qty-display">{item.quantity}</span>
                  <button
                    className="qty-btn-mini"
                    onClick={() =>
                      onUpdateQuantity(item.productId, item.quantity + 1)
                    }
                    disabled={isLoading}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="item-total">
                ¥{(item.product.price * item.quantity).toLocaleString()}
              </div>
              <button
                className="remove-button"
                onClick={() => onRemoveItem(item.productId)}
                disabled={isLoading}
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <div className="summary-row">
            <span>小計</span>
            <span>¥{totalPrice.toLocaleString()}</span>
          </div>
          <div className="summary-row total">
            <span>合計</span>
            <span>¥{totalPrice.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div className="screen-footer">
        <button
          className="secondary-button"
          onClick={onBack}
          disabled={isLoading}
        >
          戻る
        </button>
        <button
          className="primary-button"
          onClick={onSubmit}
          disabled={isLoading || cart.length === 0}
        >
          {isLoading ? '送信中...' : '注文する'}
        </button>
      </div>
    </div>
  );
}
