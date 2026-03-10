# Tabler Admin Dashboard

A fully responsive admin dashboard built with React, featuring a login flow, dynamic data management via Redux & Redux-Saga, and a modern UI inspired by the Tabler design system.

## 🧪 Demo Credentials

| Field    | Value              |
| -------- | ------------------ |
| Email    | `admin@tabler.io`  |
| Password | `password`         |

## 🏗️ Tech Stack

| Layer             | Technology                          |
| ----------------- | ----------------------------------- |
| Framework         | React 19 (Vite)                     |
| Package Manager   | pnpm                                |
| State Management  | Redux Toolkit + Redux-Saga          |
| Routing           | React Router DOM v7                 |
| Styling           | Tailwind CSS v4                     |
| Icons             | Lucide React                        |
| Charts            | Recharts                            |

## 📐 Architecture & Technical Decisions

### Why Redux-Saga over Redux Thunk?

Redux-Saga provides a more declarative and testable approach to handling side effects. The generator-based model makes it straightforward to:

- **Simulate async API calls** with `call()` effects that are easy to mock in tests.
- **Orchestrate complex flows** (login → redirect) using `put()` and `take()`.
- **Debounce/throttle** actions using built-in saga effects (`takeLatest`, `debounce`).

### State Design

```
store/
├── slices/
│   ├── authSlice.js       # isAuthenticated, user, loading, error
│   └── dashboardSlice.js  # kpiMetrics, chartData, tableData, donut/pie data
└── sagas/
    ├── authSaga.js        # Mock login API (1s delay)
    ├── dashboardSaga.js   # Mock dashboard data fetch (800ms delay)
    └── index.js           # Root saga (forks all feature sagas)
```

All UI components read from the Redux store using `useSelector`. No data is hardcoded in components — it flows exclusively through dispatched actions and saga responses.

### Routing Strategy

| Route    | Access     | Behavior                                         |
| -------- | ---------- | ------------------------------------------------ |
| `/login` | Public     | Redirects to `/` if already authenticated        |
| `/`      | Protected  | Redirects to `/login` if not authenticated       |

The `ProtectedRoute` component reads `isAuthenticated` from the Redux auth state and wraps the dashboard route with a `Navigate` redirect.

### Mock Data Layer

Both sagas simulate real API endpoints with `setTimeout`-based delays:

- **Auth Saga**: 1-second delay, validates email/password against hardcoded credentials.
- **Dashboard Saga**: 800ms delay, returns a structured payload with KPIs, chart series, table rows, and more.

This pattern makes it trivial to swap in real API calls later — just replace the `mockLoginApi` / `mockFetchDashboard` functions.

## 🚀 Getting Started

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev
```

## 📁 Project Structure

```
src/
├── components/
│   └── ProtectedRoute.jsx     # Route guard component
├── pages/
│   ├── LoginPage.jsx           # Login view
│   └── DashboardPage.jsx       # Protected dashboard view
├── store/
│   ├── index.js                # Store configuration
│   ├── slices/
│   │   ├── authSlice.js        # Auth state management
│   │   └── dashboardSlice.js   # Dashboard data state
│   └── sagas/
│       ├── index.js            # Root saga
│       ├── authSaga.js         # Auth side effects
│       └── dashboardSaga.js    # Dashboard data side effects
├── App.jsx                     # Root component with routing
├── main.jsx                    # Entry point with Redux Provider
└── index.css                   # Tailwind CSS entry
```

## 📝 License

MIT
