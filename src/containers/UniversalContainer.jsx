import React from 'react';
// Utils
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled, { css } from 'styled-components';
// Components
import Icon from 'antd/es/icon';
import Badge from 'antd/es/badge';
import CheckBox from '../components/molecules/CheckBox';
import CustomText from '../components/molecules/CustomText';
import CustomInput from '../components/molecules/CustomInput';
import CustomSelect from '../components/molecules/CustomSelect';
// Store
import {
  actionInput, deleteEntity, actionSelect,
  actionCheckbox, pasteInput,
} from '../state/actions/MainAction';
import { expandGroup } from '../state/actions/OptionAction';


const UniversalContainer = React.memo(({
  entityName, entityData, entityID,
  component, input, deleteAction,
  paste, checkbox, select, expandAction,
}) => (
  <Container>
    {component.map((el) => (
      <div key={el.name}>
        {el.name === 'badge' && (
          <Badge color={entityData.group || '#D9D9D9'} />
        )}
        {el.name === 'checkbox' && (
          <CheckBox
            action={(value) => checkbox(entityID, entityName, value)}
            value={entityData.checked}
          />
        )}
        {el.name === 'input' && (
          <CustomInput
            action={(value) => input(value, entityID, entityName)}
            paste={(value) => paste(value, entityID, entityName)}
            width={el.width}
            value={entityData.input}
            elementType={el.type}
          />
        )}
        {(el.name === 'text' || el.name === 'percent') && (<CustomText value={entityData[el.name]} />)}
        {el.name === 'cellLabel' && (<CellLabel width={el.width}>{entityData.input}</CellLabel>)}
        {el.name === 'select' && (
          <CustomSelect
            action={(value) => select(value, entityID, entityName)}
            value={entityData.select}
            elementType={el.type}
          />
        )}
        {el.name === 'button' && (
          <Div>
            <Icon type="delete" onClick={() => deleteAction(entityID)} />
          </Div>
        )}
        {el.name === 'expand' && (
          <Expand show={entityData.show}>
            <Icon type="left" onClick={() => expandAction(entityID, entityName)} />
          </Expand>
        )}
      </div>
    ))}
  </Container>
));

UniversalContainer.propTypes = {
  component: PropTypes.arrayOf(PropTypes.any).isRequired,
  entityName: PropTypes.string.isRequired,
  entityID: PropTypes.number,
  entityData: PropTypes.objectOf(PropTypes.any),
  expandAction: PropTypes.func,
  deleteAction: PropTypes.func,
  checkbox: PropTypes.func,
  select: PropTypes.func,
  input: PropTypes.func,
  paste: PropTypes.func,
};
UniversalContainer.defaultProps = {
  entityData: { input: '', select: '' },
  entityID: 0,
  expandAction: () => {},
  deleteAction: () => {},
  checkbox: () => {},
  select: () => {},
  input: () => {},
  paste: () => {},
};

const mapStateToProps = (store, { entityName, entityID }) => ({
  entityData: store[entityName] && store[entityName].find((el) => el.id === entityID),
});

const mapDispatchToProps = (dispatch) => ({
  deleteAction: (id) => dispatch(deleteEntity(id)),
  input: (value, id, name) => dispatch(actionInput(value, id, name)),
  paste: (value, id, name) => dispatch(pasteInput(value, id, name)),
  checkbox: (id, name, value) => dispatch(actionCheckbox(id, name, value)),
  select: (value, id, name) => dispatch(actionSelect(value, id, name)),
  expandAction: (id, name) => dispatch(expandGroup(id, name)),
});

const Container = styled.div`
  display: flex;
  margin: 3px 10px;
  justify-content: center;
  align-items: center;
`;
const Div = styled.div`
  color: #D9D9D9;
  font-size: 20px;
  &:hover {
    color: rgba(0, 0, 0, 0.65);
  }
`;
const Expand = styled.div`
  color: #D9D9D9;
  font-size: 14px;
  transition: transform 200ms ease-in-out;
  &:hover {
    color: rgba(0, 0, 0, 0.65);
  }
  ${(props) => (props.show && css`transform: rotate(-90deg)`)}
`;
const CellLabel = styled.p`
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  margin: 0;
  width: ${(props) => `${props.width}px`};
`;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UniversalContainer);
