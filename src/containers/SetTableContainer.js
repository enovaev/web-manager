import React, { Component } from 'react';
// Utils
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// Components
import OptionTable from '../components/organisms/OptionTable';
// Store
import { actionSlider } from '../state/actions/OptionsTableAction';
import HeaderConfig from '../config/HeaderSetTable.json';

// eslint-disable-next-line react/prefer-stateless-function
class SetTableContainer extends Component {
  render() {
    const { entityData, slider } = this.props;
    return (
      <OptionTable
        entityData={[entityData[0]]}
        headerConfig={HeaderConfig}
        actionSlider={slider}
      />
    );
  }
}
SetTableContainer.propTypes = {
  entityData: PropTypes.arrayOf(PropTypes.any).isRequired,
  slider: PropTypes.func.isRequired,
};
const mapStateToProps = (store) => ({
  entityData: (store.entityData.some((el) => el.selected === true))
    ? store.entityData.filter((el) => el.selected === true)
    : store.entityData,
});
const mapDispatchToProps = (dispatch) => ({
  slider: (value, name) => dispatch(actionSlider(value, name)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SetTableContainer);
