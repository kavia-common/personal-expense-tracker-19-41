import React from 'react';
import { theme, cx } from '../../theme';

const baseBtn =
  'display:inline-flex;align-items:center;justify-content:center;padding:10px 14px;border-radius:10px;border:1px solid transparent;font-weight:600;cursor:pointer;transition:transform .1s ease,box-shadow .2s ease,background-color .2s ease;outline-offset:2px;';
const btnFocus = 'outline: 2px solid rgba(37,99,235,.6); outline-offset:2px;';
const btnShadow = 'box-shadow: 0 8px 20px rgba(37,99,235,.15);';

function styleToObj(style) {
  return Object.fromEntries(
    style
      .split(';')
      .filter(Boolean)
      .map((r) => {
        const [k, v] = r.split(':');
        return [k.trim(), v.trim()];
      })
  );
}

// PUBLIC_INTERFACE
export function Button({ children, variant = 'primary', className, style, ...props }) {
  /** Accessible button component with variants */
  const variants = {
    primary: {
      backgroundColor: theme.colors.primary,
      color: '#fff',
    },
    secondary: {
      backgroundColor: theme.colors.secondary,
      color: '#111827',
    },
    ghost: {
      backgroundColor: 'transparent',
      color: theme.colors.primary,
      border: `1px solid ${theme.colors.border}`,
    },
    danger: {
      backgroundColor: theme.colors.error,
      color: '#fff',
    },
  };

  const s = {
    ...styleToObj(baseBtn),
    ...variants[variant],
    ...style,
  };

  return (
    <button
      {...props}
      style={s}
      className={cx('et-btn', className)}
      onFocus={(e) => (e.currentTarget.style.outline = '2px solid rgba(37,99,235,.6)')}
      onBlur={(e) => (e.currentTarget.style.outline = '')}
      onMouseEnter={(e) => (e.currentTarget.style.boxShadow = btnShadow.replace('box-shadow:', '').trim())}
      onMouseLeave={(e) => (e.currentTarget.style.boxShadow = '')}
    >
      {children}
    </button>
  );
}

