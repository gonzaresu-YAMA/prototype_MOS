import { useEffect, useMemo, useState } from 'react';
import './App.css';
import { categories, menuItems } from './data/menuData';
import { calculateDrinkTimes, createOrderId } from './utils/helpers';
import { QRScreen } from './screens/QRScreen';
import { WelcomeScreen } from './screens/WelcomeScreen';
import { HomeScreen } from './screens/HomeScreen';
import { CategoryScreen } from './screens/CategoryScreen';
import { CartScreen } from './screens/CartScreen';
import { HistoryScreen } from './screens/HistoryScreen';
import { CheckoutScreen } from './screens/CheckoutScreen';
import { CheckoutCompleteScreen } from './screens/CheckoutCompleteScreen';
import { CompleteScreen } from './screens/CompleteScreen';

function App() {
  const [screen, setScreen] = useState('qr');
  const [drinkPlan, setDrinkPlan] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('yakitori');
  const [cart, setCart] = useState([]);
  const [history, setHistory] = useState([]);
  const [lastOrder, setLastOrder] = useState(null);
  const [tableId, setTableId] = useState(null);
  const [drinkTimeStart, setDrinkTimeStart] = useState(null);
  const [drinkTimeEnd, setDrinkTimeEnd] = useState(null);
  const [checkoutTotal, setCheckoutTotal] = useState(0);

  useEffect(() => {
    if (screen !== 'complete') {
      return undefined;
    }

    const timer = window.setTimeout(() => {
      setScreen('home');
      setLastOrder(null);
    }, 2600);

    return () => window.clearTimeout(timer);
  }, [screen]);

  const activeCategory = useMemo(
    () => categories.find((category) => category.id === selectedCategory) ?? categories[0],
    [selectedCategory]
  );

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const addToCart = (item) => {
    setCart((currentCart) => {
      const existing = currentCart.find((cartItem) => cartItem.id === item.id);
      if (existing) {
        return currentCart.map((cartItem) =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        );
      }

      return [...currentCart, { ...item, quantity: 1 }];
    });
  };

  const updateQuantity = (itemId, nextQuantity) => {
    setCart((currentCart) =>
      currentCart
        .map((item) => (item.id === itemId ? { ...item, quantity: nextQuantity } : item))
        .filter((item) => item.quantity > 0)
    );
  };

  const submitOrder = () => {
    if (cart.length === 0) {
      return;
    }

    const order = {
      id: createOrderId(),
      items: cart,
      totalPrice: cartTotal,
      timestamp: new Date(),
      drinkPlan,
    };

    setHistory((currentHistory) => [order, ...currentHistory]);
    setLastOrder(order);
    setCart([]);
    setScreen('complete');
  };

  const handleDurationSelect = (hours) => {
    const times = calculateDrinkTimes(hours);
    setDrinkTimeStart(times.start);
    setDrinkTimeEnd(times.end);
    setScreen('home');
  };

  const submitCheckout = () => {
    setCheckoutTotal(cartTotal);
    setCart([]);
    setHistory([]);
    setScreen('checkoutComplete');
  };

  const resetDemo = () => {
    setScreen('qr');
    setDrinkPlan(null);
    setSelectedCategory('yakitori');
    setCart([]);
    setHistory([]);
    setLastOrder(null);
    setTableId(null);
    setDrinkTimeStart(null);
    setDrinkTimeEnd(null);
    setCheckoutTotal(0);
  };

  return (
    <main className="customer-root">
      <section className="app-shell" aria-label="顧客注文画面">
        {screen === 'qr' && (
          <QRScreen
            onScan={() => {
              setTableId(1);
              setScreen('welcome');
            }}
          />
        )}
        {screen === 'welcome' && (
          <WelcomeScreen
            tableId={tableId}
            drinkPlan={drinkPlan}
            onSelectAllPlan={() => setDrinkPlan('all')}
            onSelectNoPlan={() => {
              setDrinkPlan('none');
              setScreen('home');
            }}
            onSelectDuration={handleDurationSelect}
          />
        )}
        {screen === 'home' && (
          <HomeScreen
            drinkPlan={drinkPlan}
            drinkTimeStart={drinkTimeStart}
            drinkTimeEnd={drinkTimeEnd}
            cartCount={cartCount}
            categories={categories}
            onCategoryClick={(categoryId) => {
              setSelectedCategory(categoryId);
              setScreen('category');
            }}
            onCartClick={() => setScreen('cart')}
            onHistoryClick={() => setScreen('history')}
            onCheckout={() => setScreen('checkout')}
          />
        )}
        {screen === 'category' && (
          <CategoryScreen
            selectedCategory={selectedCategory}
            activeCategory={activeCategory}
            items={menuItems[selectedCategory] ?? []}
            cartCount={cartCount}
            cartTotal={cartTotal}
            onAddToCart={addToCart}
            onBack={() => setScreen('home')}
            onCartClick={() => setScreen('cart')}
          />
        )}
        {screen === 'cart' && (
          <CartScreen
            cart={cart}
            cartCount={cartCount}
            cartTotal={cartTotal}
            onUpdateQuantity={updateQuantity}
            onSubmitOrder={submitOrder}
            onBack={() => setScreen('home')}
          />
        )}
        {screen === 'history' && (
          <HistoryScreen
            history={history}
            onBack={() => setScreen('home')}
            onCartClick={() => setScreen('cart')}
          />
        )}
        {screen === 'checkout' && (
          <CheckoutScreen
            tableId={tableId}
            drinkTimeStart={drinkTimeStart}
            drinkTimeEnd={drinkTimeEnd}
            cart={cart}
            cartTotal={cartTotal}
            onBack={() => setScreen('home')}
            onSubmit={submitCheckout}
          />
        )}
        {screen === 'checkoutComplete' && (
          <CheckoutCompleteScreen
            tableId={tableId}
            totalPrice={checkoutTotal}
            onRestart={resetDemo}
          />
        )}
        {screen === 'complete' && <CompleteScreen lastOrder={lastOrder} />}
      </section>
    </main>
  );
}

export default App;
