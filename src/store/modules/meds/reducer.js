import produce from 'immer';
import Types from './types';

const INITIAL_STATE = {
  data: [],
  selected: {
    id: '',
    name: '',
    quantity: 0,
    needToSchedule: false,
    scheduleInfo: {
      startDate: '',
      endDate: '',
      startHour: '',
      endHour: '',
      intervalTime: '',
    },
  },
  status: {
    loading: false,
    registered: false,
    updated: false,
  },
  error: {
    status: false,
    message: '',
    path: [],
    reasons: [],
  },
};

export default function meds(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case Types.INDEX_MEDS_REQUEST:
        draft.status.loading = true;
        break;

      case Types.INDEX_MEDS_SUCCESS:
        draft.status.loading = false;
        draft.data = action.payload.data;
        draft.page = state.page + 1;
        draft.data = [...state.data, ...action.payload.data];
        break;

      case Types.STORE_MEDS_REQUEST:
        draft.status.loading = true;
        break;

      case Types.STORE_MEDS_SUCCESS:
        draft.status.loading = false;
        draft.status.registered = true;
        break;

      case Types.UPDATE_MED_REQUEST:
        draft.status.loading = true;
        break;

      case Types.UPDATE_MED_SUCCESS:
        draft.status.loading = false;
        draft.status.updated = true;
        break;

      case Types.RESET_REGISTERED:
        draft.status.registered = false;
        break;

      case Types.RESET_UPDATED:
        draft.status.updated = false;
        break;

      case Types.RESET_DATA:
        draft.data = [];
        break;

      case Types.SET_SELECT_MED:
        draft.selected.id = action.payload.id;
        draft.selected.name = action.payload.name;
        draft.selected.quantity = action.payload.quantity;
        draft.selected.needToSchedule = action.payload.needToSchedule;
        break;

      case Types.RESET_SELECT_MED:
        draft.selected = INITIAL_STATE.selected;
        break;

      case Types.INDEX_SCHEDULE_INFO:
        draft.selected.scheduleInfo.startDate = action.payload.data.startDate;
        draft.selected.scheduleInfo.endDate = action.payload.data.endDate;
        draft.selected.scheduleInfo.startHour = action.payload.data.startHour;
        draft.selected.scheduleInfo.endHour = action.payload.data.endHour;
        draft.selected.scheduleInfo.intervalTime =
          action.payload.data.intervalTime;
        break;

      case Types.PROCEDURE_ERROR:
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
