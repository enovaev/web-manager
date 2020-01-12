import React from 'react';
// Utils
import styled from 'styled-components';
// Components
import SetTable from '../organisms/SetTable';
import EditTable from '../organisms/EditTable';
import MainTableContainer from '../../containers/MainTableContainer';
import OptionFormation from '../organisms/OptionFormation';

const PageFormation = () => (
  <Container>
    <OptionFormation />
    <MainTableContainer />
    <EditTable />
    <SetTable />
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
