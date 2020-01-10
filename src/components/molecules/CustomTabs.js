import React from 'react';
// Utils
import PropTypes from 'prop-types';
import styled from 'styled-components';

const styleSelect = {
  backgroundColor: '#1890FF',
  border: 'none',
  color: '#FFF',
};

const CustomTabs = ({ data, action, select }) => (
  <Container>
    {data.map((item) => (
      <Button
        key={item}
        onClick={() => action(item)}
        style={select === item ? styleSelect : {}}
      >
        <Text>{item}</Text>
      </Button>
    ))}
  </Container>
);

CustomTabs.propTypes = {
  data: PropTypes.arrayOf(PropTypes.any),
  action: PropTypes.func,
  select: PropTypes.string,
};
CustomTabs.defaultProps = {
  data: ['Main', 'Set'],
  action: () => {},
  select: 'Main',
};

const Container = styled.div`
  display: flex;
`;
const Button = styled.div`
  display: flex;
  align-items: center;
  padding: 0 15px;
  height: 32px;
  border: 1px solid #D9D9D9;
  border-left: none;
  
  &:first-child {
    border-left: 1px solid #D9D9D9;
    border-bottom-left-radius: 4px;
    border-top-left-radius: 4px;
  }
  
  &:last-child {
    border-bottom-right-radius: 4px;
    border-top-right-radius: 4px;
  }
  
  &:hover {
    cursor: pointer;
  }
`;
const Text = styled.span`
`;

export default CustomTabs;
