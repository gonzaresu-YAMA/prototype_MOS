import { useMemo, useState } from 'react';
import { useStore } from '../store/StoreContext.jsx';
import { ORDER_STATUS, menuItems } from '../data/mockData';
import { OrderBadge } from '../components/Badge.jsx';
import { Modal } from '../components/Modal.jsx';
import { formatPrice, orderTotal } from '../utils/helpers';

const FILTERS = [{ id: 'all', label: 'すべて' }, ...Object.entries(ORDER_STATUS).map(([id, label]) => ({ id, label }))];

export function OrdersPage() {
  const { orders, tables, dispatch } = useStore();
  const [filter, setFilter] = useState('all');
  const [creating, setCreating] = useState(false);

  const tableName = (id) => tables.find((t) => t.id === id)?.name ?? id;

  const visible = useMemo(
    () => (filter === 'all' ? orders : orders.filter((o) => o.status === filter)),
    [orders, filter]
  );

  return (
    <>
      <div className="section-head">
        <h2>注文一覧（{visible.length}件）</h2>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <select className="status-select" value={filter} onChange={(e) => setFilter(e.target.value)}>
            {FILTERS.map((f) => (
              <option key={f.id} value={f.id}>{f.label}</option>
            ))}
          </select>
          <button type="button" className="btn primary" onClick={() => setCreating(true)}>
            ＋ 新規注文
          </button>
        </div>
      </div>

      {visible.length === 0 ? (
        <div className="card empty-state">該当する注文はありません。</div>
      ) : (
        <div className="card table-wrap">
          <table className="data">
            <thead>
              <tr>
                <th>注文ID</th>
                <th>テーブル</th>
                <th>内容</th>
                <th>合計</th>
                <th>受付時刻</th>
                <th>状態</th>
                <th style={{ textAlign: 'right' }}>操作</th>
              </tr>
            </thead>
            <tbody>
              {visible.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td><strong>{tableName(order.tableId)}</strong></td>
                  <td>
                    {order.items.map((item) => (
                      <div key={item.menuId} className="list-sub">
                        {item.name} × {item.qty}
                      </div>
                    ))}
                  </td>
                  <td>{formatPrice(orderTotal(order))}</td>
                  <td>{order.createdAt}</td>
                  <td>
                    <select
                      className="status-select"
                      value={order.status}
                      onChange={(e) => dispatch({ type: 'SET_ORDER_STATUS', id: order.id, status: e.target.value })}
                    >
                      {Object.entries(ORDER_STATUS).map(([key, label]) => (
                        <option key={key} value={key}>{label}</option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <div className="row-actions">
                      <OrderBadge value={order.status} />
                      <button
                        type="button"
                        className="btn small danger"
                        onClick={() => dispatch({ type: 'DELETE_ORDER', id: order.id })}
                      >
                        取消
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {creating && <NewOrderModal tables={tables} dispatch={dispatch} onClose={() => setCreating(false)} />}
    </>
  );
}

function NewOrderModal({ tables, dispatch, onClose }) {
  const seatable = tables.filter((t) => t.status === 'occupied' || t.status === 'checkout');
  const [tableId, setTableId] = useState(seatable[0]?.id ?? tables[0]?.id ?? '');
  const [qty, setQty] = useState(() => Object.fromEntries(menuItems.map((m) => [m.id, 0])));

  const setQtyFor = (id, delta) =>
    setQty((q) => ({ ...q, [id]: Math.max(0, (q[id] || 0) + delta) }));

  const selected = menuItems
    .filter((m) => qty[m.id] > 0)
    .map((m) => ({ menuId: m.id, name: m.name, price: m.price, qty: qty[m.id] }));

  const total = selected.reduce((sum, item) => sum + item.price * item.qty, 0);

  const submit = (e) => {
    e.preventDefault();
    if (!tableId || selected.length === 0) return;
    dispatch({ type: 'ADD_ORDER', tableId, items: selected });
    onClose();
  };

  return (
    <Modal title="新規注文を登録" onClose={onClose}>
      <form onSubmit={submit}>
        <div className="field">
          <label>テーブル</label>
          <select value={tableId} onChange={(e) => setTableId(e.target.value)}>
            {tables.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}（{t.status === 'occupied' || t.status === 'checkout' ? '利用中' : '空席'}）
              </option>
            ))}
          </select>
        </div>

        <div className="field">
          <label>メニュー</label>
          {menuItems.map((m) => (
            <div key={m.id} className="order-line">
              <span>{m.name}　<span className="list-sub" style={{ display: 'inline' }}>{formatPrice(m.price)}</span></span>
              <span className="qty-control">
                <button type="button" className="qty-btn" onClick={() => setQtyFor(m.id, -1)}>−</button>
                <span style={{ minWidth: 18, textAlign: 'center' }}>{qty[m.id]}</span>
                <button type="button" className="qty-btn" onClick={() => setQtyFor(m.id, 1)}>＋</button>
              </span>
            </div>
          ))}
        </div>

        <div className="order-line" style={{ fontWeight: 700, fontSize: 16 }}>
          <span>合計</span>
          <span>{formatPrice(total)}</span>
        </div>

        <div className="modal-actions">
          <button type="button" className="btn" onClick={onClose}>キャンセル</button>
          <button type="submit" className="btn primary" disabled={selected.length === 0}>
            注文を登録
          </button>
        </div>
      </form>
    </Modal>
  );
}
