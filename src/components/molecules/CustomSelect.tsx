import React from 'react';
// Utils
import { Select } from 'antd';
import styled from 'styled-components';
// Configs
import currencyConfig from '../../config/selectConfig/selectCurrency.json';
import quantityConfig from '../../config/selectConfig/selectQuantity.json';

interface IConfig {
  name: string,
  value: string,
}
interface ICustomSelect {
  action: (val: string) => void,
  value: string,
  elementType: string,
  color?: string[],
}

const { Option } = Select;
const renderOptionSelect = (data: IConfig[]) => data.map(
  (item) => <Option key={item.value} value={item.value}>{item.name}</Option>,
);
const renderColorOption = (data: string[]) => data.map((item) => (
  <Option key={item} value={item}>
    <Color style={{ backgroundColor: item }} />
  </Option>
));

const CustomSelect: React.FC<ICustomSelect> = ({
  action, value, elementType, color,
}) => (
  <Select
    onChange={action}
    value={value}
    style={{ width: elementType === 'color' ? 85 : 68 }}
  >
    {elementType === 'quan' && renderOptionSelect(quantityConfig)}
    {elementType === 'curr' && renderOptionSelect(currencyConfig)}
    {elementType === 'color' && color && renderColorOption(color)}
  </Select>
);

const Color = styled.div`
  width: 46px;
  height: 30px;
  border: 4px solid white;
`;

export default CustomSelect;
