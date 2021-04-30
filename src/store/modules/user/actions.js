import Types from './types';

export function userExistRequest(email) {
  return {
    type: Types.USER_EXIST_REQUEST,
    payload: { email },
  };
}

export function userExistSuccess() {
  return {
    type: Types.USER_EXIST_SUCCESS,
  };
}

export function saveEmailPassword({ email, password }) {
  return {
    type: Types.SAVE_EMAIL_PASSWORD,
    payload: { email, password },
  };
}

export function saveLocation({ longitude, latitude }) {
  return {
    type: Types.SAVE_LOCATION,
    payload: { longitude, latitude },
  };
}

export function setName(name) {
  return {
    type: Types.SET_NAME,
    payload: { name },
  };
}

export function storeUserRequest() {
  return {
    type: Types.STORE_USER_REQUEST,
  };
}

export function storeUserSuccess() {
  return {
    type: Types.STORE_USER_SUCCESS,
  };
}

export function searchAddressRequest() {
  return {
    type: Types.SEARCH_ADDRESS_REQUEST,
  };
}

export function searchAddressSuccess({ address, neighborhood }) {
  return {
    type: Types.SEARCH_ADDRESS_SUCCESS,
    payload: { address, neighborhood },
  };
}
export function searchLatLongRequest(address) {
  return {
    type: Types.SEARCH_LAT_LONG_REQUEST,
    payload: { address },
  };
}

export function searchLatLongSuccess({
  latitude,
  longitude,
  address,
  neighborhood,
}) {
  return {
    type: Types.SEARCH_LAT_LONG_SUCCESS,
    payload: { latitude, longitude, address, neighborhood },
  };
}

export function setFoundAddressToFalse() {
  return {
    type: Types.SET_FOUND_ADDRESS_TO_FALSE,
  };
}

export function setRegisterStep(step) {
  return {
    type: Types.SET_REGISTER_STEP,
    payload: { step },
  };
}

export function resetUser() {
  return {
    type: Types.RESET_USER,
  };
}

export function resetExistUser() {
  return {
    type: Types.RESET_USER_EXIST,
  };
}

export function userProcedureFail({ message, path, reasons }) {
  return {
    type: Types.PROCEDURE_FAIL,
    payload: { status: true, message, path, reasons },
  };
}
