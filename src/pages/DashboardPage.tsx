import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchDashboardRequest } from '../store/slices/dashboardSlice';
import { logout } from '../store/slices/authSlice';

/**
 * DashboardPage — placeholder that fetches & displays Redux state.
 * Full UI components will be built in Steps 4–6.
 */
const DashboardPage = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { kpiMetrics, loading, error } = useAppSelector(
    (state) => state.dashboard
  );

  useEffect(() => {
    dispatch(fetchDashboardRequest());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">
              Welcome, <strong>{user?.name}</strong> ({user?.role})
            </span>
            <button
              onClick={handleLogout}
              className="text-sm text-red-500 hover:text-red-700 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>

        {loading && (
          <p className="text-gray-500 text-center py-10">
            Loading dashboard data…
          </p>
        )}

        {error && (
          <p className="text-red-500 text-center py-10">Error: {error}</p>
        )}

        {!loading && !error && kpiMetrics.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {kpiMetrics.map((metric) => (
              <div
                key={metric.id}
                className="bg-white rounded-lg border border-gray-200 p-4 text-center"
              >
                <span
                  className={`text-xs font-medium ${
                    metric.trendDirection === 'up'
                      ? 'text-green-500'
                      : 'text-red-500'
                  }`}
                >
                  {metric.trend}
                  {metric.trendDirection === 'up' ? ' ↑' : ' ↓'}
                </span>
                <p className="text-2xl font-bold mt-1">{metric.value}</p>
                <p className="text-xs text-gray-500 mt-1">{metric.label}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
