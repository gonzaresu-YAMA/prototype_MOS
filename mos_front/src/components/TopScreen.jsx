// トップ画面 - カテゴリ表示
export function TopScreen({ categories, onSelectCategory, tableId, storeId }) {
  return (
    <div className="screen top-screen">
      <div className="screen-header">
        <h1>みどり亭</h1>
        <p className="table-info">
          卓番: {tableId} | 店舗: {storeId}
        </p>
      </div>

      <div className="screen-content">
        <p className="description">メニューを選択してください</p>

        <div className="category-grid">
          {categories.map((category) => (
            <button
              key={category.id}
              className="category-card"
              onClick={() => onSelectCategory(category.id)}
            >
              <div className="category-icon">{category.icon}</div>
              <div className="category-name">{category.name}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="screen-footer">
        <p className="help-text">サービススタッフをお呼びください</p>
        <button className="call-button">📢 スタッフを呼ぶ</button>
      </div>
    </div>
  );
}
