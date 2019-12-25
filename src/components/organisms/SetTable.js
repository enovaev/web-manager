import React from 'react';
// Components
import TableFormation from './TableFormation';
// Configs
import HeaderConfig from '../../config/HeaderSetTable';

const SetTable = () => (
  <TableFormation
    headerConfig={HeaderConfig}
    entityID={[0]}
  />
);

export default SetTable;
