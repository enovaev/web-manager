import empty from '../../config/editData';
import { ACTION_SLIDER } from '../constants';

const initialState = empty;

// eslint-disable-next-line import/prefer-default-export
export function EditTableReducer(state = initialState, action) {
  switch (action.type) {
    case ACTION_SLIDER:
      return action.payload;

    default:
      return state;
  }
}
