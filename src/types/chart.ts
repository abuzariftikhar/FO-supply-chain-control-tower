import { ChartType } from '../enums';

export interface ChartDataset {
  label: string;
  data: number[];
  backgroundColor?: string | string[];
  borderColor?: string | string[];
  borderWidth?: number;
  fill?: boolean;
  tension?: number;
  pointRadius?: number;
  type?: ChartType;
}

export interface ChartConfig {
  id: string;
  type: ChartType;
  title: string;
  description?: string;
  labels: string[];
  datasets: ChartDataset[];
  options?: Record<string, unknown>;
}

export interface ChartsData {
  charts: ChartConfig[];
}
