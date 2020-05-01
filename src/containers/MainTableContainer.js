import React, { useEffect } from 'react';
// Utils
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
// Components
import TableFormation from '../components/organisms/TableFormation';
import EditPanel from '../components/organisms/EditPanel';
// Store
import { actionCheckbox, addEntity } from '../state/actions/MainAction';
// Configs
import Main from '../config/HeaderMainMode.json';
import Set from '../config/HeaderSetMode.json';
import editConfig from '../config/HeaderEditTable.json';
import '../components/style/animation.css';

const modeApp = [
  { value: 'Main', config: Main },
  { value: 'Group', config: Set },
];

const formatEdit = (config) => config.map((el) => ({ ...el, components: el.components.map((item) => (item.name === 'slider' ? { ...item, type: 'single' } : item)) }));

const MainTableContainer = () => {
  const entityID = useSelector((state) => state.entityID);
  const entityGroup = useSelector((state) => state.entityGroup);
  const expandGr = useSelector((state) => state.expandGr);
  const mode = useSelector((state) => state.mode);
  const check = useSelector((state) => state.check);
  const dispatch = useDispatch();

  useEffect(() => {
    const enterHandler = ({ key }) => {
      if (key === 'Enter' && mode === 'Main') dispatch(addEntity());
      console.log(mode);
    };


    // eslint-disable-next-line no-undef
    document.addEventListener('keydown', enterHandler);
    return () => {
      // eslint-disable-next-line no-undef
      document.removeEventListener('keydown', enterHandler);
    };
  }, [mode]);

  return (
    <Container>
      <TransitionGroup component={null}>
        {modeApp.map((el) => el.value === mode && (
          <CSSTransition
            key={el.value}
            timeout={200}
            classNames="mode"
          >
            <Div>
              <TableFormation
                headerConfig={el.config}
                expandGroup={mode === 'Group' ? expandGr : null}
                entityID={mode === 'Group' ? entityGroup : entityID}
                addEntity={() => dispatch(addEntity())}
                actionCheckbox={(value) => dispatch(actionCheckbox(false, 'check', value))}
              />
              {mode === 'Group' && (
                <EditPanel
                  headerConfig={check.filter((item) => item.checked).length === 1
                    ? editConfig
                    : formatEdit(editConfig)}
                />
              )}
            </Div>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
`;
const Div = styled.div`
  display: flex;
  align-items: start;
`;

export default MainTableContainer;
