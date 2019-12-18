import React, { Component } from 'react';
// Utils
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// Store
import { calcOurPrice } from '../state/actions/CalculatorAction';

class CalculatorContainer extends Component {
  componentDidUpdate() {
    const { entityData, calculator } = this.props;
    entityData.forEach((el, i) => {
      if (el.exw.input && el.quantity.input) {
        const calc = (Number(el.exw.input)
          * Number(el.quantity.input)
          * 0.01 * Number(el.nds.percent)).toFixed(2);
        if (calc !== el.priceOur.text) calculator(i, calc);
      } else if (el.priceOur.text !== 'not data') calculator(i, 'not data');
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
  entityData: PropTypes.arrayOf(PropTypes.any).isRequired,
  calculator: PropTypes.func.isRequired,
};

const mapStateToProps = (store) => ({
  entityData: store.entityData,
});
// eslint-disable-next-line no-unused-vars
const mapDispatchToProps = (dispatch) => ({
  calculator: (index, value) => dispatch(calcOurPrice(index, value)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CalculatorContainer);
