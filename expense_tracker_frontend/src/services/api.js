import { loadExpenses, saveExpenses } from '../utils/storage';

// Determine API base from environment, fallback to local mock
const API_BASE =
  process.env.REACT_APP_API_BASE ||
  process.env.REACT_APP_BACKEND_URL ||
  '';

// PUBLIC_INTERFACE
export function hasRemoteAPI() {
  /** Whether a remote API base is configured */
  return Boolean(API_BASE);
}

// PUBLIC_INTERFACE
export async function listExpenses() {
  /** List expenses from remote API or local storage */
  if (hasRemoteAPI()) {
    try {
      const res = await fetch(`${API_BASE}/expenses`);
      if (!res.ok) throw new Error('Failed to load expenses');
      return await res.json();
    } catch (e) {
      console.warn('Remote fetch failed, falling back to local.', e);
      return loadExpenses();
    }
  }
  return loadExpenses();
}

// PUBLIC_INTERFACE
export async function createExpense(expense) {
  /** Create expense in remote API or local storage */
  if (hasRemoteAPI()) {
    try {
      const res = await fetch(`${API_BASE}/expenses`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(expense),
      });
      if (!res.ok) throw new Error('Create failed');
      return await res.json();
    } catch (e) {
      console.warn('Remote create failed, saving locally.', e);
    }
  }
  const list = loadExpenses();
  const withId = { ...expense, id: crypto.randomUUID() };
  const updated = [withId, ...list];
  saveExpenses(updated);
  return withId;
}

// PUBLIC_INTERFACE
export async function updateExpense(id, patch) {
  /** Update expense in remote API or local storage */
  if (hasRemoteAPI()) {
    try {
      const res = await fetch(`${API_BASE}/expenses/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(patch),
      });
      if (!res.ok) throw new Error('Update failed');
      return await res.json();
    } catch (e) {
      console.warn('Remote update failed, saving locally.', e);
    }
  }
  const list = loadExpenses();
  const updated = list.map((it) => (it.id === id ? { ...it, ...patch } : it));
  saveExpenses(updated);
  return updated.find((x) => x.id === id);
}

// PUBLIC_INTERFACE
export async function deleteExpense(id) {
  /** Delete expense in remote API or local storage */
  if (hasRemoteAPI()) {
    try {
      const res = await fetch(`${API_BASE}/expenses/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      return true;
    } catch (e) {
      console.warn('Remote delete failed, saving locally.', e);
    }
  }
  const list = loadExpenses();
  const updated = list.filter((it) => it.id !== id);
  saveExpenses(updated);
  return true;
}
