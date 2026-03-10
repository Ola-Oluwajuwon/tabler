import { all, fork } from 'redux-saga/effects';
import authSaga from './authSaga';
import dashboardSaga from './dashboardSaga';

/**
 * Root saga — forks all feature sagas so they run concurrently.
 */
export default function* rootSaga() {
  yield all([fork(authSaga), fork(dashboardSaga)]);
}
