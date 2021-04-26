import env from 'react-dotenv';
import Types from './types';
import api, { routes } from '~/services/api';
import { all, takeLatest, call, race, put, select } from 'redux-saga/effects';
import { errorHandler, timer } from '../utils';
import {
  storeUserRequest,
  storeUserSuccess,
  searchAddressRequest,
  searchAddressSuccess,
  searchLatLongSuccess,
  userProcedureFail,
} from './actions';

function* saveName() {
  yield put(storeUserRequest());
}

function* storeUser() {
  try {
    const { name, email, password, location, neighborhood } = yield select(
      state => state.register
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
  } catch (error) {
    yield put(errorHandler(error, userProcedureFail));
  }
}

function* searchAddress() {
  try {
    const { latitude, longitude } = yield select(
      state => state.user.register.location
    );

    const GOOGLE_API_KEY = env.GOOGLE_KEY || '';

    const query = `?latlng=${latitude},${longitude}&key=${GOOGLE_API_KEY}`;

    const { response } = yield race({
      response: call(api.get, `${routes.searchAddress}${query}`),
      timout: call(timer),
    });

    const address = response.data?.results[0]?.formatted_address;
    const neighborhood = response.data?.results[0]?.address_components?.find(
      one => one?.types?.includes('sublocality')
    )?.long_name;

    yield put(searchAddressSuccess({ address, neighborhood }));
  } catch (error) {
    yield put(errorHandler(error, userProcedureFail));
  }
}

function* searchLatLong({ payload }) {
  try {
    const { address: search } = payload;

    const GOOGLE_API_KEY = env.GOOGLE_KEY || '';

    const query = `?address=${search}&key=${GOOGLE_API_KEY}`;

    const { response } = yield race({
      response: call(api.get, `${routes.searchAddress}${query}`),
      timeout: call(timer),
    });

    const latitude = response.data?.results[0]?.geometry?.location?.lat;
    const longitude = response.data?.results[0]?.geometry?.location?.lng;
    const address = response.data?.results[0]?.formatted_address;
    const neighborhood = response.data?.results[0]?.address_components?.find(
      one => one?.types?.includes('sublocality')
    )?.long_name;

    yield put(
      searchLatLongSuccess({ latitude, longitude, address, neighborhood })
    );
  } catch (error) {
    yield put(errorHandler(error, userProcedureFail));
  }
}

function* saveLocation() {
  yield put(searchAddressRequest());
}

export default all([
  takeLatest(Types.SAVE_NAME, saveName),
  takeLatest(Types.STORE_USER_REQUEST, storeUser),
  takeLatest(Types.SEARCH_ADDRESS_REQUEST, searchAddress),
  takeLatest(Types.SEARCH_LAT_LONG_REQUEST, searchLatLong),
  takeLatest(Types.SAVE_LOCATION, saveLocation),
]);
