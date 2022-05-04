import {OptionId} from 'echarts/types/src/util/types';
import {GridOption} from 'echarts/types/dist/shared';
import { dangerousGetCtx } from './_danger';
import {simple} from './utils';

export function grid(id: OptionId, option: GridOption = {}): GridOption {
  return {
    ...option,
    id,
  };
}

export function topBottomLayoutGrid() {
  const {context} = dangerousGetCtx()
  context.layout = 'top-bottom'

  return simple(
    [
      grid('main'),
    ],
    [
      grid('main', {left: '8', right: '8', top: '64', bottom: '55%'}),
      grid('vs', {left: '8', right: '8', top: '50%', bottom: '48'}),
    ],
  );
}

export function leftRightLayoutGrid() {
  const {context} = dangerousGetCtx()
  context.layout = 'left-right'

  return simple(
    [
      grid('main'),
    ],
    [
      grid('main', {left: '8', right: '52%', top: '64', bottom: '48'}),
      grid('vs', {left: '52%', right: '8', top: '64', bottom: '48'}),
    ],
  );
}