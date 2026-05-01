import { formatPrice } from '../utils/helpers';

export function CheckoutScreen({
  tableId,
  drinkTimeStart,
  drinkTimeEnd,
  cart,
  cartTotal,
  onBack,
  onSubmit,
}) {

  return (
    <section className="screen checkout-screen">
      <header className="screen-header sticky">
        <button type="button" className="text-button" onClick={onBack}>
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
              <p className="table-info-detail">
                飲み放題時間：{drinkTimeStart} ～ {drinkTimeEnd}
              </p>
            )}

            <div style={{ marginTop: '24px' }}>
              <p className="card-kicker">注文内容</p>
              {cart.length === 0 ? (
                <p>カートに商品がありません</p>
              ) : (
                <div className="cart-list" style={{ marginTop: '12px' }}>
                  {cart.map((item) => (
                    <div key={item.id} className="history-line">
                      <span>
                        {item.name} × {item.quantity}
                      </span>
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
                onClick={onSubmit}
                disabled={cart.length === 0}
              >
                会計を依頼する
              </button>
            </div>
          </div>
        </div>
      </div>

      <footer className="screen-footer sticky">
        <button type="button" className="footer-button ghost" onClick={onBack}>
          キャンセル
        </button>
        <button type="button" className="footer-button primary" onClick={onBack}>
          OK
        </button>
      </footer>
    </section>
  );
}
