import React, { Component } from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import MainTable from '../components/organisms/MainTable';
// eslint-disable-next-line import/named
import { addEntity, deleteEntity } from '../state/actions/MainTableAction';


class MainTableContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      naming: '',
    };

    this.inputAct = this.inputAct.bind(this);
  }

  inputAct(e, i) {
    console.log(e);
    console.log(i);
    // eslint-disable-next-line no-unused-vars
    const { naming } = this.state;
    this.setState({ naming: e });
  }

  render() {
    // eslint-disable-next-line react/prop-types
    const { entityData, addEntityAction, deleteEntityAction } = this.props;
    return (
      <MainTable
        entityData={entityData}
        actionInput={this.inputAct}
        addEntity={addEntityAction}
        deleteEntity={deleteEntityAction}
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
});

// MainTableContainer.propTypes = {
//   entityData: PropTypes.array.isRequired,
// };
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MainTableContainer);
