import React from 'react';
// Utils
import { Select } from 'antd';
import PropTypes from 'prop-types';
import styled from 'styled-components';
// Configs
import currencyConfig from '../../config/selectConfig/selectCurrency.json';
import quantityConfig from '../../config/selectConfig/selectQuantity.json';


const { Option } = Select;
const renderOptionSelect = (data) => data.map(
  (item) => <Option key={item.value} value={item.value}>{item.name}</Option>,
);
const renderColorOption = (data) => data.map((item) => (
  <Option key={item} value={item}>
    <Color style={{ backgroundColor: item }} />
  </Option>
));

const CustomSelect = ({
  action, value, elementType, color,
}) => (
  <Select
    onChange={action}
    value={value}
    style={{ width: elementType === 'color' ? 85 : 68 }}
  >
    {elementType === 'quan' && renderOptionSelect(quantityConfig)}
    {elementType === 'curr' && renderOptionSelect(currencyConfig)}
    {elementType === 'color' && renderColorOption(color)}
  </Select>
);

CustomSelect.propTypes = {
  elementType: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired,
  color: PropTypes.arrayOf(PropTypes.any),
};
CustomSelect.defaultProps = {
  color: [],
};

const Color = styled.div`
  width: 46px;
  height: 30px;
  border: 4px solid white;
`;

export default CustomSelect;
