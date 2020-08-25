import React from 'react';
import styled from 'styled-components';
import Switch from 'antd/es/switch';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CustomSlider from '../components/molecules/CustomSlider';
import { actionSlider, actionSwitch } from '../state/actions/MainAction';


const SliderContainer = ({
  component, slider, switched, entityDataSlider, entityName,
}) => (
  <Container>
    {component.map((el) => el.name === 'slider' && (
    <SliderContent key={el.name}>
      {el.secLabel
        ? (
          <Switch
            checkedChildren={el.secLabel}
            unCheckedChildren={el.label}
            onChange={(value) => switched(entityName, value)}
          />
        )
        : <Label>{el.label}</Label>}
      <CustomSlider
        actionPerc={(value) => slider(value, entityName, 'percent')}
        actionValue={(value) => slider(value, entityName, 'input')}
        actionSelect={(value) => slider(value, entityName, 'select')}
        valueSelect={entityDataSlider.select}
        valuePerc={entityDataSlider.percent}
        valueCurr={entityDataSlider.input}
        elementType={el.type}
      />
    </SliderContent>
    ))}
  </Container>
);


SliderContainer.propTypes = {
  component: PropTypes.arrayOf(PropTypes.any),
  entityName: PropTypes.string.isRequired,
  entityDataSlider: PropTypes.objectOf(PropTypes.any),
  slider: PropTypes.func,
  switched: PropTypes.func,
};
SliderContainer.defaultProps = {
  entityDataSlider: { percent: 0 },
  component: [],
  slider: () => {},
  switched: () => {},
};

const mapStateToProps = (store, { entityName }) => ({
  entityDataSlider: store[entityName]
      && (
        store.check.filter((item) => item.checked === true).length
          ? store[entityName].find(
            (item) => item.id === store.check.find((el) => el.checked === true).id,
          )
          : store[entityName][0]
      ),
});
const mapDispatchToProps = (dispatch) => ({
  slider: (value, name, prop) => dispatch(actionSlider(value, name, prop)),
  switched: (name, value) => dispatch(actionSwitch(name, value)),
});


const Container = styled.div`
  display: flex;
  margin: 3px 10px;
  justify-content: center;
  align-items: center;
`;
const Label = styled.div`
  text-align: center;
`;
const SliderContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SliderContainer);
