export function EmployeeHomeScreen({ employeeUser, onLogout, setScreen }) {
  return (
    <section className="screen home-screen">
      <header className="screen-header sticky">
        <div>
          <p className="eyebrow">従業員メニュー</p>
          <h2>ようこそ {employeeUser?.id ?? 'スタッフ'} さん</h2>
        </div>
        <button type="button" className="user-icon-button" onClick={onLogout}>
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
}

export function StoreManagementScreen({ onBack, onLogout, setScreen }) {
  return (
    <section className="screen list-screen">
      <header className="screen-header sticky employee-header">
        <button type="button" className="back-button text-button" onClick={onBack}>
          ← 戻る
        </button>
        <div>
          <p className="eyebrow">管理画面</p>
          <h2>店舗管理</h2>
        </div>
        <button type="button" className="user-icon-button" onClick={onLogout}>
          👤
        </button>
      </header>

      <div className="screen-body scrollable">
        <div className="action-grid">
          <button type="button" className="menu-card" onClick={() => setScreen('menuManagement')}>
            <h3>メニュー管理</h3>
            <p>メニューの追加、編集、削除を行います。</p>
          </button>

          <button type="button" className="menu-card" onClick={() => setScreen('employeeManagement')}>
            <h3>従業員管理</h3>
            <p>従業員の追加、編集、削除を行います。</p>
          </button>
        </div>
      </div>
    </section>
  );
}

const actionButtonStyles = {
  padding: '10px 16px',
  borderRadius: '6px',
  color: 'white',
  border: 'none',
  cursor: 'pointer',
};

export function MenuManagementScreen({ menuState, categories, isMenuAddVisible, onToggleMenuAdd, newMenuCategory, setNewMenuCategory, newMenuName, setNewMenuName, newMenuPrice, setNewMenuPrice, addMenuToCategory, toggleMenuStatus, confirmDeleteMenu, onBack, onLogout }) {
  return (
    <section className="screen list-screen">
      <header className="screen-header sticky employee-header">
        <button type="button" className="back-button text-button" onClick={onBack}>
          ← 戻る
        </button>
        <div>
          <p className="eyebrow">管理画面</p>
          <h2>メニュー管理</h2>
        </div>
        <button type="button" className="user-icon-button" onClick={onLogout}>
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
            onClick={onToggleMenuAdd}
            style={{
              ...actionButtonStyles,
              background: '#007bff',
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
                onChange={setNewMenuCategory}
                style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
              >
                {Object.entries(menuState).map(([categoryId]) => (
                  <option key={categoryId} value={categoryId}>
                    {categories.find((c) => c.id === categoryId)?.name || categoryId}
                  </option>
                ))}
              </select>
              <input
                type="text"
                placeholder="メニュー名"
                value={newMenuName}
                onChange={setNewMenuName}
                style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
              />
              <input
                type="number"
                placeholder="価格"
                value={newMenuPrice}
                onChange={setNewMenuPrice}
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
              <h3>{categories.find((c) => c.id === categoryId)?.name || categoryId}</h3>
              {items.map((item) => (
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
                      onClick={() => confirmDeleteMenu(categoryId, item.id, item.name)}
                      style={{
                        padding: '4px 6px',
                        borderRadius: '4px',
                        background: '#6c757d',
                        color: 'white',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '10px',
                        minWidth: '32px',
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
}

export function EmployeeManagementScreen({ employees, toggleEmployeeStatus, confirmDeleteEmployee, setScreen, onBack, onLogout }) {
  return (
    <section className="screen list-screen">
      <header className="screen-header sticky employee-header">
        <button type="button" className="back-button text-button" onClick={onBack}>
          ← 戻る
        </button>
        <div>
          <p className="eyebrow">管理画面</p>
          <h2>従業員管理</h2>
        </div>
        <button type="button" className="user-icon-button" onClick={onLogout}>
          👤
        </button>
      </header>

      <div className="screen-body scrollable">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h4 style={{ margin: '0 0 8px 0' }}>従業員一覧</h4>
            <p style={{ margin: 0 }}>従業員の状態を確認・編集できます。</p>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              type="button"
              onClick={() => setScreen('addEmployee')}
              style={{
                ...actionButtonStyles,
                background: '#007bff',
              }}
            >
              従業員を追加
            </button>
            <button
              type="button"
              onClick={() => setScreen('deleteEmployee')}
              style={{
                ...actionButtonStyles,
                background: '#ffc107',
                color: '#333',
              }}
            >
              削除画面へ
            </button>
          </div>
        </div>

        <div style={{ display: 'grid', gap: '12px' }}>
          {employees.map((emp) => (
            <div
              key={emp.id}
              style={{
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div>
                <h3 style={{ margin: 0 }}>{emp.name}</h3>
                <p style={{ margin: '4px 0 0 0' }}>ID: {emp.empId} ・ {emp.role}</p>
                <p style={{ margin: '4px 0 0 0' }}>ステータス: {emp.status}</p>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  type="button"
                  onClick={() => toggleEmployeeStatus(emp.id)}
                  style={{
                    padding: '8px 12px',
                    borderRadius: '6px',
                    background: emp.status === '出勤中' ? '#dc3545' : '#28a745',
                    color: 'white',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  {emp.status === '出勤中' ? '退勤へ' : '出勤へ'}
                </button>
                <button
                  type="button"
                  onClick={() => confirmDeleteEmployee(emp.id, emp.name)}
                  style={{
                    padding: '8px 12px',
                    borderRadius: '6px',
                    background: '#dc3545',
                    color: 'white',
                    border: 'none',
                    cursor: 'pointer',
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
}

export function AddEmployeeScreen({ newEmployeeName, setNewEmployeeName, newEmployeeRole, setNewEmployeeRole, addNewEmployee, onBack, onLogout }) {
  return (
    <section className="screen list-screen">
      <header className="screen-header sticky employee-header">
        <button type="button" className="back-button text-button" onClick={onBack}>
          ← 戻る
        </button>
        <div>
          <p className="eyebrow">管理画面</p>
          <h2>従業員追加</h2>
        </div>
        <button type="button" className="user-icon-button" onClick={onLogout}>
          👤
        </button>
      </header>

      <div className="screen-body scrollable">
        <div style={{ padding: '24px', maxWidth: '600px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '700' }}>
                従業員名
              </label>
              <input
                type="text"
                placeholder="例: 山田太郎"
                value={newEmployeeName}
                onChange={setNewEmployeeName}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid #ddd',
                  fontSize: '16px',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '700' }}>
                役職
              </label>
              <select
                value={newEmployeeRole}
                onChange={setNewEmployeeRole}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid #ddd',
                  fontSize: '16px',
                  boxSizing: 'border-box',
                }}
              >
                <option value="店長">店長</option>
                <option value="ホール">ホール</option>
                <option value="キッチン">キッチン</option>
                <option value="洗い場">洗い場</option>
              </select>
            </div>

            <button
              type="button"
              onClick={addNewEmployee}
              style={{
                padding: '14px',
                borderRadius: '8px',
                background: '#28a745',
                color: 'white',
                border: 'none',
                cursor: 'pointer',
                fontWeight: '700',
                fontSize: '16px',
                marginTop: '8px',
              }}
            >
              追加する
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export function DeleteEmployeeScreen({ deleteEmployeeId, setDeleteEmployeeId, searchedEmployeeForDelete, confirmDeleteEmployeeBySearch, setScreen, onBack, onLogout }) {
  return (
    <section className="screen list-screen">
      <header className="screen-header sticky employee-header">
        <button
          type="button"
          className="back-button text-button"
          onClick={onBack}
        >
          ← 戻る
        </button>
        <div>
          <p className="eyebrow">管理画面</p>
          <h2>従業員削除</h2>
        </div>
        <button type="button" className="user-icon-button" onClick={onLogout}>
          👤
        </button>
      </header>

      <div className="screen-body scrollable">
        <div style={{ padding: '24px', maxWidth: '600px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '700' }}>
                従業員ID (EMP001など)
              </label>
              <input
                type="text"
                placeholder="例: EMP001"
                value={deleteEmployeeId}
                onChange={setDeleteEmployeeId}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid #ddd',
                  fontSize: '16px',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            {searchedEmployeeForDelete && (
              <div style={{
                padding: '16px',
                background: '#f9f9f9',
                borderRadius: '8px',
                border: '2px solid #007bff',
              }}>
                <h3 style={{ marginTop: 0, marginBottom: '12px' }}>削除対象の従業員</h3>
                <div style={{ display: 'grid', gap: '8px' }}>
                  <p><strong>名前:</strong> {searchedEmployeeForDelete.name}</p>
                  <p><strong>ID:</strong> {searchedEmployeeForDelete.empId}</p>
                  <p><strong>役職:</strong> {searchedEmployeeForDelete.role}</p>
                  <p><strong>ステータス:</strong> {searchedEmployeeForDelete.status}</p>
                </div>
                <button
                  type="button"
                  onClick={() => confirmDeleteEmployeeBySearch(searchedEmployeeForDelete.id, searchedEmployeeForDelete.name)}
                  style={{
                    width: '100%',
                    marginTop: '12px',
                    padding: '12px',
                    borderRadius: '8px',
                    background: '#dc3545',
                    color: 'white',
                    border: 'none',
                    cursor: 'pointer',
                    fontWeight: '700',
                    fontSize: '16px',
                  }}
                >
                  この従業員を削除する
                </button>
              </div>
            )}

            {deleteEmployeeId.trim() && !searchedEmployeeForDelete && (
              <div style={{
                padding: '16px',
                background: '#fff3cd',
                borderRadius: '8px',
                border: '2px solid #ffc107',
              }}>
                <p style={{ margin: 0, color: '#856404' }}>
                  該当する従業員が見つかりません
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
