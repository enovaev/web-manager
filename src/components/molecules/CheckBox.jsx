import React, { Component } from 'react';
// Utils
import { Checkbox } from 'antd';
import PropTypes from 'prop-types';
import styled from 'styled-components';

class CheckBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
    };

    // this.handleChange = this.handleChange.bind(this);
  }

  // handleChange() {
  //   const { checked } = this.state;
  //   // eslint-disable-next-line no-unused-vars,react/prop-types
  //   const { header, actionCheckbox, actionIndex } = this.props;
  //   this.setState({ checked: !checked });
  //   if (header) {
  //     console.log(header);
  //   } else {
  //     actionCheckbox(actionIndex);
  //   }
  // }
  // eslint-disable-next-line class-methods-use-this

  render() {
    const { checked } = this.state;
    // eslint-disable-next-line
    const { header, value, action } = this.props;
    return (
      <Container>
        <Checkbox
          checked={header ? checked : value}
          onChange={action}
        />
      </Container>
    );
  }
}

CheckBox.propTypes = {
  header: PropTypes.bool,
  value: PropTypes.bool,
  // actionCheckbox: PropTypes.func.isRequired,
  // actionIndex: PropTypes.number.isRequired,
};

CheckBox.defaultProps = {
  header: false,
  value: false,
};

const Container = styled.div`
  margin: 8px;
`;
export default CheckBox;
