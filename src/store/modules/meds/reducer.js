import produce from 'immer';

const INITIAL_STATE = {
  data: [
    {
      name: 'Dipirona 100 mg',
      quantity: 21,
      needSchedule: false,
    },
    {
      name: 'Ritalina 500 mg',
      quantity: 10,
      needSchedule: false,
    },
    {
      name: 'Paracetamal 200 mg',
      quantity: 45,
      needSchedule: false,
    },
    {
      name: 'Vacina COVID-19',
      quantity: 45,
      needSchedule: true,
    },
  ],
};

export default function meds(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@MEDS/INDEX_MEDS_REQUEST':
        break;

      case '@MEDS/INDEX_MEDS_SUCESS':
        draft.data = action.payload.data;
        break;

      case '@MEDS/PROCEDURE_ERROR':
        draft.error.status = true;
        draft.error.message = action.payload.message;
        break;

      default:
        break;
    }
  });
}
