import { ACTION_SLIDER } from '../constants';


// eslint-disable-next-line import/prefer-default-export
export const actionSlider = (value, name) => (dispatch, getState) => {
  dispatch({
    type: ACTION_SLIDER,
    payload: {
      ...getState().editData,
      [name]: { ...getState().editData[name], percent: Number(value) },
    },
  });
};
