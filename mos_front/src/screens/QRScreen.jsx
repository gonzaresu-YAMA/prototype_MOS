export function QRScreen({ onScan }) {
  return (
    <section className="screen qr-screen">
      <div className="hero-banner">
        <img
          src="https://images.unsplash.com/photo-1526318896980-cf78c088247c?auto=format&fit=crop&w=1200&q=80"
          alt="居酒屋の雰囲気"
        />
        <div className="hero-overlay" />
        <div className="hero-copy">
          <p className="eyebrow">Customer Order</p>
          <h1>QRコードを読み取ってください</h1>
          <p>卓番と来店情報が確認できます。</p>
        </div>
      </div>

      <div className="screen-body">
        <div className="prompt-card">
          <div>
            <p className="card-kicker">QRコード読み取り</p>
            <h2>テーブル情報の確認</h2>
            <p>QRコードを読み取ると、卓番と飲み放題プランの確認画面に進みます。</p>
          </div>

          <div className="choice-row">
            <button type="button" className="choice-button primary" onClick={onScan}>
              QRコードを読み取る
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
