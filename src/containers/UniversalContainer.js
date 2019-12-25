import React, { Component } from 'react';
// Utils
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
// Components
import Icon from 'antd/es/icon';
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


// eslint-disable-next-line react/prefer-stateless-function
class UniversalContainer extends Component {
  render() {
    const {
      entityData,
      entityDataSlider,
      entityName,
      entityID,
      component,
      deleteAction,
      checkbox,
      select,
      slider,
      input,
    } = this.props;
    console.log('ren');
    return (
      <Container>
        {component.map((el) => (
          <div key={el.name}>
            {el.name === 'checkbox' && (
              <CheckBox
                action={() => checkbox(entityID, entityName)}
                value={entityData ? entityData.checked : ''}
              />
            )}
            {el.name === 'input' && (
              <CustomInput
                action={(value) => input(value, entityID, entityName)}
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
                actionSelect={(value) => slider(value, entityName, 'select')}
                valueSelect={entityDataSlider.select}
                valuePerc={entityDataSlider.percent}
                elementType={el.type}
              />
            )}
            {el.name === 'button' && (
              <Div>
                <Icon type="delete" onClick={() => deleteAction(entityID)} />
              </Div>
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
  deleteAction: PropTypes.func,
  checkbox: PropTypes.func,
  select: PropTypes.func,
  slider: PropTypes.func,
  input: PropTypes.func,
};
UniversalContainer.defaultProps = {
  entityData: { input: 0, select: '' },
  entityDataSlider: { percent: 0 },
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
  input: (value, id, name) => dispatch(actionInput(value, id, name)),
  checkbox: (id, name) => dispatch(actionCheckbox(id, name)),
  select: (value, id, name) => dispatch(actionSelect(value, id, name)),
  slider: (value, name, prop) => dispatch(actionSlider(value, name, prop)),
});

const Container = styled.div`
  display: flex;
  margin: 3px 10px;
  justify-content: center;
`;
const Div = styled.div`
  color: #D9D9D9;
  font-size: 20px;
  &:hover {
    color: rgba(0, 0, 0, 0.65);
    font-size: 22px;
  }
`;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UniversalContainer);
