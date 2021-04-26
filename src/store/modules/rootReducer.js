import { combineReducers } from 'redux';

import menu from './menu/reducer';
import meds from './meds/reducer';
import vacination from './vacination/reducer';
import auth from './auth/reducer';
import user from './user/reducer';

export default combineReducers({ menu, meds, vacination, auth, user });
