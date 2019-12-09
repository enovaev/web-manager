import React, { Component } from 'react';
// Utils
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// Components
import MainTable from '../components/organisms/MainTable';
// Store
import { actionSlider } from '../state/actions/SetTableAction';
import HeaderConfig from '../config/HeaderSetTable.json';

// eslint-disable-next-line react/prefer-stateless-function
class SetTableContainer extends Component {
  render() {
    const { setData, slider } = this.props;
    return (
      <MainTable
        entityData={[setData]}
        headerConfig={HeaderConfig}
        actionSlider={slider}
      />
    );
  }
}
SetTableContainer.propTypes = {
  setData: PropTypes.objectOf(PropTypes.any).isRequired,
  slider: PropTypes.func.isRequired,
};
const mapStateToProps = (store) => ({
  setData: store.setData,
});
const mapDispatchToProps = (dispatch) => ({
  slider: (value, name) => dispatch(actionSlider(value, name)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SetTableContainer);
