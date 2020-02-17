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
import { calculate } from './CalculatorAction';

export const actionInput = (value, id, name, paste = false) => (dispatch) => {
  const inputName = ['part', 'option', 'posName', 'exw', 'quantity'];
  const row = value.toString().split('\t');

  if (row.length > 1 && paste) {
    inputName.slice(inputName.indexOf(name)).forEach((el, i) => {
      if (row[i]) {
        dispatch({
          type: ACTION_INPUT,
          // eslint-disable-next-line no-nested-ternary
          value: (el === 'part' || el === 'posName')
            ? row[i]
            : ((Number(row[i]) ? Number(row[i]) : 0)),
          id,
          name: el,
        });
      }
    });
  } else {
    dispatch({
      type: ACTION_INPUT,
      value,
      id,
      name,
    });
  }
  if (name === 'exw' || name === 'quantity') dispatch(calculate('percent'));
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

export const actionCheckbox = (value, name) => (dispatch, getState) => {
  if (name === 'checkGr') {
    getState().expandGr.forEach((el) => {
      if (el.id === value) el.ids.forEach((item) => dispatch(actionCheckbox(item, 'check')));
    });
    dispatch({
      type: ACTION_CHECKBOX,
      value,
      name,
    });
  } else if (typeof (value) === 'number') {
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
  if (name === 'exw') {
    const changeCurr = ['priceOur', 'priceCust', 'delivery', 'cusHouse', 'nds', 'discount', 'sale', 'delta'];
    changeCurr.forEach((el) => dispatch(actionSelect(value, id, el)));
  }
  if (name === 'exw' || name === 'priceOur' || name === 'priceCust' || name === 'priceOurGr' || name === 'priceCustGr') dispatch(calculate('percent'));
};

export const actionSlider = (value, name, prop) => (dispatch, getState) => {
  const filter = getState().check.filter((item) => item.checked === true);
  if (filter.length) {
    dispatch({
      type: ACTION_SLIDER,
      value,
      id: filter,
      name,
      prop,
    });
  } else {
    dispatch({
      type: ACTION_SLIDER_ALL,
      value,
      name,
      prop,
    });
  }
  if (prop === 'select') {
    dispatch(calculate('percent'));
  } else {
    dispatch(calculate(prop));
  }
};
