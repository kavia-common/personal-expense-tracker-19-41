import React, { useEffect, useMemo, useState } from 'react';
import './App.css';
import { theme, styles } from './theme';
import { ExpensesProvider } from './context/ExpensesContext';
import Dashboard from './pages/Dashboard';
import ExpensesPage from './pages/Expenses';
import Settings from './pages/Settings';
import { Header } from './components/layout/Header';
import { SummarySidebar } from './components/layout/SummarySidebar';
import { Card } from './components/ui/Primitives';
import { useExpenses } from './context/ExpensesContext';

// Simple hash-based router fallback if react-router is not installed
function useHashRoute() {
  const [route, setRoute] = useState(window.location.hash.replace('#', '') || '/');
  useEffect(() => {
    const onHashChange = () => setRoute(window.location.hash.replace('#', '') || '/');
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);
  const navigate = (to) => {
    window.location.hash = to;
  };
  return { route, navigate };
}

function MainContent() {
  const { route } = useHashRoute();
  const { filtered } = useExpenses();
  const current = route;
  const page = useMemo(() => {
    if (current === '/' || current === '') return <Dashboard />;
    if (current === '/expenses') return <ExpensesPage />;
    if (current === '/settings') return <Settings />;
    return (
      <Card>
        <div>Not found</div>
      </Card>
    );
  }, [current]);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 16, alignItems: 'start' }}>
      <div>{page}</div>
      <SummarySidebar expenses={filtered} />
    </div>
  );
}

// PUBLIC_INTERFACE
function App() {
  const [mode, setMode] = useState('light');
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', mode);
    document.body.style.background = theme.colors.background;
  }, [mode]);

  const { route, navigate } = useHashRoute();

  return (
    <div className="App" style={{ minHeight: '100vh' }}>
      <div style={{ position: 'absolute', inset: 0, zIndex: -1 }}>
        <div style={{ height: '260px', ...Object.fromEntries(styles.gradientBg.split(';').filter(Boolean).map(r=>r.split(':').map(x=>x.trim()))) }} />
      </div>
      <ExpensesProvider>
        <Header current={route} onNavigate={navigate} />
        <main style={{ maxWidth: 1200, margin: '0 auto', padding: '16px' }}>
          <MainContent />
        </main>
      </ExpensesProvider>
    </div>
  );
}

export default App;
