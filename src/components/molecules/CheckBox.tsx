import React, { useState } from 'react';
// Utils
import Checkbox, { CheckboxChangeEvent } from 'antd/lib/checkbox';
import styled from 'styled-components';

interface ICheckBox {
  header: boolean,
  value: boolean,
  action: (value: boolean) => void,
}

const CheckBox: React.FC<ICheckBox> = ({ header, value, action }) => {
  const [checked, setChecked] = useState<boolean>(false);

  const handleChange = ({ target }: CheckboxChangeEvent): void => {
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

const Container = styled.div`
  margin: 8px;
`;
export default CheckBox;
