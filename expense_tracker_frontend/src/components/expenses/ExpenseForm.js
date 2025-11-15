import React, { useEffect, useState } from 'react';
import { Button, Input, Select } from '../ui/Primitives';

// PUBLIC_INTERFACE
export function ExpenseForm({ initial, onSubmit, onCancel }) {
  /** Form for creating or editing an expense */
  const [title, setTitle] = useState(initial?.title || '');
  const [amount, setAmount] = useState(initial?.amount ?? '');
  const [category, setCategory] = useState(initial?.category || 'General');
  const [date, setDate] = useState(initial?.date ? initial.date.slice(0, 10) : new Date().toISOString().slice(0, 10));
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setTitle(initial?.title || '');
    setAmount(initial?.amount ?? '');
    setCategory(initial?.category || 'General');
    setDate(initial?.date ? initial.date.slice(0, 10) : new Date().toISOString().slice(0, 10));
  }, [initial]);

  const validate = () => {
    const e = {};
    if (!title.trim()) e.title = 'Title is required';
    const num = Number(amount);
    if (isNaN(num) || num <= 0) e.amount = 'Enter a valid amount';
    if (!date) e.date = 'Date is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    onSubmit?.({
      title: title.trim(),
      amount: Number(amount),
      category,
      date: new Date(date).toISOString(),
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input label="Title" value={title} onChange={(e) => setTitle(e.target.value)} error={errors.title} />
      <Input
        label="Amount"
        type="number"
        inputMode="decimal"
        step="0.01"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        error={errors.amount}
      />
      <Select
        label="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        options={[
          'General',
          'Food',
          'Transport',
          'Health',
          'Shopping',
          'Bills',
          'Entertainment',
          'Travel',
          'Other',
        ].map((c) => ({ label: c, value: c }))}
      />
      <Input label="Date" type="date" value={date} onChange={(e) => setDate(e.target.value)} error={errors.date} />
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 8 }}>
        <Button type="button" variant="ghost" onClick={onCancel} aria-label="Cancel">
          Cancel
        </Button>
        <Button type="submit" aria-label="Save expense">
          {initial ? 'Save changes' : 'Add expense'}
        </Button>
      </div>
    </form>
  );
}
