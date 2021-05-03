import Types from './types';

export function indexMedsRequest() {
  return {
    type: Types.INDEX_MEDS_REQUEST,
  };
}

export function indexMedsSuccess(data) {
  return {
    type: Types.INDEX_MEDS_SUCCESS,
    payload: { data },
  };
}

export function storeMedsRequest({
  name,
  quantity,
  needSchedule,
  startDate,
  endDate,
  startHour,
  endHour,
  intervalTime,
}) {
  return {
    type: Types.STORE_MEDS_REQUEST,
    payload: {
      name,
      quantity,
      needSchedule,
      startDate,
      endDate,
      startHour,
      endHour,
      intervalTime,
    },
  };
}

export function storeMedsSuccess(data) {
  return {
    type: Types.STORE_MEDS_SUCCESS,
    payload: { data },
  };
}

export function setSelectMed(data) {
  return {
    type: Types.SET_SELECT_MED,
    payload: data,
  };
}

export function resetRegistered() {
  return {
    type: Types.RESET_REGISTERED,
  };
}

export function resetData() {
  return {
    type: Types.RESET_DATA,
  };
}

export function medsProcedureError({ message, path, reasons }) {
  return {
    type: Types.PROCEDURE_ERROR,
    payload: { message, path, reasons },
  };
}
