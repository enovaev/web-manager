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

  applyModal(type, inputText) {
    const { apply, action } = this.props;
    apply(type, inputText);
    action();
  }

  deleteSaves(el) {
    localStorage.removeItem(el);
    this.setState({ saveData: Object.keys(localStorage) });
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
        onOk={() => this.applyModal(type, inputText)}
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
        {type === 'down' && saveData.map((el) => (
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
