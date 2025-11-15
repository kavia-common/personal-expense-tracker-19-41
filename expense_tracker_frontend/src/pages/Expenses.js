import React, { useMemo, useState } from 'react';
import { useExpenses } from '../context/ExpensesContext';
import { FiltersToolbar } from '../components/filters/FiltersToolbar';
import { ExpenseList } from '../components/expenses/ExpenseList';
import { Button, Card, Modal, Toast } from '../components/ui/Primitives';
import { ExpenseForm } from '../components/expenses/ExpenseForm';

// PUBLIC_INTERFACE
export default function ExpensesPage() {
  /** Expenses page with filters, list, and add/edit flows */
  const { filtered, loading, filters, setFilters, addExpense, editExpense, removeExpense, toast, setToast } = useExpenses();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const categories = useMemo(() => {
    const set = new Set(filtered.map((e) => e.category || 'General'));
    return Array.from(set).sort();
  }, [filtered]);

  const onAdd = () => {
    setEditing(null);
    setOpen(true);
  };

  const onEdit = (expense) => {
    setEditing(expense);
    setOpen(true);
  };

  const onSubmit = async (payload) => {
    if (editing) {
      await editExpense(editing.id, payload);
    } else {
      await addExpense(payload);
    }
    setOpen(false);
    setEditing(null);
  };

  return (
    <div style={{ display: 'grid', gap: 12 }}>
      <FiltersToolbar filters={filters} setFilters={setFilters} categories={categories} />
      <Card style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontWeight: 800 }}>Expenses</div>
        <Button onClick={onAdd} aria-label="Add expense">+ Add</Button>
      </Card>
      <ExpenseList data={filtered} loading={loading} onEdit={onEdit} onDelete={removeExpense} />
      <Modal open={open} title={editing ? 'Edit expense' : 'Add expense'} onClose={() => setOpen(false)}>
        <ExpenseForm initial={editing} onSubmit={onSubmit} onCancel={() => setOpen(false)} />
      </Modal>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}
