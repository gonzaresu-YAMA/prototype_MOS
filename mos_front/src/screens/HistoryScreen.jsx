import { formatPrice } from '../utils/helpers';

export function HistoryScreen({ history, onBack, onCartClick }) {
  return (
    <section className="screen history-screen">
      <header className="screen-header sticky">
        <button type="button" className="text-button" onClick={onBack}>
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
        <button type="button" className="footer-button ghost" onClick={onBack}>
          メニューへ
        </button>
        <button type="button" className="footer-button primary" onClick={onCartClick}>
          カートを見る
        </button>
      </footer>
    </section>
  );
}
