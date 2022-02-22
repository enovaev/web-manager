import {
  RESULT_CALC,
} from '../constants';

const namePriceOur = ['cusHouse', 'nds', 'delivery', 'discount'];
const namePriceCust = ['cusHouse', 'nds', 'delivery', 'sale'];

export const actionCalc = (value, id, name, prop = 'text') => ({
  type: RESULT_CALC,
  id,
  value,
  name,
  prop,
});

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
        if (customer) dispatch(actionCalc(percent.toFixed(), el.id, namePriceCust[i], 'percent'));
        if (!customer) dispatch(actionCalc(percent.toFixed(), el.id, namePriceOur[i], 'percent'));
      }
    }
  });
  return calc;
};

export const calculateGroup = () => (dispatch, getState) => {
  const {
    expandGr, priceOur, priceCust, quotes, priceOurGr, priceCustGr, profitGr,
  } = getState();

  expandGr.forEach((el, i) => {
    let sumPriceOur = 0;
    let sumPriceCust = 0;

    const currOur = priceOurGr.find((a) => a.id === el.id).select;
    const currCust = priceCustGr.find((a) => a.id === el.id).select;
    el.ids.forEach((item) => {
      priceOur.forEach((val) => {
        if (val.id === item && Number(val.text)) {
          sumPriceOur += convertCurr(val.text, quotes.data.rates, val.select, currOur);
        }
      });
      priceCust.forEach((val) => {
        if (val.id === item && Number(val.text)) {
          sumPriceCust += convertCurr(val.text, quotes.data.rates, val.select, currCust);
        }
      });
    });

    if (priceOurGr[i].text !== sumPriceOur) dispatch(actionCalc(sumPriceOur, el.id, 'priceOurGr'));
    if (priceCustGr[i].text !== sumPriceCust) dispatch(actionCalc(sumPriceCust, el.id, 'priceCustGr'));

    // рассчет прибыли
    const priceOurCon = convertCurr(sumPriceOur, quotes.data.rates, currOur, profitGr[i].select);
    const priceCustCon = convertCurr(sumPriceCust, quotes.data.rates, currCust, profitGr[i].select);
    const profitValue = priceCustCon - priceOurCon || 0;
    const profitPercent = (profitValue / priceCustCon) * 100 || 0;

    if (profitGr[i].text !== profitValue) dispatch(actionCalc(profitValue, el.id, 'profitGr'));
    if (profitGr[i].percent !== profitPercent) dispatch(actionCalc(profitPercent, el.id, 'profitGr', 'percent'));
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
