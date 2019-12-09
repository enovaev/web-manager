import React from 'react';
// Utils
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
// Components
import CheckBox from '../molecules/CheckBox';
import CustomText from '../molecules/CustomText';
import CustomInput from '../molecules/CustomInput';
import CustomSlider from '../molecules/CustomSlider';
import CustomSelect from '../molecules/CustomSelect';
// Styles
import '../style/animation.css';

function MainTable(props) {
  const {
    headerConfig,
    actionInput,
    actionSelect,
    addEntity,
    entityData,
    deleteEntity,
    actionCheckbox,
    actionSlider,
  } = props;
  return (
    <Table>
      <thead>
        <tr>
          { headerConfig.map((item) => (
            <Th key={item.key}>
              <Container>
                {item.label && <Text>{item.label}</Text>}
                {item.checkbox && (
                <CheckBox
                  header
                  action={(checked) => actionCheckbox(checked)}
                />
                )}
              </Container>
            </Th>
          )) }
          <th>
            {/* eslint-disable-next-line react/button-has-type */}
            <button onClick={addEntity}>Click</button>
          </th>
        </tr>
      </thead>
      <tbody>
        <TransitionGroup component={null}>
          { entityData.map((item, index) => (
            <CSSTransition
              key={item.key}
              timeout={200}
              classNames="item"
            >
              <BodyRow>
                { headerConfig.map((el) => (
                  <Tb key={el.key}>
                    <Container>
                      {el.checkbox && (
                        <CheckBox
                          value={item.selected}
                          action={() => actionCheckbox(index)}
                        />
                      )}
                      {el.number && index + 1}
                      {el.input && (
                        <CustomInput
                          width={el.width}
                          elementType={el.input}
                          value={item[el.key].input}
                          action={(value) => actionInput(value, index, el.key)}
                        />
                      )}
                      {el.text && <CustomText value={item[el.key].text} />}
                      {el.select && (
                        <CustomSelect
                          elementType={el.select}
                          value={item[el.key].select}
                          action={(value) => actionSelect(value, index, el.key)}
                        />
                      )}
                      {el.slider && (
                        <CustomSlider
                          actionPerc={(value) => actionSlider(value, el.key)}
                          valuePerc={item[el.key].percent}
                        />
                      )}
                      {el.delete
                      // eslint-disable-next-line react/button-has-type
                          && <button value={index} onClick={deleteEntity}>Delete</button>}
                    </Container>
                  </Tb>
                )) }
              </BodyRow>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </tbody>
      <tfoot>
        <tr>
          { headerConfig.map((el) => (
            <Tf key={el.key}>
              <Container>
                {el.footer && (
                  <div>
                    <Text>Сумма:</Text>
                    <CustomText />
                    {/* <CustomSelect cellName={el.key} /> */}
                  </div>
                )}
              </Container>
            </Tf>
          )) }
        </tr>
      </tfoot>
    </Table>
  );
}

MainTable.propTypes = {
  headerConfig: PropTypes.arrayOf(PropTypes.any).isRequired,
  entityData: PropTypes.arrayOf(PropTypes.any).isRequired,
  actionInput: PropTypes.func,
  actionSelect: PropTypes.func,
  addEntity: PropTypes.func,
  deleteEntity: PropTypes.func,
  actionCheckbox: PropTypes.func,
  actionSlider: PropTypes.func,
};
MainTable.defaultProps = {
  actionInput: () => {},
  addEntity: () => {},
  actionSelect: () => {},
  actionCheckbox: () => {},
  deleteEntity: () => {},
  actionSlider: () => {},
};

const Table = styled.table`
  border-collapse: collapse;
`;
const Container = styled.div`
  display: flex;
  margin: 3px 10px;
  justify-content: center;
`;
const Text = styled.p`
  margin: 0 5px;
`;
const Th = styled.th`
  border-left: 1px solid black;
  &:first-child {
    border-left: none;
  }
  border-bottom: 3px solid black;
`;
const BodyRow = styled.tr`
  border: none;
  &:hover {
    background-color: #E6F7FF;
  }
`;
const Tb = styled.td`
  border-left: 1px solid #D9D9D9;
  &:first-child{
    border-left: none;
  }
`;
const Tf = styled.td`
  border-top: 3px solid black;
  &:nth-last-child(2) {
    border-left: 1px solid #D9D9D9;
  }
`;

export default MainTable;
