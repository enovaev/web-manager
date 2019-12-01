import React, { Component } from 'react';
import { Input } from 'antd';

class CustomText extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textData: '512222',
    };
  }

  render() {
    const { textData } = this.state;
    return (
      <Input
        value={textData}
        onChange={null}
        style={{ borderColor: Number(textData) ? '#44C144' : '#F66871', width: 90 }}
      />
    );
  }
}

export default CustomText;
