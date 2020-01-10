import React from 'react';
// Utils
import styled from 'styled-components';
// Components
import SaveContainer from '../../containers/SaveContainer';
import CreateGroupContainer from '../../containers/CreateGroupContainer';
import ModeAppContainer from '../../containers/ModeAppContainer';


const OptionFormation = () => (
  <Container>
    <CreateGroupContainer />
    <ModeAppContainer />
    <SaveContainer />
  </Container>
);

const Container = styled.div`
  align-self: flex-start;
  justify-content:space-between;
  display: flex;
  width: 100%;
`;

export default OptionFormation;
