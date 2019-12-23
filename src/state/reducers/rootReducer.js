import { combineReducers } from 'redux';
import { mainReducer } from './reducer';
import { IDReducer } from './IDReducer';

// eslint-disable-next-line import/prefer-default-export
export const rootReducer = combineReducers({
  part: mainReducer('part'),
  option: mainReducer('option'),
  check: mainReducer('check'),
  entityID: IDReducer,
});
