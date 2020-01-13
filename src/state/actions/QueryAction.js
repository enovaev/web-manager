import axios from 'axios';
import currConfig from '../../config/selectConfig/selectCurrency.json';
import { QUERY_CURR } from '../constants';

// eslint-disable-next-line import/prefer-default-export
export const queryCurr = () => async (dispatch) => {
  const accesKey = 'c02f99dfb405783c393d94049b9e952b';
  try {
    const resp = await axios.get('http://data.fixer.io/api/latest', {
      params: {
        access_key: accesKey,
        symbols: currConfig.reduce(((acc, curr) => `${acc}${curr.value},`), ''),
      },
    });
    dispatch({
      type: QUERY_CURR,
      payload: resp,
    });
  } catch (e) {
    console.log(e);
  }
};
