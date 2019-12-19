import React from 'react';
import styled from 'styled-components';
import MainTable from '../organisms/MainTable';

function TableFormation() {
  return (
    <Container>
      <MainTable />
    </Container>
  );
}

const Container = styled.div`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
`;

export default TableFormation;
