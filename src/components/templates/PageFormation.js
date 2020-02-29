import React from 'react';
// Utils
import styled from 'styled-components';
// Components
import OptionFormation from '../organisms/OptionFormation';
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
  padding-top: 20px;
`;

export default PageFormation;
