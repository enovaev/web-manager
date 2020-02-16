import React, { Component } from 'react';
// Utils
import Modal from 'antd/es/modal';
import PropTypes from 'prop-types';
import Button from 'antd/es/button';
import { connect } from 'react-redux';
import styled from 'styled-components';
// Components
import CustomInput from '../components/molecules/CustomInput';
import CustomSelect from '../components/molecules/CustomSelect';
import { actionCreateGroup } from '../state/actions/OptionAction';


class CreateGroupContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputText: '',
      select: 'red',
      showModal: false,
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.inputAction = this.inputAction.bind(this);
    this.selectAction = this.selectAction.bind(this);
    this.applyModal = this.applyModal.bind(this);
  }

  openModal() {
    this.setState({ showModal: true });
  }

  closeModal() {
    this.setState({ showModal: false });
  }

  applyModal() {
    const { inputText, select } = this.state;
    const { applyModal } = this.props;

    applyModal(inputText, select);
    this.closeModal();
  }

  inputAction(inputText) {
    this.setState({ inputText });
  }

  selectAction(select) {
    this.setState({ select });
  }

  render() {
    const { showModal, inputText, select } = this.state;
    return (
      <Container>
        <Button type="primary" onClick={this.openModal}>Управление группами</Button>
        <Modal
          title="Управление группами"
          okText="Create"
          visible={showModal}
          onOk={this.applyModal}
          onCancel={this.closeModal}
        >
          <span>Название группы:</span>
          <Div>
            <CustomInput
              action={this.inputAction}
              value={inputText}
              elementType="string"
            />
            <CustomSelect
              action={this.selectAction}
              elementType="color"
              value={select}
            />
          </Div>
        </Modal>
      </Container>
    );
  }
}

CreateGroupContainer.propTypes = {
  applyModal: PropTypes.func,
};

CreateGroupContainer.defaultProps = {
  applyModal: () => {},
};

const Container = styled.div`
`;

const Div = styled.div`
  display: flex;
`;

const mapStateToProps = () => ({
});

const mapDispatchToProps = (dispatch) => ({
  applyModal: (name, color) => dispatch(actionCreateGroup(name, color)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateGroupContainer);
