import React from 'react';
// Utils
import PropTypes from 'prop-types';
import 'antd/es/input/style/index.css';
import { Input } from 'antd';

const styling = (value) => ({ width: value });

const validator = (value, min, max) => {
  const val = value.replace(/[^\d]/g, '');

  if (min && val < min) return min;
  if (max && val > max) return max;
  return val;
};

function CustomInput(props) {
  const {
    action,
    value,
    elementType,
    width,
    min,
    max,
  } = props;
  return (
    <Input
      style={styling(width)}
      value={value}
      onChange={(e) => ((elementType === 'number')
        ? action(validator(e.target.value, min, max))
        : action(e.target.value))}
    />
  );
}


CustomInput.propTypes = {
  elementType: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  action: PropTypes.func.isRequired,
  width: PropTypes.number.isRequired,
  min: PropTypes.number,
  max: PropTypes.number,
};
CustomInput.defaultProps = {
  min: false,
  max: false,
};


export default CustomInput;
