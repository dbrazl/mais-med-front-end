import { all, takeLatest, call, put, race, select } from 'redux-saga/effects';
import Types from './types';
import {
  indexVacinationSuccess,
  vacinationProcedureFailure,
  setPage,
  indexVacinationRequest,
} from './actions';
import { singOut } from '../auth/actions';
import { errorHandler, timer } from '../utils';
import api, { routes } from '~/services/api';

function* indexVacinations() {
  try {
    const page = yield select(state => state?.vacination?.page);

    const { response } = yield race({
      response: call(api.get, `${routes.vacinations}?page=${page}`),
      timeout: call(timer),
    });

    yield put(indexVacinationSuccess(response.data));
    yield put(indexVacinationRequest());
  } catch (error) {
    yield errorHandler(error, vacinationProcedureFailure);
    yield put(setPage(0));
  }
}

function* procedureError() {
  try {
    const reasons = yield select(state => state?.meds?.error?.reasons);

    if (reasons?.includes('The token has been expired')) yield put(singOut());
  } catch (error) {}
}

export default all([
  takeLatest(Types.INDEX_VACINATION_REQUEST, indexVacinations),
  takeLatest(Types.PROCEDURE_FAILURE, procedureError),
]);
