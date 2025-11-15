import React from 'react';
import { theme } from '../../theme';

// PUBLIC_INTERFACE
export function Header({ current = '/', onNavigate }) {
  /** App header with navigation */
  const navItem = (to, label) => {
    const active = current === to;
    return (
      <button
        onClick={() => onNavigate?.(to)}
        aria-current={active ? 'page' : undefined}
        style={{
          background: 'transparent',
          border: 'none',
          color: active ? theme.colors.text : theme.colors.muted,
          fontWeight: active ? 700 : 600,
          padding: '10px 12px',
          borderBottom: active ? `2px solid ${theme.colors.primary}` : '2px solid transparent',
          cursor: 'pointer',
        }}
      >
        {label}
      </button>
    );
  };

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 10,
        background: theme.colors.surface,
        borderBottom: `1px solid ${theme.colors.border}`,
        backdropFilter: 'saturate(180%) blur(8px)',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{ fontWeight: 800, color: theme.colors.primary, letterSpacing: 0.4 }}>🌊 Ocean Expenses</div>
        <nav aria-label="Primary" style={{ display: 'flex', gap: 6, marginLeft: 8 }}>
          {navItem('/', 'Dashboard')}
          {navItem('/expenses', 'Expenses')}
          {navItem('/settings', 'Settings')}
        </nav>
        <div style={{ marginLeft: 'auto', color: theme.colors.muted, fontSize: 13 }}>
          {process.env.REACT_APP_API_BASE ? 'Connected' : 'Offline'} mode
        </div>
      </div>
    </header>
  );
}
