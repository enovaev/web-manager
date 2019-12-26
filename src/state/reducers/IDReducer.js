import {
  ADD_ENTITY, DELETE_ENTITY, DOWNLOAD, SAVE_NAME,
} from '../constants';


const initialState = [123];
const initialStateSave = '';

export function IDReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_ENTITY:
      return [...state, action.payload];

    case DELETE_ENTITY:
      return state.filter((el) => el !== action.payload);

    case DOWNLOAD:
      return action.payload.entityID;

    default:
      return state;
  }
}

export function saveName(state = initialStateSave, action) {
  switch (action.type) {
    case SAVE_NAME:
      return action.payload;

    case DOWNLOAD:
      return action.payload.saveName;

    default:
      return state;
  }
}
