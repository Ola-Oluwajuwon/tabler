import { call, put, takeLatest } from 'redux-saga/effects';
import {
  fetchDashboardRequest,
  fetchDashboardSuccess,
  fetchDashboardFailure,
} from '../slices/dashboardSlice';
import type { DashboardPayload } from '../../types';

/**
 * Mock dashboard data payload — mirrors the design screenshot exactly.
 * This would normally come from a REST/GraphQL API endpoint.
 */
const mockDashboardData: DashboardPayload = {
  kpiMetrics: [
    {
      id: 'new-tickets',
      label: 'New Tickets',
      value: '43',
      trend: '+6%',
      trendDirection: 'up',
    },
    {
      id: 'closed-today',
      label: 'Closed Today',
      value: '17',
      trend: '-3%',
      trendDirection: 'down',
    },
    {
      id: 'new-replies',
      label: 'New Replies',
      value: '7',
      trend: '+9%',
      trendDirection: 'up',
    },
    {
      id: 'followers',
      label: 'Followers',
      value: '27.3k',
      trend: '+3%',
      trendDirection: 'up',
    },
    {
      id: 'daily-earnings',
      label: 'Daily earnings',
      value: '$95',
      trend: '-2%',
      trendDirection: 'down',
    },
    {
      id: 'products',
      label: 'Products',
      value: '621',
      trend: '-1%',
      trendDirection: 'down',
    },
  ],

  chartData: [
    { name: 'Jan', purchases: 30 },
    { name: 'Feb', purchases: 25 },
    { name: 'Mar', purchases: 35 },
    { name: 'Apr', purchases: 28 },
    { name: 'May', purchases: 32 },
    { name: 'Jun', purchases: 40 },
    { name: 'Jul', purchases: 35 },
    { name: 'Aug', purchases: 45 },
    { name: 'Sep', purchases: 38 },
    { name: 'Oct', purchases: 55 },
    { name: 'Nov', purchases: 65 },
    { name: 'Dec', purchases: 90 },
  ],

  tableData: [
    {
      id: 1,
      user: 'Ronald Bradley',
      avatarColor: '#868e96',
      avatarInitials: null,
      avatarUrl: '/avatars/ronald.png',
      commit: 'Initial commit',
      date: 'May 6, 2018',
    },
    {
      id: 2,
      user: 'Russell Gibson',
      avatarColor: '#4263eb',
      avatarInitials: 'BM',
      commit: 'Main structure',
      date: 'April 22, 2018',
    },
    {
      id: 3,
      user: 'Beverly Armstrong',
      avatarColor: '#868e96',
      avatarInitials: null,
      avatarUrl: '/avatars/beverly.png',
      commit: 'Left sidebar adjustments',
      date: 'April 15, 2018',
    },
  ],

  donutChartData: [
    { name: 'Segment A', value: 63.0, fill: '#65B726' },
    { name: 'Segment B', value: 37.0, fill: '#8ED64E' },
  ],

  pieChartData: [
    { name: 'Segment A', value: 47.4, fill: '#1E3A5F' },
    { name: 'Segment B', value: 33.1, fill: '#4077CE' },
    { name: 'Segment C', value: 10.5, fill: '#A2C5EE' },
    { name: 'Segment D', value: 9.0, fill: '#C1DCF9' },
  ],

  feedbackItems: [
    {
      id: 1,
      user: 'Jessica Biel',
      avatarColor: '#e64980',
      avatarInitials: 'JB',
      text: 'The new dashboard design looks great, really clean layout!',
      timestamp: '2 mins ago',
    },
    {
      id: 2,
      user: 'Mike Ross',
      avatarColor: '#4263eb',
      avatarInitials: 'MR',
      text: 'Found a minor bug on the settings page, will submit a report.',
      timestamp: '15 mins ago',
    },
    {
      id: 3,
      user: 'Anna Williams',
      avatarColor: '#2fb344',
      avatarInitials: 'AW',
      text: 'Could we add dark mode support? Would be a nice addition.',
      timestamp: '1 hour ago',
    },
  ],

  todayProfit: 1245,
  yesterdayProfit: 1110,
  profitTrend: '+12%',
};

/**
 * Simulates fetching dashboard data with an 800ms delay.
 */
function mockFetchDashboard(): Promise<DashboardPayload> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockDashboardData);
    }, 800);
  });
}

function* handleFetchDashboard() {
  try {
    const data: DashboardPayload = yield call(mockFetchDashboard);
    yield put(fetchDashboardSuccess(data));
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Failed to fetch dashboard data';
    yield put(fetchDashboardFailure(message));
  }
}

export default function* dashboardSaga() {
  yield takeLatest(fetchDashboardRequest.type, handleFetchDashboard);
}
