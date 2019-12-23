import initialState from '../../config/initialState.json';
import {
  ACTION_CHECKBOX, ACTION_CHECKBOX_ALL,
  ACTION_INPUT, ADD_ENTITY, DELETE_ENTITY,
} from '../constants';


// eslint-disable-next-line import/prefer-default-export
export const mainReducer = (root) => (state = initialState[root], action) => {
  if (action.name === root) {
    switch (action.type) {
      case ACTION_CHECKBOX:
        return state.map((el, i) => ((action.value === el.id)
          ? { ...el, checked: !state[i].checked }
          : el));

      case ACTION_CHECKBOX_ALL:
        return state.map((el) => ({ ...el, checked: action.value }));

      case ACTION_INPUT:
        return state.map((el) => ((action.id === el.id)
          ? { ...el, input: action.value }
          : el));

      default:
        return state;
    }
  } else {
    switch (action.type) {
      case ADD_ENTITY:
        return [...state, { ...initialState[root][0], id: action.payload }];

      case DELETE_ENTITY:
        return state.filter((el) => el.id !== action.payload);

      default:
        return state;
    }
  }
};
