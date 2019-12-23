import {
  ADD_ENTITY, DELETE_ENTITY,
} from '../constants';


const initialState = [123];

// eslint-disable-next-line import/prefer-default-export
export function IDReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_ENTITY:
      return [...state, action.payload];

    case DELETE_ENTITY:
      return state.filter((el) => el !== action.payload);

    default:
      return state;
  }
}
