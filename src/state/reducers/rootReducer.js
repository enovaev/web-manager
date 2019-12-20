import { combineReducers } from 'redux';
// eslint-disable-next-line import/named,no-unused-vars
import { optionReducer, partReducer } from './reducer';
import { oneReducer } from './testReducer';
import { twoReducer } from './testReducerTwo';

// const { name } = partReducer()[0];
// eslint-disable-next-line import/prefer-default-export
export const rootReducer = combineReducers({
  entityProps: partReducer,
  one: oneReducer,
  two: twoReducer,
});
