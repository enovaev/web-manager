import React from 'react';
// Utils
import { Input } from 'antd';
import PropTypes from 'prop-types';


const CustomText = ({ value }) => (
  <Input
    value={value}
    onChange={null}
    style={{ borderColor: Number(value) ? '#44C144' : '#F66871', width: 90 }}
  />
);

CustomText.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
};
CustomText.defaultProps = {
  value: 'not datas',
};

export default CustomText;
