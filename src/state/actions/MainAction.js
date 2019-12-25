import {
  ADD_ENTITY,
  DELETE_ENTITY,
  ACTION_CHECKBOX,
  ACTION_CHECKBOX_ALL,
  ACTION_SELECT,
  ACTION_INPUT,
  ACTION_SLIDER,
  ACTION_SLIDER_ALL,
} from '../constants';

export const actionInput = (value, id, name) => (dispatch) => {
  dispatch({
    type: ACTION_INPUT,
    value,
    id,
    name,
  });
};

export const addEntity = () => (dispatch) => {
  dispatch({
    type: ADD_ENTITY,
    payload: Math.random(),
  });
};

export const deleteEntity = (id) => (dispatch) => {
  dispatch({
    type: DELETE_ENTITY,
    payload: id,
  });
};

export const actionCheckbox = (value, name) => (dispatch) => {
  if (typeof (value) === 'number') {
    dispatch({
      type: ACTION_CHECKBOX,
      value,
      name,
    });
  } else {
    dispatch({
      type: ACTION_CHECKBOX_ALL,
      value,
      name,
    });
  }
};

export const actionSelect = (value, id, name) => (dispatch) => {
  dispatch({
    type: ACTION_SELECT,
    value,
    id,
    name,
  });
};

export const actionSlider = (value, name) => (dispatch, getState) => {
  const filter = getState().check.filter((item) => item.checked === true);
  if (filter.length) {
    dispatch({
      type: ACTION_SLIDER,
      value: Number(value),
      id: filter,
      name,
    });
  } else {
    dispatch({
      type: ACTION_SLIDER_ALL,
      value: Number(value),
      name,
    });
  }
};
