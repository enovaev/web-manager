import React from 'react';
// Utils
import PropTypes from 'prop-types';
import { Input } from 'antd';

const styling = (value) => ({ width: value });


function CustomInput(props) {
  const {
    action,
    value,
    elementType,
    width,
  } = props;
  return (
    <Input
      style={styling(width)}
      value={value}
      onChange={(e) => ((elementType === 'number') ? action(e.target.value.replace(/[^\d]/g, '')) : action(e.target.value))}
    />
  );
}


CustomInput.propTypes = {
  elementType: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired,
  width: PropTypes.number.isRequired,
};


export default CustomInput;