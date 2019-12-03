
export const addEntity = () => (dispatch) => {
  dispatch({
    type: 'ADD_ENTITY',
  });
};

export const deleteEntity = (index) => (dispatch) => {
  dispatch({
    type: 'DELETE_ENTITY',
    payload: +index.target.value,
  });
};
