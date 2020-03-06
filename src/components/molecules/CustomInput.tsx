import React from 'react';
// Utils
import { Input } from 'antd';

interface ICustomInput {
  action: (val: number | string) => void,
  value: number | string,
  elementType: string,
  width: number,
  min: number,
  max: number,
}

const styling = (value: number): object => ({ width: value });

const validator = (value: string, min: number, max: number): number | string => {
  if (value.toString().split('\t').length > 1) return value;
  const val = Number(value.replace(/[^\d]/g, ''));

  if (min && val < min) return min;
  if (max && val > max) return max;
  return val;
};

const CustomInput: React.FC<ICustomInput> = ({
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

// CustomInput.propTypes = {
//   elementType: PropTypes.string.isRequired,
//   value: PropTypes.oneOfType([
//     PropTypes.string,
//     PropTypes.number,
//   ]).isRequired,
//   action: PropTypes.func.isRequired,
//   width: PropTypes.oneOfType([
//     PropTypes.string,
//     PropTypes.number,
//   ]),
//   min: PropTypes.number,
//   max: PropTypes.number,
// };
// CustomInput.defaultProps = {
//   width: '100%',
//   min: 0,
//   max: 0,
// };

export default CustomInput;
