import Types from './types';

export function signInRequest({ email, password }) {
  return {
    type: Types.SIGN_IN_REQUEST,
    payload: { email, password },
  };
}

export function signInSuccess() {
  return {
    type: Types.SIGN_IN_SUCCESS,
  };
}

export function singOut() {
  return { type: Types.SIGN_OUT };
}

export function authProcedureFail({ message, path, reasons }) {
  return {
    type: Types.PROCEDURE_FAIL,
    payload: { status: true, message, path, reasons },
  };
}
