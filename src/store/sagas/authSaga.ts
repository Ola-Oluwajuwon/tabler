import { call, put, takeLatest } from 'redux-saga/effects';
import { loginRequest, loginSuccess, loginFailure } from '../slices/authSlice';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { User, LoginCredentials } from '../../types';

/**
 * Simulates an API login request with a 1-second delay.
 * Validates against mock credentials.
 */
function mockLoginApi(credentials: LoginCredentials): Promise<User> {
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

function* handleLogin(action: PayloadAction<LoginCredentials>) {
  try {
    const user: User = yield call(mockLoginApi, action.payload);
    yield put(loginSuccess(user));
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'An unknown error occurred';
    yield put(loginFailure(message));
  }
}

export default function* authSaga() {
  yield takeLatest(loginRequest.type, handleLogin);
}
