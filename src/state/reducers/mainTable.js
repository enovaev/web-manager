import {
  ADD_ENTITY,
  DELETE_ENTITY,
  ACTION_CHECKBOX,
  ACTION_CHECKBOX_ALL,
  ACTION_SELECT,
  ACTION_INPUT,
  ACTION_SLIDER,
  ACTION_SLIDER_ALL,
  OUR_PRICE_CALC,
} from '../constants';
import empty from '../../config/ImitateData.json';

const initialState = [empty];

// eslint-disable-next-line import/prefer-default-export
export function MainTableReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_ENTITY:
      return [...state, { ...empty, key: action.payload }];

    case DELETE_ENTITY:
      return state.filter((el, i) => (i !== action.payload) && el);

    case ACTION_CHECKBOX:
      return state.map((el, i) => ((i === action.payload)
        ? { ...el, selected: !el.selected }
        : el));

    case ACTION_CHECKBOX_ALL:
      return state.map((el) => ({ ...el, selected: action.payload }));

    case ACTION_SELECT:
      return state.map((el, i) => ((action.index === i)
        ? { ...el, [action.name]: { ...el[action.name], select: action.value } }
        : el));

    case ACTION_INPUT:
      return state.map((el, i) => ((action.index === i)
        ? { ...el, [action.name]: { ...el[action.name], input: action.value } }
        : el));

    case ACTION_SLIDER:
      return state.map((el) => ((el.selected)
        ? { ...el, [action.name]: { ...el[action.name], percent: action.value } }
        : el));

    case ACTION_SLIDER_ALL:
      return state.map(
        (el) => ({ ...el, [action.name]: { ...el[action.name], percent: action.value } }),
      );

    case OUR_PRICE_CALC:
      return state.map((el, i) => ((action.index === i)
        ? { ...el, priceOur: { ...el.priceOur, text: action.value } }
        : el));

    default:
      return state;
  }
}
