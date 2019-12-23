import React, { Component } from 'react';
// Utils
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
// Components
import CustomInput from '../components/molecules/CustomInput';
import CheckBox from '../components/molecules/CheckBox';
// Store
import {
  actionCheckbox,
  actionInput,
  deleteEntity,
} from '../state/actions/MainTableAction';


// eslint-disable-next-line react/prefer-stateless-function
class UniversalContainer extends Component {
  render() {
    const {
      entityData,
      entityName,
      entityID,
      component,
      deleteAction,
      checkbox,
      input,
    } = this.props;
    console.log('ren');
    return (
      <div>
        {component.map((el) => (
          <Container key={el.name}>
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
                value={entityData ? entityData.input : ''}
                elementType={el.type}
              />
            )}
            {el.name === 'button' && (
              // eslint-disable-next-line react/button-has-type
              <button onClick={() => deleteAction(entityID)}>delete</button>
            )}
          </Container>
        ))}
      </div>
    );
  }
}

UniversalContainer.propTypes = {
  component: PropTypes.arrayOf(PropTypes.any).isRequired,
  entityName: PropTypes.string.isRequired,
  entityID: PropTypes.number.isRequired,
  entityData: PropTypes.objectOf(PropTypes.any).isRequired,
  deleteAction: PropTypes.func,
  checkbox: PropTypes.func,
  input: PropTypes.func,
};
UniversalContainer.defaultProps = {
  deleteAction: () => {},
  checkbox: () => {},
  input: () => {},
};

const mapStateToProps = (store, { entityName, entityID }) => ({
  // eslint-disable-next-line max-len
  entityData: store[entityName] && store[entityName].filter((el) => el.id === entityID)[0],
});

const mapDispatchToProps = (dispatch) => ({
  deleteAction: (id) => dispatch(deleteEntity(id)),
  input: (value, id, name) => dispatch(actionInput(value, id, name)),
  checkbox: (id, name) => dispatch(actionCheckbox(id, name)),
});

const Container = styled.div`
  display: flex;
  margin: 3px 10px;
  justify-content: center;
`;
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UniversalContainer);
