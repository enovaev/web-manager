import { ACTION_SLIDER_SET } from '../constants';

// eslint-disable-next-line import/prefer-default-export
export const actionSlider = (value, name) => (dispatch, getState) => {
  dispatch({
    type: ACTION_SLIDER_SET,
    payload: {
      ...getState().setData,
      [name]: { ...getState().setData[name], percent: Number(value) },
    },
  });
};
