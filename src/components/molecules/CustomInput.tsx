import React from 'react';
// Utils
import { Input } from 'antd';

interface ICustomInput {
  action: (val: number | string) => void,
  paste: (val: string) => void,
  value: number | string,
  elementType: string,
  width: number,
  // min: number,
  // max: number,
}

const styling = (value: number): object => ({ width: value });


const validator = (value: string, prev: string | number): string | number => {
  if (Number(value) || value === '') return value;
  return prev;
  // const val = Number(value.replace(/[^\d]/g, ''));

  // if (min && val < min) return min;
  // if (max && val > max) return max;
  // return val;
};

const CustomInput: React.FC<ICustomInput> = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  action, value, elementType, width, paste,
}) => (
  <Input
    style={styling(width)}
    value={value}
    onChange={({ target, nativeEvent }: any) => {
      if (nativeEvent.inputType !== 'insertFromPaste') {
        if (elementType === 'number') action(validator(target.value, value));
        else action(target.value);
      }
    }}
    onPaste={() => {
      navigator.clipboard.readText()
        .then((text) => paste(text))
        .catch((e) => console.log(e));
    }}
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
