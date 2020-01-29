import React from 'react';
// Utils
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
// Components
import CheckBox from '../molecules/CheckBox';
import UniversalContainer from '../../containers/UniversalContainer';
// Styles
import '../style/animation.css';


const TableFormation = ({
  addEntity, entityID, headerConfig, actionCheckbox,
}) => (
  <Table>
    <Thead>
      <tr>
        {headerConfig.map((item) => (
          <Th key={item.key}>
            <Container>
              {item.checkbox && (
                <CheckBox
                  header
                  action={actionCheckbox}
                />
              )}
              {item.delete && (
                // eslint-disable-next-line react/button-has-type
                <button onClick={() => addEntity()}>Click</button>
              )}
              {item.label && <Text>{item.label}</Text>}
            </Container>
          </Th>
        ))}
      </tr>
    </Thead>
    <Tbody>
      <TransitionGroup component={null}>
        {entityID.map((item, index) => (
          <CSSTransition
            key={item.id}
            timeout={200}
            classNames="item"
          >
            <BodyRow>
              {headerConfig.map((el) => (
                <Tb key={el.key}>
                  {el.key === 'number' && <Container>{index + 1}</Container>}
                  {el.components && (
                    <UniversalContainer
                      entityName={el.key}
                      entityID={item.id}
                      component={el.components}
                    />
                  )}
                </Tb>
              ))}
            </BodyRow>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </Tbody>
  </Table>
);

TableFormation.propTypes = {
  entityID: PropTypes.arrayOf(PropTypes.any).isRequired,
  headerConfig: PropTypes.arrayOf(PropTypes.any).isRequired,
  actionCheckbox: PropTypes.func,
  addEntity: PropTypes.func,
};
TableFormation.defaultProps = {
  actionCheckbox: () => {},
  addEntity: () => {},
};

const Table = styled.table`
  border-collapse: collapse;
  margin: 20px 0;
`;
const Container = styled.div`
  display: flex;
  margin: 3px 10px;
  justify-content: center;
`;
const Text = styled.p`
  text-align: center;
  margin: 0;
`;
const Th = styled.th`
  border-left: 1px solid black;
  &:first-child {
    border-left: none;
  }
`;
const BodyRow = styled.tr`
  border: none;
  &:hover {
    background-color: #E6F7FF;
  }
`;
const Tb = styled.td`
  border-left: 1px solid #D9D9D9;
  &:first-child{
    border-left: none;
  }
`;
const Tbody = styled.tbody`
  border-top: 3px solid black;
  border-bottom: 3px solid black;
`;
const Thead = styled.thead`
`;

export default TableFormation;
