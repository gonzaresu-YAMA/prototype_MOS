import { useState, useCallback } from 'react';

// 注文状態管理カスタムフック
export const useOrderState = () => {
  const [cart, setCart] = useState([]); // { productId, quantity, product }
  const [currentOrder, setCurrentOrder] = useState(null);
  const [orderHistory, setOrderHistory] = useState([]);

  // カートに商品を追加
  const addToCart = useCallback((product, quantity = 1) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.productId === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevCart, { productId: product.id, quantity, product }];
    });
  }, []);

  // カートから商品を削除
  const removeFromCart = useCallback((productId) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.productId !== productId)
    );
  }, []);

  // カート内の商品数量を更新
  const updateCartQuantity = useCallback((productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.productId === productId
            ? { ...item, quantity }
            : item
        )
      );
    }
  }, [removeFromCart]);

  // カートをクリア
  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  // 注文を送信
  const submitOrder = useCallback((orderId) => {
    const order = {
      id: orderId,
      items: cart,
      totalPrice: cart.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
      ),
      timestamp: new Date(),
      status: 'completed',
    };
    setCurrentOrder(order);
    setOrderHistory((prev) => [order, ...prev]);
    clearCart();
    return order;
  }, [cart, clearCart]);

  // カート合計金額
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return {
    cart,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    totalPrice,
    submitOrder,
    currentOrder,
    orderHistory,
  };
};
