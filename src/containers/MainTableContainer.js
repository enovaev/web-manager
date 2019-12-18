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
import HeaderConfig2 from '../config/HeaderConfig2.json';

class MainTableContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // eslint-disable-next-line react/no-unused-state
      name: null,
      headerMain: [],
    };

    this.changeHeader = this.changeHeader.bind(this);
  }

  componentDidMount() {
    this.setState({ headerMain: HeaderConfig, name: true });
  }

  changeHeader() {
    const { name } = this.state;
    this.setState({ headerMain: (name) ? HeaderConfig2 : HeaderConfig, name: !name });
  }

  render() {
    const { headerMain } = this.state;
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
        headerConfig={headerMain}
        actionCheckbox={checkbox}
        entityData={entityData}
        actionInput={input}
        actionSelect={select}
        addEntity={addAction}
        deleteEntity={deleteAction}
        modeShow={this.changeHeader}
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
