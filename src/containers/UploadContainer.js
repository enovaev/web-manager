import React from 'react';
import styled from 'styled-components';
import Icon from 'antd/es/icon';
import readXlsxFile from 'read-excel-file';
import { useDispatch } from 'react-redux';
import { parserAction } from '../state/actions/ParserAction';

const UploadContainer = () => {
  const dispatch = useDispatch();

  return (
    <Container>
      <Upload
        type="file"
        id="file"
        accept=".xlsx"
        onChange={({ target }) => {
          readXlsxFile(target.files[0]).then((rows) => dispatch(parserAction(rows)));
          // eslint-disable-next-line no-param-reassign
          target.value = '';
        }}
      />
      <Label htmlFor="file">
        <IconStyle type="upload" />
        Choose a file
      </Label>
    </Container>
  );
};


const Upload = styled.input`
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
`;
const Label = styled.label`
  display: inline-block;
  line-height: 32px;
  padding: 0 5px;
  border-radius: 4px;
  color: white;
  background-color: #1890FF;
  
  &:hover {
    cursor: pointer;
  }
`;
const Container = styled.div`
`;
const IconStyle = styled(Icon)`
 margin-right: 3px;
`;

export default UploadContainer;
