import React, { useState } from 'react';
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
import { actionSaveDown } from '../state/actions/OptionAction';


const convert = (a) => JSON.parse(localStorage.getItem(a)).time;

const SaveContainer = ({ apply, saveName }) => {
  const [inputText, setInputText] = useState('');
  const [saveData, setSaveData] = useState([]);
  const [select, setSelect] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [type, setType] = useState('');

  const openModal = ({ target }) => {
    setShowModal(true);
    setInputText(saveName);
    setSaveData(Object.keys(localStorage));
    setType(target.value);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelect(null);
  };


  const applyModal = () => {
    if (type === 'save') {
      apply(type, inputText);
    } else if (select) {
      apply(type, select);
    }
    closeModal();
  };

  const deleteSaves = (el) => {
    localStorage.removeItem(el);
    setSaveData(Object.keys(localStorage));
    setSelect(select === el ? null : select);
  };

  return (
    <Container>
      <Div>
        <Button type="primary" value="save" onClick={openModal}>Сохранить</Button>
      </Div>
      <Button type="primary" value="down" onClick={openModal}>Загрузить</Button>
      <Modal
        title={type === 'save' ? 'Сохранить проект' : 'Загрузить проект'}
        okText={type === 'save' ? 'Save' : 'Download'}
        visible={showModal}
        onOk={applyModal}
        okButtonProps={{ disabled: !select && type === 'down' }}
        onCancel={closeModal}
      >
        {type === 'save' && (
          <div>
            <span>Сохранить как:</span>
            <CustomInput
              action={(value) => setInputText(value)}
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
            deleteSave={() => deleteSaves(el)}
            action={() => setSelect(el)}
          />
        ))}
      </Modal>
    </Container>
  );
};

SaveContainer.propTypes = {
  apply: PropTypes.func,
  saveName: PropTypes.string.isRequired,
};
SaveContainer.defaultProps = {
  apply: () => {},
};

const mapStateToProps = ({ saveName }) => ({
  saveName,
});

const mapDispatchToProps = (dispatch) => ({
  apply: (type, value) => dispatch(actionSaveDown(type, value)),
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
)(SaveContainer);
