import React, { useState } from 'react';
// Utils
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
// Components
import CheckBox from '../molecules/CheckBox';
import UniversalContainer from '../../containers/UniversalContainer';
// Styles
import '../style/animation.css';


const TableFormation = ({
  addEntity, entityID, headerConfig, actionCheckbox, expandGroup, actionDrag,
}) => {
  const [dragIndex, setDragIndex] = useState(null);

  const dragStart = (e) => {
    setDragIndex(Number(e.currentTarget.getAttribute('value')));
    e.dataTransfer.effectAllowed = 'move';
  };
  const dragEnd = () => {
    setDragIndex(null);
  };
  const dragOver = (e) => {
    let el;
    let { target } = e;
    while (!el) {
      if (target.tagName === 'TR') el = target;
      else target = target.parentNode;
    }
    const endIndex = target.getAttribute('value');

    if (endIndex === dragIndex) return;
    actionDrag(dragIndex, endIndex);
    setDragIndex(Number(endIndex));
  };

  return (
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
      <Tbody onDragOver={dragOver}>
        <TransitionGroup component={null}>
          {entityID.map((item, index) => (
            <CSSTransition
              key={item}
              timeout={200}
              classNames="item"
            >
              <>
                <BodyRow
                  border={expandGroup}
                  draggable={!expandGroup}
                  value={index}
                  onDragStart={(e) => !expandGroup && dragStart(e)}
                  onDragEnd={(e) => !expandGroup && dragEnd(e)}
                >
                  {headerConfig.map((el) => (
                    <Tb key={el.key}>
                      <Div>
                        {dragIndex === index && <Empty />}
                        {(el.key === 'number' && dragIndex !== index) && <EntityNumber>{index + 1}</EntityNumber>}
                        {(el.components && dragIndex !== index) && (
                          <UniversalContainer
                            entityName={el.key}
                            entityID={item}
                            component={el.components}
                          />
                        )}
                      </Div>
                    </Tb>
                  ))}
                </BodyRow>
                {expandGroup
                && expandGroup.find((val) => val.id === item).show
                && expandGroup.find((val) => val.id === item).ids.map((elSub, iSub) => (
                  <BodyRow key={elSub}>
                    {headerConfig.map((el) => (
                      <Tb key={el.key}>
                        <Div>
                          {el.key === 'number' && <EntityNumber>{iSub + 1}</EntityNumber>}
                          {el.componentsSub && (
                            <UniversalContainer
                              entityName={el.keySub}
                              entityID={elSub}
                              component={el.componentsSub}
                            />
                          )}
                        </Div>
                      </Tb>
                    ))}
                  </BodyRow>
                ))}
              </>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </Tbody>
    </Table>
  );
};

TableFormation.propTypes = {
  entityID: PropTypes.arrayOf(PropTypes.any).isRequired,
  headerConfig: PropTypes.arrayOf(PropTypes.any).isRequired,
  expandGroup: PropTypes.arrayOf(PropTypes.any),
  actionCheckbox: PropTypes.func,
  addEntity: PropTypes.func,
  actionDrag: PropTypes.func,
};
TableFormation.defaultProps = {
  actionCheckbox: () => {},
  addEntity: () => {},
  actionDrag: () => {},
  expandGroup: null,
};

const Table = styled.table`
  border-collapse: collapse;
  margin: 20px 0;
  position: relative;
`;
const Container = styled.div`
  display: flex;
  padding: 0 10px;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50px;
  border-bottom: 3px solid black;
  border-left: 1px solid black;
`;
const EntityNumber = styled.div`
  display: flex;
  margin: 3px 10px;
  justify-content: center;
`;
const Text = styled.p`
  text-align: center;
  font-size: 16px;
  margin: 0;
`;
const Th = styled.th`
  position: sticky;
  top: 0;
  z-index: 1;
  padding: 0;
  background-color: #fff;
  &:first-child {
    & div {
       border-left: none;
    }
  }
`;
const BodyRow = styled.tr`
  ${(props) => props.border && css`border-bottom: 1px solid #D9D9D9; border-top: 1px solid #D9D9D9;`};
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
  border-bottom: 3px solid black;
`;
const Thead = styled.thead`
`;
const Div = styled.div`
`;
const Empty = styled.div`
  height: 46px;
  width: 100%;
`;

export default TableFormation;
