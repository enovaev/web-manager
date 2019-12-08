import React, { Component } from 'react';
import HeaderConfig from '../../config/HeaderEditTable.json';

class EditTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'werwr',
    };
  }

  render() {
    // eslint-disable-next-line no-unused-vars
    const { name } = this.state;
    return (
      <table>
        <thead>
          <tr>
            {HeaderConfig.map((item) => (
              <th key={item.key}>
                {item.value}
              </th>
            ))}
          </tr>
        </thead>
      </table>
    );
  }
}

export default EditTable;
