import React, { Component } from 'react';
// Utils
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// Store
import { calcOurPrice } from '../state/actions/CalculatorAction';
import { actionInput } from '../state/actions/MainAction';

const arrName = ['discount', 'cusHouse', 'nds', 'delivery'];

const calcPlus = (price, arr, func) => {
  let calc = price;
  arr.forEach((el, i) => {
    const value = calc * el.percent * 0.01;
    if (i === 0) calc -= value;
    if (i !== 0) calc += value;
    if (value !== el.input) func(value, el.id, arrName[i]);
  });
  return calc;
};

class CalculatorContainer extends Component {
  componentDidUpdate() {
    const {
      exw, quantity, nds, priceOur, calculator, discount, cusHouse, delivery, actionCurrency,
    } = this.props;
    exw.forEach((el, i) => {
      if (el.input && quantity[i].input) {
        const price = Number(el.input) * Number(quantity[i].input);
        const calc = calcPlus(price, [discount[i], cusHouse[i], nds[i], delivery[i]], actionCurrency);
        if (calc !== priceOur[i].text) calculator(calc, el.id, 'priceOur');
      } else if (priceOur[i].text !== 'not data') calculator('not data', el.id, 'priceOur');
      return false;
    });
  }

  render() {
    return (
      <div />
    );
  }
}

CalculatorContainer.propTypes = {
  exw: PropTypes.arrayOf(PropTypes.any).isRequired,
  quantity: PropTypes.arrayOf(PropTypes.any).isRequired,
  nds: PropTypes.arrayOf(PropTypes.any).isRequired,
  priceOur: PropTypes.arrayOf(PropTypes.any).isRequired,
  discount: PropTypes.arrayOf(PropTypes.any).isRequired,
  cusHouse: PropTypes.arrayOf(PropTypes.any).isRequired,
  delivery: PropTypes.arrayOf(PropTypes.any).isRequired,
  calculator: PropTypes.func.isRequired,
  actionCurrency: PropTypes.func.isRequired,
};

const mapStateToProps = ({
  exw, quantity, priceOur, nds, discount, cusHouse, delivery,
}) => ({
  exw,
  nds,
  quantity,
  priceOur,
  discount,
  cusHouse,
  delivery,
});
const mapDispatchToProps = (dispatch) => ({
  calculator: (value, id, name) => dispatch(calcOurPrice(value, id, name)),
  actionCurrency: (value, id, name) => dispatch(actionInput(value, id, name)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CalculatorContainer);
