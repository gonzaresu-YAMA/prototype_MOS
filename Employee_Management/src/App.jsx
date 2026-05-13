import { useEffect, useMemo, useState } from 'react';
import './App.css';

const categories = [
  {
    id: 'yakitori',
    name: '焼き鳥',
    icon: '串',
    image:
      'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80',
    description: '炭火の香りが立つ、席で選びやすい看板メニュー',
  },
  {
    id: 'drinks',
    name: 'ドリンク',
    icon: '杯',
    image:
      'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80',
    description: '飲み放題の有無に合わせて見やすく整理したドリンク一覧',
  },
  {
    id: 'supplies',
    name: '無料備品',
    icon: '無料',
    image:
      'https://images.unsplash.com/photo-1532635241-17e820acc59f?auto=format&fit=crop&w=900&q=80',
    description: 'おしぼり・取り皿・お箸は無料で追加できます',
  },
  {
    id: 'dessert',
    name: 'デザート',
    icon: '甘',
    image:
      'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=900&q=80',
    description: '食後に軽く楽しめる甘味を用意しました',
  },
];

const menuItems = {
  yakitori: [
    {
      id: 1,
      name: 'ねぎま串',
      price: 320,
      status: '販売中',
      image:
        'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=900&q=80',
      description: '香ばしい鶏肉とねぎの定番串',
    },
    {
      id: 2,
      name: 'つくね串',
      price: 360,
      status: '販売中',
      image:
        'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?auto=format&fit=crop&w=900&q=80',
      description: 'ふっくら食感でたれがよく絡む人気串',
    },
    {
      id: 3,
      name: '皮串',
      price: 280,
      status: '販売中',
      image:
        'https://images.unsplash.com/photo-1564834744159-ff0ea41ba4b7?auto=format&fit=crop&w=900&q=80',
      description: '外は香ばしく中はジューシー',
    },
  ],
  drinks: [
    {
      id: 11,
      name: '生ビール',
      price: 580,
      status: '販売中',
      image:
        'https://images.unsplash.com/photo-1558640476-4370f6d6e1d9?auto=format&fit=crop&w=900&q=80',
      description: 'キレのある定番ビール',
    },
    {
      id: 12,
      name: 'ハイボール',
      price: 520,
      status: '販売中',
      image:
        'https://images.unsplash.com/photo-1514361892635-eae31f9d1b54?auto=format&fit=crop&w=900&q=80',
      description: 'すっきり飲みやすい一杯',
    },
    {
      id: 13,
      name: '烏龍茶',
      price: 280,
      status: '販売中',
      image:
        'https://images.unsplash.com/photo-1517701550927-30cf4ba1b47f?auto=format&fit=crop&w=900&q=80',
      description: '食事に合わせやすいノンアル',
    },
  ],
  supplies: [
    {
      id: 21,
      name: 'おしぼり',
      price: 0,
      status: '無料',
      image:
        'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80',
      description: '必要な数だけ無料で追加できます',
    },
    {
      id: 22,
      name: '取り皿',
      price: 0,
      status: '無料',
      image:
        'https://images.unsplash.com/photo-1453606845775-bb9a3a8b9c5e?auto=format&fit=crop&w=900&q=80',
      description: 'シェア用の皿を無料でお届けします',
    },
    {
      id: 23,
      name: '割り箸',
      price: 0,
      status: '無料',
      image:
        'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=900&q=80',
      description: 'お箸も追加料金なしで注文可能です',
    },
  ],
  dessert: [
    {
      id: 31,
      name: 'ガトーショコラ',
      price: 480,
      status: '販売中',
      image:
        'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=900&q=80',
      description: 'しっとり濃厚なチョコレートケーキ',
    },
    {
      id: 32,
      name: '季節のアイス',
      price: 320,
      status: '販売中',
      image:
        'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?auto=format&fit=crop&w=900&q=80',
      description: '最後にさっぱりと締める甘味',
    },
  ],
};

function formatPrice(price) {
  return price === 0 ? '無料' : `¥${price.toLocaleString()}`;
}

function createOrderId() {
  return `ORD-${Date.now()}`;
}

