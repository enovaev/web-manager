import { combineReducers } from 'redux';
import { mainReducer, groupReducer } from './mainReducer';
import {
  entityID, entityGroup, saveName, Mode, quotes,
} from './optionReducer';

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
  // Group
  checkGr: groupReducer('checkGr'),
  posNameGr: groupReducer('posNameGr'),
  exwGr: groupReducer('exwGr'),
  priceOurGr: groupReducer('priceOurGr'),
  priceCustGr: groupReducer('priceCustGr'),
  profitGr: groupReducer('profitGr'),
  expandGr: groupReducer('expandGr'),
  // Edit
  delivery: mainReducer('delivery'),
  cusHouse: mainReducer('cusHouse'),
  nds: mainReducer('nds'),
  discount: mainReducer('discount'),
  sale: mainReducer('sale'),
  // Id
  entityID,
  entityGroup,
  saveName,
  mode: Mode,
  quotes,
});
