export function formatPrice(price) {
  return `¥${price.toLocaleString()}`;
}

export function orderTotal(order) {
  return order.items.reduce((sum, item) => sum + item.price * item.qty, 0);
}

export function nowLabel() {
  const now = new Date();
  return `${now.getHours().toString().padStart(2, '0')}:${now
    .getMinutes()
    .toString()
    .padStart(2, '0')}`;
}

// 展示用の簡易ID採番
export function makeId(prefix) {
  return `${prefix}-${Date.now().toString().slice(-5)}`;
}
