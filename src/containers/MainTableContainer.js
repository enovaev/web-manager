import React from 'react';
// Utils
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
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

const MainTableContainer = ({
  entityID, entityGroup, expandGr, mode, addAction, actionCheck, check,
}) => (
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
              addEntity={addAction}
              actionCheckbox={actionCheck}
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

MainTableContainer.propTypes = {
  entityID: PropTypes.arrayOf(PropTypes.any).isRequired,
  entityGroup: PropTypes.arrayOf(PropTypes.any).isRequired,
  actionCheck: PropTypes.func.isRequired,
  expandGr: PropTypes.arrayOf(PropTypes.any).isRequired,
  addAction: PropTypes.func.isRequired,
  mode: PropTypes.string.isRequired,
  check: PropTypes.arrayOf(PropTypes.any).isRequired,
};

MainTableContainer.defaultProps = {
};

const mapStateToProps = ({
  entityID, entityGroup, expandGr, mode, check,
}) => ({
  entityGroup,
  expandGr,
  entityID,
  check,
  mode,
});

const mapDispatchToProps = (dispatch) => ({
  addAction: () => dispatch(addEntity()),
  actionCheck: (value) => dispatch(actionCheckbox(false, 'check', value)),
});

const Container = styled.div`
  position: relative;
`;
const Div = styled.div`
  display: flex;
  align-items: start;
  margin-top: 30px;
`;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MainTableContainer);
