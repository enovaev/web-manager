import React, { Component } from 'react';
// Utils
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// Components
import MainTable from '../components/organisms/MainTable';
// Store
// eslint-disable-next-line import/named
import { actionSlider } from '../state/actions/EditTableAction';
// Configs
import HeaderConfig from '../config/HeaderEditTable.json';

// eslint-disable-next-line react/prefer-stateless-function
class EditTableContainer extends Component {
  render() {
    const { editData, slider } = this.props;
    return (
      <MainTable
        entityData={[editData]}
        headerConfig={HeaderConfig}
        actionSlider={slider}
      />
    );
  }
}
EditTableContainer.propTypes = {
  editData: PropTypes.objectOf(PropTypes.any).isRequired,
  slider: PropTypes.func.isRequired,
};
const mapStateToProps = (store) => ({
  editData: store.editData,
});
const mapDispatchToProps = (dispatch) => ({
  slider: (value, name) => dispatch(actionSlider(value, name)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditTableContainer);
