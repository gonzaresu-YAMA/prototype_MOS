import { useStore } from '../store/StoreContext.jsx';
import { OrderBadge, AttendanceBadge } from '../components/Badge.jsx';
import { formatPrice, orderTotal } from '../utils/helpers';

export function DashboardPage({ onNavigate }) {
  const { employees, tables, orders } = useStore();

  const working = employees.filter((e) => e.attendance === 'working').length;
  const occupied = tables.filter((t) => t.status === 'occupied' || t.status === 'checkout').length;
  const activeOrders = orders.filter((o) => o.status !== 'served');
  const salesToday = orders.reduce((sum, o) => sum + orderTotal(o), 0);

  const tableName = (id) => tables.find((t) => t.id === id)?.name ?? id;

  return (
    <>
      <div className="stat-grid">
        <button type="button" className="card stat" style={{ textAlign: 'left' }} onClick={() => onNavigate('employees')}>
          <p className="stat-label">👤 出勤中スタッフ</p>
          <p className="stat-value">{working}<span className="unit">/ {employees.length}名</span></p>
          <p className="stat-foot">タップで従業員管理へ</p>
        </button>
        <button type="button" className="card stat" style={{ textAlign: 'left' }} onClick={() => onNavigate('seats')}>
          <p className="stat-label">🪑 利用中の座席</p>
          <p className="stat-value">{occupied}<span className="unit">/ {tables.length}席</span></p>
          <p className="stat-foot">タップで座席管理へ</p>
        </button>
        <button type="button" className="card stat" style={{ textAlign: 'left' }} onClick={() => onNavigate('orders')}>
          <p className="stat-label">🧾 対応中の注文</p>
          <p className="stat-value">{activeOrders.length}<span className="unit">件</span></p>
          <p className="stat-foot">受付・調理中の合計</p>
        </button>
        <div className="card stat">
          <p className="stat-label">💴 本日の売上（暫定）</p>
          <p className="stat-value">{formatPrice(salesToday)}</p>
          <p className="stat-foot">登録済み注文の合計</p>
        </div>
      </div>

      <div className="dash-cols">
        <div className="card panel">
          <h2>進行中の注文</h2>
          {activeOrders.length === 0 ? (
            <p className="list-sub">対応中の注文はありません。</p>
          ) : (
            activeOrders.map((order) => (
              <div key={order.id} className="list-row">
                <div>
                  <div className="list-main">{tableName(order.tableId)}　{order.id}</div>
                  <div className="list-sub">
                    {order.items.map((i) => `${i.name}×${i.qty}`).join('・')}・{order.createdAt}
                  </div>
                </div>
                <OrderBadge value={order.status} />
              </div>
            ))
          )}
        </div>

        <div className="card panel">
          <h2>スタッフの勤務状況</h2>
          {employees.map((emp) => (
            <div key={emp.id} className="list-row">
              <div>
                <div className="list-main">{emp.name}</div>
                <div className="list-sub">{emp.id}</div>
              </div>
              <AttendanceBadge value={emp.attendance} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
