import Chart, { ChartProps } from "@site/src/components/Chart";
import React, { useMemo } from "react";
import { defaultColors } from './colors';
import { ScriptableContext } from "chart.js";


interface BarChartProps<T> extends Pick<ChartProps, 'fallbackImage' | 'name' | 'sx'> {
  data: import("../../_charts/env").LineData<T>;
  footnote?: string,
}

const labeledData = function <T, L extends import("../../_charts/env").LineData<T>>(lineData: L): [Record<string, T[]>, string[]] {
  const labels: string[] = [];
  const record = lineData.data.reduce((record, item) => {
    const label: string = item[lineData.label] as never;
    if (record[label]) {
      record[label].push(item);
    } else {
      record[label] = [item];
      labels.push(label);
    }
    return record;
  }, {} as Record<string, T[]>);
  return [record, labels];
};

const color = (context: ScriptableContext<'line'>) => defaultColors[context.datasetIndex % defaultColors.length];

export default function LineChart<T extends Record<string, any>>({
  data,
  footnote,
  ...props
}: BarChartProps<T>) {
  const [record, labels] = useMemo(() => labeledData(data), [data]);

  return (
    <Chart<"line">
      once
      {...props}
      type="line"
      data={{
        labels: data.x,
        datasets: labels.map(label => {
          return {
            data: record[label].map(item => item[data.y]),
            label,
            pointBorderColor: color,
            pointBackgroundColor: color,
            borderColor: color,
            borderWidth: 2,
            pointRadius: 3,
            pointBorderWidth: 0,
            pointHoverRadius: 5,
          };
        }),
      }}
      options={{
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            grid: {
              color: '#BFBFBF80',
              borderDash: [4, 4],
            },
            ticks: {
              color: '#E0E0E0',
              font: {
                size: 19,
                family: 'JetBrains Mono',
              },
            },
          },
          y: {
            grid: {
              color: '#BFBFBF80',
              borderDash: [4, 4],
            },
            ticks: {
              color: '#E0E0E0',
              font: {
                size: 19,
                family: 'JetBrains Mono',
              },
              callback: value => `${value}${data.unit}`,
              padding: 32,
            },
          },
        },
        plugins: {
          subtitle: {
            position: 'bottom',
            align: 'end',
            text: footnote,
            display: !!footnote,
            color: '#7C7C7C',
            font: {
              family: 'JetBrains Mono',
              size: 16,
            }
          },
          legend: {
            display: true,
            position: 'bottom',
            labels: {
              usePointStyle: true,
              boxWidth: 10,
              boxHeight: 10,
              color: '#BFBFBF',
              padding: 24,
              font: {
                size: 16,
                family: 'JetBrains Mono',
              }
            }
          },
          title: {
            display: true,
            position: 'top',
            text: props.name,
            color: 'white',
            font: {
              size: 24,
              weight: 'bold',
              family: 'JetBrains Mono',
            }
          },
          tooltip: {
            titleColor: '#BFBFBF',
            titleFont: {
              size: 20,
              family: 'JetBrains Mono',
              weight: 'bold',
            },
            bodyFont: {
              size: 24,
              family: 'JetBrains Mono'
            },
            boxPadding: 8,
            padding: 12,
            boxWidth: 10,
            boxHeight: 10,
            usePointStyle: true,
            callbacks: {
              label: item => {
                return `${item.dataset.label}: ${item.dataset.data[item.dataIndex]}%`
              }
            }
          },
        },
      }}
    />
  );
}