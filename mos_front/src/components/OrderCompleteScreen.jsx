import { useEffect } from 'react';

// 注文完了画面
export function OrderCompleteScreen({ order, onReturnToMenu }) {
  useEffect(() => {
    // 5秒後に自動的にメニューに戻る
    const timer = setTimeout(onReturnToMenu, 5000);
    return () => clearTimeout(timer);
  }, [onReturnToMenu]);

  return (
    <div className="screen order-complete-screen">
      <div className="screen-header">
        <h2>注文完了</h2>
      </div>

      <div className="screen-content">
        <div className="completion-container">
          <div className="success-icon">✓</div>
          <h3>注文が送信されました</h3>

          <div className="order-summary">
            <div className="order-id">
              <span>注文番号</span>
              <span className="id-value">{order.id}</span>
            </div>

            <div className="order-items">
              <h4>注文内容</h4>
              {order.items.map((item) => (
                <div key={item.productId} className="order-item">
                  <span>
                    {item.product.name} × {item.quantity}
                  </span>
                  <span>¥{(item.product.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
            </div>

            <div className="order-total">
              <span>合計</span>
              <span>¥{order.totalPrice.toLocaleString()}</span>
            </div>

            <p className="order-time">
              {new Date(order.timestamp).toLocaleTimeString('ja-JP')} に注文しました
            </p>
          </div>

          <div className="completion-message">
            <p>調理を開始いたしました。</p>
            <p>しばらくお待ちください。</p>
          </div>

          <div className="countdown">
            <p>メニューに戻ります...</p>
          </div>
        </div>
      </div>

      <div className="screen-footer">
        <button className="primary-button" onClick={onReturnToMenu}>
          メニューに戻る
        </button>
      </div>
    </div>
  );
}
