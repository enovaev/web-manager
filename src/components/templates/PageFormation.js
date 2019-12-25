import React from 'react';
import styled from 'styled-components';
import MainTableContainer from '../../containers/MainTableContainer';
import EditTable from '../organisms/EditTable';


const PageFormation = () => (
  <Container>
    <MainTableContainer />
    <EditTable />
  </Container>
);

const Container = styled.div`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
`;

export default PageFormation;
