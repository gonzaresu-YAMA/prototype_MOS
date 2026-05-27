// 展示用モックデータ（インメモリ初期データ）
// 役割・状態などの表示ラベルは labels.js で日本語化する。

export const ROLE = {
  manager: '店長',
  hall: 'ホール',
  kitchen: 'キッチン',
};

export const ATTENDANCE = {
  working: '出勤中',
  break: '休憩中',
  off: '退勤',
};

export const TABLE_STATUS = {
  empty: '空席',
  occupied: '利用中',
  reserved: '予約',
  checkout: '会計待ち',
};

export const ORDER_STATUS = {
  received: '受付',
  cooking: '調理中',
  served: '提供済み',
};

// 従業員
export const initialEmployees = [
  { id: 'E01', name: '田中 美咲', role: 'manager', attendance: 'working', hourlyWage: 1500, phone: '090-1111-2222' },
  { id: 'E02', name: '佐藤 健太', role: 'hall', attendance: 'working', hourlyWage: 1100, phone: '090-2222-3333' },
  { id: 'E03', name: '鈴木 花子', role: 'hall', attendance: 'break', hourlyWage: 1100, phone: '090-3333-4444' },
  { id: 'E04', name: '高橋 大輔', role: 'kitchen', attendance: 'working', hourlyWage: 1300, phone: '090-4444-5555' },
  { id: 'E05', name: '伊藤 さくら', role: 'kitchen', attendance: 'off', hourlyWage: 1250, phone: '090-5555-6666' },
  { id: 'E06', name: '渡辺 翔', role: 'hall', attendance: 'off', hourlyWage: 1050, phone: '090-6666-7777' },
];

// メニュー（注文作成用）
export const menuItems = [
  { id: 'M01', name: 'ビール大瓶', price: 650 },
  { id: 'M02', name: 'ハイボール', price: 550 },
  { id: 'M03', name: 'から揚げ盛り合わせ', price: 850 },
  { id: 'M04', name: 'チキン竜田揚げ', price: 750 },
  { id: 'M05', name: 'えだまめ', price: 380 },
  { id: 'M06', name: 'ナッツミックス', price: 420 },
  { id: 'M07', name: 'チョコレートケーキ', price: 480 },
  { id: 'M08', name: 'フルーツポンチ', price: 520 },
];

// 座席（テーブル）
export const initialTables = [
  { id: 'T1', name: 'テーブル1', capacity: 4, status: 'occupied', guests: 3, assignedStaffId: 'E02', seatedAt: '18:10' },
  { id: 'T2', name: 'テーブル2', capacity: 4, status: 'empty', guests: 0, assignedStaffId: null, seatedAt: null },
  { id: 'T3', name: 'テーブル3', capacity: 2, status: 'occupied', guests: 2, assignedStaffId: 'E03', seatedAt: '18:35' },
  { id: 'T4', name: 'テーブル4', capacity: 6, status: 'reserved', guests: 0, assignedStaffId: null, seatedAt: null },
  { id: 'T5', name: 'テーブル5', capacity: 4, status: 'checkout', guests: 4, assignedStaffId: 'E02', seatedAt: '17:20' },
  { id: 'T6', name: 'テーブル6', capacity: 2, status: 'empty', guests: 0, assignedStaffId: null, seatedAt: null },
  { id: 'T7', name: 'カウンター1', capacity: 1, status: 'occupied', guests: 1, assignedStaffId: 'E03', seatedAt: '18:50' },
  { id: 'T8', name: 'カウンター2', capacity: 1, status: 'empty', guests: 0, assignedStaffId: null, seatedAt: null },
];

// 注文
export const initialOrders = [
  {
    id: 'ORD-1001',
    tableId: 'T1',
    status: 'cooking',
    createdAt: '18:42',
    items: [
      { menuId: 'M01', name: 'ビール大瓶', price: 650, qty: 3 },
      { menuId: 'M03', name: 'から揚げ盛り合わせ', price: 850, qty: 1 },
    ],
  },
  {
    id: 'ORD-1002',
    tableId: 'T3',
    status: 'received',
    createdAt: '18:55',
    items: [
      { menuId: 'M02', name: 'ハイボール', price: 550, qty: 2 },
      { menuId: 'M05', name: 'えだまめ', price: 380, qty: 1 },
    ],
  },
  {
    id: 'ORD-1003',
    tableId: 'T5',
    status: 'served',
    createdAt: '17:35',
    items: [
      { menuId: 'M04', name: 'チキン竜田揚げ', price: 750, qty: 2 },
      { menuId: 'M07', name: 'チョコレートケーキ', price: 480, qty: 2 },
    ],
  },
];
