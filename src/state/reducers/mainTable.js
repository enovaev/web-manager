import moment from 'moment';

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
      return [...state, { ...state[0], key: moment().format('x') }];

    case 'DELETE_ENTITY':
      return [...state.filter((el, i) => (i !== +action.payload) && el)];
    default:
      return state;
  }
}
