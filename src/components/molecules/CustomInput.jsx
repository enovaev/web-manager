import React, { Component } from 'react';
import Input from '@material-ui/core/Input';
import styled from 'styled-components';


class CustomInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputData: true,
    };

    this.inputFunc = this.inputFunc.bind(this);
  }

  inputFunc(e) {
    console.log(e.target.value);
    this.setState({ inputData: e.target.value });
  }

  render() {
    const { inputData } = this.state;
    return (
      <Conteiner>
        <Input
          id="outlined-basic"
          type="number"
          value={inputData}
          onChange={this.inputFunc}
          margin="normal"
        />
      </Conteiner>
    );
  }
}

const Conteiner = styled.div`
  width: 20px;
`;

export default CustomInput;
