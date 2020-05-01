import React from 'react';
// Utils
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Icon from 'antd/es/icon';
import moment from 'moment';

const RosterElement = ({
  name, deleteSave, select, action,
}) => (
  <Container
    style={{
      backgroundColor: select && '#1890FF',
      color: select && 'white',
    }}
    onClick={action}
  >
    <Text>{name}</Text>
    <Tools>
      <Date>
        {/* eslint-disable-next-line no-undef */}
        {moment(JSON.parse(localStorage.getItem(name)).time).format('HH:mm:ss DD.MM.YY')}
      </Date>
      <Div>
        <Icon
          type="delete"
          onClick={(e) => {
            e.stopPropagation();
            deleteSave();
          }}
        />
      </Div>
    </Tools>
  </Container>
);

RosterElement.propTypes = {
  name: PropTypes.string.isRequired,
  deleteSave: PropTypes.func,
  action: PropTypes.func,
  select: PropTypes.bool,
};
RosterElement.defaultProps = {
  deleteSave: () => {},
  action: () => {},
  select: false,
};

const Container = styled.div`
  display: flex;
  justify-content:space-between;
  border-radius: 3px;
  padding: 3px 20px;
  &:hover {
    background-color: #E6F7FF;
    cursor: pointer;
  }
`;
const Text = styled.p`
 margin: 0;
  line-height: 27px;
`;
const Date = styled.p`
 margin: 0;
 font-size: 12px;
 line-height: 27px;
 text-align: center;
`;
const Tools = styled.div`
display: flex;
`;
const Div = styled.div`
  color: #D9D9D9;
  margin-left: 20px;
  font-size: 18px;
  &:hover {
    color: rgba(0, 0, 0, 0.65);
  }
`;
export default RosterElement;
