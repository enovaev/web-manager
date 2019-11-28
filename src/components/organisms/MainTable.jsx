import React, { Component } from 'react';
import _ from 'lodash';
import moment from 'moment';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import CheckBox from '../molecules/CheckBox';
// import CustomInput from '../molecules/CustomInput';
import HeaderConfig from '../../config/HeaderMainTable.json';
import '../style/ani.css';
// import SimData from '../../config/ImitateData.json';

class MainTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'tor',
      simData: [
        {
          key: 12,
          number: 1,
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

    this.clickBtn = this.clickBtn.bind(this);
    this.deleteEntity = this.deleteEntity.bind(this);
  }

  clickBtn() {
    const { simData } = this.state;
    const objdata = [{ key: moment().format('x'), selected: false }];
    this.setState({ simData: simData.concat(objdata) });
  }

  deleteEntity(e) {
    const { simData } = this.state;
    const newData = simData.filter((el, i) => (i !== +e.target.value) && el);
    console.log(newData);
    this.setState({ simData: newData });
  }

  render() {
    const { name, simData } = this.state;
    return (
      <table>
        <thead>
          <tr>
            { HeaderConfig.map((item) => (
              <th key={item.key} className={name}>
                {item.label}
                {item.checkbox && <CheckBox header />}
              </th>
            )) }
            <th>
              {/* eslint-disable-next-line react/button-has-type */}
              <button onClick={this.clickBtn}> Click</button>
            </th>
          </tr>
        </thead>
        <tbody>
          <TransitionGroup component={null}>
            { simData.map((item, index) => (
              <CSSTransition
                key={item.key}
                timeout={250}
                classNames="item"
              >
                <tr>
                  { HeaderConfig.map((el) => (
                    <td key={el.key}>
                      {!_.isObject(item[el.key]) && item[el.key]}
                      {/* {_.isObject(item[el.key]) && item[el.key].input && <CustomInput />} */}
                      {/* {el.input && <CustomInput />} */}
                      {el.delete
                      // eslint-disable-next-line react/button-has-type
                        && <button value={index} onClick={this.deleteEntity}>Delete</button>}
                      {el.checkbox && <CheckBox selected={item.selected} value={item.key} />}
                    </td>
                  )) }
                </tr>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </tbody>
      </table>
    );
  }
}

export default MainTable;
