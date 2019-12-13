import React, { Component } from 'react';
// Utils
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// Components
import MainTable from '../components/organisms/MainTable';
// Store
import { actionSlider } from '../state/actions/EditTableAction';
// Configs
import HeaderConfig from '../config/HeaderEditTable.json';

// eslint-disable-next-line react/prefer-stateless-function
class EditTableContainer extends Component {
  render() {
    const { entityData, slider } = this.props;
    return (
      <MainTable
        entityData={entityData}
        headerConfig={HeaderConfig}
        actionSlider={slider}
      />
    );
  }
}
EditTableContainer.propTypes = {
  entityData: PropTypes.objectOf(PropTypes.any).isRequired,
  slider: PropTypes.func.isRequired,
};
const mapStateToProps = (store) => ({
  entityData: store.entityData,
});
const mapDispatchToProps = (dispatch) => ({
  slider: (value, name) => dispatch(actionSlider(value, name)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditTableContainer);
