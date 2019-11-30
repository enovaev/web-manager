import React, { Component } from 'react';
import { Input } from 'antd';

class CustomText extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textData: 'not data',
    };
  }

  render() {
    const { textData } = this.state;
    return (
      <Input
        value={textData}
        onChange={null}
        style={{ borderColor: Number(textData) ? '#44C144' : 'red', width: 90 }}
      />
    );
  }
}

export default CustomText;
