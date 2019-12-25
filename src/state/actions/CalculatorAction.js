import {
  OUR_PRICE_CALC,
} from '../constants';

// eslint-disable-next-line import/prefer-default-export
export const calcOurPrice = (value, id, name) => (dispatch) => {
  dispatch({
    type: OUR_PRICE_CALC,
    id,
    value,
    name,
  });
};
