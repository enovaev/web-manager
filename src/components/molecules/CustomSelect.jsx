import React from 'react';
// Utils
import { Select } from 'antd';
// import PropTypes from 'prop-types';
// Configs
// import currencyConfig from '../../config/selectCurrency.json';
// import quantityConfig from '../../config/selectQuantity.json';


// eslint-disable-next-line no-unused-vars
const { Option } = Select;
// const renderOptionSelect = (data) => data.map(
//   (item) => <Option key={item.value} value={item.value}>{item.name}</Option>,
// );

function CustomSelect(elementType, value, action) {
  return (
    <Select
      onChange={action}
      value={value}
      style={{ width: 68 }}
    >
      {/* {elementType === 'quan' && currencyConfig.map( */}
      {/*  (item) => <Option key={item.value} value={item.value}>{item.name}</Option>, */}
      {/* )} */}
      {/* {elementType === 'curr' && renderOptionSelect(currencyConfig)} */}
    </Select>
  );
}

export default CustomSelect;
// CustomSelect.propTypes = {
//   elementType: PropTypes.string.isRequired,
//   value: PropTypes.string.isRequired,
//   action: PropTypes.func.isRequired,
// };
