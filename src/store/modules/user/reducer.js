import produce from 'immer';
import Types from './types';

const INITIAL_STATE = {
  register: {
    name: '',
    email: '',
    password: '',
    location: {
      latitude: 0,
      longitude: 0,
    },
    address: '',
    neighborhood: '',
  },
  status: {
    loading: false,
  },
  error: {
    status: false,
    message: '',
    path: [''],
    reasons: [''],
  },
};

export default function users(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case Types.SAVE_EMAIL_PASSWORD:
        draft.register.email = action.payload.email;
        draft.register.password = action.payload.password;
        break;

      case Types.SAVE_LOCATION:
        draft.register.location.longitude = action.payload.longitude;
        draft.register.location.latitude = action.payload.latitude;
        break;

      case Types.SAVE_NAME:
        draft.register.name = action.payload.name;
        break;

      case Types.STORE_USER_REQUEST:
        draft.status.loading = true;
        break;

      case Types.STORE_USER_SUCCESS:
        draft.status.loading = false;
        break;

      case Types.SEARCH_ADDRESS_REQUEST:
        draft.status.loading = true;
        break;

      case Types.SEARCH_ADDRESS_SUCCESS:
        draft.status.loading = false;
        draft.register.address = action.payload.address;
        draft.register.neighborhood = action.payload.neighborhood;
        break;

      case Types.SEARCH_LAT_LONG_REQUEST:
        draft.status.loading = true;
        break;

      case Types.SEARCH_LAT_LONG_SUCCESS:
        draft.status.loading = false;
        draft.register.location.latitude = action.payload.latitude;
        draft.register.location.longitude = action.payload.longitude;
        draft.register.address = action.payload.address;
        draft.register.neighborhood = action.payload.neighborhood;
        break;

      case Types.PROCEDURE_FAIL:
        draft.error.status = action.payload.status;
        draft.error.message = action.payload.message;
        draft.error.path = action.payload.path;
        draft.error.reasons = action.payload.reasons;
        break;

      default:
        break;
    }
  });
}