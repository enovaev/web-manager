import React, { Component } from 'react';
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
import CustomSlider from '../components/molecules/CustomSlider';
// Store
import {
  actionInput,
  deleteEntity,
  actionSelect,
  actionSlider,
  actionCheckbox,
} from '../state/actions/MainAction';
import { expandGroup } from '../state/actions/OptionAction';


// eslint-disable-next-line react/prefer-stateless-function
class UniversalContainer extends Component {
  render() {
    const {
      entityData, entityDataSlider, entityName, entityID,
      component, deleteAction, checkbox, select, slider,
      input, expandAction,
    } = this.props;
    return (
      <Container>
        {component.map((el) => (
          <div key={el.name}>
            {el.name === 'badge' && (
              <Badge color={entityData.group || '#D9D9D9'} />
            )}
            {el.name === 'checkbox' && (
              <CheckBox
                action={() => checkbox(entityID, entityName)}
                value={entityData.checked}
              />
            )}
            {el.name === 'input' && (
              <CustomInput
                action={(value) => input(value, entityID, entityName, true)}
                width={el.width}
                value={entityData.input}
                elementType={el.type}
              />
            )}
            {el.name === 'text' && (<CustomText value={entityData.text} />)}
            {el.name === 'select' && (
              <CustomSelect
                action={(value) => select(value, entityID, entityName)}
                value={entityData.select}
                elementType={el.type}
              />
            )}
            {el.name === 'slider' && (
              <CustomSlider
                actionPerc={(value) => slider(value, entityName, 'percent')}
                actionValue={(value) => slider(value, entityName, 'input')}
                actionSelect={(value) => slider(value, entityName, 'select')}
                valueSelect={entityDataSlider.select}
                valuePerc={entityDataSlider.percent}
                valueCurr={entityDataSlider.input}
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
    );
  }
}

UniversalContainer.propTypes = {
  component: PropTypes.arrayOf(PropTypes.any).isRequired,
  entityName: PropTypes.string.isRequired,
  entityID: PropTypes.number.isRequired,
  entityData: PropTypes.objectOf(PropTypes.any),
  entityDataSlider: PropTypes.objectOf(PropTypes.any),
  expandAction: PropTypes.func,
  deleteAction: PropTypes.func,
  checkbox: PropTypes.func,
  select: PropTypes.func,
  slider: PropTypes.func,
  input: PropTypes.func,
};
UniversalContainer.defaultProps = {
  entityData: { input: '', select: '' },
  entityDataSlider: { percent: 0 },
  expandAction: () => {},
  deleteAction: () => {},
  checkbox: () => {},
  select: () => {},
  slider: () => {},
  input: () => {},
};

const mapStateToProps = (store, { entityName, entityID }) => ({
  entityData: store[entityName] && store[entityName].filter((el) => el.id === entityID)[0],
  entityDataSlider: store[entityName]
    && (
      store.check.filter((item) => item.checked === true).length
        ? store[entityName].find(
          (item) => item.id === store.check.filter((el) => el.checked === true)[0].id,
        )
        : store[entityName][0]
    ),
});

const mapDispatchToProps = (dispatch) => ({
  deleteAction: (id) => dispatch(deleteEntity(id)),
  input: (value, id, name, paste) => dispatch(actionInput(value, id, name, paste)),
  checkbox: (id, name) => dispatch(actionCheckbox(id, name)),
  select: (value, id, name) => dispatch(actionSelect(value, id, name)),
  slider: (value, name, prop) => dispatch(actionSlider(value, name, prop)),
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UniversalContainer);
