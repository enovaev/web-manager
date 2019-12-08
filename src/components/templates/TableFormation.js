import React from 'react';
import styled from 'styled-components';
import MainTableContainer from '../../containers/MainTableContainer';
import EditTableContainer from '../../containers/EditTableContainer';

function TableFormation() {
  return (
    <Container>
      <MainTableContainer />
      <EditTableContainer />
    </Container>
  );
}

const Container = styled.div`
  margin-top: 50px;
  display: flex;
  justify-content: center;
  box-sizing: border-box;
`;

export default TableFormation;
