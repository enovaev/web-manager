import React, { Component } from 'react';
import HeaderConfig from '../../config/HeaderMainTable.json';

class MainTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'tor',
    };
  }

  render() {
    const { name } = this.state;
    return (
      <table>
        <thead>
          <tr>
            { HeaderConfig.map((item, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <th key={index} className={name}>
                {item.label}
              </th>
            )) }
          </tr>
        </thead>
      </table>
    );
  }
}

export default MainTable;
