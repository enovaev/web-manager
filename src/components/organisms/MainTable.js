import React, { Component } from 'react';
// Utils
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
// Components
import CheckBox from '../molecules/CheckBox';
import CustomText from '../molecules/CustomText';
import CustomInput from '../molecules/CustomInput';
import CustomSelect from '../molecules/CustomSelect';
// Configs
import HeaderConfig from '../../config/HeaderMainTable.json';
// Styles
import '../style/animation.css';

class MainTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'tor',
      simData: [
        {
          key: 12,
          part: '',
          option: 1500,
          posName: 'wgregw',
          exw: 20.5,
          quantity: 1,
          priceOur: 1000,
          priceCust: 1500,
          selected: true,
        },
      ],
    };

    // this.deleteEntity = this.deleteEntity.bind(this);
  }

  // clickBtn() {
  //   const { simData } = this.state;
  //   const objdata = [{ key: moment().format('x'), selected: false }];
  //   this.setState({ simData: simData.concat(objdata) });
  // }

  // deleteEntity(e) {
  //   const { simData } = this.state;
  //   const newData = simData.filter((el, i) => (i !== +e.target.value) && el);
  //   this.setState({ simData: newData });
  // }

  render() {
    // eslint-disable-next-line no-unused-vars
    const { name, simData } = this.state;
    // eslint-disable-next-line react/prop-types
    const {
      actionInput,
      actionSelect,
      addEntity,
      entityData,
      deleteEntity,
      actionCheckbox,
    } = this.props;
    return (
      <Table>
        <thead>
          <tr>
            { HeaderConfig.map((item) => (
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
                  { HeaderConfig.map((el) => (
                    <Tb key={el.key}>
                      <Container>
                        {el.checkbox
                        && (
                        <CheckBox
                          value={item.selected}
                          action={() => actionCheckbox(index)}
                        />
                        )}
                        {el.number && index + 1}
                        {el.input
                        && (
                        <CustomInput
                          width={el.width}
                          elementType={el.input}
                          value={item[el.key].input}
                          action={(value) => actionInput(value, index, el.key)}
                        />
                        )}
                        {el.text && <CustomText value={item[el.key].text} />}
                        {el.select
                        && (
                          <CustomSelect
                            elementType={el.select}
                            value={item[el.key].select}
                            action={(value) => actionSelect(value, index, el.key)}
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
            { HeaderConfig.map((el) => (
              <Tf key={el.key}>
                <Container>
                  {el.footer
                  && (
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
}

MainTable.propTypes = {
  entityData: PropTypes.arrayOf(PropTypes.any).isRequired,
  actionInput: PropTypes.func,
  actionSelect: PropTypes.func,
  addEntity: PropTypes.func,
  deleteEntity: PropTypes.func,
  actionCheckbox: PropTypes.func,
};
MainTable.defaultProps = {
  actionInput: () => {},
  addEntity: () => {},
  actionSelect: () => {},
  actionCheckbox: () => {},
  deleteEntity: () => {},
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
  border: none;
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
  border: none;
  border-left: 1px solid #D9D9D9;
  &:first-child{
    border-left: none;
  }
`;
const Tf = styled.td`
  border: none;
  border-top: 3px solid black;
  &:nth-last-child(2) {
    border-left: 1px solid #D9D9D9;
  }
`;

export default MainTable;
