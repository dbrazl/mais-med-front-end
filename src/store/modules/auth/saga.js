import { all, takeLatest, call, race, put } from 'redux-saga/effects';
import Types from './types';
import { signInSuccess, authProcedureFail } from './actions';
import api, { routes } from '~/services/api';
import { timer, errorHandler } from '../utils';
import history from '~/services/history';

function* signIn({ payload }) {
  try {
    const { response } = yield race({
      response: call(api.post, routes.signIn, payload),
      timeout: call(timer),
    });

    const token = response.data.token;

    if (token) api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(signInSuccess());
    history.push('/statistics');
  } catch (error) {
    yield errorHandler(error, authProcedureFail);
  }
}

function signOut() {
  api.defaults.headers.Authorization = null;
}

export default all([
  takeLatest(Types.SIGN_IN_REQUEST, signIn),
  takeLatest(Types.SIGN_OUT, signOut),
]);
