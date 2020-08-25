import React from 'react';
// Utils
import styled from 'styled-components';

interface ICustomTabs {
  data: Array<string>,
  action: (val: string) => void,
  select: string,
}

const styleSelect = {
  backgroundColor: '#1890FF',
  border: 'none',
  color: '#FFF',
};

const CustomTabs: React.FC<ICustomTabs> = ({ data, action, select }) => (
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