import React from 'react';
// Utils
import moment from 'moment';
import { Tooltip } from 'antd';
import Icon from 'antd/es/icon';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
// Store
import { queryCurr } from '../state/actions/QueryAction';

const currTooltip = (rates) => (
  rates
    ? Object.keys(rates).reduce((acc, curr) => (curr !== 'RUB'
      ? `${acc}${curr}: ${(rates.RUB / rates[curr]).toFixed(5)}; `
      : ''),
    '')
    : 'Нажмите для загрузки котировок'
);

const CurrencyContainer = () => {
  const data = useSelector(({ quotes }) => quotes.data);
  const loading = useSelector(({ quotes }) => quotes.loading);
  const dispatch = useDispatch();

  return (
    <Container>
      <Div>
        <Tooltip title={currTooltip(data.rates)} placement="bottomLeft" overlayStyle={{ fontSize: 12 }}>
          {loading
            ? <Icon type="loading" />
            : <Icon type="reload" onClick={() => dispatch(queryCurr())} />}
        </Tooltip>
      </Div>
      <Text>
        {data.rates
          ? `обновлено: ${moment(data.date).format('HH:mm DD.MM.YY')}`
          : 'нет данных'}
      </Text>
    </Container>
  );
};

const Container = styled.div`
  margin-bottom: 30px;
  display: flex;
  align-items: center;
`;
const Div = styled.div`
  font-size: 18px;
`;
const Text = styled.p`
  margin: 0 0 0 10px;
  line-height: 14px;
`;

export default CurrencyContainer;
