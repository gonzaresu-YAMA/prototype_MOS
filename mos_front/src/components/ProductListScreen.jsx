import { useState } from 'react';

// 商品一覧画面
export function ProductListScreen({
  category,
  products,
  onBack,
  onAddToCart,
}) {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    onAddToCart(selectedProduct, quantity);
    setSelectedProduct(null);
    setQuantity(1);
  };

  if (selectedProduct) {
    return (
      <div className="screen product-detail-screen">
        <div className="screen-header">
          <button className="back-button" onClick={() => setSelectedProduct(null)}>
            ← 戻る
          </button>
          <h2>{selectedProduct.name}</h2>
        </div>

        <div className="screen-content">
          <div className="product-detail">
            <div className="product-image-large">{selectedProduct.image}</div>
            <h3>{selectedProduct.name}</h3>
            <p className="product-description">{selectedProduct.description}</p>
            <p className="product-price">¥{selectedProduct.price.toLocaleString()}</p>

            <div className="quantity-selector">
              <label>数量:</label>
              <div className="quantity-controls">
                <button
                  className="qty-btn"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  −
                </button>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                  }
                  className="qty-input"
                />
                <button className="qty-btn" onClick={() => setQuantity(quantity + 1)}>
                  +
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="screen-footer">
          <button className="cancel-button" onClick={() => setSelectedProduct(null)}>
            キャンセル
          </button>
          <button
            className="primary-button"
            onClick={handleAddToCart}
          >
            カートに追加 ¥{(selectedProduct.price * quantity).toLocaleString()}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="screen product-list-screen">
      <div className="screen-header">
        <button className="back-button" onClick={onBack}>
          ← 戻る
        </button>
        <h2>{category.name}</h2>
      </div>

      <div className="screen-content">
        <div className="product-list">
          {products.length === 0 ? (
            <p className="empty-message">このカテゴリに商品はありません</p>
          ) : (
            products.map((product) => (
              <button
                key={product.id}
                className="product-card"
                onClick={() => setSelectedProduct(product)}
              >
                <div className="product-image">{product.image}</div>
                <div className="product-info">
                  <h4>{product.name}</h4>
                  <p>{product.description}</p>
                  <p className="price">¥{product.price.toLocaleString()}</p>
                </div>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
