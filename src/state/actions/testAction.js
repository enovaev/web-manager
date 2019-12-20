
// eslint-disable-next-line import/prefer-default-export
export const actionTestOne = (value) => (dispatch) => {
  dispatch({
    type: 'ACTION_TEST_ONE',
    value,
  });
};

export const actionTestTwo = (value) => (dispatch) => {
  dispatch({
    type: 'ACTION_TEST_TWO',
    value,
  });
};
