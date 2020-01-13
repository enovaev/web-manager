import React from 'react';
// Utils
import styled from 'styled-components';
// Components
import SaveContainer from '../../containers/SaveContainer';
import ModeAppContainer from '../../containers/ModeAppContainer';
import CurrencyContainer from '../../containers/CurrencyContainer';
import CreateGroupContainer from '../../containers/CreateGroupContainer';

const OptionFormation = () => (
  <Div>
    <CurrencyContainer />
    <Container>
      <CreateGroupContainer />
      <ModeAppContainer />
      <SaveContainer />
    </Container>
  </Div>
);
const Div = styled.div`
  align-self: flex-start;
  width: 90vw;
`;
const Container = styled.div`
  display: flex;
  justify-content:space-between;
`;

export default OptionFormation;