// PUBLIC_INTERFACE
export const Input = React.forwardRef(function Input(
  { label, error, hint, className, style, ...props },
  ref
) {
  /** Accessible input with label and error */
  const id = props.id || `inp-${Math.random().toString(36).slice(2, 9)}`;
  return (
    <div className={cx('et-input', className)} style={{ marginBottom: 12, ...style }}>
      {label && (
        <label htmlFor={id} style={{ display: 'block', fontWeight: 600, marginBottom: 6, color: theme.colors.text }}>
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={id}
        {...props}
        style={{
          width: '100%',
          padding: '10px 12px',
          borderRadius: 10,
          border: `1px solid ${error ? theme.colors.error : theme.colors.border}`,
          background: theme.colors.surface,
          color: theme.colors.text,
          outlineOffset: 2,
        }}
      />
      {hint && !error && <div style={{ fontSize: 12, color: theme.colors.muted, marginTop: 4 }}>{hint}</div>}
      {error && <div role="alert" style={{ fontSize: 12, color: theme.colors.error, marginTop: 4 }}>{error}</div>}
    </div>
  );
});

// PUBLIC_INTERFACE
export function Select({ label, options = [], error, hint, className, style, ...props }) {
  /** Accessible select with label */
  const id = props.id || `sel-${Math.random().toString(36).slice(2, 9)}`;
  return (
    <div className={cx('et-select', className)} style={{ marginBottom: 12, ...style }}>
      {label && (
        <label htmlFor={id} style={{ display: 'block', fontWeight: 600, marginBottom: 6, color: theme.colors.text }}>
          {label}
        </label>
      )}
      <select
        id={id}
        {...props}
        style={{
          width: '100%',
          padding: '10px 12px',
          borderRadius: 10,
          border: `1px solid ${error ? theme.colors.error : theme.colors.border}`,
          background: theme.colors.surface,
          color: theme.colors.text,
          outlineOffset: 2,
        }}
      >
        {options.map((opt) => (
          <option key={opt.value ?? opt} value={opt.value ?? opt}>
            {opt.label ?? opt}
          </option>
        ))}
      </select>
      {hint && !error && <div style={{ fontSize: 12, color: theme.colors.muted, marginTop: 4 }}>{hint}</div>}
      {error && <div role="alert" style={{ fontSize: 12, color: theme.colors.error, marginTop: 4 }}>{error}</div>}
    </div>
  );
}

// PUBLIC_INTERFACE
export function Card({ children, className, style, ...props }) {
  /** Surface card container */
  return (
    <div
      {...props}
      className={cx('et-card', className)}
      style={{
        background: theme.colors.surface,
        border: `1px solid ${theme.colors.border}`,
        borderRadius: theme.radius,
        boxShadow: theme.shadow,
        padding: 16,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// PUBLIC_INTERFACE
export function Modal({ open, title, children, onClose, ariaLabel }) {
  /** Simple accessible modal */
  if (!open) return null;
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={ariaLabel || title}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.4)',
        display: 'grid',
        placeItems: 'center',
        zIndex: 50,
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: theme.colors.surface,
          borderRadius: theme.radius,
          border: `1px solid ${theme.colors.border}`,
          width: 'min(560px, 94vw)',
          padding: 16,
          boxShadow: theme.shadow,
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <h3 style={{ margin: 0, color: theme.colors.text }}>{title}</h3>
          <Button aria-label="Close" variant="ghost" onClick={onClose}>
            ✕
          </Button>
        </div>
        {children}
      </div>
    </div>
  );
}

// PUBLIC_INTERFACE
export function Badge({ children, color = 'primary' }) {
  /** Small pill badge */
  const bg = color === 'primary' ? theme.colors.primary : color === 'secondary' ? theme.colors.secondary : theme.colors.muted;
  const fg = color === 'secondary' ? '#111827' : '#fff';
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '4px 10px',
        borderRadius: 999,
        fontSize: 12,
        background: bg,
        color: fg,
        fontWeight: 600,
      }}
    >
      {children}
    </span>
  );
}

// PUBLIC_INTERFACE
export function Tag({ children }) {
  /** Neutral tag */
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '4px 10px',
        borderRadius: 999,
        fontSize: 12,
        background: '#EEF2FF',
        color: theme.colors.primary,
        fontWeight: 600,
        border: `1px solid ${theme.colors.border}`,
      }}
    >
      {children}
    </span>
  );
}

// PUBLIC_INTERFACE
export function EmptyState({ title = 'No data', description, action }) {
  /** Empty state with optional action */
  return (
    <Card style={{ textAlign: 'center', padding: 24 }}>
      <div style={{ fontSize: 42, marginBottom: 8 }}>🌊</div>
      <h3 style={{ marginTop: 0, marginBottom: 8, color: theme.colors.text }}>{title}</h3>
      {description && <p style={{ color: theme.colors.muted, marginTop: 0 }}>{description}</p>}
      {action}
    </Card>
  );
}

// PUBLIC_INTERFACE
export function Loader({ label = 'Loading...' }) {
  /** Simple spinner */
  return (
    <div role="status" aria-live="polite" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <div
        style={{
          width: 16,
          height: 16,
          border: '3px solid #c7d2fe',
          borderTopColor: theme.colors.primary,
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
        }}
      />
      <span>{label}</span>
      <style>{'@keyframes spin{to{transform:rotate(360deg)}}'}</style>
    </div>
  );
}

// PUBLIC_INTERFACE
export function Toast({ message, type = 'success', onClose }) {
  /** Inline toast notification */
  const bg = type === 'error' ? theme.colors.error : theme.colors.primary;
  return (
    <div
      role="status"
      style={{
        position: 'fixed',
        bottom: 20,
        right: 20,
        background: bg,
        color: '#fff',
        padding: '10px 14px',
        borderRadius: 10,
        boxShadow: theme.shadow,
      }}
    >
      {message}
      <Button variant="ghost" onClick={onClose} style={{ marginLeft: 10, color: '#fff' }}>
        Dismiss
      </Button>
    </div>
  );
}
