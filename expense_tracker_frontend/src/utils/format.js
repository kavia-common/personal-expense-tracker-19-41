//
// Formatting helpers
//

// PUBLIC_INTERFACE
export function formatCurrency(value, currency = 'USD', locale = navigator.language || 'en-US') {
  /** Format a number to currency */
  if (value === null || value === undefined || isNaN(Number(value))) return '$0.00';
  try {
    return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(Number(value));
  } catch {
    return `$${Number(value).toFixed(2)}`;
  }
}

// PUBLIC_INTERFACE
export function formatDate(iso, locale = navigator.language || 'en-US') {
  /** Format an ISO date string to a readable date */
  try {
    const d = new Date(iso);
    return d.toLocaleDateString(locale, { year: 'numeric', month: 'short', day: 'numeric' });
  } catch {
    return iso;
  }
}

// PUBLIC_INTERFACE
export function monthKey(iso) {
  /** Return YYYY-MM key for an ISO date */
  const d = new Date(iso);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
}
