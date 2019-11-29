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

  handleChange(e) {
    const { checked } = this.state;
    const { header } = this.props;
    this.setState({ checked: !checked });
    if (header) {
      console.log(header);
    } else {
      console.log(e.target.value);
    }
  }

  render() {
    const { checked } = this.state;
    const { header, selected } = this.props;
    return (
      <Container>
        <Checkbox
          checked={header ? checked : selected}
          onChange={this.handleChange}
        />
      </Container>
    );
  }
}

CheckBox.propTypes = {
  header: PropTypes.bool,
  selected: PropTypes.bool,
};

CheckBox.defaultProps = {
  header: false,
  selected: false,
};

const Container = styled.div`
  margin: 8px;
`;
export default CheckBox;
