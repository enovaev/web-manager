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

const calcPlus = (price, index, type, currency, customer) => (dispatch, getState) => {
  const {
    cusHouse, nds, delivery, discount, sale, quotes,
  } = getState();
  const arr = customer
    ? [cusHouse[index], nds[index], delivery[index], sale[index]]
    : [cusHouse[index], nds[index], delivery[index], discount[index]];
  let calc = price;

  arr.forEach((el, i) => {
    if (type === 'percent') {
      const value = calc * el.percent * 0.01;

      if (el.plus) calc += value;
      if (!el.plus) calc -= value;

      const curr = convertCurr(value, quotes.data.rates, currency, el.select);
      if (curr !== el.input) {
        if (customer) dispatch(actionCalc(curr, el.id, namePriceCust[i], 'input'));
        if (!customer) dispatch(actionCalc(curr, el.id, namePriceOur[i], 'input'));
      }
    } else {
      const curr = convertCurr(el.input, quotes.data.rates, el.select, currency);
      const percent = (curr * 100) / calc;

      if (el.plus) calc = calc * (100 + percent) * 0.01;
      if (!el.plus) calc = calc * (100 - percent) * 0.01;

      if (percent !== el.percent) {
        if (customer) dispatch(actionCalc(percent, el.id, namePriceCust[i], 'percent'));
        if (!customer) dispatch(actionCalc(percent, el.id, namePriceOur[i], 'percent'));
      }
    }
  });
  return calc;
};

export const calculateGroup = () => (dispatch, getState) => {
  const {
    expandGr, priceOur, priceCust, quotes, priceOurGr, priceCustGr,
  } = getState();

  expandGr.forEach((el, i) => {
    let sumPriceOur = 0;
    let sumPriceCust = 0;

    el.ids.forEach((item) => {
      priceOur.forEach((val) => {
        if (val.id === item && Number(val.text)) {
          const curr = priceOurGr.find((a) => a.id === el.id).select;
          sumPriceOur += convertCurr(val.text, quotes.data.rates, val.select, curr);
        }
      });
      priceCust.forEach((val) => {
        if (val.id === item && Number(val.text)) {
          const curr = priceCustGr.find((a) => a.id === el.id).select;
          sumPriceCust += convertCurr(val.text, quotes.data.rates, val.select, curr);
        }
      });
    });
    if (priceOurGr[i].text !== sumPriceOur) dispatch(actionCalc(sumPriceOur, el.id, 'priceOurGr'));
    if (priceCustGr[i].text !== sumPriceCust) dispatch(actionCalc(sumPriceCust, el.id, 'priceCustGr'));
  });
};

export const calculate = (type) => (dispatch, getState) => {
  const {
    exw, quantity, priceOur, priceCust, quotes,
  } = getState();
  exw.forEach((el, i) => {
    if (el.input && quantity[i].input) {
      const price = Number(el.input) * Number(quantity[i].input);

      const calcPriceOur = dispatch(calcPlus(price, i, type, el.select));
      const calcPriceCust = dispatch(calcPlus(price, i, type, el.select, true));

      const paramsOur = [calcPriceOur, quotes.data.rates, el.select, priceOur[i].select];
      const paramsCust = [calcPriceCust, quotes.data.rates, el.select, priceCust[i].select];

      const convertPriceOur = convertCurr(...paramsOur);
      const convertPriceCust = convertCurr(...paramsCust);

      if (convertPriceOur !== priceOur[i].text) dispatch(actionCalc(convertPriceOur, el.id, 'priceOur'));
      if (convertPriceCust !== priceCust[i].text) dispatch(actionCalc(convertPriceCust, el.id, 'priceCust'));
    } else {
      if (priceOur[i].text !== 'not data') dispatch(actionCalc('not data', el.id, 'priceOur'));
      if (priceCust[i].text !== 'not data') dispatch(actionCalc('not data', el.id, 'priceCust'));
    }
    return false;
  });
  dispatch(calculateGroup());
};
