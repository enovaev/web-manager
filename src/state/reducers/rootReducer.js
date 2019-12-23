import { combineReducers } from 'redux';
import { partReducer } from './reducer';
import { IDReducer } from './IDReducer';

// eslint-disable-next-line import/prefer-default-export
export const rootReducer = combineReducers({
  entityProps: partReducer,
  entityID: IDReducer,
});
