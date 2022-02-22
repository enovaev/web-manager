import axios from 'axios';
import moment from 'moment';
import { message } from 'antd';
import currConfig from '../../config/selectConfig/selectCurrency.json';
import { QUERY_CURR, LOADING_CURR } from '../constants';
import { messages } from '../../config/textConfigs/text';
import { calculate } from './CalculatorAction';

const accessKey = 'b6a4e23864a80132ca980006cb083b2f';

// eslint-disable-next-line import/prefer-default-export
export const queryCurr = () => async (dispatch, getState) => {
  const { quotes } = getState();
  const date = moment(new Date()).format('x');

  if (quotes.data && quotes.data.reload >= date) {
    message.warning(`${messages().warning} ${moment(quotes.data.reload).format('HH:mm')}!`);
    return;
  }
  dispatch({
    type: LOADING_CURR,
    payload: true,
  });
  try {
    const resp = await axios.get('http://data.fixer.io/api/latest', {
      params: {
        access_key: accessKey,
        symbols: currConfig.reduce(((acc, curr) => `${acc}${curr.value},`), ''),
      },
    });
    const update = {
      ...resp.data,
      date: Number(date),
      reload: Number(moment(new Date()).add(1, 'h').format('x')),
    };

    dispatch({
      type: QUERY_CURR,
      payload: update,
    });
    dispatch(calculate('percent'));

    message.success(messages().success);
  } catch (e) {
    console.log(e);
    message.error(messages().error);
  }
  dispatch({
    type: LOADING_CURR,
    payload: false,
  });
};
