import { ChartConfig, ChartDataset } from '../types/chart';
import { ChartType } from '../enums';

export interface ChartJsConfig {
  type: ChartType;
  data: {
    labels: string[];
    datasets: ChartDataset[];
  };
  options: Record<string, unknown>;
}

const defaultOptions: Record<ChartType, Record<string, unknown>> = {
  [ChartType.Bar]: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'bottom' as const },
    },
    scales: {
      x: { grid: { color: 'rgba(255,255,255,0.05)' } },
      y: { grid: { color: 'rgba(255,255,255,0.05)' } },
    },
  },
  [ChartType.Line]: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'bottom' as const },
    },
    scales: {
      x: { grid: { color: 'rgba(255,255,255,0.05)' } },
      y: { grid: { color: 'rgba(255,255,255,0.05)' } },
    },
  },
  [ChartType.Scatter]: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'bottom' as const },
    },
    scales: {
      x: { grid: { color: 'rgba(255,255,255,0.05)' } },
      y: { grid: { color: 'rgba(255,255,255,0.05)' } },
    },
  },
};

export function buildChartConfig(config: ChartConfig): ChartJsConfig {
  return {
    type: config.type,
    data: {
      labels: config.labels,
      datasets: config.datasets,
    },
    options: {
      ...defaultOptions[config.type],
      ...(config.options ?? {}),
    },
  };
}
