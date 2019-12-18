import React, { Component } from 'react';
import Slider from 'antd/es/slider';
import 'antd/es/slider/style/index.css';
import styled from 'styled-components';

// eslint-disable-next-line react/prefer-stateless-function
class TestSlider extends Component {
  render() {
    return (
      <Div>
        <Slider defaultValue={30} />
      </Div>
    );
  }
}
const Div = styled.div`
  width: 220px;
`;
export default TestSlider;
