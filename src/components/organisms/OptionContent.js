import React, { Component } from 'react';
// Utils
import styled from 'styled-components';
import Modal from 'antd/es/modal';
import Button from 'antd/es/button';


class OptionContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };

    this.handleOk = this.handleOk.bind(this);
    this.openModal = this.openModal.bind(this);
  }

  handleOk() {
    this.setState({ showModal: false });
  }

  openModal() {
    this.setState({ showModal: true });
  }

  render() {
    const { showModal } = this.state;
    return (
      <Container>
        <Button type="primary" onClick={this.openModal}>Настроить</Button>
        <Modal
          title="Настройка позиций"
          okText="Apply"
          visible={showModal}
          onOk={this.handleOk}
          onCancel={this.handleOk}
        />
      </Container>
    );
  }
}
const Container = styled.div`
  align-self: flex-start;
`;

export default OptionContent;
