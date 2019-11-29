import React, { Component } from 'react';
// Utils
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { InputNumber, Select } from 'antd';
// Configs
import currencyConfig from '../../config/selectCurrency.json';
import quantityConfig from '../../config/selectQuantity.json';


const { Option } = Select;
const styling = (value) => ({ width: value });
const renderOptionSelect = (data) => data.map(
  (item) => <Option value={item.value}>{item.name}</Option>,
);

class CustomInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputData: null,
      selectData: 'rub',
    };

    this.inputFunc = this.inputFunc.bind(this);
    this.selectFunc = this.selectFunc.bind(this);
  }

  inputFunc(value) {
    this.setState({ inputData: value });
  }

  selectFunc(value) {
    this.setState({ selectData: value });
  }

  render() {
    const { inputData, selectData } = this.state;
    const { select, inputType, entityName } = this.props;
    return (
      <Container>
        {inputType === 'inputNumber'
         && (
         <InputNumber
           style={
             (entityName === 'exw' && styling(200))
             || (entityName === 'quantity' && styling(60))
           }
           value={inputData}
           onChange={this.inputFunc}
         />
         )}
        {select
          && (
          <Select
            onChange={this.selectFunc}
            value={selectData}
            style={{ width: 68 }}
          >
            {select === 'currency' && renderOptionSelect(currencyConfig)}
            {select === 'quantity' && renderOptionSelect(quantityConfig)}
          </Select>
          )}
      </Container>
    );
  }
}

CustomInput.propTypes = {
  entityName: PropTypes.string.isRequired,
  select: PropTypes.string,
  inputType: PropTypes.string,
};

CustomInput.defaultProps = {
  select: null,
  inputType: null,
};

const Container = styled.div`
`;

export default CustomInput;
