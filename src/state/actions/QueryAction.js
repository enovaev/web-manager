import axios from 'axios';
import moment from 'moment';
import currConfig from '../../config/selectConfig/selectCurrency.json';
import { QUERY_CURR, LOADING_CURR } from '../constants';

// eslint-disable-next-line import/prefer-default-export
export const queryCurr = () => async (dispatch) => {
  const accesKey = 'c02f99dfb405783c393d94049b9e952b';
  dispatch({
    type: LOADING_CURR,
    payload: true,
  });
  try {
    const resp = await axios.get('http://data.fixer.io/api/latest', {
      params: {
        access_key: accesKey,
        symbols: currConfig.reduce(((acc, curr) => `${acc}${curr.value},`), ''),
      },
    });
    const update = { ...resp.data, date: moment(new Date()).format('HH:mm DD.MM.YY') };
    dispatch({
      type: QUERY_CURR,
      payload: update,
    });
  } catch (e) {
    console.log(e);
  }
  dispatch({
    type: LOADING_CURR,
    payload: false,
  });
};
