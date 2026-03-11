import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type {
  KpiMetric,
  ChartDataPoint,
  TableRow,
  DonutChartSegment,
  PieChartSegment,
  FeedbackItem,
  DashboardPayload,
} from '../../types';

interface DashboardState {
  kpiMetrics: KpiMetric[];
  chartData: ChartDataPoint[];
  tableData: TableRow[];
  donutChartData: DonutChartSegment[];
  pieChartData: PieChartSegment[];
  feedbackItems: FeedbackItem[];
  todayProfit: number;
  yesterdayProfit: number;
  profitTrend: string;
  loading: boolean;
  error: string | null;
}

const initialState: DashboardState = {
  kpiMetrics: [],
  chartData: [],
  tableData: [],
  donutChartData: [],
  pieChartData: [],
  feedbackItems: [],
  todayProfit: 0,
  yesterdayProfit: 0,
  profitTrend: '+0%',
  loading: false,
  error: null,
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    fetchDashboardRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchDashboardSuccess: (state, action: PayloadAction<DashboardPayload>) => {
      state.loading = false;
      state.kpiMetrics = action.payload.kpiMetrics;
      state.chartData = action.payload.chartData;
      state.tableData = action.payload.tableData;
      state.donutChartData = action.payload.donutChartData;
      state.pieChartData = action.payload.pieChartData;
      state.feedbackItems = action.payload.feedbackItems;
      state.todayProfit = action.payload.todayProfit;
      state.yesterdayProfit = action.payload.yesterdayProfit;
      state.profitTrend = action.payload.profitTrend;
      state.error = null;
    },
    fetchDashboardFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchDashboardRequest,
  fetchDashboardSuccess,
  fetchDashboardFailure,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
