//
// Ocean Professional theme tokens and reusable classNames
//

// PUBLIC_INTERFACE
export const theme = {
  name: 'Ocean Professional',
  colors: {
    primary: '#2563EB',
    secondary: '#F59E0B',
    success: '#F59E0B',
    error: '#EF4444',
    background: '#f9fafb',
    surface: '#ffffff',
    text: '#111827',
    muted: '#6B7280',
    border: '#E5E7EB',
  },
  shadow: '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)',
  radius: '12px',
  transition: 'all 200ms ease',
};

// PUBLIC_INTERFACE
export const styles = {
  gradientBg:
    'background: linear-gradient(135deg, rgba(37,99,235,0.08) 0%, rgba(249,250,251,1) 100%);',
};

// PUBLIC_INTERFACE
export const appClasses = {
  container: {
    padding: 'max(16px, 2vw)',
    maxWidth: '1200px',
    margin: '0 auto',
  },
};

// PUBLIC_INTERFACE
export function cx(...classes) {
  /** Join class names conditionally */
  return classes.filter(Boolean).join(' ');
}
