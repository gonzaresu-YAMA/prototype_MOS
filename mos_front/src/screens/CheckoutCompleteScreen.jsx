export function CheckoutCompleteScreen({ tableId, totalPrice, onRestart }) {
  return (
    <section className="screen complete-screen">
      <div className="screen-body complete-body">
        <div className="completion-card">
          <div className="completion-mark">✓</div>
          <p className="card-kicker">Checkout Complete</p>
          <h2>ありがとうございました</h2>
          <p className="completion-id">卓番：{tableId}</p>

          <div className="summary-card compact" style={{ marginTop: '16px' }}>
            <div className="summary-row total">
              <span>合計金額</span>
              <strong>¥{totalPrice.toLocaleString()}</strong>
            </div>
          </div>

          <p style={{ marginTop: '16px', fontSize: '14px', color: '#666' }}>
            まもなくスタッフがお伺いします。
          </p>

          <div style={{ marginTop: '32px' }}>
            <button
              type="button"
              className="choice-button secondary"
              style={{ width: '100%' }}
              onClick={onRestart}
            >
              最初からやり直す（デモ用）
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
