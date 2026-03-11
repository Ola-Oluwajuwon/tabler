import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchDashboardRequest } from '../store/slices/dashboardSlice';
import { Header } from '../components/header';
import StatCard from '../components/StatCard';

/**
 * DashboardPage — main dashboard view with two-tier header and KPI metrics.
 */
const DashboardPage = () => {
  const dispatch = useAppDispatch();
  const { kpiMetrics, loading, error } = useAppSelector(
    (state) => state.dashboard
  );

  useEffect(() => {
    dispatch(fetchDashboardRequest());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Two-tier Header */}
      <Header />

      {/* Dashboard Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>

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
              <StatCard
                key={metric.id}
                value={metric.value}
                label={metric.label}
                trendValue={metric.trend}
                trendDirection={metric.trendDirection}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default DashboardPage;
