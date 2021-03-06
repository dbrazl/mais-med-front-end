import { delay, put } from 'redux-saga/effects';

const SECOND = 1000;

export function* timer(time = 30 * SECOND) {
  yield delay(time);
  throw new Error('TIMEOUT');
}

export function* errorHandler(error, callback) {
  let message = null;
  let path = null;
  let reasons = null;

  switch (error.message) {
    case 'Network Error':
      message = 'Não foi possível fazer a requisição.';
      path = ['server'];
      reasons = ['Servidor está offline.'];
      break;

    case 'Timeout':
      message = 'Não foi possível fazer a requisição.';
      path = ['request'];
      reasons = ['A requisição excedeu o tempo limite.'];
      break;

    case 'No data on restore':
      message = 'Não foi possível recuperar o usuário.';
      path = [''];
      reasons = ['O usuário não foi informado.'];
      break;

    default:
      const response = error.response.data;
      message = response.message;
      path = response.path;
      reasons = response.reasons;
      break;
  }

  yield put(callback({ message, path, reasons }));
}
