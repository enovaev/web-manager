import React from 'react';
import styled from 'styled-components';
import PageFormation from './components/templates/PageFormation';
import './App.css';

const App = () => (
  <Div>
    <PageFormation />
  </Div>
);
const Div = styled.div`
  display: flex;
  justify-content: center;
`;
export default App;
