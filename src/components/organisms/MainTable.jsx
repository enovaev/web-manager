import React, { Component } from 'react';
import CheckBox from '../molecules/CheckBox';
import HeaderConfig from '../../config/HeaderMainTable.json';
import SimData from '../../config/ImitateData.json';

class MainTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'tor',
      isShow: true,
    };

    this.clickBtn = this.clickBtn.bind(this);
  }

  clickBtn() {
    const { isShow } = this.state;
    this.setState({ isShow: !isShow });
  }

  render() {
    const { name, isShow } = this.state;
    return (
      <table>
        <thead>
          <tr>
            { HeaderConfig.map((item) => (
              <th key={item.key} className={name}>
                {item.label}
                {item.checkbox && <CheckBox value={item.key} header />}
              </th>
            )) }
            <th>
              {/* eslint-disable-next-line react/button-has-type */}
              <button onClick={this.clickBtn}> Click</button>
            </th>
          </tr>
        </thead>
        <tbody>
          { SimData.map((item) => (
            <tr key={item.key}>
              { HeaderConfig.map((el) => (
                <td key={el.key}>
                  {item[el.key]}
                  {el.checkbox && <CheckBox selected={item.selected} value={item.key} />}
                </td>
              )) }
            </tr>
          ))}
          {isShow && (
            <tr>
              <td>123</td>
              <td>reg</td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }
}

export default MainTable;
