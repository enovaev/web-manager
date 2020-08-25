import React from 'react';
// Utils
import { Input } from 'antd';

interface ICustomInput {
  action: (val: number | string) => void,
  paste?: (val: string) => void,
  value: number | string,
  elementType: string,
  width: number,
  min?: number,
  max?: number,
}

const styling = (value: number): object => ({ width: value });


const validator = (
  value: string, prev: string | number, min: number | undefined, max: number | undefined,
): string | number => {
  if (Number(value) || value === '') return value;
  const val = Number(value.replace(/[^\d]/g, ''));

  if (min && val < min) return min;
  if (max && val > max) return max;
  return val;
};

const CustomInput: React.FC<ICustomInput> = ({
  action, value, elementType, width, paste, min, max,
}) => (
  <Input
    style={styling(width)}
    value={value}
    onChange={({ target, nativeEvent }: any) => {
      if (nativeEvent.inputType !== 'insertFromPaste') {
        if (elementType === 'number') action(validator(target.value, value, min, max));
        else action(target.value);
      }
    }}
    onPaste={() => {
      if (paste) {
        navigator.clipboard.readText()
          .then((text) => paste(text))
          .catch((e) => console.log(e));
      }
    }}
  />
);

export default CustomInput;
