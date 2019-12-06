import {
  ADD_ENTITY,
  DELETE_ENTITY,
  ACTION_CHECKBOX,
  ACTION_SELECT,
  ACTION_INPUT,
} from '../constants';
import empty from '../../config/ImitateData.json';

const initialState = [empty];

// eslint-disable-next-line import/prefer-default-export
export function MainTableReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_ENTITY:
      return [...state, action.payload];

    case DELETE_ENTITY:
      return action.payload;

    case ACTION_CHECKBOX:
      return action.payload;

    case ACTION_SELECT:
      return action.payload;

    case ACTION_INPUT:
      return action.payload;

    default:
      return state;
  }
}
