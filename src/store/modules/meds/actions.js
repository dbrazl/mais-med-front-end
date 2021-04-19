export function indexMedsRequest() {
  return {
    type: '@MEDS/INDEX_MEDS_REQUEST',
  };
}

export function indexMedsSuccess(data) {
  return {
    type: '@MEDS/INDEX_MEDS_REQUEST',
    payload: { data },
  };
}

export function setSelectMed(data) {
  return {
    type: '@MEDS/SET_SELECT_MED',
    payload: data,
  };
}

export function medsProcedureError(message) {
  return {
    type: '@MEDS/PROCEDURE_ERROR',
    payload: { message },
  };
}
