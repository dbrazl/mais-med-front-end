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

export function medsProcedureError(message) {
  return {
    type: '@MEDS/PROCEDURE_ERROR',
    payload: { message },
  };
}
