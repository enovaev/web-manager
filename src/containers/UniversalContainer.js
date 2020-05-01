import React, { Component } from 'react';
// Utils
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled, { css } from 'styled-components';
// Components
import Icon from 'antd/es/icon';
import Badge from 'antd/es/badge';
import Switch from 'antd/es/switch';
import CheckBox from '../components/molecules/CheckBox';
import CustomText from '../components/molecules/CustomText';
import CustomInput from '../components/molecules/CustomInput';
import CustomSelect from '../components/molecules/CustomSelect';
import CustomSlider from '../components/molecules/CustomSlider';
// Store
import {
  actionInput, deleteEntity, actionSelect,
  actionSlider, actionCheckbox, actionSwitch, pasteInput,
} from '../state/actions/MainAction';
import { expandGroup } from '../state/actions/OptionAction';


// eslint-disable-next-line react/prefer-stateless-function
class UniversalContainer extends Component {
  shouldComponentUpdate(nextProps) {
    if (nextProps.entityName === 'priceOur' || nextProps.entityName === 'priceCust') {
      const { entityData } = this.props;
      if (entityData.text === nextProps.entityData.text
        && entityData.select === nextProps.entityData.select) return false;
      return true;
    }
    return true;
  }

  render() {
    const {
      entityData, entityDataSlider, entityName, entityID,
      component, deleteAction, checkbox, select, slider,
      input, expandAction, switched, paste,
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
            {el.name === 'text' && (<CustomText value={entityData.text} />)}
            {el.name === 'cellLabel' && (<CellLabel width={el.width}>{entityData.input}</CellLabel>)}
            {el.name === 'select' && (
              <CustomSelect
                action={(value) => select(value, entityID, entityName)}
                value={entityData.select}
                elementType={el.type}
              />
            )}
            {el.name === 'slider' && (
              <SliderContainer>
                {el.secLabel
                  ? (
                    <Switch
                      checkedChildren={el.secLabel}
                      unCheckedChildren={el.label}
                      onChange={(value) => switched(entityName, value)}
                    />
                  )
                  : <Label>{el.label}</Label>}
                <CustomSlider
                  actionPerc={(value) => slider(value, entityName, 'percent')}
                  actionValue={(value) => slider(value, entityName, 'input')}
                  actionSelect={(value) => slider(value, entityName, 'select')}
                  valueSelect={entityDataSlider.select}
                  valuePerc={entityDataSlider.percent}
                  valueCurr={entityDataSlider.input}
                  elementType={el.type}
                />
              </SliderContainer>
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
  entityID: PropTypes.number,
  entityData: PropTypes.objectOf(PropTypes.any),
  entityDataSlider: PropTypes.objectOf(PropTypes.any),
  expandAction: PropTypes.func,
  deleteAction: PropTypes.func,
  checkbox: PropTypes.func,
  select: PropTypes.func,
  slider: PropTypes.func,
  switched: PropTypes.func,
  input: PropTypes.func,
  paste: PropTypes.func,
};
UniversalContainer.defaultProps = {
  entityData: { input: '', select: '' },
  entityDataSlider: { percent: 0 },
  entityID: 0,
  expandAction: () => {},
  deleteAction: () => {},
  checkbox: () => {},
  select: () => {},
  slider: () => {},
  switched: () => {},
  input: () => {},
  paste: () => {},
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
  input: (value, id, name) => dispatch(actionInput(value, id, name)),
  paste: (value, id, name) => dispatch(pasteInput(value, id, name)),
  checkbox: (id, name, value) => dispatch(actionCheckbox(id, name, value)),
  select: (value, id, name) => dispatch(actionSelect(value, id, name)),
  slider: (value, name, prop) => dispatch(actionSlider(value, name, prop)),
  switched: (name, value) => dispatch(actionSwitch(name, value)),
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
const SliderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Label = styled.div`
  text-align: center;
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
