# Expense Tracker Frontend (Ocean Professional)

Modern, lightweight React app for tracking personal expenses.

## Features
- Add, edit, and delete expenses
- Filters: search, category, and date range
- Summary sidebar with donut chart by category and totals
- Local mock mode with browser storage; optional remote API via env
- Ocean Professional theme with subtle gradients, rounded corners, and shadows
- Accessible UI: labels, aria attributes, keyboard navigable
- Dev seeding when `REACT_APP_NODE_ENV !== 'production'`

## Quick start
```bash
npm install
npm start
```
App runs at http://localhost:3000

## Environment
The app respects the following (optional) variables:
- REACT_APP_API_BASE
- REACT_APP_BACKEND_URL
- REACT_APP_FRONTEND_URL
- REACT_APP_WS_URL
- REACT_APP_NODE_ENV
- REACT_APP_PORT
- REACT_APP_LOG_LEVEL
- REACT_APP_FEATURE_FLAGS
- REACT_APP_EXPERIMENTS_ENABLED

When `REACT_APP_API_BASE` (or `REACT_APP_BACKEND_URL`) is not set, the app works fully in local mock mode using browser storage.

## Project structure
- src/theme.js: Theme tokens/utilities
- src/context/ExpensesContext.js: Global state, CRUD actions, filters
- src/services/api.js: Mock/remote API layer
- src/components/ui: Reusable UI primitives
- src/components/filters: Filters toolbar
- src/components/expenses: Expense form, list, and item
- src/components/layout: Header and SummarySidebar
- src/pages: Dashboard, Expenses, Settings

## Scripts
- npm start - Start dev server
- npm test - Run tests
- npm run build - Production build

## Notes
- This app uses hash-based routing fallback (no extra dependencies).
- In local mode, data persists to localStorage.
- To seed sample data, run in dev (default CRA) where `REACT_APP_NODE_ENV !== 'production'`.
