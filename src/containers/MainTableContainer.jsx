import React, { Component } from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import MainTable from '../components/organisms/MainTable';
// eslint-disable-next-line import/named
import { addEntity, deleteEntity, actionCheckbox } from '../state/actions/MainTableAction';

const actCheck = (e) => {
  console.log(e);
};
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
    this.setState({ naming: e });
  }

  render() {
    // eslint-disable-next-line react/prop-types
    const {
      // eslint-disable-next-line react/prop-types
      entityData,
      // eslint-disable-next-line react/prop-types
      addEntityAction,
      // eslint-disable-next-line react/prop-types
      deleteEntityAction,
      // eslint-disable-next-line
      checkbox,
    } = this.props;
    return (
      <MainTable
        entityData={entityData}
        actionInput={this.inputAct}
        addEntity={addEntityAction}
        deleteEntity={deleteEntityAction}
        actionCheckbox={actCheck}
      />
    );
  }
}

const mapStateToProps = (store) => ({
  entityData: store.entityData,
});

const mapDispatchToProps = (dispatch) => ({
  addEntityAction: () => dispatch(addEntity()),
  deleteEntityAction: (e) => dispatch(deleteEntity(e)),
  checkbox: (index) => dispatch(actionCheckbox(index)),
});

// MainTableContainer.propTypes = {
//   entityData: PropTypes.array.isRequired,
// };
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MainTableContainer);
