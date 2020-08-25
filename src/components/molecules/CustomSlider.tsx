import React from 'react';
// Utils
import Slider, { SliderValue } from 'antd/es/slider';
import styled from 'styled-components';
// Components
import CustomInput from './CustomInput';
import CustomSelect from './CustomSelect';

interface ICustomSlider {
  valuePerc: number,
  valueCurr: number | string,
  valueSelect: string,
  actionPerc: (val: SliderValue | string) => void | undefined,
  actionValue: (val: string | number) => void,
  actionSelect: (val: string) => void,
  elementType: string,
  min?: number,
  max?: number,
}

const CustomSlider: React.FC<ICustomSlider> = ({
  valuePerc, valueCurr, valueSelect, actionPerc,
  actionValue, actionSelect, elementType, min = 0, max = 100,
}) => (
  <Container>
    <InputDiv>
      <CustomInput
        elementType="number"
        value={valuePerc}
        action={actionPerc}
        width={50}
        min={min}
        max={max}
      />
      {elementType === 'double' && (
        <Div>
          <CustomInput
            elementType="number"
            value={valueCurr}
            action={(value) => ((valuePerc < 100 || value < valueCurr) && actionValue(value))}
            width={120}
          />
          <CustomSelect elementType="curr" value={valueSelect} action={actionSelect} />
        </Div>
      )}
    </InputDiv>
    <SliderDiv>
      <Slider
        tooltipVisible={false}
        value={valuePerc}
        onChange={actionPerc}
        min={min}
        max={max}
        step={1}
      />
    </SliderDiv>
  </Container>
);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const SliderDiv = styled.div`
  width: 300px;
`;
const InputDiv = styled.div`
  display: flex;
  justify-content: center;
  margin: 10px 0 5px;
`;
const Div = styled.div`
  margin-left: 10px;
`;

export default CustomSlider;
