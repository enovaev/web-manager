import { combineReducers } from 'redux';
import { MainTableReducer } from './mainTable';
import { SetTableReducer } from './setTable';

// eslint-disable-next-line import/prefer-default-export
export const rootReducer = combineReducers({
  entityData: MainTableReducer,
  setData: SetTableReducer,
});
