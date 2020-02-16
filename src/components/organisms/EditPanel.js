import React from 'react';
// Utils
import PropTypes from 'prop-types';
import styled from 'styled-components';
import UniversalContainer from '../../containers/UniversalContainer';

const EditPanel = ({ headerConfig }) => (
  <Container>
    {headerConfig.map((el) => (
      <Cell>
        <Label>{el.label}</Label>
        {el.components && (
          <UniversalContainer
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
`;
const Cell = styled.div`
`;
const Label = styled.div`
  text-align: center;
`;

export default EditPanel;
