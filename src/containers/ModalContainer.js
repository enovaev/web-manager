import React, { Component } from 'react';
// Utils
import Modal from 'antd/es/modal';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
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
    };

    this.inputAction = this.inputAction.bind(this);
    this.applyModal = this.applyModal.bind(this);
    this.deleteSaves = this.deleteSaves.bind(this);
  }

  componentDidMount() {
    const { saveName } = this.props;
    this.setState({ inputText: saveName, saveData: Object.keys(localStorage) });
  }

  inputAction(value) {
    this.setState({ inputText: value });
  }

  applyModal() {
    const { apply, action, type } = this.props;
    const { inputText, select } = this.state;
    if (type === 'save') {
      apply(type, inputText);
      action();
    } else if (select) {
      apply(type, select);
      action();
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
    const { inputText, saveData, select } = this.state;
    const {
      visible, action, type,
    } = this.props;
    return (
      <Modal
        title={type === 'save' ? 'Сохранить проект' : 'Загрузить проект'}
        okText={type === 'save' ? 'Save' : 'Download'}
        visible={visible}
        onOk={this.applyModal}
        okButtonProps={{ disabled: !select && type === 'down' }}
        onCancel={action}
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
    );
  }
}

ModalContainer.propTypes = {
  visible: PropTypes.bool.isRequired,
  apply: PropTypes.func,
  action: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ModalContainer);
