import React from 'react';
// Utils
import PropTypes from 'prop-types';
import styled from 'styled-components';
import SliderContainer from '../../containers/SliderContainer';

const EditPanel = ({ headerConfig }) => (
  <Container>
    {headerConfig.map((el) => (
      <Cell key={el.key}>
        {el.components && (
          <SliderContainer
            entityName={el.key}
            component={el.components}
          />
        )}
      </Cell>
    ))}
  </Container>
);

EditPanel.propTypes = {
  headerConfig: PropTypes.arrayOf(PropTypes.any).isRequired,
};

EditPanel.defaultProps = {
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: sticky;
  top: 10px;
`;
const Cell = styled.div`
margin-bottom: 10px;
`;

export default EditPanel;
