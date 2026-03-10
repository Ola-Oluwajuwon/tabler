# Tabler Admin Dashboard

A fully responsive admin dashboard built with React + TypeScript, featuring a login flow, dynamic data management via Redux & Redux-Saga, and a modern UI inspired by the Tabler design system.

## 🧪 Demo Credentials

| Field    | Value              |
| -------- | ------------------ |
| Email    | `admin@tabler.io`  |
| Password | `password`         |

## 🏗️ Tech Stack

| Layer             | Technology                          |
| ----------------- | ----------------------------------- |
| Framework         | React 19 (Vite)                     |
| Language          | TypeScript (strict mode)            |
| Package Manager   | pnpm                                |
| State Management  | Redux Toolkit + Redux-Saga          |
| Routing           | React Router DOM v7                 |
| Styling           | Tailwind CSS v4                     |
| Icons             | Lucide React                        |
| Charts            | Recharts                            |

## 📐 Architecture & Technical Decisions

### Why TypeScript?

The entire codebase uses strict TypeScript for:

- **Type-safe Redux state** — `RootState` and `AppDispatch` types are exported from the store and consumed via custom typed hooks (`useAppSelector`, `useAppDispatch`).
- **Typed action payloads** — every Redux action uses `PayloadAction<T>` with explicit types (`LoginCredentials`, `User`, `DashboardPayload`).
- **Centralized type definitions** — all shared interfaces live in `src/types/index.ts`, ensuring a single source of truth.
- **Compile-time safety** — catches bugs before runtime, especially in data-flow-heavy patterns like saga → slice → component.

### Why Redux-Saga over Redux Thunk?

Redux-Saga provides a more declarative and testable approach to handling side effects. The generator-based model makes it straightforward to:

- **Simulate async API calls** with `call()` effects that are easy to mock in tests.
- **Orchestrate complex flows** (login → redirect) using `put()` and `take()`.
- **Debounce/throttle** actions using built-in saga effects (`takeLatest`, `debounce`).

### State Design

```
store/
├── hooks.ts               # Typed useAppDispatch / useAppSelector
├── index.ts               # Store config, RootState & AppDispatch exports
├── slices/
│   ├── authSlice.ts       # isAuthenticated, user, loading, error
│   └── dashboardSlice.ts  # kpiMetrics, chartData, tableData, donut/pie data
└── sagas/
    ├── authSaga.ts        # Mock login API (1s delay)
    ├── dashboardSaga.ts   # Mock dashboard data fetch (800ms delay)
    └── index.ts           # Root saga (forks all feature sagas)
```

All UI components read from the Redux store using `useAppSelector`. No data is hardcoded in components — it flows exclusively through dispatched actions and saga responses.

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
│   └── ProtectedRoute.tsx      # Route guard component
├── pages/
│   ├── LoginPage.tsx            # Login view
│   └── DashboardPage.tsx        # Protected dashboard view
├── store/
│   ├── hooks.ts                 # Typed Redux hooks
│   ├── index.ts                 # Store configuration + exported types
│   ├── slices/
│   │   ├── authSlice.ts         # Auth state management
│   │   └── dashboardSlice.ts    # Dashboard data state
│   └── sagas/
│       ├── index.ts             # Root saga
│       ├── authSaga.ts          # Auth side effects
│       └── dashboardSaga.ts     # Dashboard data side effects
├── types/
│   └── index.ts                 # Shared TypeScript interfaces
├── App.tsx                      # Root component with routing
├── main.tsx                     # Entry point with Redux Provider
├── index.css                    # Tailwind CSS entry
└── vite-env.d.ts                # Vite client type declarations
```

## 📝 License

MIT
