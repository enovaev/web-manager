import React from 'react';
// import FooterTable from '../organisms/FooterTable';
import styled from 'styled-components';
import MainTable from '../organisms/MainTable';

const Container = styled.div`
  margin: 0 auto;
  display: flex;
  justify-content: center;
`;

function TableFormation() {
  return (
    <Container>
      <MainTable />
    </Container>
  );
}
export default TableFormation;
