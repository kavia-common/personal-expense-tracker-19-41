const EXPENSES_KEY = 'et_expenses_v1';
const PREFS_KEY = 'et_prefs_v1';

// PUBLIC_INTERFACE
export function loadExpenses() {
  /** Load expenses array from localStorage */
  try {
    const raw = localStorage.getItem(EXPENSES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

// PUBLIC_INTERFACE
export function saveExpenses(expenses) {
  /** Persist expenses array to localStorage */
  try {
    localStorage.setItem(EXPENSES_KEY, JSON.stringify(expenses));
  } catch {
    /* ignore */
  }
}

// PUBLIC_INTERFACE
export function loadPrefs() {
  /** Load user preferences (theme, filters) */
  try {
    const raw = localStorage.getItem(PREFS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

// PUBLIC_INTERFACE
export function savePrefs(prefs) {
  /** Save user preferences */
  try {
    localStorage.setItem(PREFS_KEY, JSON.stringify(prefs));
  } catch {
    /* ignore */
  }
}
