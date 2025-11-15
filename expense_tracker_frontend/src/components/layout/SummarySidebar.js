import React, { useMemo } from 'react';
import { Card } from '../ui/Primitives';
import { theme } from '../../theme';
import { formatCurrency } from '../../utils/format';

// PUBLIC_INTERFACE
export function SummarySidebar({ expenses }) {
  /** Sidebar totals + donut chart by category */
  const { total, byCat } = useMemo(() => {
    const map = {};
    let total = 0;
    for (const e of expenses) {
      total += Number(e.amount || 0);
      map[e.category || 'Uncategorized'] = (map[e.category || 'Uncategorized'] || 0) + Number(e.amount || 0);
    }
    return { total, byCat: map };
  }, [expenses]);

  const entries = Object.entries(byCat);
  const sum = entries.reduce((a, [, v]) => a + v, 0) || 1;

  let startAngle = 0;
  const arcs = entries.map(([name, val], i) => {
    const angle = (val / sum) * 2 * Math.PI;
    const endAngle = startAngle + angle;
    const large = angle > Math.PI ? 1 : 0;
    const r = 48;
    const cx = 60;
    const cy = 60;
    const x1 = cx + r * Math.cos(startAngle);
    const y1 = cy + r * Math.sin(startAngle);
    const x2 = cx + r * Math.cos(endAngle);
    const y2 = cy + r * Math.sin(endAngle);
    const d = `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} Z`;
    startAngle = endAngle;
    const palette = ['#2563EB', '#F59E0B', '#10B981', '#8B5CF6', '#EC4899', '#14B8A6'];
    return { d, color: palette[i % palette.length], name, val };
  });

  return (
    <aside style={{ minWidth: 280 }}>
      <Card>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div>
            <svg width="120" height="120" viewBox="0 0 120 120" role="img" aria-label="Category breakdown">
              {arcs.map((a, i) => (
                <path key={i} d={a.d} fill={a.color} stroke={theme.colors.surface} strokeWidth="1" />
              ))}
              <circle cx="60" cy="60" r="30" fill={theme.colors.surface} />
            </svg>
          </div>
          <div>
            <div style={{ fontWeight: 800, color: theme.colors.text, fontSize: 18 }}>Total</div>
            <div style={{ fontWeight: 800, fontSize: 22 }}>{formatCurrency(total)}</div>
            <div style={{ color: theme.colors.muted, fontSize: 13 }}>{entries.length} categories</div>
          </div>
        </div>
        <div style={{ marginTop: 12, display: 'grid', gap: 6 }}>
          {entries.map(([name, val], i) => (
            <div key={name} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ width: 10, height: 10, borderRadius: 2, background: arcs[i].color }} />
              <div style={{ flex: 1, color: theme.colors.text }}>{name}</div>
              <div style={{ color: theme.colors.muted }}>{formatCurrency(val)}</div>
            </div>
          ))}
          {entries.length === 0 && <div style={{ color: theme.colors.muted }}>No data</div>}
        </div>
      </Card>
    </aside>
  );
}
