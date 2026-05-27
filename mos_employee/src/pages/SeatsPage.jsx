import { useState } from 'react';
import { useStore } from '../store/StoreContext.jsx';
import { TABLE_STATUS } from '../data/mockData';
import { TableBadge } from '../components/Badge.jsx';
import { Modal } from '../components/Modal.jsx';

export function SeatsPage() {
  const { tables, employees, dispatch } = useStore();
  const [seating, setSeating] = useState(null); // 着席対象テーブル
  const [guests, setGuests] = useState(1);
  const [staffId, setStaffId] = useState('');

  const hallStaff = employees.filter(
    (emp) => emp.attendance === 'working' && emp.role !== 'kitchen'
  );

  const counts = tables.reduce((acc, t) => {
    acc[t.status] = (acc[t.status] || 0) + 1;
    return acc;
  }, {});

  const staffName = (id) => employees.find((emp) => emp.id === id)?.name ?? '未割当';

  const openSeat = (table) => {
    setSeating(table);
    setGuests(1);
    setStaffId(hallStaff[0]?.id ?? '');
  };

  const confirmSeat = (e) => {
    e.preventDefault();
    dispatch({
      type: 'SEAT_TABLE',
      id: seating.id,
      guests: Number(guests),
      assignedStaffId: staffId || null,
    });
    setSeating(null);
  };

  return (
    <>
      <div className="section-head">
        <h2>フロアマップ（{tables.length}席）</h2>
        <div className="seat-filters">
          {Object.entries(TABLE_STATUS).map(([key, label]) => (
            <span key={key}>
              {label}：<strong>{counts[key] || 0}</strong>
            </span>
          ))}
        </div>
      </div>

      <div className="seat-grid">
        {tables.map((table) => (
          <div key={table.id} className={`seat ${table.status}`}>
            <div className="seat-top">
              <span className="seat-name">{table.name}</span>
              <TableBadge value={table.status} />
            </div>
            <p className="seat-info">
              定員：<b>{table.capacity}名</b>
              <br />
              {table.status === 'occupied' || table.status === 'checkout' ? (
                <>
                  来客：<b>{table.guests}名</b> / 担当：<b>{staffName(table.assignedStaffId)}</b>
                  <br />
                  着席：<b>{table.seatedAt}</b>
                </>
              ) : table.status === 'reserved' ? (
                <>予約済み</>
              ) : (
                <>ご案内できます</>
              )}
            </p>
            <div className="seat-actions">
              {table.status === 'empty' && (
                <button type="button" className="btn primary small" onClick={() => openSeat(table)}>
                  着席
                </button>
              )}
              {table.status === 'reserved' && (
                <button type="button" className="btn primary small" onClick={() => openSeat(table)}>
                  来店受付
                </button>
              )}
              {table.status === 'occupied' && (
                <button
                  type="button"
                  className="btn small"
                  onClick={() => dispatch({ type: 'UPDATE_TABLE', id: table.id, changes: { status: 'checkout' } })}
                >
                  会計へ
                </button>
              )}
              {table.status === 'checkout' && (
                <button
                  type="button"
                  className="btn primary small"
                  onClick={() => dispatch({ type: 'CLEAR_TABLE', id: table.id })}
                >
                  退店・清掃完了
                </button>
              )}
              {table.status === 'empty' && (
                <button
                  type="button"
                  className="btn small"
                  onClick={() => dispatch({ type: 'UPDATE_TABLE', id: table.id, changes: { status: 'reserved' } })}
                >
                  予約に
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {seating && (
        <Modal title={`${seating.name} に着席`} onClose={() => setSeating(null)}>
          <form onSubmit={confirmSeat}>
            <div className="field">
              <label>来客人数（定員 {seating.capacity}名）</label>
              <input
                type="number"
                value={guests}
                min="1"
                max={seating.capacity}
                onChange={(e) => setGuests(e.target.value)}
                autoFocus
              />
            </div>
            <div className="field">
              <label>担当スタッフ</label>
              <select value={staffId} onChange={(e) => setStaffId(e.target.value)}>
                <option value="">未割当</option>
                {hallStaff.map((emp) => (
                  <option key={emp.id} value={emp.id}>{emp.name}</option>
                ))}
              </select>
            </div>
            <div className="modal-actions">
              <button type="button" className="btn" onClick={() => setSeating(null)}>キャンセル</button>
              <button type="submit" className="btn primary">着席にする</button>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
}
