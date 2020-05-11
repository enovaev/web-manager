import React from 'react';
// Utils
import styled from 'styled-components';
// Components
import OptionFormation from './OptionFormation';
import MainTableContainer from '../../containers/MainTableContainer';

const PageFormation = () => (
  <Container>
    <OptionFormation />
    <MainTableContainer />
  </Container>
);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  padding: 20px;
  width: 100%;
`;

export default PageFormation;
