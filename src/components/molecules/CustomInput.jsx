import React, { Component } from 'react';
// Utils
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { InputNumber, Input } from 'antd';

const styling = (value) => ({ width: value });

class CustomInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputData: null,
    };

    this.inputFunc = this.inputFunc.bind(this);
    this.inputNumberFunc = this.inputNumberFunc.bind(this);
  }

  inputNumberFunc(value) {
    this.setState({ inputData: value });
  }

  inputFunc(e) {
    const { inputType, actionInput, actionIndex } = this.props;

    if (inputType === 'number') {
      this.setState({ inputData: e.target.value.replace(/[^\d]/g, '') });
    } else {
      this.setState({ inputData: e.target.value });
    }

    actionInput(e.target.value, actionIndex);
  }

  render() {
    const { inputData } = this.state;
    const { inputType, width } = this.props;
    return (
      <Container>
        {(inputType === 'number*')
          ? (
            <InputNumber
              style={styling(width)}
              value={inputData}
              min={1}
              onChange={this.inputNumberFunc}
            />
          )
          : (
            <Input
              style={styling(width)}
              value={inputData}
              onChange={this.inputFunc}
            />
          )}
      </Container>
    );
  }
}

CustomInput.propTypes = {
  inputType: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  actionInput: PropTypes.func.isRequired,
  actionIndex: PropTypes.number.isRequired,
};

const Container = styled.div`
`;

export default CustomInput;
