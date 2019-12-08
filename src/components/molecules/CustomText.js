import React from 'react';
import { Input } from 'antd';
import 'antd/es/input/style/index.css';
import PropTypes from 'prop-types';


function CustomText(props) {
  const { value } = props;
  return (
    <Input
      value={value}
      onChange={null}
      style={{ borderColor: Number(value) ? '#44C144' : '#F66871', width: 90 }}
    />
  );
}
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
