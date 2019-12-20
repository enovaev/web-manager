import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CustomInput from '../components/molecules/CustomInput';
import {
  actionCheckbox,
  actionInput,
  actionSelect,
} from '../state/actions/MainTableAction';

// eslint-disable-next-line react/prefer-stateless-function
class UniversalContainer extends Component {
  render() {
    const {
      entityName,
      entityIndex,
      component,
      // eslint-disable-next-line react/prop-types
      input,
    } = this.props;
    return (
      <div>
        {/* eslint-disable-next-line react/prop-types */}
        {component.map((el) => (
          <Container>
            {el.name === 'input' && (
              <CustomInput
                action={(value) => input(value, entityIndex, entityName)}
                width={el.width}
                value={null}
                elementType={el.type}
              />
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
};
UniversalContainer.defaultProps = {
};

const mapStateToProps = (store) => ({
  entityData: store[this.props.entityName],
});

const mapDispatchToProps = (dispatch) => ({
  checkbox: (index) => dispatch(actionCheckbox(index)),
  select: (value, index, name) => dispatch(actionSelect(value, index, name)),
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
