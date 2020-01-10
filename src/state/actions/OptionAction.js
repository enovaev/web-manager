import {
  DOWNLOAD, SAVE_NAME, CHANGE_MODE, CREATE_GROUP,
} from '../constants';

// eslint-disable-next-line import/prefer-default-export
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

export const actionCreateGroup = (name, color) => (dispatch, getState) => {
  const check = getState().check.filter((el) => el.checked);
  console.log(check);
  dispatch({
    type: CREATE_GROUP,
    name,
    color,
  });
};
