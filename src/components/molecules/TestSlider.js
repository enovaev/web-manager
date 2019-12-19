import React, { Component } from 'react';
import Slider from 'antd/es/slider';
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
