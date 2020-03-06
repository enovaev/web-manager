import React, { useState } from 'react';
// Utils
import Modal from 'antd/es/modal';
import Button from 'antd/es/button';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
// Components
import CustomInput from '../components/molecules/CustomInput';
import CustomSelect from '../components/molecules/CustomSelect';
import { actionCreateGroup } from '../state/actions/OptionAction';
// Configs
import colorConfig from '../config/selectConfig/selectColor.json';


const CreateGroupContainer = () => {
  const [inputText, setInputText] = useState('');
  const [select, setSelect] = useState('');
  const [showModal, setShowModal] = useState(false);

  const colorCheck = useSelector(({ check }) => check.map((el) => el.group));
  const dispatch = useDispatch();

  const openModal = () => {
    setShowModal(true);
    setSelect(colorConfig.filter((el) => !colorCheck.includes(el))[0]);
  };

  const closeModal = () => {
    setShowModal(false);
    setInputText('');
  };

  const createGroup = () => {
    dispatch(actionCreateGroup(inputText, select));
    closeModal();
  };

  return (
    <Container>
      <Button type="primary" onClick={openModal}>Управление группами</Button>
      <Modal
        title="Управление группами"
        okText="Create"
        visible={showModal}
        onOk={createGroup}
        okButtonProps={{ disabled: !inputText }}
        onCancel={closeModal}
      >
        <span>Название группы:</span>
        <Div>
          <CustomInput
            action={(value) => setInputText(value)}
            value={inputText}
            elementType="string"
          />
          <CustomSelect
            action={(value) => setSelect(value)}
            elementType="color"
            value={select}
            color={colorConfig.filter((el) => !colorCheck.includes(el))}
          />
        </Div>
      </Modal>
    </Container>
  );
};

const Container = styled.div`
`;

const Div = styled.div`
  display: flex;
`;

export default CreateGroupContainer;
