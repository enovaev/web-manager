import React from 'react';
// Utils
import Slider from 'antd/es/slider';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import 'antd/es/slider/style/index.css';
// Components
import CustomInput from './CustomInput';
import CustomSelect from './CustomSelect';

function CustomSlider(props) {
  const {
    valuePerc, actionPerc, elementType, min, max,
  } = props;
  return (
    <Container>
      {elementType === 'double' && (
        <InputDiv>
          <CustomInput
            elementType="number"
            value={0}
            action={() => {}}
            width={120}
          />
          <CustomSelect elementType="curr" value="rub" action={() => {}} />
        </InputDiv>
      )}
      <CustomInput
        elementType="number"
        value={valuePerc}
        action={actionPerc}
        width={50}
        min={min}
        max={max}
      />
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
}
CustomSlider.propTypes = {
  elementType: PropTypes.string.isRequired,
  valuePerc: PropTypes.number.isRequired,
  actionPerc: PropTypes.func.isRequired,
  min: PropTypes.number,
  max: PropTypes.number,
};
CustomSlider.defaultProps = {
  min: 0,
  max: 100,
};
const Container = styled.div`
display: flex;
flex-direction: column;
align-items: center;
`;
const SliderDiv = styled.div`
width: 200px;
`;
const InputDiv = styled.div`
margin: 10px 0;
`;
export default CustomSlider;
