import produce from 'immer';
import Types from './types';
import UserTypes from '../user/types';

const INITIAL_STATE = {
  user: {
    email: '',
    name: '',
    location: '',
    address: '',
    neighborhood: '',
    token: '',
  },
  status: {
    loading: false,
    authentificated: false,
  },
  error: {
    status: false,
    message: '',
    path: [''],
    reasons: [''],
  },
};

export default function auth(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case Types.SIGN_IN_REQUEST:
        draft.status.loading = true;
        break;

      case Types.SIGN_IN_SUCCESS:
        draft.status.loading = false;
        draft.status.authentificated = true;
        draft.user.id = action.payload.id;
        draft.user.email = action.payload.email;
        draft.user.name = action.payload.name;
        draft.user.location = action.payload.location;
        draft.user.address = action.payload.address;
        draft.user.neighborhood = action.payload.neighborhood;
        draft.user.token = action.payload.token;
        break;

      case Types.SIGN_OUT:
        draft.status.authentificated = false;
        break;

      case UserTypes.STORE_USER_SUCCESS:
        draft.status.authentificated = true;
        break;

      case UserTypes.UPDATE_USER_REQUEST:
        draft.user.name = action.payload.name;
        draft.user.email = action.payload.email;
        draft.user.location = action.payload.location;
        draft.user.address = action.payload.address;
        draft.user.neighborhood = action.payload.neighborhood;
        break;

      case Types.PROCEDURE_FAIL:
        draft.error.status = true;
        draft.error.message = action.payload.message;
        draft.error.path = action.payload.path;
        draft.error.reasons = action.payload.reasons;
        break;

      default:
        break;
    }
  });
}
