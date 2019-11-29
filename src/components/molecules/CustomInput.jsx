import React, { Component } from 'react';
// Utils
import { InputNumber, Input } from 'antd';
import PropTypes from 'prop-types';
import styled from 'styled-components';


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
    this.setState({ inputData: e.target.value });
  }

  render() {
    const { inputData } = this.state;
    const { cellName } = this.props;
    return (
      <Container>
        {(cellName === 'exw' || cellName === 'quantity' || cellName === 'option')
         && (
           <InputNumber
             style={
               (cellName === 'exw' && styling(200))
               || (cellName === 'quantity' && styling(60))
               || (cellName === 'option' && styling(60))
             }
             value={inputData}
             onChange={this.inputNumberFunc}
           />
         )}
        {(cellName === 'part' || cellName === 'posName')
          && (
            <Input value={inputData} onChange={this.inputFunc} />
          )}
      </Container>
    );
  }
}

CustomInput.propTypes = {
  cellName: PropTypes.string.isRequired,
};

const Container = styled.div`
`;

export default CustomInput;
