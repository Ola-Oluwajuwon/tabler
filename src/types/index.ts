/**
 * Shared type definitions for the application.
 */

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  avatar: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface KpiMetric {
  id: string;
  label: string;
  value: string;
  trend: string;
  trendDirection: 'up' | 'down';
}

export interface ChartDataPoint {
  name: string;
  purchases: number;
}

export interface TableRow {
  id: number;
  user: string;
  avatarColor: string;
  avatarInitials: string | null;
  avatarUrl?: string | null;
  commit: string;
  date: string;
}

export interface DonutChartSegment {
  name: string;
  value: number;
  fill: string;
}

export interface PieChartSegment {
  name: string;
  value: number;
  fill: string;
}

export interface FeedbackItem {
  id: number;
  user: string;
  avatarColor: string;
  avatarInitials: string | null;
  text: string;
  timestamp: string;
}

export interface DashboardPayload {
  kpiMetrics: KpiMetric[];
  chartData: ChartDataPoint[];
  tableData: TableRow[];
  donutChartData: DonutChartSegment[];
  pieChartData: PieChartSegment[];
  feedbackItems: FeedbackItem[];
  todayProfit: number;
  yesterdayProfit: number;
  profitTrend: string;
}
