import { combineReducers } from 'redux';
import { mainReducer, footerReducer } from './mainReducer';
import { OptionReducer, saveName, Mode } from './optionReducer';

// eslint-disable-next-line import/prefer-default-export
export const rootReducer = combineReducers({
  // Main
  part: mainReducer('part'),
  option: mainReducer('option'),
  check: mainReducer('check'),
  posName: mainReducer('posName'),
  exw: mainReducer('exw'),
  quantity: mainReducer('quantity'),
  priceOur: mainReducer('priceOur'),
  priceCust: mainReducer('priceCust'),
  // MainFooter
  exwSum: footerReducer('exwSum'),
  priceOurSum: footerReducer('priceOurSum'),
  priceCustSum: footerReducer('priceCustSum'),
  // Edit
  delivery: mainReducer('delivery'),
  cusHouse: mainReducer('cusHouse'),
  nds: mainReducer('nds'),
  convert: mainReducer('convert'),
  another: mainReducer('another'),
  discount: mainReducer('discount'),
  // Set
  extra: mainReducer('extra'),
  sale: mainReducer('sale'),
  delta: mainReducer('delta'),
  // Id
  entityID: OptionReducer,
  saveName,
  mode: Mode,
});
