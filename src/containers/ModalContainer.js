import React, { Component } from 'react';
// Utils
import Modal from 'antd/es/modal';
import PropTypes from 'prop-types';
import Button from 'antd/es/button';
import { connect } from 'react-redux';
import styled from 'styled-components';
// Components
import CustomInput from '../components/molecules/CustomInput';
import RosterElement from '../components/molecules/RosterElement';
// Store
import { actionModal } from '../state/actions/OptionAction';


const convert = (a) => JSON.parse(localStorage.getItem(a)).time;

class ModalContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputText: '',
      saveData: [],
      select: null,
      showModal: false,
      type: '',
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.inputAction = this.inputAction.bind(this);
    this.applyModal = this.applyModal.bind(this);
    this.deleteSaves = this.deleteSaves.bind(this);
  }

  openModal({ target }) {
    const { saveName } = this.props;
    this.setState({
      showModal: true, type: target.value, inputText: saveName, saveData: Object.keys(localStorage),
    });
  }

  closeModal() {
    this.setState({ showModal: false, select: null });
  }

  inputAction(value) {
    this.setState({ inputText: value });
  }

  applyModal() {
    const { apply } = this.props;
    const { inputText, select, type } = this.state;
    if (type === 'save') {
      apply(type, inputText);
      this.closeModal();
    } else if (select) {
      apply(type, select);
      this.closeModal();
    }
  }

  deleteSaves(el) {
    const { select } = this.state;
    localStorage.removeItem(el);
    this.setState({
      saveData: Object.keys(localStorage),
      select: select === el ? null : select,
    });
  }

  selectEntity(el) {
    this.setState({ select: el });
  }

  render() {
    const {
      inputText, saveData, select, type, showModal,
    } = this.state;
    return (
      <Container>
        <Div>
          <Button type="primary" value="save" onClick={this.openModal}>Сохранить</Button>
        </Div>
        <Button type="primary" value="down" onClick={this.openModal}>Загрузить</Button>
        <Modal
          title={type === 'save' ? 'Сохранить проект' : 'Загрузить проект'}
          okText={type === 'save' ? 'Save' : 'Download'}
          visible={showModal}
          onOk={this.applyModal}
          okButtonProps={{ disabled: !select && type === 'down' }}
          onCancel={this.closeModal}
        >
          {type === 'save' && (
          <div>
            <span>Сохранить как:</span>
            <CustomInput
              action={this.inputAction}
              value={inputText}
              elementType="string"
            />
          </div>
          )}
          {type === 'down' && saveData.sort((a, b) => convert(b) - convert(a)).map((el) => (
            <RosterElement
              key={el}
              name={el}
              select={el === select}
              deleteSave={() => this.deleteSaves(el)}
              action={() => this.selectEntity(el)}
            />
          ))}
        </Modal>
      </Container>
    );
  }
}

ModalContainer.propTypes = {
  apply: PropTypes.func,
  saveName: PropTypes.string.isRequired,
};
ModalContainer.defaultProps = {
  apply: () => {},
};

const mapStateToProps = ({ saveName }) => ({
  saveName,
});

const mapDispatchToProps = (dispatch) => ({
  apply: (type, value) => dispatch(actionModal(type, value)),
});

const Div = styled.div`
  margin-right: 15px;
`;

const Container = styled.div`
  display: flex;
`;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ModalContainer);
