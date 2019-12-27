import React from 'react';
// Utils
import PropTypes from 'prop-types';
import { Input } from 'antd';

const styling = (value) => ({ width: value });

const validator = (value, min, max) => {
  if (value.toString().split('\t').length > 1) return value;
  const val = value.replace(/[^\d]/g, '');

  if (min && val < min) return Number(min);
  if (max && val > max) return Number(max);
  return Number(val);
};

const CustomInput = ({
  action, value, elementType, width, min, max,
}) => (
  <Input
    style={styling(width)}
    value={value}
    onChange={({ target }) => ((elementType === 'number')
      ? action(validator(target.value, min, max))
      : action(target.value))}
  />
);

CustomInput.propTypes = {
  elementType: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  action: PropTypes.func.isRequired,
  width: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  min: PropTypes.number,
  max: PropTypes.number,
};
CustomInput.defaultProps = {
  width: '100%',
  min: 0,
  max: 0,
};

export default CustomInput;
