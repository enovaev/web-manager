
const initialState = [
  {
    key: 12,
    part: '',
    option: 1500,
    posName: 'wgregw',
    exw: 20.5,
    quantity: 1,
    priceOur: 1000,
    priceCust: 1500,
    selected: true,
  },
];

// eslint-disable-next-line import/prefer-default-export
export function MainTableReducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_ENTITY':
      return [...state, action.payload];

    case 'DELETE_ENTITY':
      return action.payload;
    default:
      return state;
  }
}
