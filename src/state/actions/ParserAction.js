import { Modal } from 'antd';
import {
  actionInput, addEntity,
  actionCheckbox, actionSlider,
} from './MainAction';
import { actionCreateGroup } from './OptionAction';
import colorConfig from '../../config/selectConfig/selectColor.json';
import parseConfig from '../../config/parseConfig.json';

const { confirm } = Modal;

// eslint-disable-next-line import/prefer-default-export
export const parserAction = (matrix) => (dispatch) => {
  const color = colorConfig;
  let group = [];

  const parsing = () => {
    matrix.forEach((row, index) => {
      if (index !== 0 && row[0] !== null) {
        const id = Math.random();

        row.forEach((el, i) => {
          if (i === 0) dispatch(addEntity(id));
          if (i === 1 && el !== null) dispatch(actionInput(el, id, 'part'));
          if (i === 2 && el !== null) dispatch(actionInput(Number(el), id, 'option'));
          if (i === 3 && el !== null) dispatch(actionInput(el, id, 'posName'));
          if (i === 4 && el !== null) {
            const sameGroup = group.find((a) => a.name === el);
            if (sameGroup) {
              group = group.map((gr) => (gr.name === el ? { ...gr, ids: [...gr.ids, id] } : gr));
            } else {
              group.push({ name: el, color: color[0], ids: [id] });
              color.shift();
            }
          }
          if (i === 5 && el !== null) dispatch(actionInput(Number(el), id, 'quantity'));
          if (i === 6 && el !== null) dispatch(actionInput(Number(el), id, 'exw'));
        });
      }
    });

    group.forEach((item) => {
      item.ids.forEach((id) => dispatch(actionCheckbox(id, 'check', true)));
      parseConfig.forEach((a) => a.name === item.name && dispatch(actionSlider(a.discount, 'discount', 'percent')));
      dispatch(actionCreateGroup(item.name, item.color));
    });
  };

  confirm({
    title: 'Вы уверены, что хотите совершить импорт?',
    // content: 'При загрузке данных все имеющиеся данные будут удалены',
    onOk: () => parsing(),
  });
};
