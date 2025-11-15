import React from 'react';
import { Card, Button, Badge } from '../ui/Primitives';
import { formatCurrency, formatDate } from '../../utils/format';

// PUBLIC_INTERFACE
export function ExpenseItem({ expense, onEdit, onDelete }) {
  /** Single expense card */
  return (
    <Card role="article" aria-label={`${expense.title} - ${formatCurrency(expense.amount)}`}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'center', gap: 12 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <strong>{expense.title}</strong>
            <Badge>{expense.category || 'General'}</Badge>
          </div>
          <div style={{ fontSize: 13, color: '#6B7280' }}>{formatDate(expense.date)}</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ fontWeight: 800 }}>{formatCurrency(expense.amount)}</div>
          <Button aria-label="Edit expense" variant="ghost" onClick={() => onEdit?.(expense)}>
            Edit
          </Button>
          <Button aria-label="Delete expense" variant="danger" onClick={() => onDelete?.(expense.id)}>
            Delete
          </Button>
        </div>
      </div>
    </Card>
  );
}
