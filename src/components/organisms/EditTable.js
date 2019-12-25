import React from 'react';
// Components
import TableFormation from './TableFormation';
// Configs
import HeaderConfig from '../../config/HeaderEditTable';

const EditTable = () => (
  <TableFormation
    headerConfig={HeaderConfig}
    entityID={[0]}
  />
);

export default EditTable;
