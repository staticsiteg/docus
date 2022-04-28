import {VisualMapComponentOption} from 'echarts';
import {VisualMapOption} from 'echarts/types/src/component/visualMap/VisualMapModel';

export function visualMap(min: number, max: number): VisualMapComponentOption {
  return {
    min: 0,
    max: max,
    orient: 'horizontal',
    left: 'center',
    bottom: 8,
  }
}