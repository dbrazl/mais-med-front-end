import { all, takeLatest, call, race, put, select } from 'redux-saga/effects';
import Types from './types';
import { signInSuccess, authProcedureFail } from './actions';
import { resetPage } from '../menu/actions';
import api, { routes } from '~/services/api';
import { timer, errorHandler } from '../utils';
import history from '~/services/history';

function* signIn({ payload }) {
  try {
    const { response } = yield race({
      response: call(api.post, routes.signIn, payload),
      timeout: call(timer),
    });

    const token = response.data?.token;
    const id = response.data?.id;
    const email = response.data?.email;
    const name = response.data?.name;
    const location = response.data?.location;
    const address = response.data?.address;
    const neighborhood = response.data?.neighborhood;

    if (token) api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(
      signInSuccess({ id, email, name, location, address, neighborhood, token })
    );
    history.push('/statistics');
  } catch (error) {
    yield errorHandler(error, authProcedureFail);
  }
}

function* signOut() {
  api.defaults.headers.Authorization = null;
  yield put(resetPage());
}

function* setToken() {
  const token = yield select(state => state?.auth?.user?.token);
  api.defaults.headers.Authorization = `Bearer ${token}`;
}

export default all([
  takeLatest(Types.SIGN_IN_REQUEST, signIn),
  takeLatest(Types.SIGN_OUT, signOut),
  takeLatest(Types.REHYDRATE, setToken),
]);
