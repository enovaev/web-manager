import React from 'react';
import TableFormation from './TableFormation';
import HeaderConfig from '../../config/HeaderEditTable';

const EditTable = () => (
  <TableFormation
    headerConfig={HeaderConfig}
    entityID={[0]}
  />
);

export default EditTable;
