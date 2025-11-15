import React, { useEffect, useState } from 'react';
import { Card, Input } from '../components/ui/Primitives';

// PUBLIC_INTERFACE
export default function Settings() {
  /** Settings page stub honoring env values */
  const [api, setApi] = useState(process.env.REACT_APP_API_BASE || process.env.REACT_APP_BACKEND_URL || '');
  useEffect(() => {
    setApi(process.env.REACT_APP_API_BASE || process.env.REACT_APP_BACKEND_URL || '');
  }, []);
  return (
    <div style={{ display: 'grid', gap: 12 }}>
      <Card>
        <h3 style={{ marginTop: 0 }}>Environment</h3>
        <Input label="API Base (read-only)" value={api} onChange={() => {}} readOnly />
        <div style={{ fontSize: 12, color: '#6B7280' }}>
          When unset, the app runs in local mock mode using browser storage.
        </div>
      </Card>
    </div>
  );
}
