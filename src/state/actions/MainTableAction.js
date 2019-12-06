import { ADD_ENTITY, DELETE_ENTITY, ACTION_CHECKBOX } from '../constants';
import empty from '../../config/ImitateData.json';

export const addEntity = () => (dispatch) => {
  dispatch({
    type: ADD_ENTITY,
    payload: { ...empty, key: Math.random() },
  });
};

export const deleteEntity = (index) => (dispatch, getState) => {
  dispatch({
    type: DELETE_ENTITY,
    payload: getState().entityData.filter((el, i) => (i !== Number(index.target.value)) && el),
  });
};

export const actionCheckbox = (value) => (dispatch, getState) => {
  if (typeof (value) === 'number') {
    dispatch({
      type: ACTION_CHECKBOX,
      payload: getState().entityData.map((el, i) => ((i === value)
        ? { ...el, selected: !el.selected }
        : el)),
    });
  } else {
    dispatch({
      type: ACTION_CHECKBOX,
      payload: getState().entityData.map((el) => ({ ...el, selected: value })),
    });
  }
};
