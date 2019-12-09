import React from 'react';
import styled from 'styled-components';
import MainTableContainer from '../../containers/MainTableContainer';
import EditTableContainer from '../../containers/EditTableContainer';

function TableFormation() {
  return (
    <Container>
      <MainTableContainer />
      <Setting>
        <EditTableContainer />
      </Setting>
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
const Setting = styled.div`
  margin-top: 50px;
`;

export default TableFormation;
