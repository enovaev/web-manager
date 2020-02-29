import initialState from '../../config/initialState.json';
import {
  ACTION_CHECKBOX, ACTION_CHECKBOX_ALL,
  ACTION_INPUT, ADD_ENTITY, DELETE_ENTITY,
  ACTION_SELECT, ACTION_SLIDER_ALL, CREATE_GROUP,
  ACTION_SLIDER, RESULT_CALC, DOWNLOAD, EXPAND_GROUP, MANAGE_ID,
  SET_COLOR_GROUP,
} from '../constants';


export const mainReducer = (root) => (state = initialState[root], action) => {
  if (action.name === root) {
    switch (action.type) {
      case ACTION_CHECKBOX:
        return state.map((el) => ((action.id === el.id)
          ? { ...el, checked: action.value }
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

      case SET_COLOR_GROUP:
        return state.map((el) => (action.ids.includes(el.id)
          ? { ...el, group: action.color }
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

      case ACTION_SELECT:
        return state.map((el) => ((action.id === el.id)
          ? { ...el, select: action.value }
          : el));

      case ACTION_CHECKBOX:
        return state.map((el) => ((action.id === el.id)
          ? { ...el, checked: action.value }
          : el));

      case ACTION_CHECKBOX_ALL:
        return state.map((el) => ({ ...el, checked: action.value }));

      case MANAGE_ID:
        return state.map((el) => {
          if (el.id === action.inId) return { ...el, ids: [...el.ids, ...action.ids] };
          if (el.id === action.outId) {
            return { ...el, ids: el.ids.filter((item) => !action.ids.includes(item)) };
          }
          return el;
        });

      case RESULT_CALC:
        return state.map((el) => (el.id === action.id
          ? { ...el, [action.prop]: action.value }
          : el));

      default:
        return state;
    }
  } else {
    switch (action.type) {
      case CREATE_GROUP:
        if (root === 'expandGr') return [...state, { ...initialState[root][0], id: action.id, ids: [] }];
        if (root === 'posNameGr') return [...state, { ...initialState[root][0], id: action.id, input: action.name }];
        return [...state, { ...initialState[root][0], id: action.id }];

      case ADD_ENTITY:
        if (root === 'expandGr') {
          return state.map((el) => (el.id === 236
            ? { ...el, ids: [...el.ids, action.payload] }
            : el));
        }
        return state;

      case DELETE_ENTITY:
        if (root === 'expandGr') {
          return state.map((el) => ({
            ...el,
            ids: el.ids.filter((item) => item !== action.payload),
          }));
        }
        return state;

      case DOWNLOAD:
        return action.payload[root];

      default:
        return state;
    }
  }
};
