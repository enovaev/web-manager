import React from 'react';
// Utils
import { useSelector, useDispatch } from 'react-redux';
// Components
import CustomTabs from '../components/molecules/CustomTabs';
// Store
import { actionMode } from '../state/actions/OptionAction';

const modeApp = ['Main', 'Group'];

const ModeAppContainer = () => {
  const mode = useSelector((state) => state.mode);
  const dispatch = useDispatch();

  return (
    <CustomTabs
      data={modeApp}
      action={(value) => dispatch(actionMode(value))}
      select={mode}
    />
  );
};

export default ModeAppContainer;
