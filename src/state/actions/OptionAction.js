import {
  DOWNLOAD, SAVE_NAME, CHANGE_MODE, CREATE_GROUP, EXPAND_GROUP, MANAGE_ID,
} from '../constants';


export const actionSaveDown = (type, value) => (dispatch, getState) => {
  if (type === 'save') {
    dispatch({
      type: SAVE_NAME,
      payload: value,
    });
    localStorage.setItem(value, JSON.stringify({ ...getState(), time: Number(new Date()) }));
  } else {
    dispatch({
      type: DOWNLOAD,
      payload: JSON.parse(localStorage.getItem(value)),
    });
  }
};

export const actionMode = (mode) => (dispatch) => {
  dispatch({
    type: CHANGE_MODE,
    payload: mode,
  });
};

export const idManager = (inId, ids, outId) => (dispatch) => {
  dispatch({
    type: MANAGE_ID,
    name: 'expandGr',
    outId,
    inId,
    ids,
  });
};

export const actionCreateGroup = (name, color) => (dispatch, getState) => {
  const check = getState().check.filter((el) => el.checked).map((el) => el.id);
  const id = Math.random();
  dispatch({
    type: CREATE_GROUP,
    id,
    name,
    color,
  });
  dispatch(idManager(id, check, 236));
};

export const expandGroup = (id, name) => (dispatch) => {
  dispatch({
    type: EXPAND_GROUP,
    name,
    id,
  });
};
