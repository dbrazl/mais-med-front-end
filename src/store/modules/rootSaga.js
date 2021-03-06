import { all } from 'redux-saga/effects';

import auth from './auth/saga';
import user from './user/saga';
import meds from './meds/saga';
import vacination from './vacination/saga';

export default function* rootSaga() {
  return yield all([auth, user, meds, vacination]);
}
