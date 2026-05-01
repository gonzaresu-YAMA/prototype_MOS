export function formatPrice(price) {
  return price === 0 ? '無料' : `¥${price.toLocaleString()}`;
}

export function createOrderId() {
  return `ORD-${Date.now()}`;
}

export function calculateDrinkTimes(durationHours) {
  const now = new Date();
  const startHour = now.getHours();
  const startMinute = now.getMinutes();
  const endHour = (startHour + durationHours) % 24;

  const formatTime = (hour, minute) => {
    return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
  };

  return {
    start: formatTime(startHour, startMinute),
    end: formatTime(endHour, startMinute),
  };
}
