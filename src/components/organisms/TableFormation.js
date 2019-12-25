import React from 'react';
// Utils
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
// Components
import UniversalContainer from '../../containers/UniversalContainer';
import CheckBox from '../molecules/CheckBox';
// Styles
import '../style/animation.css';


// eslint-disable-next-line react/prefer-stateless-function
const TableFormation = ({
  addEntity, entityID, headerConfig, actionCheckbox,
}) => (
  <Table>
    <thead>
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
    </thead>
    <Tbody>
      <TransitionGroup component={null}>
        {entityID.map((item, index) => (
          <CSSTransition
            key={item}
            timeout={200}
            classNames="item"
          >
            <BodyRow>
              {headerConfig.map((el) => (
                <Tb key={el.key}>
                  {el.key === 'number' && <Container>{index}</Container>}
                  {el.components && (
                    <UniversalContainer
                      entityName={el.key}
                      entityID={item}
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
    <tfoot>
      <tr>
        {headerConfig.map((el) => (
          <Tf key={el.key}>
            {el.footer && (
              <div>
                <Text>Сумма:</Text>
                <UniversalContainer
                  entityName={`${el.key}Sum`}
                  entityID={0}
                  component={el.footer.components}
                />
              </div>
            )}
          </Tf>
        ))}
      </tr>
    </tfoot>
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
  border-bottom: 3px solid black;
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
const Tf = styled.td`
  border-top: 3px solid black;
  &:nth-last-child(2) {
    border-left: 1px solid #D9D9D9;
  }
`;
const Tbody = styled.tbody`
`;

export default TableFormation;
