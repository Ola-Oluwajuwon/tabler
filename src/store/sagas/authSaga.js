import { call, put, takeLatest } from 'redux-saga/effects';
import { loginRequest, loginSuccess, loginFailure } from '../slices/authSlice';

/**
 * Simulates an API login request with a 1-second delay.
 * Validates against mock credentials.
 */
function mockLoginApi(credentials) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (
        credentials.email === 'admin@tabler.io' &&
        credentials.password === 'password'
      ) {
        resolve({
          id: 1,
          name: 'Jane Pearson',
          email: 'admin@tabler.io',
          role: 'Administrator',
          avatar: null,
        });
      } else {
        reject(new Error('Invalid email or password'));
      }
    }, 1000);
  });
}

function* handleLogin(action) {
  try {
    const user = yield call(mockLoginApi, action.payload);
    yield put(loginSuccess(user));
  } catch (error) {
    yield put(loginFailure(error.message));
  }
}

export default function* authSaga() {
  yield takeLatest(loginRequest.type, handleLogin);
}
