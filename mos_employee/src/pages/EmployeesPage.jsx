import { useState } from 'react';
import { useStore } from '../store/StoreContext.jsx';
import { ROLE, ATTENDANCE } from '../data/mockData';
import { AttendanceBadge, RoleBadge } from '../components/Badge.jsx';
import { Modal } from '../components/Modal.jsx';

const EMPTY_FORM = { name: '', role: 'hall', attendance: 'working', hourlyWage: 1100, phone: '' };

export function EmployeesPage() {
  const { employees, dispatch } = useStore();
  const [editing, setEditing] = useState(null); // null | 'new' | employee
  const [form, setForm] = useState(EMPTY_FORM);

  const openNew = () => {
    setForm(EMPTY_FORM);
    setEditing('new');
  };

  const openEdit = (emp) => {
    setForm({ ...emp });
    setEditing(emp);
  };

  const close = () => setEditing(null);

  const setField = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  const save = (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    const payload = { ...form, hourlyWage: Number(form.hourlyWage) || 0 };
    if (editing === 'new') {
      dispatch({ type: 'ADD_EMPLOYEE', employee: payload });
    } else {
      dispatch({ type: 'UPDATE_EMPLOYEE', id: editing.id, changes: payload });
    }
    close();
  };

  const remove = (emp) => {
    if (window.confirm(`${emp.name} さんを削除しますか？`)) {
      dispatch({ type: 'DELETE_EMPLOYEE', id: emp.id });
    }
  };

  // 出勤状態をワンクリックで切り替え（出勤中⇄休憩中⇄退勤）
  const cycleAttendance = (emp) => {
    const order = ['working', 'break', 'off'];
    const next = order[(order.indexOf(emp.attendance) + 1) % order.length];
    dispatch({ type: 'UPDATE_EMPLOYEE', id: emp.id, changes: { attendance: next } });
  };

  return (
    <>
      <div className="section-head">
        <h2>従業員一覧（{employees.length}名）</h2>
        <button type="button" className="btn primary" onClick={openNew}>
          ＋ 従業員を追加
        </button>
      </div>

      <div className="card table-wrap">
        <table className="data">
          <thead>
            <tr>
              <th>ID</th>
              <th>氏名</th>
              <th>役割</th>
              <th>勤務状態</th>
              <th>時給</th>
              <th>電話番号</th>
              <th style={{ textAlign: 'right' }}>操作</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp.id}>
                <td>{emp.id}</td>
                <td><strong>{emp.name}</strong></td>
                <td><RoleBadge value={emp.role} /></td>
                <td>
                  <button
                    type="button"
                    className="btn small"
                    style={{ padding: 0, border: 'none', background: 'none' }}
                    onClick={() => cycleAttendance(emp)}
                    title="クリックで状態切替"
                  >
                    <AttendanceBadge value={emp.attendance} />
                  </button>
                </td>
                <td>¥{emp.hourlyWage.toLocaleString()}</td>
                <td>{emp.phone || '—'}</td>
                <td>
                  <div className="row-actions">
                    <button type="button" className="btn small" onClick={() => openEdit(emp)}>
                      編集
                    </button>
                    <button type="button" className="btn small danger" onClick={() => remove(emp)}>
                      削除
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editing && (
        <Modal title={editing === 'new' ? '従業員を追加' : '従業員を編集'} onClose={close}>
          <form onSubmit={save}>
            <div className="field">
              <label>氏名</label>
              <input
                value={form.name}
                onChange={(e) => setField('name', e.target.value)}
                placeholder="例：山田 太郎"
                autoFocus
              />
            </div>
            <div className="field">
              <label>役割</label>
              <select value={form.role} onChange={(e) => setField('role', e.target.value)}>
                {Object.entries(ROLE).map(([key, label]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
            </div>
            <div className="field">
              <label>勤務状態</label>
              <select value={form.attendance} onChange={(e) => setField('attendance', e.target.value)}>
                {Object.entries(ATTENDANCE).map(([key, label]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
            </div>
            <div className="field">
              <label>時給（円）</label>
              <input
                type="number"
                value={form.hourlyWage}
                onChange={(e) => setField('hourlyWage', e.target.value)}
                min="0"
                step="10"
              />
            </div>
            <div className="field">
              <label>電話番号</label>
              <input
                value={form.phone}
                onChange={(e) => setField('phone', e.target.value)}
                placeholder="090-0000-0000"
              />
            </div>
            <div className="modal-actions">
              <button type="button" className="btn" onClick={close}>キャンセル</button>
              <button type="submit" className="btn primary">保存</button>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
}
