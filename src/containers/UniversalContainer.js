import React, { Component } from 'react';
import styled from 'styled-components';
import CustomInput from '../components/molecules/CustomInput';

// eslint-disable-next-line react/prefer-stateless-function
class UniversalContainer extends Component {
  render() {
    // eslint-disable-next-line react/prop-types,no-unused-vars
    const { name, component } = this.props;
    return (
      <div>
        {/* eslint-disable-next-line react/prop-types */}
        {component.map((el) => (
          <Container>
            {el.name === 'input' && (
              <CustomInput
                action={() => {}}
                width={el.width}
                value={null}
                elementType={el.type}
              />
            )}
          </Container>
        ))}
      </div>
    );
  }
}

const Container = styled.div`
  display: flex;
  margin: 3px 10px;
  justify-content: center;
`;
export default UniversalContainer;
