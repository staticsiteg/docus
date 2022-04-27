import {EChartsOption} from 'echarts';
import {
  axisTooltip,
  bar,
  line,
  originalDataset,
  timeAxis,
  valueAxis,
  title, dataZoom, worldMapGeo, itemTooltip, scatters,
} from '../options';
import {withChart} from '../chart';
import * as echarts from 'echarts';
import map from '@geo-maps/countries-land-10km';
import {alpha2ToGeo, alpha2ToTitle} from '../../lib/areacode';
import {DatasetOption} from 'echarts/types/dist/shared';

if (!echarts.getMap('world')) {
  echarts.registerMap('world', map());
}

// lines of code
export type LocationData = {
  country_or_area: string
  count: number
}

function transformData(data: LocationData[]): [string, number, number, number][] {
  return data.map(item => {
    const title = alpha2ToTitle(item.country_or_area);
    const {long, lat} = alpha2ToGeo(item.country_or_area);
    return [
      title,
      long,
      lat,
      item.count,
    ] as [string, number, number, number];
  }).sort((a, b) => Math.sign(b[3] - a[3]));
}

function datasets(idPrefix: string, topN: number, data: LocationData[]): DatasetOption[] {
  const transformedData = transformData(data);
  return [
    {
      id: `${idPrefix}_top_${topN}`,
      source: transformedData.slice(0, topN),
    },
    {
      id: `${idPrefix}_rest`,
      source: transformedData.slice(topN),
    },
  ];
}

export const WorldMapChart = withChart<LocationData>(({title: propsTitle, data}) => {
    const max = (data.data?.data ?? []).reduce((prev, current) => Math.max(prev, current.count), 1);
    return {
      dataset: datasets('data', 0, data.data?.data ?? []),
      title: title(propsTitle),
      geo: worldMapGeo(),
      series: [
        ...scatters('data', 0, max, {
          color: '#dd6b66',
        }),
      ],
      tooltip: itemTooltip(),
    };
  },
  {
    aspectRatio: 16 / 9,
  },
);

