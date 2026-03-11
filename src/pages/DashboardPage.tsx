import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchDashboardRequest } from '../store/slices/dashboardSlice';
import { Header } from '../components/header';
import StatCard from '../components/StatCard';
import { Trash2, ChevronUp } from 'lucide-react';
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

/* ──────────────────────────── Custom Label for Pie / Donut ──────────────────────────── */

interface LabelProps {
  cx?: number;
  cy?: number;
  midAngle?: number;
  innerRadius?: number;
  outerRadius?: number;
  value?: number;
}

const RADIAN = Math.PI / 180;

const renderCustomLabel = ({
  cx = 0,
  cy = 0,
  midAngle = 0,
  innerRadius = 0,
  outerRadius = 0,
  value = 0,
}: LabelProps) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="#fff"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={12}
      fontWeight={600}
    >
      {`${value.toFixed(1)}%`}
    </text>
  );
};

/* ──────────────── Pie label with slight outward offset for smaller slices ──────────── */

const renderPieLabel = ({
  cx = 0,
  cy = 0,
  midAngle = 0,
  innerRadius = 0,
  outerRadius = 0,
  value = 0,
}: LabelProps) => {
  // Push labels slightly outward for small slices
  const radiusFactor = value < 15 ? 0.65 : 0.5;
  const radius = innerRadius + (outerRadius - innerRadius) * radiusFactor;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="#fff"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={11}
      fontWeight={600}
    >
      {`${value.toFixed(1)}%`}
    </text>
  );
};

/* ──────────────────────────────── Avatar ──────────────────────────────── */

interface AvatarProps {
  color: string;
  initials: string | null;
  size?: number;
}

const Avatar = ({ color, initials, size = 36 }: AvatarProps) => (
  <div
    className="rounded-full flex items-center justify-center text-white text-xs font-medium shrink-0"
    style={{ width: size, height: size, backgroundColor: color }}
  >
    {initials ?? ''}
  </div>
);

/* ──────────────────────────── Dashboard Page ──────────────────────────── */

