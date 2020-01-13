/*eslint-disable*/
import React, { Component } from 'react';
// Utils
import Icon from 'antd/es/icon';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { queryCurr } from '../state/actions/QueryAction';
// import styled from 'styled-components';

class CurrencyContainer extends Component {
  render() {
    const { query } = this.props;
    return (
      <Container>
        <Div>
          <Icon type="reload" onClick={query} />
        </Div>
        <Text>обновлено: </Text>
      </Container>
    );
  }
}

CurrencyContainer.propTypes = {
  component: PropTypes.arrayOf(PropTypes.any).isRequired,
};

CurrencyContainer.defaultProps = {
  entityData: { input: '', select: '' },
};

const mapStateToProps = (store) => ({
});

const mapDispatchToProps = (dispatch) => ({
  query: () => dispatch(queryCurr()),
});

const Container = styled.div`
  margin: 3px 0 30px;
  display: flex;
  align-items: center;
`;
const Div = styled.div`
  font-size: 18px;
`;
const Text = styled.p`
  margin: 0 0 0 10px;
  line-height: 14px;
`;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CurrencyContainer);
