import { all, takeLatest, call, put, race, select } from 'redux-saga/effects';
import Types from './types';
import {
  indexVacinationSuccess,
  vacinationProcedureFailure,
  setPage,
} from './actions';
import { errorHandler, timer } from '../utils';
import api, { routes } from '~/services/api';

function* indexVacinations() {
  try {
    const { page } = yield select(state => state?.vacination?.page);

    const { response } = yield race({
      response: call(api.get, `${routes.vacinations}?page=${page}`),
      timeout: call(timer),
    });

    yield put(indexVacinationSuccess());
  } catch (error) {
    yield errorHandler(error, vacinationProcedureFailure);
    yield put(setPage(0));
  }
}

export default all([
  takeLatest(Types.INDEX_VACINATION_REQUEST, indexVacinations),
]);
