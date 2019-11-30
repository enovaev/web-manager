import React, { Component } from 'react';
// Utils
import { Select } from 'antd';
import PropTypes from 'prop-types';
// Configs
import currencyConfig from '../../config/selectCurrency.json';
import quantityConfig from '../../config/selectQuantity.json';


const { Option } = Select;
const renderOptionSelect = (data) => data.map(
  (item) => <Option key={item.value} value={item.value}>{item.name}</Option>,
);
class CustomSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectData: '',
    };

    this.selectFunc = this.selectFunc.bind(this);
  }

  selectFunc(value) {
    this.setState({ selectData: value });
  }

  render() {
    const { selectData } = this.state;
    // eslint-disable-next-line no-unused-vars
    const { cellName } = this.props;
    return (
      <Select
        onChange={this.selectFunc}
        value={selectData}
        style={{ width: 68 }}
      >
        {cellName === 'quantity'
          ? renderOptionSelect(quantityConfig)
          : renderOptionSelect(currencyConfig)}
      </Select>
    );
  }
}

CustomSelect.propTypes = {
  cellName: PropTypes.string.isRequired,
};


export default CustomSelect;
