import React, { useMemo, useState } from 'react';
import { EmptyState, Loader } from '../ui/Primitives';
import { ExpenseItem } from './ExpenseItem';

// PUBLIC_INTERFACE
export function ExpenseList({ data, loading, onEdit, onDelete, pageSize = 10 }) {
  /** Expense list with simple pagination */
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil((data?.length || 0) / pageSize));
  const pageData = useMemo(() => {
    const start = (page - 1) * pageSize;
    return (data || []).slice(start, start + pageSize);
  }, [data, page, pageSize]);

  if (loading) return <Loader label="Loading expenses..." />;
  if (!data || data.length === 0)
    return (
      <EmptyState
        title="No expenses yet"
        description="Start by adding your first expense."
      />
    );

  return (
    <div style={{ display: 'grid', gap: 10 }}>
      {pageData.map((e) => (
        <ExpenseItem key={e.id} expense={e} onEdit={onEdit} onDelete={onDelete} />
      ))}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 6 }}>
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          aria-label="Previous page"
          style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid #E5E7EB', background: 'white', cursor: page === 1 ? 'not-allowed' : 'pointer' }}
        >
          Prev
        </button>
        <div aria-live="polite" style={{ minWidth: 90, textAlign: 'center' }}>
          Page {page} / {totalPages}
        </div>
        <button
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
          aria-label="Next page"
          style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid #E5E7EB', background: 'white', cursor: page === totalPages ? 'not-allowed' : 'pointer' }}
        >
          Next
        </button>
      </div>
    </div>
  );
}
