import produce from 'immer';

const INITIAL_STATE = {
  data: [
    {
      name: 'Vacina COVID-19',
      cpf: '13572471684',
      date: '18/11/2021',
      schedule: '15:10 a 15:30 horas',
    },
    {
      name: 'Vacina COVID-19',
      cpf: '13572471684',
      date: '18/11/2021',
      schedule: '15:10 a 15:30 horas',
    },
    {
      name: 'Vacina COVID-19',
      cpf: '13572471684',
      date: '18/11/2021',
      schedule: '15:10 a 15:30 horas',
    },
  ],
};

export default function vacination(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      default:
        break;
    }
  });
}
