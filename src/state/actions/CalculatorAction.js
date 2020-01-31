import {
  RESULT_CALC,
} from '../constants';

const namePriceOur = ['cusHouse', 'nds', 'delivery', 'discount'];
const namePriceCust = ['cusHouse', 'nds', 'delivery', 'sale'];

export const actionCalc = (value, id, name, prop = 'text') => (dispatch) => {
  dispatch({
    type: RESULT_CALC,
    id,
    value,
    name,
    prop,
  });
};

const convertCurr = (value, rates, start, end) => (rates
  ? (value * rates[end]) / rates[start]
  : value);

const calcPlus = (price, arr, type, dispatch, last = false) => {
  let calc = price;
  arr.forEach((el, i) => {
    if (type === 'percent') {
      const value = calc * el.percent * 0.01;
      if (i === arr.length - 1 && last) {
        calc -= value;
      } else {
        calc += value;
      }
      if (value !== el.input && last) dispatch(actionCalc(value, el.id, namePriceOur[i], 'input'));
      if (value !== el.input && i === 3 && !last) {
        dispatch(actionCalc(value, el.id, namePriceCust[i], 'input'));
      }
    } else {
      const percent = (el.input * 100) / calc;
      if (i === arr.length - 1 && last) {
        calc = calc * (100 - percent) * 0.01;
      } else {
        calc = calc * (100 + percent) * 0.01;
      }
      if (percent !== el.percent && last) dispatch(actionCalc(percent, el.id, namePriceOur[i], 'percent'));
      if (percent !== el.percent && i === 3 && !last) {
        dispatch(actionCalc(percent, el.id, namePriceCust[i], 'percent'));
      }
    }
  });
  return calc;
};

export const calculate = (type) => (dispatch, getState) => {
  const {
    exw, quantity, nds, priceOur, priceCust, discount, cusHouse, delivery, sale, quotes,
  } = getState();
  exw.forEach((el, i) => {
    if (el.input && quantity[i].input) {
      const price = Number(el.input) * Number(quantity[i].input);

      // eslint-disable-next-line max-len
      const calcPriceOur = calcPlus(price, [cusHouse[i], nds[i], delivery[i], discount[i]], type, dispatch, true);
      // eslint-disable-next-line max-len
      const calcPriceCust = calcPlus(price, [cusHouse[i], nds[i], delivery[i], sale[i]], type, dispatch);

      // eslint-disable-next-line max-len
      const convertPriceOur = convertCurr(calcPriceOur, quotes.data.rates, el.select, priceOur[i].select);
      // eslint-disable-next-line max-len
      const convertPriceCust = convertCurr(calcPriceCust, quotes.data.rates, el.select, priceCust[i].select);

      if (convertPriceOur !== priceOur[i].text) dispatch(actionCalc(convertPriceOur, el.id, 'priceOur'));
      if (convertPriceCust !== priceCust[i].text) dispatch(actionCalc(convertPriceCust, el.id, 'priceCust'));
    } else {
      if (priceOur[i].text !== 'not data') dispatch(actionCalc('not data', el.id, 'priceOur'));
      if (priceCust[i].text !== 'not data') dispatch(actionCalc('not data', el.id, 'priceCust'));
    }
    return false;
  });
};
