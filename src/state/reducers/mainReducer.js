import initialState from '../../config/initialState.json';
import {
  ACTION_CHECKBOX, ACTION_CHECKBOX_ALL,
  ACTION_INPUT, ADD_ENTITY, DELETE_ENTITY,
  ACTION_SELECT, ACTION_SLIDER_ALL, CREATE_GROUP,
  ACTION_SLIDER, RESULT_CALC, DOWNLOAD, EXPAND_GROUP,
} from '../constants';


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

      case ACTION_SELECT:
        return state.map((el) => ((action.id === el.id)
          ? { ...el, select: action.value }
          : el));

      case ACTION_SLIDER_ALL:
        return state.map((el) => ({ ...el, [action.prop]: action.value }));

      case ACTION_SLIDER:
        return state.map((el) => (action.id.find((item) => item.id === el.id)
          ? { ...el, [action.prop]: action.value }
          : el));

      case RESULT_CALC:
        return state.map((el) => ((action.id === el.id)
          ? { ...el, [action.prop]: action.value }
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

      case DOWNLOAD:
        return action.payload[root];

      default:
        return state;
    }
  }
};

export const groupReducer = (root) => (state = initialState[root], action) => {
  if (action.name === root) {
    switch (action.type) {
      case EXPAND_GROUP:
        return state.map((el) => (el.id === action.id
          ? { ...el, show: !el.show }
          : el));

      default:
        return state;
    }
  } else {
    switch (action.type) {
      case CREATE_GROUP:
        return [...state, { ...initialState[root][0], id: action.id }];

      case DOWNLOAD:
        return action.payload[root];

      default:
        return state;
    }
  }
};
