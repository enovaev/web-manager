import React, { Component } from 'react';
// Utils
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// Store
import { calcOurPrice } from '../state/actions/CalculatorAction';

class CalculatorContainer extends Component {
  componentDidUpdate() {
    const { entityData, calculator } = this.props;

    const valid = entityData.map(
      (el, i) => ((el.exw.input && el.quantity.input)
        ? { ...el, index: i } : false),
    ).filter((el) => el);

    if (valid.length) {
      valid.forEach((el) => {
        const calc = Number(el.exw.input) * Number(el.quantity.input);
        if (calc !== el.priceOur.text) {
          calculator(el.index, calc);
        }
      });
    }
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
