import React, { Component } from 'react';
// Utils
import styled from 'styled-components';
import Modal from 'antd/es/modal';
import Button from 'antd/es/button';
// Components
import ModalContainer from '../../containers/ModalContainer';

class OptionContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModalSet: false,
      showModalCont: false,
      type: '',
    };

    this.handleOk = this.handleOk.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.openModalSet = this.openModalSet.bind(this);
    this.openModalCont = this.openModalCont.bind(this);
  }

  handleOk() {
    this.setState({ showModalSet: false });
  }

  handleClose() {
    this.setState({ showModalSet: false, showModalCont: false });
  }

  openModalSet() {
    this.setState({ showModalSet: true });
  }

  openModalCont({ target }) {
    this.setState({ showModalCont: true, type: target.value });
  }

  render() {
    const {
      showModalSet, showModalCont, type,
    } = this.state;
    return (
      <Container>
        <Button type="primary" onClick={this.openModalSet}>Настроить</Button>
        <Modal
          title="Настройка позиций"
          okText="Apply"
          visible={showModalSet}
          onOk={this.handleOk}
          onCancel={this.handleClose}
        />
        <SaveContainer>
          <Div>
            <Button type="primary" value="save" onClick={this.openModalCont}>Сохранить</Button>
          </Div>
          <Button type="primary" value="down" onClick={this.openModalCont}>Загрузить</Button>
          {showModalCont && (
            <ModalContainer
              visible={showModalCont}
              type={type}
              action={this.handleClose}
            />
          )}
        </SaveContainer>
      </Container>
    );
  }
}
const Container = styled.div`
  align-self: flex-start;
  justify-content:space-between;
  display: flex;
  width: 100%;
`;
const SaveContainer = styled.div`
  display: flex;
`;
const Div = styled.div`
  margin-right: 15px;
`;
export default OptionContent;
