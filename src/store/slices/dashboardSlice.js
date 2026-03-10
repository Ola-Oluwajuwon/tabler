import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  kpiMetrics: [],
  chartData: [],
  tableData: [],
  donutChartData: [],
  pieChartData: [],
  feedbackCount: 0,
  todayProfit: 0,
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
    fetchDashboardSuccess: (state, action) => {
      state.loading = false;
      state.kpiMetrics = action.payload.kpiMetrics;
      state.chartData = action.payload.chartData;
      state.tableData = action.payload.tableData;
      state.donutChartData = action.payload.donutChartData;
      state.pieChartData = action.payload.pieChartData;
      state.feedbackCount = action.payload.feedbackCount;
      state.todayProfit = action.payload.todayProfit;
      state.error = null;
    },
    fetchDashboardFailure: (state, action) => {
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
