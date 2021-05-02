import Types from './types';

export function indexVacinationRequest() {
  return {
    type: Types.INDEX_VACINATION_REQUEST,
  };
}

export function indexVacinationSuccess(data) {
  return {
    type: Types.INDEX_VACINATION_SUCCESS,
    payload: { data },
  };
}

export function setPage(page) {
  return {
    type: Types.SET_PAGE,
    payload: { page },
  };
}

export function vacinationProcedureFailure({ message, path, reasons }) {
  return {
    type: Types.PROCEDURE_FAILURE,
    payload: { status: true, message, path, reasons },
  };
}
