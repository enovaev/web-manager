import { combineReducers } from 'redux';
import { MainTableReducer } from './mainTable';
import { EditTableReducer } from './editTable';
import { SetTableReducer } from './setTable';

// eslint-disable-next-line import/prefer-default-export
export const rootReducer = combineReducers({
  entityData: MainTableReducer,
  editData: EditTableReducer,
  setData: SetTableReducer,
});
