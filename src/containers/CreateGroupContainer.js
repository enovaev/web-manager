import React, { Component } from 'react';
// Utils
import Modal from 'antd/es/modal';
import Button from 'antd/es/button';
import styled from 'styled-components';
// Components
import CustomInput from '../components/molecules/CustomInput';
import CustomSelect from '../components/molecules/CustomSelect';

class CreateGroupContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputText: '',
      showModal: false,
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    // this.inputAction = this.inputAction.bind(this);
    // this.applyModal = this.applyModal.bind(this);
  }

  openModal() {
    this.setState({ showModal: true });
  }

  closeModal() {
    this.setState({ showModal: false });
  }

  render() {
    const {
      showModal, inputText,
    } = this.state;
    return (
      <Container>
        <Button type="primary" onClick={this.openModal}>Создать группу</Button>
        <Modal
          title="Создать группу"
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
              action={null}
              elementType="color"
              value="red"
            />
          </Div>
        </Modal>
      </Container>
    );
  }
}

const Container = styled.div`
`;

const Div = styled.div`
  display: flex;
`;

export default CreateGroupContainer;
