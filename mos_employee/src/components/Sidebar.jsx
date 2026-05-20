export function Sidebar({ nav, current, onNavigate }) {
  return (
    <aside className="sidebar">
      <div className="brand">
        <span className="brand-mark">緑</span>
        <div>
          <p className="brand-name">みどり亭</p>
          <p className="brand-sub">STAFF CONSOLE</p>
        </div>
      </div>

      <nav className="nav">
        {nav.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`nav-item ${current === item.id ? 'active' : ''}`}
            onClick={() => onNavigate(item.id)}
          >
            <span className="nav-icon">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-foot">
        <p>展示用プロトタイプ</p>
        <p className="muted">データはブラウザ内のみ・再読込でリセット</p>
      </div>
    </aside>
  );
}
