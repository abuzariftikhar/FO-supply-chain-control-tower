import { PlantId, HeatmapMetric, Severity } from '../enums';

export interface HeatmapCell {
  metric: HeatmapMetric;
  value: string;
  severity: Severity;
  tooltip?: string;
}

export interface HeatmapRow {
  plant: PlantId;
  cells: HeatmapCell[];
}

export interface HeatmapData {
  metrics: HeatmapMetric[];
  rows: HeatmapRow[];
}
