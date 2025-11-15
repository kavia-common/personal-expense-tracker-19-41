import React, { useMemo } from 'react';
import { useExpenses } from '../context/ExpensesContext';
import { Card } from '../components/ui/Primitives';
import { formatCurrency } from '../utils/format';

// PUBLIC_INTERFACE
export default function Dashboard() {
  /** Dashboard page showing quick summaries */
  const { filtered } = useExpenses();
  const { total, count, avg } = useMemo(() => {
    const total = filtered.reduce((a, e) => a + Number(e.amount || 0), 0);
    const count = filtered.length;
    const avg = count ? total / count : 0;
    return { total, count, avg };
  }, [filtered]);

  return (
    <div style={{ display: 'grid', gap: 12, gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))' }}>
      <Card>
        <div style={{ fontSize: 13, color: '#6B7280' }}>Total Spent</div>
        <div style={{ fontSize: 24, fontWeight: 800 }}>{formatCurrency(total)}</div>
      </Card>
      <Card>
        <div style={{ fontSize: 13, color: '#6B7280' }}>Transactions</div>
        <div style={{ fontSize: 24, fontWeight: 800 }}>{count}</div>
      </Card>
      <Card>
        <div style={{ fontSize: 13, color: '#6B7280' }}>Average</div>
        <div style={{ fontSize: 24, fontWeight: 800 }}>{formatCurrency(avg)}</div>
      </Card>
    </div>
  );
}
