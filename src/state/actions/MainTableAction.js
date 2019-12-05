import { ADD_ENTITY, DELETE_ENTITY, ACTION_CHECKBOX } from '../constants';

export const addEntity = () => (dispatch) => {
  dispatch({
    type: ADD_ENTITY,
    payload: { key: Math.random(), selected: true },
  });
};

export const deleteEntity = (index) => (dispatch, getState) => {
  dispatch({
    type: DELETE_ENTITY,
    payload: getState().entityData.filter((el, i) => (i !== Number(index.target.value)) && el),
  });
};

export const actionCheckbox = (index) => (dispatch, getState) => {
  console.log(index);
  dispatch({
    type: ACTION_CHECKBOX,
    payload: getState().entityData.map((el, i) => {
      if (i === index) {
        // eslint-disable-next-line no-param-reassign
        el.selected = !el.selected;
        return el;
      }
      return el;
    }),
  });
};
