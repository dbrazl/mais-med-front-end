import { combineReducers } from 'redux';

import menu from './menu/reducer';
import meds from './meds/reducer';

export default combineReducers({ menu, meds });
