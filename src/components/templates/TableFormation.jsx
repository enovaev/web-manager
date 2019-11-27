import React from 'react';
// import FooterTable from '../organisms/FooterTable';
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
  justify-content: center;
`;

export default TableFormation;
