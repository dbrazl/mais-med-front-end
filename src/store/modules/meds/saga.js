import { all, takeLatest, call, put, race, select } from 'redux-saga/effects';
import Types from './types';
import { errorHandler, timer } from '../utils';
import {
  indexMedsSuccess,
  medsProcedureError,
  storeMedsSuccess,
  indexMedsRequest,
  resetData,
} from './actions';
import { singOut } from '../auth/actions';
import api, { routes } from '~/services/api';

function* indexMeds() {
  try {
    const unitId = yield select(state => state?.auth?.user?.id);

    const { response } = yield race({
      response: call(api.get, `${routes.meds}?unitId=${unitId}`),
      timeout: call(timer),
    });

    yield put(indexMedsSuccess(response.data));
  } catch (error) {
    yield errorHandler(error, medsProcedureError);
  }
}

function* storeMed({ payload }) {
  try {
    const needSchedule = payload?.needSchedule;

    const bodyMedicine = {
      name: payload?.name,
      quantity: payload?.quantity,
      needSchedule,
    };

    const { respponse } = yield race({
      response: call(api.post, routes.meds, bodyMedicine),
      timeout: call(timer),
    });

    if (needSchedule) {
      const medicineId = respponse.data?.id;

      const bodySchedule = {
        startDate: payload?.startDate,
        endDate: payload?.endDate,
        startHour: payload?.startHour,
        endHour: payload?.endHour,
        intervalTime: payload?.intervalTime,
        medicineId,
      };

      const { respponse } = yield race({
        response: call(api.post, routes.schedule, bodySchedule),
        timeout: call(timer),
      });
    }

    yield put(storeMedsSuccess());
  } catch (error) {
    yield errorHandler(error, medsProcedureError);
  }
}

function* storeSuccess() {
  yield put(resetData());
  yield put(indexMedsRequest());
}

function* procedureError() {
  try {
    const reasons = yield select(state => state?.meds?.error?.reasons);

    if (reasons?.includes('The token has been expired')) yield put(singOut());
  } catch (error) {}
}

export default all([
  takeLatest(Types.INDEX_MEDS_REQUEST, indexMeds),
  takeLatest(Types.STORE_MEDS_REQUEST, storeMed),
  takeLatest(Types.STORE_MEDS_SUCCESS, storeSuccess),
  takeLatest(Types.PROCEDURE_ERROR, procedureError),
]);
