import React, { Component } from 'react';
import { InputNumber } from 'antd';
import styled from 'styled-components';

const styling = {
  width: 100,
};

class CustomInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputData: null,
    };

    this.inputFunc = this.inputFunc.bind(this);
  }

  inputFunc(value) {
    this.setState({ inputData: value });
  }

  render() {
    const { inputData } = this.state;
    return (
      <Container>
        <InputNumber
          style={styling}
          value={inputData}
          onChange={this.inputFunc}
        />
      </Container>
    );
  }
}

const Container = styled.div`
`;

export default CustomInput;
