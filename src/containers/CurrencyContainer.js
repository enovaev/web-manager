import React, { Component } from 'react';
// Utils
import Icon from 'antd/es/icon';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { queryCurr } from '../state/actions/QueryAction';


// eslint-disable-next-line react/prefer-stateless-function
class CurrencyContainer extends Component {
  render() {
    const { query, data, loading } = this.props;
    return (
      <Container>
        <Div>
          {loading
            ? <Icon type="loading" />
            : <Icon type="reload" onClick={query} />}
        </Div>
        <Text>
          {data
            ? `обновлено: ${data.date}`
            : 'нет данных'}
        </Text>
      </Container>
    );
  }
}

CurrencyContainer.propTypes = {
  query: PropTypes.func.isRequired,
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  loading: PropTypes.bool.isRequired,
};

CurrencyContainer.defaultProps = {
};

const mapStateToProps = ({ quotes }) => ({
  data: quotes.data,
  loading: quotes.loading,
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
