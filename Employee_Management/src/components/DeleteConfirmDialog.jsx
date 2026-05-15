export default function DeleteConfirmDialog({ deleteConfirmData, onCancel, onConfirm }) {
  if (!deleteConfirmData) {
    return null;
  }

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
      }}
    >
      <div
        style={{
          background: 'white',
          borderRadius: '12px',
          padding: '24px',
          maxWidth: '400px',
          width: '90%',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        }}
      >
        <h3 style={{ marginTop: 0 }}>確認</h3>
        <p>
          {deleteConfirmData.type === 'menu'
            ? `「${deleteConfirmData.itemName}」を削除してもよろしいですか？`
            : `「${deleteConfirmData.employeeName}」を削除してもよろしいですか？`}
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
          <button
            type="button"
            onClick={onCancel}
            style={{
              padding: '10px 16px',
              borderRadius: '6px',
              background: '#e9ecef',
              border: 'none',
              cursor: 'pointer',
              fontWeight: '600',
            }}
          >
            キャンセル
          </button>
          <button
            type="button"
            onClick={onConfirm}
            style={{
              padding: '10px 16px',
              borderRadius: '6px',
              background: '#dc3545',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
              fontWeight: '600',
            }}
          >
            削除する
          </button>
        </div>
      </div>
    </div>
  );
}