function App() {
  const [screen, setScreen] = useState('login');
  const [loginId, setLoginId] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [employeeUser, setEmployeeUser] = useState(null);

  const [drinkPlan, setDrinkPlan] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('yakitori');
  const [cart, setCart] = useState([]);
  const [history, setHistory] = useState([]);
  const [lastOrder, setLastOrder] = useState(null);

  // 従業員管理用のデータ
  const [orders, setOrders] = useState([
    {
      id: 'ORD-001',
      table: 5,
      items: [
        { name: 'ねぎま串', quantity: 2, status: '調理中' },
        { name: '生ビール', quantity: 1, status: '提供済み' },
      ],
      total: 1220,
      createdAt: new Date(Date.now() - 300000),
    },
    {
      id: 'ORD-002',
      table: 3,
      items: [
        { name: 'つくね串', quantity: 1, status: '待機中' },
        { name: 'ハイボール', quantity: 2, status: '調理中' },
      ],
      total: 1420,
      createdAt: new Date(Date.now() - 120000),
    },
  ]);

  const [tables, setTables] = useState([
    { id: 1, name: 'テーブル1', status: '空席', qrCode: 'QR001', capacity: 4 },
    { id: 2, name: 'テーブル2', status: '使用中', qrCode: 'QR002', capacity: 4 },
    { id: 3, name: 'テーブル3', status: '使用中', qrCode: 'QR003', capacity: 6 },
    { id: 4, name: 'テーブル4', status: '空席', qrCode: 'QR004', capacity: 2 },
    { id: 5, name: 'テーブル5', status: '使用中', qrCode: 'QR005', capacity: 4 },
  ]);

  const [menuState, setMenuState] = useState(menuItems);

  const [employees, setEmployees] = useState([
    { id: 1, name: '田中太郎', role: '店長', empId: 'EMP001', status: '在籍中' },
    { id: 2, name: '鈴木花子', role: 'ホール', empId: 'EMP002', status: '在籍中' },
    { id: 3, name: '佐藤次郎', role: 'キッチン', empId: 'EMP003', status: '在籍中' },
  ]);

  // メニュー追加用フォーム
  const [newMenuName, setNewMenuName] = useState('');
  const [newMenuPrice, setNewMenuPrice] = useState('');
  const [newMenuCategory, setNewMenuCategory] = useState('yakitori');
  const [isMenuAddVisible, setIsMenuAddVisible] = useState(false);

  // 従業員追加用フォーム
  const [newEmployeeName, setNewEmployeeName] = useState('');
  const [newEmployeeRole, setNewEmployeeRole] = useState('ホール');

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

  const openCategory = (categoryId) => {
    setSelectedCategory(categoryId);
    setScreen('category');
  };

  const handleLogin = () => {
    if (!loginId.trim() || !loginPassword.trim()) {
      setLoginError('IDとパスワードを入力してください。');
      return;
    }

    setEmployeeUser({ id: loginId.trim() });
    setLoginError('');
    setLoginPassword('');
    setScreen('employeeHome');
  };

  const handleLogout = () => {
    setEmployeeUser(null);
    setLoginId('');
    setLoginPassword('');
    setLoginError('');
    setScreen('login');
  };

  const updateOrderStatus = (orderId, itemIndex, newStatus) => {
    setOrders(
      orders.map(order =>
        order.id === orderId
          ? {
              ...order,
              items: order.items.map((item, index) =>
                index === itemIndex ? { ...item, status: newStatus } : item
              ),
            }
          : order
      )
    );
  };

  const updateTableStatus = (tableId, newStatus) => {
    setTables(tables.map(table => (table.id === tableId ? { ...table, status: newStatus } : table)));
  };

  const generateQRCode = tableId => {
    alert(`テーブル${tableId}のQRコードを生成しました`);
  };

  const toggleMenuStatus = (categoryId, itemId) => {
    setMenuState(prev => ({
      ...prev,
      [categoryId]: prev[categoryId].map(i =>
        i.id === itemId
          ? {
              ...i,
              status: i.status === '販売中' ? '販売停止' : '販売中',
            }
          : i
      ),
    }));
  };

  const toggleEmployeeStatus = employeeId => {
    setEmployees(prev =>
      prev.map(e =>
        e.id === employeeId
          ? {
              ...e,
              status: e.status === '在籍中' ? '退職' : '在籍中',
            }
          : e
      )
    );
  };

  const addMenuToCategory = () => {
    if (!newMenuName.trim() || !newMenuPrice.trim()) {
      alert('メニュー名と価格を入力してください');
      return;
    }

    const price = parseInt(newMenuPrice);
    if (isNaN(price)) {
      alert('価格は数値で入力してください');
      return;
    }

    setMenuState(prev => ({
      ...prev,
      [newMenuCategory]: [
        ...prev[newMenuCategory],
        {
          id: Date.now(),
          name: newMenuName,
          price: price,
          status: '販売中',
          image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=900&q=80',
          description: '新しいメニュー',
        },
      ],
    }));

    setNewMenuName('');
    setNewMenuPrice('');
  };

  const deleteMenuFromCategory = (categoryId, itemId) => {
    setMenuState(prev => ({
      ...prev,
      [categoryId]: prev[categoryId].filter(item => item.id !== itemId),
    }));
  };

  const addNewEmployee = () => {
    if (!newEmployeeName.trim()) {
      alert('従業員名を入力してください');
      return;
    }

    const newId = Math.max(...employees.map(e => e.id), 0) + 1;
    const newEmpId = `EMP${String(newId).padStart(3, '0')}`;

    setEmployees(prev => [
      ...prev,
      {
        id: newId,
        name: newEmployeeName,
        role: newEmployeeRole,
        empId: newEmpId,
        status: '在籍中',
      },
    ]);

    setNewEmployeeName('');
    setNewEmployeeRole('ホール');
  };

  const deleteEmployee = employeeId => {
    setEmployees(prev => prev.filter(e => e.id !== employeeId));
  };

  const renderLogin = () => (
    <section className="screen login-screen">
      <div className="screen-body auth-shell">
        <div className="auth-card">
          <div>
            <p className="card-kicker">従業員ログイン</p>
            <h2>ID とパスワードでログイン</h2>
            <p>バックエンド連携は後で追加します。まずは画面フローを確認してください。</p>
          </div>

          <div className="login-form">
            <label className="form-row">
              <span>ID</span>
              <input
                type="text"
                value={loginId}
                onChange={(event) => setLoginId(event.target.value)}
                placeholder="スタッフID"
              />
            </label>

            <label className="form-row">
              <span>パスワード</span>
              <input
                type="password"
                value={loginPassword}
                onChange={(event) => setLoginPassword(event.target.value)}
                placeholder="パスワード"
              />
            </label>

            {loginError && <p className="login-error">{loginError}</p>}
          </div>

          <button type="button" className="footer-button primary full-width" onClick={handleLogin}>
            ログイン
          </button>
        </div>
      </div>
    </section>
  );

  const renderEmployeeHome = () => (
    <section className="screen home-screen">
      <header className="screen-header sticky">
        <div>
          <p className="eyebrow">従業員メニュー</p>
          <h2>ようこそ {employeeUser?.id ?? 'スタッフ'} さん</h2>
        </div>
        <button type="button" className="user-icon-button" onClick={handleLogout}>
          👤
        </button>
      </header>

      <div className="screen-body">
        <div className="notice-card">
          <div>
            <p className="card-kicker">業務機能</p>
            <h3>操作したい機能を選んでください</h3>
            <p>注文受付、座席管理、店舗管理へ進めます。</p>
          </div>
        </div>

        <div className="action-grid">
          <button type="button" className="menu-card" onClick={() => setScreen('orders')}>
            <h3>注文受付 / 注文管理</h3>
            <p>注文の確認と管理を行います。</p>
          </button>

          <button type="button" className="menu-card" onClick={() => setScreen('seats')}>
            <h3>座席管理</h3>
            <p>座席ステータスを確認・変更できます。</p>
          </button>

          <button type="button" className="menu-card" onClick={() => setScreen('store')}>
            <h3>店舗管理</h3>
            <p>店舗情報を確認します。</p>
          </button>
        </div>
      </div>
    </section>
  );

  const renderStoreManagement = () => (
    <section className="screen list-screen">
      <header className="screen-header sticky employee-header">
        <button
          type="button"
          className="back-button text-button"
          onClick={() => setScreen('employeeHome')}
        >
          ← 戻る
        </button>
        <div>
          <p className="eyebrow">管理画面</p>
          <h2>店舗管理</h2>
        </div>
        <button type="button" className="user-icon-button" onClick={handleLogout}>
          👤
        </button>
      </header>

      <div className="screen-body scrollable">
        <div className="action-grid">
          <button
            type="button"
            className="menu-card"
            onClick={() => setScreen('menuManagement')}
          >
            <h3>メニュー管理</h3>
            <p>メニューの追加、編集、削除を行います。</p>
          </button>

          <button
            type="button"
            className="menu-card"
            onClick={() => setScreen('employeeManagement')}
          >
            <h3>従業員管理</h3>
            <p>従業員の追加、編集、削除を行います。</p>
          </button>
        </div>
      </div>
    </section>
  );

  const renderMenuManagement = () => (
    <section className="screen list-screen">
      <header className="screen-header sticky employee-header">
        <button
          type="button"
          className="back-button text-button"
          onClick={() => setScreen('store')}
        >
          ← 戻る
        </button>
        <div>
          <p className="eyebrow">管理画面</p>
          <h2>メニュー管理</h2>
        </div>
        <button type="button" className="user-icon-button" onClick={handleLogout}>
          👤
        </button>
      </header>

      <div className="screen-body scrollable">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h4 style={{ margin: '0 0 8px 0' }}>メニュー管理</h4>
            <p style={{ margin: 0 }}>現在のメニューを確認・追加できます。</p>
          </div>
          <button
            type="button"
            onClick={() => setIsMenuAddVisible((prev) => !prev)}
            style={{
              padding: '10px 16px',
              borderRadius: '6px',
              background: '#007bff',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            {isMenuAddVisible ? '追加フォームを閉じる' : 'メニューを追加'}
          </button>
        </div>

        {isMenuAddVisible && (
          <div style={{ padding: '16px', marginBottom: '16px', background: '#f5f5f5', borderRadius: '8px' }}>
            <h4 style={{ margin: '0 0 12px 0' }}>メニュー追加</h4>
            <div style={{ display: 'grid', gap: '8px' }}>
              <select
                value={newMenuCategory}
                onChange={e => setNewMenuCategory(e.target.value)}
                style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
              >
                {Object.entries(menuState).map(([categoryId]) => (
                  <option key={categoryId} value={categoryId}>
                    {categories.find(c => c.id === categoryId)?.name || categoryId}
                  </option>
                ))}
              </select>
              <input
                type="text"
                placeholder="メニュー名"
                value={newMenuName}
                onChange={e => setNewMenuName(e.target.value)}
                style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
              />
              <input
                type="number"
                placeholder="価格"
                value={newMenuPrice}
                onChange={e => setNewMenuPrice(e.target.value)}
                style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
              />
              <button
                type="button"
                onClick={addMenuToCategory}
                style={{
                  padding: '8px',
                  borderRadius: '4px',
                  background: '#28a745',
                  color: 'white',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                追加
              </button>
            </div>
          </div>
        )}

        <div className="action-grid">
          {Object.entries(menuState).map(([categoryId, items]) => (
            <div key={categoryId} className="menu-card">
              <h3>{categories.find(c => c.id === categoryId)?.name || categoryId}</h3>
              {items.map(item => (
                <div
                  key={item.id}
                  style={{
                    marginBottom: '8px',
                    padding: '8px',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                  }}
                >
                  <p>
                    {item.name} - ¥{item.price.toLocaleString()}
                  </p>
                  <p>ステータス: {item.status}</p>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    <button
                      type="button"
                      onClick={() => toggleMenuStatus(categoryId, item.id)}
                      style={{
                        flex: 1,
                        padding: '4px 8px',
                        borderRadius: '4px',
                        background: item.status === '販売中' ? '#dc3545' : '#28a745',
                        color: 'white',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '12px',
                      }}
                    >
                      {item.status === '販売中' ? '停止' : '再開'}
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteMenuFromCategory(categoryId, item.id)}
                      style={{
                        flex: 1,
                        padding: '4px 8px',
                        borderRadius: '4px',
                        background: '#6c757d',
                        color: 'white',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '12px',
                      }}
                    >
                      削除
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  const renderEmployeeManagement = () => (
    <section className="screen list-screen">
      <header className="screen-header sticky employee-header">
        <button
          type="button"
          className="back-button text-button"
          onClick={() => setScreen('store')}
        >
          ← 戻る
        </button>
        <div>
          <p className="eyebrow">管理画面</p>
          <h2>従業員管理</h2>
        </div>
        <button type="button" className="user-icon-button" onClick={handleLogout}>
          👤
        </button>
      </header>

      <div className="screen-body scrollable">
        <div style={{ padding: '16px', marginBottom: '16px', background: '#f5f5f5', borderRadius: '8px' }}>
          <h4 style={{ margin: '0 0 12px 0' }}>従業員追加</h4>
          <div style={{ display: 'grid', gap: '8px' }}>
            <input
              type="text"
              placeholder="従業員名"
              value={newEmployeeName}
              onChange={e => setNewEmployeeName(e.target.value)}
              style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
            />
            <select
              value={newEmployeeRole}
              onChange={e => setNewEmployeeRole(e.target.value)}
              style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
            >
              <option value="店長">店長</option>
              <option value="ホール">ホール</option>
              <option value="キッチン">キッチン</option>
              <option value="洗い場">洗い場</option>
            </select>
            <button
              type="button"
              onClick={addNewEmployee}
              style={{
                padding: '8px',
                borderRadius: '4px',
                background: '#28a745',
                color: 'white',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              追加
            </button>
          </div>
        </div>

        <div className="action-grid">
          {employees.map(employee => (
            <div key={employee.id} className="menu-card">
              <h3>{employee.name}</h3>
              <p>役職: {employee.role}</p>
              <p>ID: {employee.empId}</p>
              <p>ステータス: {employee.status}</p>
              <div style={{ display: 'flex', gap: '4px' }}>
                <button
                  type="button"
                  onClick={() => toggleEmployeeStatus(employee.id)}
                  style={{
                    flex: 1,
                    padding: '4px 8px',
                    borderRadius: '4px',
                    background: employee.status === '在籍中' ? '#dc3545' : '#28a745',
                    color: 'white',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '12px',
                  }}
                >
                  {employee.status === '在籍中' ? '退職' : '再開'}
                </button>
                <button
                  type="button"
                  onClick={() => deleteEmployee(employee.id)}
                  style={{
                    flex: 1,
                    padding: '4px 8px',
                    borderRadius: '4px',
                    background: '#6c757d',
                    color: 'white',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '12px',
                  }}
                >
                  削除
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  const renderPlaceholderScreen = (title, description) => (
    <section className="screen list-screen">
      <header className="screen-header sticky employee-header">
        <button type="button" className="back-button text-button" onClick={() => setScreen('employeeHome')}>
          ← 戻る
        </button>
        <div>
          <p className="eyebrow">管理画面</p>
          <h2>{title}</h2>
        </div>
        <button type="button" className="user-icon-button" onClick={handleLogout}>
          👤
        </button>
      </header>

      <div className="screen-body scrollable">
        <div className="placeholder-card">
          <h3>{title}</h3>
          <p>{description}</p>
          <p>バックエンド連携は後ほど追加します。</p>
        </div>
      </div>
    </section>
  );

  const renderWelcome = () => (
    <section className="screen welcome-screen">
      <div className="hero-banner">
        <img
          src="https://images.unsplash.com/photo-1526318896980-cf78c088247c?auto=format&fit=crop&w=1200&q=80"
          alt="居酒屋の雰囲気"
        />
        <div className="hero-overlay" />
        <div className="hero-copy">
          <p className="eyebrow">Customer Order</p>
          <h1>まず飲み放題の確認をしてください</h1>
          <p>そのあとにメニューへ進むシンプルな注文画面です。</p>
        </div>
      </div>

      <div className="screen-body">
        <div className="prompt-card">
          <div>
            <p className="card-kicker">最初の確認</p>
            <h2>飲み放題ですか？</h2>
            <p>先に選んでもらうことで、ドリンク画面の案内を分かりやすくします。</p>
          </div>

          <div className="choice-row">
            <button
              type="button"
              className="choice-button primary"
              onClick={() => {
                setDrinkPlan('all');
                setScreen('home');
              }}
            >
              はい、飲み放題です
            </button>
            <button
              type="button"
              className="choice-button secondary"
              onClick={() => {
                setDrinkPlan('none');
                setScreen('home');
              }}
            >
              いいえ、都度注文です
            </button>
          </div>
        </div>
      </div>
    </section>
  );

  const renderHome = () => (
    <section className="screen home-screen">
      <header className="screen-header sticky">
        <div>
          <p className="eyebrow">Midori-tei</p>
          <h2>注文画面</h2>
        </div>
        <div className="status-stack">
          <span className={`status-pill ${drinkPlan === 'all' ? 'accent' : 'muted'}`}>
            {drinkPlan === 'all' ? '飲み放題あり' : '飲み放題なし'}
          </span>
          <span className="status-pill muted">売り切れなし</span>
        </div>
      </header>

      <div className="screen-body">
        <div className="notice-card">
          <div>
            <p className="card-kicker">おすすめ</p>
            <h3>画像だけの画面から、直接操作できる画面に変更しました</h3>
            <p>カードを押すと、その場で一覧に進みます。</p>
          </div>
          <img
            src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=900&q=80"
            alt="料理の盛り付け"
          />
        </div>

        <div className="category-grid">
          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              className="category-card"
              onClick={() => openCategory(category.id)}
            >
              <img src={category.image} alt={category.name} loading="lazy" />
              <div className="category-card-body">
                <div className="category-topline">
                  <span className="category-icon">{category.icon}</span>
                  <span className="status-chip">販売中</span>
                </div>
                <h3>{category.name}</h3>
                <p>{category.description}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      <footer className="screen-footer sticky">
        <button type="button" className="footer-button ghost" onClick={() => setScreen('history')}>
          履歴
        </button>
        <button type="button" className="footer-button primary" onClick={() => setScreen('cart')}>
          カートを見る {cartCount > 0 ? `(${cartCount})` : ''}
        </button>
      </footer>
    </section>
  );

  const renderCategory = () => {
    const items = menuItems[selectedCategory] ?? [];

    return (
      <section className="screen list-screen">
        <header className="screen-header sticky">
          <button type="button" className="text-button" onClick={() => setScreen('home')}>
            ← 戻る
          </button>
          <div>
            <p className="eyebrow">Menu</p>
            <h2>{activeCategory.name}</h2>
          </div>
          <span className={`status-pill ${selectedCategory === 'supplies' ? 'accent' : 'muted'}`}>
            {selectedCategory === 'supplies' ? '無料' : '販売中'}
          </span>
        </header>

        <div className="screen-body scrollable">
          <div className="category-hero">
            <img src={activeCategory.image} alt={activeCategory.name} />
            <div>
              <p className="card-kicker">{activeCategory.icon}</p>
              <h3>{activeCategory.description}</h3>
              <p>
                {selectedCategory === 'supplies'
                  ? '無料備品はすべて ¥0 です。'
                  : '販売中の状態を明示し、売り切れ表示は出さない構成にしています。'}
              </p>
            </div>
          </div>

          <div className="item-list">
            {items.map((item) => (
              <article key={item.id} className="item-card">
                <img src={item.image} alt={item.name} loading="lazy" />
                <div className="item-card-body">
                  <div className="item-card-topline">
                    <h3>{item.name}</h3>
                    <span className="status-chip">{item.status}</span>
                  </div>
                  <p>{item.description}</p>
                  <div className="item-card-footer">
                    <strong>{formatPrice(item.price)}</strong>
                    <button type="button" className="small-button" onClick={() => addToCart(item)}>
                      追加
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <footer className="screen-footer sticky">
          <button type="button" className="footer-button ghost" onClick={() => setScreen('home')}>
            メニュー
          </button>
          <button type="button" className="footer-button primary" onClick={() => setScreen('cart')}>
            カート {cartCount > 0 ? `(${cartCount})` : ''} ・ ¥{cartTotal.toLocaleString()}
          </button>
        </footer>
      </section>
    );
  };

  const renderCart = () => (
    <section className="screen cart-screen">
      <header className="screen-header sticky">
        <button type="button" className="text-button" onClick={() => setScreen('home')}>
          ← 戻る
        </button>
        <div>
          <p className="eyebrow">Cart</p>
          <h2>注文確認</h2>
        </div>
        <span className="status-pill muted">{cartCount}点</span>
      </header>

      <div className="screen-body scrollable">
        {cart.length === 0 ? (
          <div className="empty-state">
            <h3>カートは空です</h3>
            <p>商品を追加すると、ここに一覧が表示されます。</p>
            <button type="button" className="footer-button primary" onClick={() => setScreen('home')}>
              メニューへ戻る
            </button>
          </div>
        ) : (
          <>
            <div className="cart-list">
              {cart.map((item) => (
                <article key={item.id} className="cart-item">
                  <img src={item.image} alt={item.name} loading="lazy" />
                  <div className="cart-item-body">
                    <div className="item-card-topline">
                      <h3>{item.name}</h3>
                      <span className="status-chip">{formatPrice(item.price)}</span>
                    </div>
                    <p>{item.description}</p>
                    <div className="quantity-row">
                      <button
                        type="button"
                        className="qty-button"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        −
                      </button>
                      <span className="qty-value">{item.quantity}</span>
                      <button
                        type="button"
                        className="qty-button"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="cart-item-price">¥{(item.price * item.quantity).toLocaleString()}</div>
                </article>
              ))}
            </div>

            <div className="summary-card">
              <div className="summary-row">
                <span>小計</span>
                <strong>¥{cartTotal.toLocaleString()}</strong>
              </div>
              <div className="summary-row total">
                <span>合計</span>
                <strong>¥{cartTotal.toLocaleString()}</strong>
              </div>
            </div>
          </>
        )}
      </div>

      <footer className="screen-footer sticky">
        <button type="button" className="footer-button ghost" onClick={() => setScreen('home')}>
          メニューへ
        </button>
        <button
          type="button"
          className="footer-button primary"
          onClick={submitOrder}
          disabled={cart.length === 0}
        >
          注文する
        </button>
      </footer>
    </section>
  );

  const renderHistory = () => (
    <section className="screen history-screen">
      <header className="screen-header sticky">
        <button type="button" className="text-button" onClick={() => setScreen('home')}>
          ← 戻る
        </button>
        <div>
          <p className="eyebrow">History</p>
          <h2>注文履歴</h2>
        </div>
        <span className="status-pill muted">{history.length}件</span>
      </header>

      <div className="screen-body scrollable">
        {history.length === 0 ? (
          <div className="empty-state">
            <h3>まだ注文はありません</h3>
            <p>最初の注文を送信すると、ここに履歴が残ります。</p>
          </div>
        ) : (
          <div className="history-list">
            {history.map((order) => (
              <article key={order.id} className="history-card">
                <div className="item-card-topline">
                  <h3>{order.id}</h3>
                  <span className="status-chip">送信済み</span>
                </div>
                <p>{new Date(order.timestamp).toLocaleString('ja-JP')}</p>
                <div className="history-items">
                  {order.items.map((item) => (
                    <div key={item.id} className="history-line">
                      <span>
                        {item.name} × {item.quantity}
                      </span>
                      <span>{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>
                <div className="summary-row total">
                  <span>合計</span>
                  <strong>¥{order.totalPrice.toLocaleString()}</strong>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      <footer className="screen-footer sticky">
        <button type="button" className="footer-button ghost" onClick={() => setScreen('home')}>
          メニューへ
        </button>
        <button type="button" className="footer-button primary" onClick={() => setScreen('cart')}>
          カートを見る
        </button>
      </footer>
    </section>
  );

  const renderComplete = () => (
    <section className="screen complete-screen">
      <div className="screen-body complete-body">
        <div className="completion-card">
          <div className="completion-mark">✓</div>
          <p className="card-kicker">Order Complete</p>
          <h2>注文を送信しました</h2>
          {lastOrder && (
            <>
              <p className="completion-id">注文番号 {lastOrder.id}</p>
              <div className="summary-card compact">
                {lastOrder.items.map((item) => (
                  <div key={item.id} className="history-line">
                    <span>
                      {item.name} × {item.quantity}
                    </span>
                    <span>{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
                <div className="summary-row total">
                  <span>合計</span>
                  <strong>¥{lastOrder.totalPrice.toLocaleString()}</strong>
                </div>
              </div>
            </>
          )}
          <p>処理は即時反映するようにして、重い遷移を入れていません。</p>
        </div>
      </div>
    </section>
  );

  return (
    <main className="customer-root">
      <section className="app-shell" aria-label="従業員および顧客画面">
        {screen === 'login' && renderLogin()}
        {screen === 'employeeHome' && renderEmployeeHome()}
        {screen === 'orders' &&
          renderPlaceholderScreen(
            '注文受付 / 注文管理',
            'ここから注文の受付と管理を行います。'
          )}
        {screen === 'seats' &&
          renderPlaceholderScreen('座席管理', 'ここから座席の状態を確認・変更できます。')}
        {screen === 'store' && renderStoreManagement()}
        {screen === 'menuManagement' && renderMenuManagement()}
        {screen === 'employeeManagement' && renderEmployeeManagement()}
        {screen === 'welcome' && renderWelcome()}
        {screen === 'home' && renderHome()}
        {screen === 'category' && renderCategory()}
        {screen === 'cart' && renderCart()}
        {screen === 'history' && renderHistory()}
        {screen === 'complete' && renderComplete()}
      </section>
    </main>
  );
}

export default App;