import React from 'react';
import styled from 'styled-components';
import MainTableContainer from '../../containers/MainTableContainer';


const PageContainer = () => (
  <Container>
    <MainTableContainer />
  </Container>
);

const Container = styled.div`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
`;

export default PageContainer;
