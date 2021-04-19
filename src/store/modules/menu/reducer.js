import produce from 'immer';

const INITIAL_STATE = {
  page: 'statistics',
};

export default function menu(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@MENU/SET_PAGE':
        draft.page = action.payload.page;
        break;

      default:
        break;
    }
  });
}
