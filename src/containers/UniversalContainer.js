import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CustomInput from '../components/molecules/CustomInput';
import {
  actionInput,
  deleteEntity,
} from '../state/actions/MainTableAction';

// eslint-disable-next-line react/prefer-stateless-function
class UniversalContainer extends Component {
  render() {
    const {
      entityData,
      entityName,
      entityIndex,
      component,
      deleteAction,
      input,
    } = this.props;
    console.log('ren');
    return (
      <div>
        {component.map((el) => (
          <Container key={el.name}>
            {el.name === 'input' && (
              <CustomInput
                action={(value) => input(value, entityIndex, entityName)}
                width={el.width}
                value={entityData.input}
                elementType={el.type}
              />
            )}
            {el.name === 'button' && (
              // eslint-disable-next-line react/button-has-type
              <button onClick={() => deleteAction(entityIndex)}>delete</button>
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
  entityIndex: PropTypes.number.isRequired,
  entityData: PropTypes.objectOf(PropTypes.any).isRequired,
  deleteAction: PropTypes.func,
  input: PropTypes.func,
};
UniversalContainer.defaultProps = {
  deleteAction: () => {},
  input: () => {},
};

const mapStateToProps = (store, { entityName, entityIndex }) => ({
  // eslint-disable-next-line max-len
  entityData: store.entityProps[entityName] && store.entityProps[entityName][entityIndex],
});

const mapDispatchToProps = (dispatch) => ({
  deleteAction: (index) => dispatch(deleteEntity(index)),
  input: (value, index, name) => dispatch(actionInput(value, index, name)),
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
