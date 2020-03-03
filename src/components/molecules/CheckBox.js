import React, { useState } from 'react';
// Utils
import Checkbox from 'antd/lib/checkbox';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const CheckBox = ({ header, action, value }) => {
  const [checked, setChecked] = useState(false);

  const handleChange = ({ target }) => {
    if (header) {
      action(target.checked);
      setChecked(target.checked);
    } else {
      action(target.checked);
    }
  };
  return (
    <Container>
      <Checkbox
        checked={header ? checked : value}
        onChange={handleChange}
      />
    </Container>
  );
};

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
