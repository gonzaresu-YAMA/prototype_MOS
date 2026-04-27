import { useMemo, useState } from 'react';
import './App.css';

function App() {
  const [screen, setScreen] = useState('start');
  const [showResetModal, setShowResetModal] = useState(false);
  const [orderReserveCount] = useState(0);
  const [sendCount] = useState(0);

  const screenImage = useMemo(() => {
    const map = {
      start: '/customer/始まり画面.png',
      home: '/customer/注文画面.png',
      yakitori: '/customer/焼き鳥.png',
      supplies: '/customer/無料備品画面.png',
      drink: '/customer/ドリンク.png',
      cart: '/customer/カート.png',
      history: '/customer/注文履歴.png',
    };
    return map[screen];
  }, [screen]);

  const goHome = () => {
    if (screen === 'home') {
      setShowResetModal(true);
      return;
    }
    setScreen('home');
  };

  return (
    <main className="customer-root">
      <section className="phone-frame" aria-label="顧客画面">
        <img className="screen-image" src={screenImage} alt="顧客画面プロトタイプ" />

        {screen === 'start' && (
          <button
            type="button"
            className="hotspot start-order"
            onClick={() => setScreen('home')}
            aria-label="注文を始める"
          />
        )}

        {screen !== 'start' && (
          <>
            <button
              type="button"
              className="hotspot top-history"
              onClick={() => setScreen('history')}
              aria-label="注文履歴"
            />
            <button
              type="button"
              className="hotspot top-supplies"
              onClick={() => setScreen('supplies')}
              aria-label="無料備品"
            />
            <button
              type="button"
              className="hotspot top-reserve"
              onClick={() => window.alert('注文保留はプロトタイプでは未実装です。')}
              aria-label="注文保留"
            />

            <button
              type="button"
              className="hotspot bottom-left"
              onClick={goHome}
              aria-label={screen === 'home' ? 'お会計' : 'ホームへ'}
            />
            <button
              type="button"
              className="hotspot bottom-send"
              onClick={() => setScreen('cart')}
              aria-label="注文送信"
            />
            <button
              type="button"
              className="hotspot bottom-call"
              onClick={() => window.alert('店員を呼び出しました。')}
              aria-label="店員呼び出し"
            />

            {screen === 'home' && (
              <>
                <button
                  type="button"
                  className="hotspot card-yakitori"
                  onClick={() => setScreen('yakitori')}
                  aria-label="焼き鳥"
                />
                <button
                  type="button"
                  className="hotspot card-supplies"
                  onClick={() => setScreen('supplies')}
                  aria-label="無料備品"
                />
                <button
                  type="button"
                  className="hotspot card-drink"
                  onClick={() => setScreen('drink')}
                  aria-label="ドリンク"
                />
              </>
            )}

            {orderReserveCount > 0 && <span className="badge reserve">{orderReserveCount}</span>}
            {sendCount >= 0 && <span className="badge send">{sendCount}</span>}
          </>
        )}

        {showResetModal && (
          <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label="初めに戻る確認">
            <div className="modal-card">
              <p className="modal-title">初めに戻りますか？</p>
              <div className="modal-actions">
                <button
                  type="button"
                  className="modal-btn cancel"
                  onClick={() => setShowResetModal(false)}
                >
                  うん
                </button>
                <button
                  type="button"
                  className="modal-btn confirm"
                  onClick={() => {
                    setShowResetModal(false);
                    setScreen('start');
                  }}
                >
                  うんうん
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}

export default App;
