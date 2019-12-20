import {
  ACTION_INPUT, ADD_ENTITY,
} from '../constants';


const initialState = {
  part: [{ id: 123, input: '' }, { id: 143, input: '' }],
  option: [{ id: 123, input: '' }, { id: 143, input: '' }],
  posName: [{ id: 123, input: '' }, { id: 143, input: '' }],
  exw: [{ id: 123, input: '' }, { id: 143, input: '' }],
  quantity: [{ id: 123, input: '' }, { id: 143, input: '' }],
  priceOur: [{ id: 123, input: '' }, { id: 143, input: '' }],
  priceCust: [{ id: 123, input: '' }, { id: 143, input: '' }],
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

    case ADD_ENTITY:
      // eslint-disable-next-line max-len
      // console.log(Object.keys(state).forEach((el) => ({ [el]: [...state[el], initialState[el][0]] })))
      console.log(Object.keys(state).map((el) => el));
      return state;

    default:
      return state;
  }
}
