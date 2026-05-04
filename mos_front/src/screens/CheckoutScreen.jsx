import { formatPrice } from '../utils/helpers';
import { QRScreen } from './QRScreen';

export function CheckoutScreen({
  tableId,
  drinkTimeStart,
  drinkTimeEnd,
  drinkPlanPrice,
  history,
  onBack,
  onSubmit,
}) {
  const foodTotal = history.reduce((sum, order) => sum + order.totalPrice, 0);

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
              {history.length === 0 ? (
                <p>注文履歴がありません</p>
              ) : (
                <div className="cart-list" style={{ marginTop: '12px' }}>
                  {history.map((order) =>
                    order.items.map((item) => (
                      <div key={`${order.id}-${item.id}`} className="history-line">
                        <span>
                          {item.name} × {item.quantity}
                        </span>
                        <span>{formatPrice(item.price * item.quantity)}</span>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>

            <div className="summary-card" style={{ marginTop: '24px' }}>
              <div className="summary-row">
                <span>小計（フード・ドリンク）</span>
                <strong>¥{foodTotal.toLocaleString()}</strong>
              </div>
              {drinkPlanPrice > 0 && (
                <div className="summary-row">
                  <span>飲み放題料金</span>
                  <strong>¥{drinkPlanPrice.toLocaleString()}</strong>
                </div>
              )}
              <div className="summary-row total">
                <span>合計</span>
                <strong>¥{(foodTotal + drinkPlanPrice).toLocaleString()}</strong>
              </div>
            </div>

            <p className="card-kicker" style={{ marginTop: '24px' }}>支払い方法</p>
            <div className="choice-row" style={{ marginTop: '12px' }}>
              <button
                type="button"
                className="choice-button primary"
                onClick={onSubmit}
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
        メニューへ
        </button>
      </footer>
    </section>
  );
}
