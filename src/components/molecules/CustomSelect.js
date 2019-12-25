import React from 'react';
// Utils
import { Select } from 'antd';
import PropTypes from 'prop-types';
// Configs
import currencyConfig from '../../config/selectCurrency.json';
import quantityConfig from '../../config/selectQuantity.json';


const { Option } = Select;
const renderOptionSelect = (data) => data.map(
  (item) => <Option key={item.value} value={item.value}>{item.name}</Option>,
);

const CustomSelect = ({ action, value, elementType }) => (
  <Select
    onChange={action}
    value={value}
    style={{ width: 68 }}
  >
    {elementType === 'quan' && renderOptionSelect(quantityConfig)}
    {elementType === 'curr' && renderOptionSelect(currencyConfig)}
  </Select>
);

CustomSelect.propTypes = {
  elementType: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired,
};

export default CustomSelect;
