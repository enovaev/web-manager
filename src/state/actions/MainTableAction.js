// import moment from 'moment';
// import emptyData from '../../config/ImitateData.json';

export const addEntity = () => (dispatch) => {
  dispatch({
    type: 'ADD_ENTITY',
    payload: { key: Math.random(), selected: true },
    // payload: { ...emptyData, key: moment().format('x') },
  });
};

export const deleteEntity = (index) => (dispatch, getState) => {
  dispatch({
    type: 'DELETE_ENTITY',
    payload: getState().entityData.filter((el, i) => (i !== Number(index.target.value)) && el),
  });
};
