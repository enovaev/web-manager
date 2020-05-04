import React from 'react';
// Utils
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
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
  entityName, entityID, component,
}) => {
  const entityData = useSelector((state) => state[entityName]
    && state[entityName].find((el) => el.id === entityID));
  const dispatch = useDispatch();

  return (
    <Container>
      {component.map((el) => (
        <div key={el.name}>
          {el.name === 'badge' && (
          <Badge color={entityData.group || '#D9D9D9'} />
          )}
          {el.name === 'checkbox' && (
          <CheckBox
            action={(value) => dispatch(actionCheckbox(entityID, entityName, value))}
            value={entityData.checked}
          />
          )}
          {el.name === 'input' && (
          <CustomInput
            action={(value) => dispatch(actionInput(value, entityID, entityName))}
            paste={(value) => dispatch(pasteInput(value, entityID, entityName))}
            width={el.width}
            value={entityData.input}
            elementType={el.type}
          />
          )}
          {(el.name === 'text' || el.name === 'percent') && (<CustomText value={entityData[el.name]} />)}
          {el.name === 'cellLabel' && (<CellLabel width={el.width}>{entityData.input}</CellLabel>)}
          {el.name === 'select' && (
          <CustomSelect
            action={(value) => dispatch(actionSelect(value, entityID, entityName))}
            value={entityData.select}
            elementType={el.type}
          />
          )}
          {el.name === 'button' && (
          <Div>
            <Icon type="delete" onClick={() => dispatch(deleteEntity(entityID))} />
          </Div>
          )}
          {el.name === 'expand' && (
          <Expand show={entityData.show}>
            <Icon type="left" onClick={() => dispatch(expandGroup(entityID, entityName))} />
          </Expand>
          )}
        </div>
      ))}
    </Container>
  );
});

UniversalContainer.propTypes = {
  component: PropTypes.arrayOf(PropTypes.any).isRequired,
  entityName: PropTypes.string.isRequired,
  entityID: PropTypes.number,
};
UniversalContainer.defaultProps = {
  entityID: 0,
};

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
    font-size: 22px;
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

export default UniversalContainer;
