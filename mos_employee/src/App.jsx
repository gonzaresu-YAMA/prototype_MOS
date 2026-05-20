import { useState } from 'react';
import './App.css';
import { Sidebar } from './components/Sidebar.jsx';
import { DashboardPage } from './pages/DashboardPage.jsx';
import { EmployeesPage } from './pages/EmployeesPage.jsx';
import { SeatsPage } from './pages/SeatsPage.jsx';
import { OrdersPage } from './pages/OrdersPage.jsx';
import { nowLabel } from './utils/helpers';

const NAV = [
  { id: 'dashboard', label: 'ダッシュボード', icon: '📊' },
  { id: 'employees', label: '従業員管理', icon: '👤' },
  { id: 'seats', label: '座席管理', icon: '🪑' },
  { id: 'orders', label: '注文管理', icon: '🧾' },
];

function App() {
  const [page, setPage] = useState('dashboard');
  const active = NAV.find((nav) => nav.id === page) ?? NAV[0];

  return (
    <div className="app">
      <Sidebar nav={NAV} current={page} onNavigate={setPage} />
      <div className="main">
        <header className="topbar">
          <div>
            <p className="topbar-eyebrow">みどり亭 スタッフ管理</p>
            <h1>{active.label}</h1>
          </div>
          <div className="topbar-meta">
            <span className="clock">🕒 {nowLabel()}</span>
            <span className="topbar-user">店長 田中 美咲</span>
          </div>
        </header>
        <div className="content">
          {page === 'dashboard' && <DashboardPage onNavigate={setPage} />}
          {page === 'employees' && <EmployeesPage />}
          {page === 'seats' && <SeatsPage />}
          {page === 'orders' && <OrdersPage />}
        </div>
      </div>
    </div>
  );
}

export default App;
