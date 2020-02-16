import React from 'react';
// Utils
import Slider from 'antd/es/slider';
import PropTypes from 'prop-types';
import styled from 'styled-components';
// Components
import CustomInput from './CustomInput';
import CustomSelect from './CustomSelect';

const CustomSlider = ({
  valuePerc, valueCurr, valueSelect, actionPerc, actionValue, actionSelect, elementType, min, max,
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
            action={actionValue}
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

CustomSlider.propTypes = {
  elementType: PropTypes.string.isRequired,
  valuePerc: PropTypes.number.isRequired,
  valueCurr: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  actionPerc: PropTypes.func.isRequired,
  actionValue: PropTypes.func.isRequired,
  actionSelect: PropTypes.func,
  valueSelect: PropTypes.string,
  min: PropTypes.number,
  max: PropTypes.number,
};
CustomSlider.defaultProps = {
  actionSelect: () => {},
  valueSelect: 'rub',
  min: 0,
  max: 100,
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const SliderDiv = styled.div`
  width: 400px;
`;
const InputDiv = styled.div`
  display: flex;
  justify-content: center;
  margin: 10px 0;
`;
const Div = styled.div`
  margin-left: 10px;
`;

export default CustomSlider;
