import React from 'react';
// Utils
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// Components
import CustomTabs from '../components/molecules/CustomTabs';
// Store
import { actionMode } from '../state/actions/OptionAction';

const modeApp = ['Main', 'Group'];

const ModeAppContainer = ({ mode, changeMode }) => (
  <CustomTabs
    data={modeApp}
    action={changeMode}
    select={mode}
  />
);

ModeAppContainer.propTypes = {
  changeMode: PropTypes.func,
  mode: PropTypes.string.isRequired,
};
ModeAppContainer.defaultProps = {
  changeMode: () => {},
};

const mapStateToProps = ({ mode }) => ({
  mode,
});
const mapDispatchToProps = (dispatch) => ({
  changeMode: (mode) => dispatch(actionMode(mode)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ModeAppContainer);
