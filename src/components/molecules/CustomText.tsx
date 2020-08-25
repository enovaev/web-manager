import React from 'react';
// Utils
import { Input } from 'antd';

interface ICustomText {
  value: number | string,
}

const CustomText: React.FC<ICustomText> = ({ value }) => (
  <Input
    value={value}
    onChange={() => {}}
    style={{ borderColor: Number(value) ? '#44C144' : '#F66871', width: 90 }}
  />
);

export default CustomText;
