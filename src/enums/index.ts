// src/enums/index.ts — master export

export enum Severity {
  Bad = 'bad',
  Warn = 'warn',
  Good = 'good',
  Info = 'info',
}

export enum TrendDirection {
  Up = 'up',
  Down = 'down',
  Flat = 'flat',
}

export enum PlantId {
  PlantA = 'Plant A',
  PlantB = 'Plant B',
  PlantC = 'Plant C',
  PlantD = 'Plant D',
}

export enum Region {
  All = 'All',
  NA = 'NA',
  EU = 'EU',
  APAC = 'APAC',
}

export enum PageId {
  Executive = 'exec',
  Capacity = 'capacity',
  Service = 'service',
  Inventory = 'inventory',
  Supplier = 'supplier',
  Ops = 'ops',
  Plant = 'plant',
}

export enum AlertGroup {
  CapacityRisk = 'Capacity Risk',
  ServiceRisk = 'Service Risk',
  InventoryCashRisk = 'Inventory/Cash Risk',
  SupplierRisk = 'Supplier Risk',
}

export enum MachineState {
  Running = 'Running',
  Down = 'Down',
  Idle = 'Idle',
}

export enum TimeHorizon {
  Today = 'Today',
  FourteenDays = '14D',
  ThirtyDays = '30D',
}

export enum ChartType {
  Bar = 'bar',
  Line = 'line',
  Scatter = 'scatter',
}

export enum HeatmapMetric {
  Utilization = 'Util%',
  OEE = 'OEE',
  Downtime = 'Downtime',
  Gap = 'Gap',
  Output = 'Output',
  Risk = 'Risk',
}

export enum RiskCategory {
  Capacity = 'Capacity',
  Materials = 'Materials',
  Quality = 'Quality',
  Service = 'Service',
}

export enum OrderStatus {
  AtRisk = 'at_risk',
  Watch = 'watch',
  OnTrack = 'on_track',
}

export enum SupplierRiskLevel {
  High = 'high',
  Medium = 'medium',
  Low = 'low',
}

export enum LaborCoverage {
  Full = 'full',
  SkillGap = 'skill_gap',
  CertGap = 'cert_gap',
  Short = 'short',
}

export enum MaterialImpact {
  Blocked = 'blocked',
  Watch = 'watch',
  Ok = 'ok',
}

export enum ConstraintSeverity {
  High = 'high',
  Medium = 'medium',
  Low = 'low',
}

export enum DueDateWindow {
  Today = 'Today',
  Tomorrow = 'Tomorrow',
  ThisWeek = 'This Week',
}

export enum SystemStatus {
  Healthy = 'healthy',
  Watch = 'watch',
  Critical = 'critical',
}

export enum FilterType {
  Plant = 'plant',
  Region = 'region',
  Horizon = 'horizon',
}

export enum BadgeVariant {
  Bad = 'bad',
  Warn = 'warn',
  Info = 'info',
  Good = 'good',
}

export enum ModalActionType {
  Drilldown = 'drilldown',
  Navigate = 'navigate',
  External = 'external',
}

export enum SearchResultType {
  Plant = 'Plant',
  Alert = 'Alert',
  Order = 'Order',
  Supplier = 'Supplier',
}
