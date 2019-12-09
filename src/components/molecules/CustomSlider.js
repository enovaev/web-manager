import React from 'react';
// Utils
import { Slider } from 'antd';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import 'antd/es/slider/style/index.css';
// Components
import CustomInput from './CustomInput';
// import CustomSelect from './CustomSelect';

function CustomSlider(props) {
  const { valuePerc, actionPerc } = props;
  return (
    <Container>
      {/* <InputDiv> */}
      {/*  <CustomInput */}
      {/*    elementType="number" */}
      {/*    value={null} */}
      {/*    action={null} */}
      {/*    width={120} */}
      {/*  /> */}
      {/*  <CustomSelect elementType="curr" value={null} action={null} /> */}
      {/* </InputDiv> */}
      <CustomInput
        elementType="number"
        value={valuePerc}
        action={actionPerc}
        width={50}
      />
      <SliderDiv>
        <Slider
          tooltipVisible={false}
          value={valuePerc}
          onChange={actionPerc}
        />
      </SliderDiv>
    </Container>
  );
}
CustomSlider.propTypes = {
  valuePerc: PropTypes.number.isRequired,
  actionPerc: PropTypes.func.isRequired,
};
CustomSlider.defaultProps = {
};
const Container = styled.div`
display: flex;
flex-direction: column;
align-items: center;
`;
const SliderDiv = styled.div`
width: 200px;
`;
// const InputDiv = styled.div`
// margin: 10px 0;
// `;
export default CustomSlider;
