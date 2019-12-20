const initialState = { input: '' };

// eslint-disable-next-line import/prefer-default-export
export function twoReducer(state = initialState, action) {
  switch (action.type) {
    case 'ACTION_TEST_TWO':
      return { ...state, input: action.value };
    default:
      return state;
  }
}
