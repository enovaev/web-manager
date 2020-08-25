import React from 'react';
// Utils
import styled, { css } from 'styled-components';
import Icon from 'antd/es/icon';
import moment from 'moment';


interface IRosterElement {
  name: string,
  deleteSave(): void,
  action: (e: React.MouseEvent) => void,
  select?: boolean,
}

interface IStyled {
  select: boolean,
}

const RosterElement: React.FC<IRosterElement> = ({
  name, deleteSave, select = false, action,
}) => (
  <Container
    select={select}
    onClick={action}
  >
    <Text>{name}</Text>
    <Tools>
      <Date>
        {/* eslint-disable-next-line no-undef */}
        {moment(JSON.parse(localStorage.getItem(name) as string).time).format('HH:mm:ss DD.MM.YY')}
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

const Container = styled.div<IStyled>`
  display: flex;
  justify-content:space-between;
  border-radius: 3px;
  padding: 3px 20px;
  ${(props) => props.select && css`background-color: #1890FF`};
  ${(props) => props.select && css`color: white`};
  
  &:hover {
    background-color: ${(props) => !props.select && '#E6F7FF'};
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