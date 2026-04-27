import { useState, useEffect } from 'react';
import './App.css';
import { TopScreen } from './components/TopScreen';
import { ProductListScreen } from './components/ProductListScreen';
import { CartConfirmScreen } from './components/CartConfirmScreen';
import { OrderCompleteScreen } from './components/OrderCompleteScreen';
import { useOrderState } from './hooks/useOrderState';
import { mockApi } from './api/mockData';

function App() {
  // 画面状態管理
  const [currentScreen, setCurrentScreen] = useState('top'); // top, products, cart, complete
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // QRコードから取得したテーブルIDと店舗ID（本来ならQRから自動取得）
  const tableId = '5'; // テスト用
  const storeId = '1';

  // 注文状態管理
  const {
    cart,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    totalPrice,
    submitOrder,
    currentOrder,
  } = useOrderState();

  // 初期化：カテゴリを取得
  useEffect(() => {
    const loadCategories = async () => {
      try {
        setIsLoading(true);
        const data = await mockApi.getCategories();
        setCategories(data);
      } catch (error) {
        console.error('カテゴリ取得エラー:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadCategories();
  }, []);

  // カテゴリを選択したときの処理
  const handleSelectCategory = async (categoryId) => {
    try {
      setIsLoading(true);
      const category = categories.find((c) => c.id === categoryId);
      setSelectedCategory(category);
      const data = await mockApi.getProductsByCategory(categoryId);
      setProducts(data);
      setCurrentScreen('products');
    } catch (error) {
      console.error('商品取得エラー:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // トップ画面に戻る
  const handleBackToTop = () => {
    setCurrentScreen('top');
    setProducts([]);
    setSelectedCategory(null);
  };

  // 注文確認画面に進む
  const handleGoToCart = () => {
    setCurrentScreen('cart');
  };

  // 注文を送信
  const handleSubmitOrder = async () => {
    try {
      setIsLoading(true);
      const response = await mockApi.submitOrder({ items: cart });
      if (response.success) {
        submitOrder(response.orderId);
        setCurrentScreen('complete');
      } else {
        alert('注文の送信に失敗しました');
      }
    } catch (error) {
      console.error('注文送信エラー:', error);
      alert('注文の送信に失敗しました');
    } finally {
      setIsLoading(false);
    }
  };

  // 注文完了後、メニューに戻る
  const handleReturnToMenu = () => {
    handleBackToTop();
  };

  return (
    <div className="app-container">
      {currentScreen === 'top' && (
        <TopScreen
          categories={categories}
          onSelectCategory={handleSelectCategory}
          tableId={tableId}
          storeId={storeId}
        />
      )}

      {currentScreen === 'products' && (
        <ProductListScreen
          category={selectedCategory}
          products={products}
          onBack={handleBackToTop}
          onAddToCart={addToCart}
        />
      )}

      {currentScreen === 'cart' && (
        <>
          <CartConfirmScreen
            cart={cart}
            totalPrice={totalPrice}
            onBack={() => setCurrentScreen('products')}
            onUpdateQuantity={updateCartQuantity}
            onRemoveItem={removeFromCart}
            onSubmit={handleSubmitOrder}
            isLoading={isLoading}
          />
          {cart.length > 0 && (
            <div className="floating-cart-button">
              <button
                className="floating-button"
                onClick={handleGoToCart}
                disabled={cart.length === 0}
              >
                🛒 {cart.length} 件 - ¥{totalPrice.toLocaleString()}
              </button>
            </div>
          )}
        </>
      )}

      {currentScreen === 'complete' && (
        <OrderCompleteScreen
          order={currentOrder}
          onReturnToMenu={handleReturnToMenu}
        />
      )}

      {/* フローティングカートボタン（products画面用） */}
      {currentScreen === 'products' && cart.length > 0 && (
        <div className="floating-cart-button">
          <button
            className="floating-button"
            onClick={handleGoToCart}
          >
            🛒 {cart.length} 件 - ¥{totalPrice.toLocaleString()}
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
