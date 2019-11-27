import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';

class CustomInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputData: true,
    };

    this.inputFunc = this.inputFunc.bind(this);
  }

  inputFunc(e) {
    this.setState({ inputData: e.target.value });
  }

  render() {
    const { inputData } = this.state;
    return (
      <TextField
        id="standard-number"
        label="Number"
        type="number"
        value={inputData}
        onChange={this.inputFunc}
        InputLabelProps={{
          shrink: true,
        }}
        margin="normal"
      />
    );
  }
}

export default CustomInput;
