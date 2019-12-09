import { combineReducers } from 'redux';
import { MainTableReducer } from './mainTable';
import { EditTableReducer } from './editTable';

// eslint-disable-next-line import/prefer-default-export
export const rootReducer = combineReducers({
  entityData: MainTableReducer,
  editData: EditTableReducer,
});
