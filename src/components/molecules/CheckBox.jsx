/* eslint-disable */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Checkbox from '@material-ui/core/Checkbox';

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
      <Checkbox
        checked={header ? checked : selected}
        onChange={this.handleChange}
        color="primary"
        indeterminate={header}
      />
    );
  }
}

CheckBox.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  header: PropTypes.bool,
  selected: PropTypes.bool,
};

CheckBox.defaultProps = {
  header: false,
  selected: false,
};

export default CheckBox;
