import React from 'react';
// Utils
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// Components
import TableFormation from '../components/organisms/TableFormation';
// Store
import { actionCheckbox, addEntity } from '../state/actions/MainAction';
// Configs
import HeaderConfig from '../config/HeaderMainTable.json';


const MainTableContainer = ({ entityID, addAction, actionCheck }) => (
  <TableFormation
    headerConfig={HeaderConfig}
    entityID={entityID}
    addEntity={addAction}
    actionCheckbox={(value) => actionCheck(value)}
  />
);

MainTableContainer.propTypes = {
  entityID: PropTypes.arrayOf(PropTypes.any).isRequired,
  actionCheck: PropTypes.func.isRequired,
  addAction: PropTypes.func.isRequired,
};

MainTableContainer.defaultProps = {
};

const mapStateToProps = (store) => ({
  entityID: store.entityID,
});

const mapDispatchToProps = (dispatch) => ({
  addAction: () => dispatch(addEntity()),
  actionCheck: (value) => dispatch(actionCheckbox(value, 'check')),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MainTableContainer);
