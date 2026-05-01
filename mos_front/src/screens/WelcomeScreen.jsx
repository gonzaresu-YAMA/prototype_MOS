export function WelcomeScreen({
  tableId,
  drinkPlan,
  onSelectAllPlan,
  onSelectNoPlan,
  onSelectDuration,
}) {
  const hasSelectedPlan = drinkPlan !== null;

  return (
    <section className="screen welcome-screen">
      <div className="hero-banner">
        <img
          src="https://images.unsplash.com/photo-1526318896980-cf78c088247c?auto=format&fit=crop&w=1200&q=80"
          alt="居酒屋の雰囲気"
        />
        <div className="hero-overlay" />
        <div className="hero-copy">
          <p className="eyebrow">Customer Order</p>
          <h1>{hasSelectedPlan ? '飲み放題時間を選択' : 'プランを選択してください'}</h1>
          <p>{hasSelectedPlan ? '飲み放題の時間をご選択ください' : '飲み放題プランをお選びください'}</p>
        </div>
      </div>

      <div className="screen-body">
        <div className="prompt-card">
          <div>
            <p className="card-kicker">テーブル情報</p>
            <h2>卓番：{tableId}</h2>

            {!hasSelectedPlan ? (
              <>
                <hr style={{ margin: '16px 0', border: 'none', borderTop: '1px solid #e0e0e0' }} />
                <p className="card-kicker" style={{ marginTop: '16px' }}>飲み放題プラン</p>
                <h3 style={{ marginTop: '8px' }}>どちらのプランですか？</h3>
                <p>先に選んでもらうことで、ドリンク画面の案内を分かりやすくします。</p>

                <div className="choice-row">
                  <button
                    type="button"
                    className="choice-button primary"
                    onClick={onSelectAllPlan}
                  >
                    はい、飲み放題です
                  </button>
                  <button
                    type="button"
                    className="choice-button secondary"
                    onClick={onSelectNoPlan}
                  >
                    いいえ、都度注文です
                  </button>
                </div>
              </>
            ) : (
              <>
                <p className="table-info-detail">
                  選択プラン：{drinkPlan === 'all' ? '飲み放題' : '都度注文'}
                </p>
                <hr style={{ margin: '16px 0', border: 'none', borderTop: '1px solid #e0e0e0' }} />
                <p className="card-kicker" style={{ marginTop: '16px' }}>飲み放題時間選択</p>
                <h3 style={{ marginTop: '8px' }}>いつまで飲み放題ですか？</h3>
                <p>開始時刻からの時間をお選びください</p>

                <div className="choice-row">
                  <button
                    type="button"
                    className="choice-button primary"
                    onClick={() => onSelectDuration(2)}
                  >
                    2時間
                  </button>
                  <button
                    type="button"
                    className="choice-button primary"
                    onClick={() => onSelectDuration(3)}
                  >
                    3時間
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
