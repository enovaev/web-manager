import React from 'react';
// Utils
import PropTypes from 'prop-types';
import styled from 'styled-components';
// Components
import CustomSlider from '../molecules/CustomSlider';

function OptionTable(props) {
  const {
    entityData,
    headerConfig,
    actionSlider,
  } = props;
  return (
    <Table>
      <thead>
        <tr>
          {headerConfig.map((item) => (
            <Th key={item.key}>
              <Container>
                {item.label && <Text>{item.label}</Text>}
              </Container>
            </Th>
          ))}
        </tr>
      </thead>
      <tbody>
        {entityData.map((item) => (
          <BodyRow key={item.key}>
            {headerConfig.map((el) => (
              <Tb key={el.key}>
                {el.slider && (
                  <CustomSlider
                    elementType={el.slider}
                    actionPerc={(value) => actionSlider(value, el.key)}
                    valuePerc={item[el.key].percent}
                  />
                )}
              </Tb>
            ))}
          </BodyRow>
        ))}
      </tbody>
    </Table>
  );
}
OptionTable.propTypes = {
  headerConfig: PropTypes.arrayOf(PropTypes.any).isRequired,
  entityData: PropTypes.arrayOf(PropTypes.any).isRequired,
  actionSlider: PropTypes.func,
};
OptionTable.defaultProps = {
  actionSlider: () => {},
};

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
`;
const Tb = styled.td`
  border-left: 1px solid #D9D9D9;
  border-bottom: 3px solid black;
  &:first-child{
    border-left: none;
  }
`;

export default OptionTable;
