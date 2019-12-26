import {
  DOWNLOAD, SAVE_NAME,
} from '../constants';

// eslint-disable-next-line import/prefer-default-export
export const actionModal = (type, value) => (dispatch, getState) => {
  if (type === 'save') {
    dispatch({
      type: SAVE_NAME,
      payload: value,
    });
    localStorage.setItem(value, JSON.stringify(getState()));
  } else {
    dispatch({
      type: DOWNLOAD,
      payload: JSON.parse(localStorage.getItem(value)),
    });
  }
};
