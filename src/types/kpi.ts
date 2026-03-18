import { Severity, TrendDirection } from '../enums';

export interface KPITile {
  id: string;
  label: string;
  value: string;
  unit: string;
  target: string;
  variance: string;
  varianceSeverity: Severity;
  trend: TrendDirection;
  trendLabel: string;
  severity: Severity;
  sparkline?: number[];
}

export interface KPIsData {
  kpis: KPITile[];
}
