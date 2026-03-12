const ORDER_STORAGE_KEY = 'rc_cars_last_order';

export function saveOrderToStorage(order) {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    window.localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(order));
  } catch {
    // Ignore storage errors to avoid blocking checkout flow.
  }
}

export function getOrderFromStorage() {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const rawOrder = window.localStorage.getItem(ORDER_STORAGE_KEY);
    if (!rawOrder) {
      return null;
    }

    return JSON.parse(rawOrder);
  } catch {
    return null;
  }
}
