import empty from '../../config/setData';
import { ACTION_SLIDER_SET } from '../constants';

const initialState = empty;

// eslint-disable-next-line import/prefer-default-export
export function SetTableReducer(state = initialState, action) {
  switch (action.type) {
    case ACTION_SLIDER_SET:
      return action.payload;
    default:
      return state;
  }
}
