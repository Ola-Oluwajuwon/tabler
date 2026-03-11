import { ChevronUp, ChevronDown } from 'lucide-react';

interface StatCardProps {
  /** The main large number (e.g., "43", "27.3k", "$95"). */
  value: string | number;
  /** The subtitle below the number (e.g., "New Tickets"). */
  label: string;
  /** The percentage string (e.g., "+6%", "-2%"). */
  trendValue: string;
  /** Whether the trend is positive ('up') or negative ('down'). */
  trendDirection: 'up' | 'down';
}

/**
 * StatCard — A reusable KPI card that displays a metric value, label,
 * and a trend indicator positioned in the top-right corner.
 */
const StatCard = ({ value, label, trendValue, trendDirection }: StatCardProps) => {
  const isUp = trendDirection === 'up';

  return (
    <div className="relative rounded-sm border border-slate-200 bg-white py-6 px-4">
      {/* Trend indicator — absolutely positioned top-right */}
      <div
        className={`absolute top-3 right-3 flex items-center gap-1 text-sm ${
          isUp ? 'text-green-500' : 'text-red-500'
        }`}
      >
        <span className="font-medium">{trendValue}</span>
        {isUp ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </div>

      {/* Main content — centered */}
      <div className="flex flex-col items-center justify-center">
        <span className="text-3xl font-semibold text-slate-700">{value}</span>
        <span className="mt-1 text-sm text-slate-500">{label}</span>
      </div>
    </div>
  );
};

export default StatCard;
