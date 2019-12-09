import React, { Component } from 'react';
// Utils
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// Components
import MainTable from '../components/organisms/MainTable';
// Store
import {
  addEntity,
  deleteEntity,
  actionCheckbox,
  actionSelect,
  actionInput,
} from '../state/actions/MainTableAction';
// Configs
import HeaderConfig from '../config/HeaderMainTable.json';

class MainTableContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // eslint-disable-next-line react/no-unused-state
      naming: '',
    };
  }

  render() {
    const {
      entityData,
      addAction,
      deleteAction,
      checkbox,
      select,
      input,
    } = this.props;
    return (
      <MainTable
        headerConfig={HeaderConfig}
        actionCheckbox={checkbox}
        entityData={entityData}
        actionInput={input}
        actionSelect={select}
        addEntity={addAction}
        deleteEntity={deleteAction}
      />
    );
  }
}

MainTableContainer.propTypes = {
  entityData: PropTypes.arrayOf(PropTypes.any).isRequired,
  addAction: PropTypes.func,
  deleteAction: PropTypes.func,
  checkbox: PropTypes.func,
  select: PropTypes.func,
  input: PropTypes.func,
};
MainTableContainer.defaultProps = {
  addAction: () => {},
  deleteAction: () => {},
  checkbox: () => {},
  select: () => {},
  input: () => {},
};

const mapStateToProps = (store) => ({
  entityData: store.entityData,
});
const mapDispatchToProps = (dispatch) => ({
  addAction: () => dispatch(addEntity()),
  deleteAction: (e) => dispatch(deleteEntity(e)),
  checkbox: (index) => dispatch(actionCheckbox(index)),
  select: (value, index, name) => dispatch(actionSelect(value, index, name)),
  input: (value, index, name) => dispatch(actionInput(value, index, name)),

});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MainTableContainer);
