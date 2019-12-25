import React, { Component } from 'react';
// Utils
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// Store
import { calcOurPrice } from '../state/actions/CalculatorAction';

class CalculatorContainer extends Component {
  componentDidUpdate() {
    const {
      exw, quantity, nds, priceOur, calculator,
    } = this.props;
    exw.forEach((el, i) => {
      if (el.input && quantity[i].input) {
        const calc = (Number(el.input)
          * Number(quantity[i].input)
          * 0.01 * Number(nds[i].percent)).toFixed(2);
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
  calculator: PropTypes.func.isRequired,
};

const mapStateToProps = ({
  exw, quantity, priceOur, nds,
}) => ({
  exw,
  quantity,
  nds,
  priceOur,
});
const mapDispatchToProps = (dispatch) => ({
  calculator: (value, id, name) => dispatch(calcOurPrice(value, id, name)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CalculatorContainer);