const DashboardPage = () => {
  const dispatch = useAppDispatch();
  const {
    kpiMetrics,
    chartData,
    tableData,
    donutChartData,
    pieChartData,
    feedbackItems,
    todayProfit,
    yesterdayProfit,
    profitTrend,
    loading,
    error,
  } = useAppSelector((state) => state.dashboard);

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
          <>
            {/* ── KPI Metrics Row ── */}
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

            {/* ── Main Content: Two-Column Layout ── */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
              {/* ─────────── LEFT COLUMN (2/3 width) ─────────── */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-md border border-slate-200 shadow-sm">
                  {/* Card Header */}
                  <div className="px-5 py-4 border-b border-slate-200">
                    <h2 className="text-base font-medium text-slate-600">
                      Development Activity
                    </h2>
                  </div>

                  {/* Area Chart */}
                  <div className="px-5 pt-4 pb-2">
                    {/* Legend */}
                    <div className="flex items-center gap-2 mb-3">
                      <span
                        className="block w-3 h-3"
                        style={{ backgroundColor: '#5986E5' }}
                      />
                      <span className="text-xs text-slate-500">Purchases</span>
                    </div>

                    <ResponsiveContainer width="100%" height={180}>
                      <AreaChart
                        data={chartData}
                        margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                      >
                        <defs>
                          <linearGradient
                            id="purchasesFill"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="0%"
                              stopColor="#5986E5"
                              stopOpacity={0.45}
                            />
                            <stop
                              offset="100%"
                              stopColor="#5986E5"
                              stopOpacity={0.05}
                            />
                          </linearGradient>
                        </defs>
                        <Area
                          type="monotone"
                          dataKey="purchases"
                          stroke="#5986E5"
                          strokeWidth={1.5}
                          fill="url(#purchasesFill)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Data Table */}
                  <div className="px-5 pb-4">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-slate-200">
                          <th className="text-left text-[11px] font-semibold text-slate-400 uppercase tracking-wider py-2 pr-2">
                            User
                          </th>
                          <th className="text-left text-[11px] font-semibold text-slate-400 uppercase tracking-wider py-2 pr-2">
                            Commit
                          </th>
                          <th className="text-left text-[11px] font-semibold text-slate-400 uppercase tracking-wider py-2 pr-2">
                            Date
                          </th>
                          <th className="w-10" />
                        </tr>
                      </thead>
                      <tbody>
                        {tableData.map((row) => (
                          <tr
                            key={row.id}
                            className="border-b border-slate-100 last:border-b-0"
                          >
                            <td className="py-3 pr-2">
                              <div className="flex items-center gap-3">
                                <Avatar
                                  color={row.avatarColor}
                                  initials={row.avatarInitials}
                                />
                                <span className="text-sm text-slate-700">
                                  {row.user}
                                </span>
                              </div>
                            </td>
                            <td className="py-3 pr-2 text-sm text-slate-600">
                              {row.commit}
                            </td>
                            <td className="py-3 pr-2 text-sm text-slate-500">
                              {row.date}
                            </td>
                            <td className="py-3 text-right">
                              <button className="text-slate-300 hover:text-slate-500 transition-colors">
                                <Trash2 size={16} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* ─────────── RIGHT COLUMN (1/3 width) ─────────── */}
              <div className="lg:col-span-1 flex flex-col gap-6">
                {/* Information Alert */}
                <div className="rounded-md bg-blue-50 border border-blue-100 px-4 py-3 text-sm text-blue-900">
                  <strong>Read our documentation</strong> with code samples.
                </div>

                {/* Charts Grid — 2-column side-by-side */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Donut Chart Card */}
                  <div className="bg-white rounded-md border border-slate-200 shadow-sm">
                    <div className="px-4 py-3 border-b border-slate-200">
                      <h3 className="text-sm font-medium text-slate-600">
                        Chart title
                      </h3>
                    </div>
                    <div className="flex items-center justify-center py-4 px-2">
                      <ResponsiveContainer width="100%" height={150}>
                        <PieChart>
                          <Pie
                            data={donutChartData}
                            dataKey="value"
                            innerRadius={38}
                            outerRadius={65}
                            startAngle={90}
                            endAngle={-270}
                            labelLine={false}
                            label={renderCustomLabel}
                          >
                            {donutChartData.map((entry, index) => (
                              <Cell key={index} fill={entry.fill} />
                            ))}
                          </Pie>
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Pie Chart Card */}
                  <div className="bg-white rounded-md border border-slate-200 shadow-sm">
                    <div className="px-4 py-3 border-b border-slate-200">
                      <h3 className="text-sm font-medium text-slate-600">
                        Chart title
                      </h3>
                    </div>
                    <div className="flex items-center justify-center py-4 px-2">
                      <ResponsiveContainer width="100%" height={150}>
                        <PieChart>
                          <Pie
                            data={pieChartData}
                            dataKey="value"
                            outerRadius={65}
                            startAngle={90}
                            endAngle={-270}
                            labelLine={false}
                            label={renderPieLabel}
                          >
                            {pieChartData.map((entry, index) => (
                              <Cell key={index} fill={entry.fill} />
                            ))}
                          </Pie>
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>

                {/* Bottom Two Cards: feedback & profit */}
                <div className="grid grid-cols-2 gap-4">
                  {/* New Feedback Card */}
                  <div className="bg-white rounded-md border border-slate-200 shadow-sm">
                    <div className="px-4 py-3 border-b border-slate-200">
                      <h3 className="text-sm font-medium text-slate-600">
                        New feedback
                      </h3>
                    </div>
                    <div className="px-4 py-3 space-y-3">
                      {feedbackItems.map((item) => (
                        <div key={item.id} className="flex items-start gap-3">
                          <Avatar
                            color={item.avatarColor}
                            initials={item.avatarInitials}
                            size={32}
                          />
                          <div className="min-w-0 flex-1">
                            <p className="text-xs font-semibold text-slate-700 leading-tight">
                              {item.user}
                            </p>
                            <p className="text-xs text-slate-500 leading-snug mt-0.5 line-clamp-2">
                              {item.text}
                            </p>
                            <p className="text-[10px] text-slate-400 mt-1">
                              {item.timestamp}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Today Profit Card */}
                  <div className="bg-white rounded-md border border-slate-200 shadow-sm relative">
                    <div className="px-4 py-3 border-b border-slate-200">
                      <h3 className="text-sm font-medium text-slate-600">
                        Today profit
                      </h3>
                    </div>

                    {/* Green trend badge — top-right */}
                    <div className="absolute top-3 right-3 flex items-center gap-0.5 text-green-500 text-xs font-medium">
                      <span>{profitTrend}</span>
                      <ChevronUp size={14} />
                    </div>

                    <div className="flex flex-col items-center justify-center py-6 px-4">
                      <span className="text-3xl font-semibold text-slate-700">
                        ${todayProfit.toLocaleString()}
                      </span>
                      <span className="mt-1.5 text-xs text-slate-400">
                        vs. Yesterday ${yesterdayProfit.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default DashboardPage;
