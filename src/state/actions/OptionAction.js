import {
  DOWNLOAD, SAVE_NAME, CHANGE_MODE, CREATE_GROUP, EXPAND_GROUP, MANAGE_ID, SET_COLOR_GROUP,
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

export const actionMode = (mode) => ({
  type: CHANGE_MODE,
  payload: mode,
});

export const setColorGroup = (name, ids, color) => ({
  type: SET_COLOR_GROUP,
  name,
  ids,
  color,
});

export const idManager = (inId, ids, outId) => ({
  type: MANAGE_ID,
  name: 'expandGr',
  outId,
  inId,
  ids,
});

export const idDirection = (inId, ids) => (dispatch, getState) => {
  const arrDiff = getState().expandGr.map((item) => ({
    idGroup: item.id,
    diffIds: item.ids.filter((el) => ids.includes(el)),
  }));
  arrDiff.forEach((item) => item.diffIds.length
    && dispatch(idManager(inId, item.diffIds, item.idGroup)));
};

export const actionCreateGroup = (name, color) => (dispatch, getState) => {
  const check = getState().check.filter((el) => el.checked).map((el) => el.id);
  const id = Math.random();
  dispatch({
    type: CREATE_GROUP,
    id,
    name,
  });
  dispatch(setColorGroup('check', check, color));
  dispatch(setColorGroup('checkGr', [id], color));
  dispatch(idDirection(id, check));
};

export const expandGroup = (id, name) => ({
  type: EXPAND_GROUP,
  name,
  id,
});
