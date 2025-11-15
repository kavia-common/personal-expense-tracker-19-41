import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { createExpense, deleteExpense, listExpenses, updateExpense } from '../services/api';
import { savePrefs, loadPrefs } from '../utils/storage';

const ExpensesContext = createContext(null);

// PUBLIC_INTERFACE
export function useExpenses() {
  /** Hook to access expense state and actions */
  const ctx = useContext(ExpensesContext);
  if (!ctx) throw new Error('useExpenses must be used within ExpensesProvider');
  return ctx;
}

const DEV_SEED = [
  { id: 's1', title: 'Groceries', amount: 54.23, category: 'Food', date: new Date().toISOString() },
  { id: 's2', title: 'Coffee', amount: 3.5, category: 'Food', date: new Date().toISOString() },
  { id: 's3', title: 'Gym', amount: 29.99, category: 'Health', date: new Date().toISOString() },
];

// PUBLIC_INTERFACE
export function ExpensesProvider({ children }) {
  /** Provider that handles expenses and filters */
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const [filters, setFilters] = useState(() => ({
    q: '',
    category: 'All',
    from: '',
    to: '',
    ...loadPrefs().filters,
  }));

  useEffect(() => {
    async function init() {
      setLoading(true);
      const list = await listExpenses();
      const seeded =
        (!list || list.length === 0) && process.env.REACT_APP_NODE_ENV !== 'production'
          ? DEV_SEED
          : list;
      setExpenses(seeded || []);
      setLoading(false);
    }
    init();
  }, []);

  useEffect(() => {
    savePrefs({ filters });
  }, [filters]);

  const addExpense = async (data) => {
    const created = await createExpense(data);
    setExpenses((prev) => [created, ...prev]);
    setToast({ type: 'success', message: 'Expense added' });
  };

  const editExpense = async (id, patch) => {
    const updated = await updateExpense(id, patch);
    setExpenses((prev) => prev.map((e) => (e.id === id ? updated : e)));
    setToast({ type: 'success', message: 'Expense updated' });
  };

  const removeExpense = async (id) => {
    await deleteExpense(id);
    setExpenses((prev) => prev.filter((e) => e.id !== id));
    setToast({ type: 'success', message: 'Expense deleted' });
  };

  const filtered = useMemo(() => {
    return expenses.filter((e) => {
      const qok =
        !filters.q ||
        e.title?.toLowerCase().includes(filters.q.toLowerCase()) ||
        e.category?.toLowerCase().includes(filters.q.toLowerCase());
      const catok = filters.category === 'All' || e.category === filters.category;
      const dokFrom = !filters.from || new Date(e.date) >= new Date(filters.from);
      const dokTo = !filters.to || new Date(e.date) <= new Date(filters.to);
      return qok && catok && dokFrom && dokTo;
    });
  }, [expenses, filters]);

  const value = {
    loading,
    toast,
    setToast,
    expenses,
    filtered,
    filters,
    setFilters,
    addExpense,
    editExpense,
    removeExpense,
  };

  return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>;
}
