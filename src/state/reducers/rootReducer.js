import { combineReducers } from 'redux';
import { MainTableReducer } from './mainTable';

// eslint-disable-next-line import/prefer-default-export
export const rootReducer = combineReducers({
  entityData: MainTableReducer,
});
