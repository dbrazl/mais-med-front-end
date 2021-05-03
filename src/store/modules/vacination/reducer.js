import produce from 'immer';
import Types from './types';
import _ from 'lodash';

const INITIAL_STATE = {
  data: [],
  page: 0,
  status: {
    loading: false,
  },
  error: {
    status: false,
    message: '',
    path: [],
    reasons: [],
  },
};

export default function vacination(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case Types.INDEX_VACINATION_REQUEST:
        draft.status.loading = true;
        break;

      case Types.INDEX_VACINATION_SUCCESS:
        draft.status.loading = false;
        draft.page = state.page + 1;
        draft.data = [...state.data, ...action.payload.data];
        break;

      case Types.SET_PAGE:
        draft.page = action.payload.page;
        break;

      case Types.PROCEDURE_FAILURE:
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
