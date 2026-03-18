import { PlantId, Region, ConstraintSeverity, RiskCategory, Severity, TrendDirection } from '../enums';
import { KPITile } from './kpi';

export interface PlantConstraint {
  id: string;
  label: string;
  detail: string;
  severity: ConstraintSeverity;
}

export interface PlantTrendData {
  labels: string[];
  utilization: number[];
  oee: number[];
  otif: number[];
}

export interface RiskDecomposition {
  category: RiskCategory;
  score: number;
  severity: Severity;
}

export interface PlantProfile {
  id: PlantId;
  name: string;
  region: Region;
  kpis: KPITile[];
  constraints: PlantConstraint[];
  trend: PlantTrendData;
  riskDecomposition: RiskDecomposition[];
  overallSeverity: Severity;
  overallTrend: TrendDirection;
}

export interface PlantProfilesData {
  plants: PlantProfile[];
}
