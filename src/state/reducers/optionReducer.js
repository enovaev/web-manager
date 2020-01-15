import {
  ADD_ENTITY, CHANGE_MODE, DELETE_ENTITY, DOWNLOAD, SAVE_NAME, QUERY_CURR, LOADING_CURR,
} from '../constants';


const initialState = [123];
const initialStateSave = '';
const initialStateMode = 'Main';
const initialStateQuotes = { loading: false, data: { rates: null } };

export function OptionReducer(state = initialState, action) {
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

export function Mode(state = initialStateMode, action) {
  switch (action.type) {
    case CHANGE_MODE:
      return action.payload;

    default:
      return state;
  }
}

export function quotes(state = initialStateQuotes, action) {
  switch (action.type) {
    case QUERY_CURR:
      return { ...state, data: action.payload };

    case LOADING_CURR:
      return { ...state, loading: action.payload };

    case DOWNLOAD:
      return action.payload.quotes;

    default:
      return state;
  }
}
