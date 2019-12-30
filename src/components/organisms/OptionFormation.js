import React from 'react';
// Utils
import styled from 'styled-components';
// Components
import ModalContainer from '../../containers/ModalContainer';

const OptionFormation = () => (
  <Container>
    <ModalContainer />
  </Container>
);

const Container = styled.div`
  align-self: flex-start;
  justify-content:space-between;
  display: flex;
  width: 100%;
`;

export default OptionFormation;
