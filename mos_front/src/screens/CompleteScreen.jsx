import { formatPrice } from '../utils/helpers';

export function CompleteScreen({ lastOrder }) {
  return (
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
}
