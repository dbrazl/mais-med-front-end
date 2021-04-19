import { combineReducers } from 'redux';

import menu from './menu/reducer';
import meds from './meds/reducer';
import vacination from './vacination/reducer';

export default combineReducers({ menu, meds, vacination });
