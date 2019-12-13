import { ACTION_SLIDER, ACTION_SLIDER_ALL } from '../constants';


// eslint-disable-next-line import/prefer-default-export
export const actionSlider = (value, name) => (dispatch, getState) => {
  const filter = getState().entityData.filter((item) => item.selected === true);
  if (filter.length) {
    dispatch({
      type: ACTION_SLIDER,
      Value: Number(value),
      name,
    });
  } else {
    dispatch({
      type: ACTION_SLIDER_ALL,
      Value: Number(value),
      name,
    });
  }
};
