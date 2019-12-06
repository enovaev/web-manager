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

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange() {
    const { checked } = this.state;
    const { header, action } = this.props;

    if (header) {
      action(!checked);
      this.setState({ checked: !checked });
    } else {
      action();
    }
  }

  render() {
    const { checked } = this.state;
    const { header, value } = this.props;
    return (
      <Container>
        <Checkbox
          checked={header ? checked : value}
          onChange={this.handleChange}
        />
      </Container>
    );
  }
}

CheckBox.propTypes = {
  header: PropTypes.bool,
  value: PropTypes.bool,
  action: PropTypes.func.isRequired,
};

CheckBox.defaultProps = {
  header: false,
  value: false,
};

const Container = styled.div`
  margin: 8px;
`;
export default CheckBox;
