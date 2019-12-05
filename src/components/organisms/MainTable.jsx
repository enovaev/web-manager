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
import '../style/ani.css';
/* eslint-disable */

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
      // eslint-disable-next-line react/prop-types
      addEntity,
      // eslint-disable-next-line react/prop-types
      entityData,
      // eslint-disable-next-line react/prop-types
      deleteEntity,
      // eslint-disable-next-line react/prop-types
      actionCheckbox,
    } = this.props;
    return (
      <table>
        <thead>
          <tr>
            { HeaderConfig.map((item) => (
              <Th key={item.key}>
                <Container>
                  {item.label && <Text>{item.label}</Text>}
                  {/* {item.checkbox && <CheckBox header />} */}
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
            {/* eslint-disable-next-line react/prop-types */}
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
                          rowIndex={index}
                          action={() => actionCheckbox(index)}
                        />
                        )}
                        {el.number && index + 1}
                        {/* eslint-disable-next-line max-len */}
                        {el.input && <CustomInput width={el.width} inputType={el.input} actionIndex={index} actionInput={actionInput} />}
                        {el.text && <CustomText />}
                        {el.select && <CustomSelect cellName={el.key} />}
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
                      <CustomSelect cellName={el.key} />
                    </div>
                  )}
                </Container>
              </Tf>
            )) }
          </tr>
        </tfoot>
      </table>
    );
  }
}

MainTable.propTypes = {
  actionInput: PropTypes.func.isRequired,
  addEntity: PropTypes.number.isRequired,
  // actionCheckbox: PropTypes.func.isRequired,
};


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
