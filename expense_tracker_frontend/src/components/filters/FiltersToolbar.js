import React from 'react';
import { Input, Select, Button, Card } from '../ui/Primitives';
import { theme } from '../../theme';

// PUBLIC_INTERFACE
export function FiltersToolbar({ filters, setFilters, categories }) {
  /** Filters toolbar for search, category, and date range */
  return (
    <Card style={{ display: 'grid', gap: 10 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr auto', gap: 10 }}>
        <Input
          aria-label="Search expenses"
          placeholder="Search by name or category"
          value={filters.q}
          onChange={(e) => setFilters((f) => ({ ...f, q: e.target.value }))}
        />
        <Select
          aria-label="Filter by category"
          value={filters.category}
          onChange={(e) => setFilters((f) => ({ ...f, category: e.target.value }))}
          options={[{ label: 'All categories', value: 'All' }, ...categories.map((c) => ({ label: c, value: c }))]}
        />
        <Input
          aria-label="From date"
          type="date"
          value={filters.from}
          onChange={(e) => setFilters((f) => ({ ...f, from: e.target.value }))}
        />
        <Input
          aria-label="To date"
          type="date"
          value={filters.to}
          onChange={(e) => setFilters((f) => ({ ...f, to: e.target.value }))}
        />
        <Button
          aria-label="Clear filters"
          variant="ghost"
          onClick={() => setFilters({ q: '', category: 'All', from: '', to: '' })}
        >
          Reset
        </Button>
      </div>
      <div style={{ fontSize: 12, color: theme.colors.muted }}>
        Tip: Use the search to quickly find expenses by name or category.
      </div>
    </Card>
  );
}
