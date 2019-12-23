import _ from 'lodash';
import {
  ACTION_INPUT, ADD_ENTITY, DELETE_ENTITY,
} from '../constants';


const initialState = {
  part: [{ id: 123, input: '' }],
  option: [{ id: 123, input: '' }],
  posName: [{ id: 123, input: '' }],
  exw: [{ id: 123, input: '' }],
  quantity: [{ id: 123, input: '' }],
  priceOur: [{ id: 123, input: '' }],
  priceCust: [{ id: 123, input: '' }],
  ID: [{ id: 123 }],
};


// eslint-disable-next-line import/prefer-default-export
export function partReducer(state = initialState, action) {
  switch (action.type) {
    case ACTION_INPUT:
      return {
        ...state,
        [action.name]:
        state[action.name].map((el, i) => ((action.index === i)
          ? { ...el, input: action.value }
          : el)),
      };

    case DELETE_ENTITY:
      return _.zipObject(Object.keys(state), Object.keys(state).map((el) => (
        state[el].filter((item, i) => i !== action.payload)
      )));

    case ADD_ENTITY:
      return _.zipObject(Object.keys(state), Object.keys(state).map((el) => (
        [...state[el], { ...initialState[el][0], id: action.payload }]
      )));

    default:
      return state;
  }
}
