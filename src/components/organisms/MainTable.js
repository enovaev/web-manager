import React, { Component } from 'react';
// Utils
// eslint-disable-next-line no-unused-vars
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
// Components
import UniversalContainer from '../../containers/UniversalContainer';
// Styles
import '../style/animation.css';
// Configs
import HeaderConfig from '../../config/HeaderMainTable.json';
import ConfigData from '../../config/DataConfig.json';
import { addEntity } from '../../state/actions/MainTableAction';


// eslint-disable-next-line react/prefer-stateless-function
class MainTable extends Component {
  render() {
    const {
      // eslint-disable-next-line no-shadow,react/prop-types
      addEntity,
    } = this.props;
    return (
      <Table>
        <thead>
          <tr>
            {HeaderConfig.map((item) => (
              <Th key={item.key}>
                <Container>
                  {item.label && <Text>{item.label}</Text>}
                </Container>
              </Th>
            ))}
            <Th>
              {/* eslint-disable-next-line react/button-has-type */}
              <button onClick={addEntity}>Click</button>
            </Th>
          </tr>
        </thead>
        <tbody>
          <TransitionGroup component={null}>
            {ConfigData.map((item, index) => (
              <CSSTransition
                key={item.id}
                timeout={200}
                classNames="item"
              >
                <BodyRow>
                  {HeaderConfig.map((el) => (
                    <Tb key={el.key}>
                      <UniversalContainer
                        entityName={el.key}
                        entityIndex={index}
                        component={el.components}
                      />
                    </Tb>
                  ))}
                </BodyRow>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </tbody>
        <tfoot>
          <tr />
        </tfoot>
      </Table>
    );
  }
}

MainTable.propTypes = {
};
MainTable.defaultProps = {
};

const mapStateToProps = (store) => ({
  entityID: store.entityID,
});

const mapDispatchToProps = (dispatch) => ({
  addEntity: () => dispatch(addEntity()),
});

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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MainTable);
