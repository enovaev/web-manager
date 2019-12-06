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
} from '../state/actions/MainTableAction';

class MainTableContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      naming: '',
    };

    this.inputAct = this.inputAct.bind(this);
  }

  // eslint-disable-next-line no-unused-vars
  inputAct(e, i) {
    // eslint-disable-next-line no-unused-vars
    const { naming } = this.state;
    // this.setState({ naming: e });
  }

  render() {
    const {
      entityData,
      addAction,
      deleteAction,
      checkbox,
      select,
    } = this.props;
    return (
      <MainTable
        actionCheckbox={checkbox}
        entityData={entityData}
        actionInput={this.inputAct}
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
};
MainTableContainer.defaultProps = {
  addAction: () => {},
  deleteAction: () => {},
  checkbox: () => {},
  select: () => {},
};

const mapStateToProps = (store) => ({
  entityData: store.entityData,
});
const mapDispatchToProps = (dispatch) => ({
  addAction: () => dispatch(addEntity()),
  deleteAction: (e) => dispatch(deleteEntity(e)),
  checkbox: (index) => dispatch(actionCheckbox(index)),
  select: (value, index, name) => dispatch(actionSelect(value, index, name)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MainTableContainer);
