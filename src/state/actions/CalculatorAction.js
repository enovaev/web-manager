import {
  OUR_PRICE_CALC,
} from '../constants';

// eslint-disable-next-line import/prefer-default-export
export const calcOurPrice = (index, value) => (dispatch) => {
  dispatch({
    type: OUR_PRICE_CALC,
    index: Number(index),
    value,
  });
};
