import Types from './types';
import history from '~/services/history';
import api, { routes } from '~/services/api';
import { toast } from 'react-toastify';
import { all, takeLatest, call, race, put, select } from 'redux-saga/effects';
import { errorHandler, timer } from '../utils';
import {
  userExistSuccess,
  storeUserSuccess,
  updateUserSuccess,
  searchAddressRequest,
  searchAddressSuccess,
  searchLatLongSuccess,
  userProcedureFail,
  resetUser,
} from './actions';
import { singOut } from '../auth/actions';

function* userExist({ payload }) {
  try {
    const { email } = payload;

    yield race({
      response: call(api.get, `${routes.userExist}?email=${email}`),
      timeout: call(timer),
    });

    yield put(userExistSuccess());
  } catch (error) {
    yield errorHandler(error, userProcedureFail);
  }
}

function* storeUser() {
  try {
    const { name, email, password, location, neighborhood } = yield select(
      state => state.user.register
    );

    yield race({
      response: call(api.post, routes.signUp, {
        name,
        email,
        password,
        location,
        neighborhood,
      }),
      timeout: call(timer),
    });

    yield put(storeUserSuccess());
    yield put(resetUser());

    history.push('/meds');
  } catch (error) {
    yield errorHandler(error, userProcedureFail);
  }
}

function* updateUser({ payload }) {
  try {
    const {
      name,
      email,
      password,
      newPassword,
      location,
      address,
      neighborhood,
    } = payload;

    let body = {
      name,
      email,
      location,
      address,
      neighborhood,
    };

    if (password) {
      body.password = password;
      body.newPassword = newPassword;
    }

    yield race({
      response: call(api.put, routes.updateUser, body),
      timeout: call(timer),
    });

    yield put(updateUserSuccess(body));
    yield put(resetUser());
    toast.success('O usuário foi atualizado!');
  } catch (error) {
    yield errorHandler(error, userProcedureFail);
  }
}

function* searchAddress() {
  try {
    const { latitude, longitude } = yield select(
      state => state.user.register.location
    );

    const query = `?latitude=${latitude}&longitude=${longitude}`;

    const { response } = yield race({
      response: call(api.get, `${routes.searchAddress}${query}`),
      timout: call(timer),
    });

    const address = response.data?.address;
    const neighborhood = response.data?.neighborhood;

    yield put(searchAddressSuccess({ address, neighborhood }));
  } catch (error) {
    yield errorHandler(error, userProcedureFail);
  }
}

function* searchLatLong({ payload }) {
  try {
    const { address: search } = payload;

    const query = `?address=${search}`;

    const { response } = yield race({
      response: call(api.get, `${routes.searchLatLong}${query}`),
      timeout: call(timer),
    });

    const latitude = response.data?.latitude;
    const longitude = response.data?.longitude;
    const address = response.data?.address;
    const neighborhood = response.data?.neighborhood;

    yield put(
      searchLatLongSuccess({ latitude, longitude, address, neighborhood })
    );
  } catch (error) {
    yield errorHandler(error, userProcedureFail);
  }
}

function* saveLocation() {
  yield put(searchAddressRequest());
}

function* procedureError() {
  try {
    const reasons = yield select(state => state?.meds?.error?.reasons);

    if (reasons?.includes('The token has been expired')) yield put(singOut());
  } catch (error) {}
}

export default all([
  takeLatest(Types.USER_EXIST_REQUEST, userExist),
  takeLatest(Types.STORE_USER_REQUEST, storeUser),
  takeLatest(Types.UPDATE_USER_REQUEST, updateUser),
  takeLatest(Types.SEARCH_ADDRESS_REQUEST, searchAddress),
  takeLatest(Types.SEARCH_LAT_LONG_REQUEST, searchLatLong),
  takeLatest(Types.SAVE_LOCATION, saveLocation),
  takeLatest(Types.PROCEDURE_FAIL, procedureError),
]);
