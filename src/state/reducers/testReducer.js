
const initialState = { input: '' };


// eslint-disable-next-line import/prefer-default-export
export function oneReducer(state = initialState, action) {
  switch (action.type) {
    case 'ACTION_TEST_ONE':
      return { ...state, input: action.value };
    default:
      return state;
  }
}
