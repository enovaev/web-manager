import {
  ADD_ENTITY,
  DELETE_ENTITY,
  ACTION_CHECKBOX,
  ACTION_CHECKBOX_ALL,
  ACTION_SELECT,
  ACTION_INPUT,
} from '../constants';

export const actionInput = (value, index, name) => (dispatch) => {
  dispatch({
    type: ACTION_INPUT,
    value,
    index,
    name,
  });
};

export const addEntity = () => (dispatch) => {
  dispatch({
    type: ADD_ENTITY,
    payload: Math.random(),
  });
};

export const deleteEntity = (index) => (dispatch) => {
  dispatch({
    type: DELETE_ENTITY,
    payload: index,
  });
};

export const actionCheckbox = (value) => (dispatch) => {
  if (typeof (value) === 'number') {
    dispatch({
      type: ACTION_CHECKBOX,
      payload: value,
    });
  } else {
    dispatch({
      type: ACTION_CHECKBOX_ALL,
      payload: value,
    });
  }
};

export const actionSelect = (value, index, name) => (dispatch) => {
  dispatch({
    type: ACTION_SELECT,
    value,
    index,
    name,
  });
};
