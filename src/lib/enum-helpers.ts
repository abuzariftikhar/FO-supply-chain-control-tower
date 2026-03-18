import {
  Severity,
  TrendDirection,
  PlantId,
  Region,
  PageId,
  AlertGroup,
  MachineState,
  TimeHorizon,
  ChartType,
  HeatmapMetric,
  RiskCategory,
  OrderStatus,
  SupplierRiskLevel,
  LaborCoverage,
  MaterialImpact,
  ConstraintSeverity,
  SystemStatus,
  BadgeVariant,
  ModalActionType,
  SearchResultType,
} from '../enums';

// ─── Severity Maps ────────────────────────────────────────────────────────────

export const SeverityColorMap: Record<Severity, string> = {
  [Severity.Bad]:  'var(--bad)',
  [Severity.Warn]: 'var(--warn)',
  [Severity.Good]: 'var(--good)',
  [Severity.Info]: 'var(--info)',
};

export const SeverityLabelMap: Record<Severity, string> = {
  [Severity.Bad]:  'CRITICAL',
  [Severity.Warn]: 'WARNING',
  [Severity.Good]: 'OK',
  [Severity.Info]: 'INFO',
};

export const SeverityIconMap: Record<Severity, string> = {
  [Severity.Bad]:  '🔴',
  [Severity.Warn]: '🟡',
  [Severity.Good]: '🟢',
  [Severity.Info]: '🔵',
};

// ─── Trend Maps ───────────────────────────────────────────────────────────────

export const TrendArrowMap: Record<TrendDirection, string> = {
  [TrendDirection.Up]:   '↑',
  [TrendDirection.Down]: '↓',
  [TrendDirection.Flat]: '→',
};

export const TrendColorMap: Record<TrendDirection, string> = {
  [TrendDirection.Up]:   'var(--bad)',
  [TrendDirection.Down]: 'var(--warn)',
  [TrendDirection.Flat]: 'var(--muted)',
};

// ─── Plant Maps ───────────────────────────────────────────────────────────────

export const PlantRegionMap: Record<PlantId, Region> = {
  [PlantId.PlantA]: Region.NA,
  [PlantId.PlantB]: Region.NA,
  [PlantId.PlantC]: Region.EU,
  [PlantId.PlantD]: Region.APAC,
};

export const PlantLabelMap: Record<PlantId, string> = {
  [PlantId.PlantA]: 'Plant A — Detroit, MI',
  [PlantId.PlantB]: 'Plant B — Columbus, OH',
  [PlantId.PlantC]: 'Plant C — Munich, DE',
  [PlantId.PlantD]: 'Plant D — Tokyo, JP',
};

// ─── Page Maps ────────────────────────────────────────────────────────────────

export const PageLabelMap: Record<PageId, string> = {
  [PageId.Executive]: 'Executive',
  [PageId.Capacity]:  'Capacity',
  [PageId.Service]:   'Service',
  [PageId.Inventory]: 'Inventory',
  [PageId.Supplier]:  'Supplier',
  [PageId.Ops]:       'Ops Drilldown',
  [PageId.Plant]:     'Plant Drilldown',
};

export const PageIconMap: Record<PageId, string> = {
  [PageId.Executive]: '📊',
  [PageId.Capacity]:  '🏭',
  [PageId.Service]:   '📦',
  [PageId.Inventory]: '🗃️',
  [PageId.Supplier]:  '🤝',
  [PageId.Ops]:       '⚙️',
  [PageId.Plant]:     '🔍',
};

// ─── Alert Group Maps ─────────────────────────────────────────────────────────

export const AlertGroupSeverityMap: Record<AlertGroup, Severity> = {
  [AlertGroup.CapacityRisk]:     Severity.Bad,
  [AlertGroup.ServiceRisk]:      Severity.Bad,
  [AlertGroup.InventoryCashRisk]: Severity.Warn,
  [AlertGroup.SupplierRisk]:     Severity.Warn,
};

// ─── Machine State Maps ───────────────────────────────────────────────────────

export const MachineStateSeverityMap: Record<MachineState, Severity> = {
  [MachineState.Running]: Severity.Good,
  [MachineState.Down]:    Severity.Bad,
  [MachineState.Idle]:    Severity.Warn,
};

export const MachineStateIconMap: Record<MachineState, string> = {
  [MachineState.Running]: '🟢',
  [MachineState.Down]:    '🔴',
  [MachineState.Idle]:    '🟡',
};

// ─── Time Horizon Maps ────────────────────────────────────────────────────────

export const TimeHorizonLabelMap: Record<TimeHorizon, string> = {
  [TimeHorizon.Today]:        'Today',
  [TimeHorizon.FourteenDays]: '14 Days',
  [TimeHorizon.ThirtyDays]:   '30 Days',
};

// ─── Chart Type Maps ──────────────────────────────────────────────────────────

export const ChartTypeLabelMap: Record<ChartType, string> = {
  [ChartType.Bar]:     'Bar Chart',
  [ChartType.Line]:    'Line Chart',
  [ChartType.Scatter]: 'Scatter Chart',
};

// ─── Order Status Maps ────────────────────────────────────────────────────────

export const OrderStatusLabelMap: Record<OrderStatus, string> = {
  [OrderStatus.AtRisk]:  'At Risk',
  [OrderStatus.Watch]:   'Watch',
  [OrderStatus.OnTrack]: 'On Track',
};

export const OrderStatusSeverityMap: Record<OrderStatus, Severity> = {
  [OrderStatus.AtRisk]:  Severity.Bad,
  [OrderStatus.Watch]:   Severity.Warn,
  [OrderStatus.OnTrack]: Severity.Good,
};

// ─── Supplier Risk Maps ───────────────────────────────────────────────────────

export const SupplierRiskLevelSeverityMap: Record<SupplierRiskLevel, Severity> = {
  [SupplierRiskLevel.High]:   Severity.Bad,
  [SupplierRiskLevel.Medium]: Severity.Warn,
  [SupplierRiskLevel.Low]:    Severity.Good,
};

// ─── Labor Coverage Maps ──────────────────────────────────────────────────────

export const LaborCoverageLabelMap: Record<LaborCoverage, string> = {
  [LaborCoverage.Full]:     'Full Coverage',
  [LaborCoverage.SkillGap]: 'Skill Gap',
  [LaborCoverage.CertGap]:  'Cert Gap',
  [LaborCoverage.Short]:    'Understaffed',
};

export const LaborCoverageSeverityMap: Record<LaborCoverage, Severity> = {
  [LaborCoverage.Full]:     Severity.Good,
  [LaborCoverage.SkillGap]: Severity.Warn,
  [LaborCoverage.CertGap]:  Severity.Warn,
  [LaborCoverage.Short]:    Severity.Bad,
};

// ─── Material Impact Maps ─────────────────────────────────────────────────────

export const MaterialImpactLabelMap: Record<MaterialImpact, string> = {
  [MaterialImpact.Blocked]: 'Blocked',
  [MaterialImpact.Watch]:   'Watch',
  [MaterialImpact.Ok]:      'OK',
};

export const MaterialImpactSeverityMap: Record<MaterialImpact, Severity> = {
  [MaterialImpact.Blocked]: Severity.Bad,
  [MaterialImpact.Watch]:   Severity.Warn,
  [MaterialImpact.Ok]:      Severity.Good,
};

// ─── Constraint Severity Maps ─────────────────────────────────────────────────

export const ConstraintSeverityLabelMap: Record<ConstraintSeverity, string> = {
  [ConstraintSeverity.High]:   'HIGH',
  [ConstraintSeverity.Medium]: 'MEDIUM',
  [ConstraintSeverity.Low]:    'LOW',
};

// ─── System Status Maps ───────────────────────────────────────────────────────

export const SystemStatusLabelMap: Record<SystemStatus, string> = {
  [SystemStatus.Healthy]:  'All Systems Operational',
  [SystemStatus.Watch]:    'Monitoring Active',
  [SystemStatus.Critical]: 'System Alert',
};

export const SystemStatusIconMap: Record<SystemStatus, string> = {
  [SystemStatus.Healthy]:  '✅',
  [SystemStatus.Watch]:    '🔶',
  [SystemStatus.Critical]: '🔴',
};

// ─── Badge Variant Maps ───────────────────────────────────────────────────────

export const BadgeVariantColorMap: Record<BadgeVariant, string> = {
  [BadgeVariant.Bad]:  'var(--bad)',
  [BadgeVariant.Warn]: 'var(--warn)',
  [BadgeVariant.Info]: 'var(--info)',
  [BadgeVariant.Good]: 'var(--good)',
};

// ─── Modal Action Maps ────────────────────────────────────────────────────────

export const ModalActionTypeIconMap: Record<ModalActionType, string> = {
  [ModalActionType.Drilldown]: '🔍',
  [ModalActionType.Navigate]:  '📍',
  [ModalActionType.External]:  '🔗',
};

// ─── Search Result Maps ───────────────────────────────────────────────────────

export const SearchResultTypeIconMap: Record<SearchResultType, string> = {
  [SearchResultType.Plant]:    '🏭',
  [SearchResultType.Alert]:    '⚡',
  [SearchResultType.Order]:    '📦',
  [SearchResultType.Supplier]: '🤝',
};

// ─── Risk Category Maps ───────────────────────────────────────────────────────

export const RiskCategoryColorMap: Record<RiskCategory, string> = {
  [RiskCategory.Capacity]:  '#ef4444',
  [RiskCategory.Materials]: '#f59e0b',
  [RiskCategory.Quality]:   '#3b82f6',
  [RiskCategory.Service]:   '#8b5cf6',
};

// ─── Heatmap Metric Maps ──────────────────────────────────────────────────────

export const HeatmapMetricLabelMap: Record<HeatmapMetric, string> = {
  [HeatmapMetric.Utilization]: 'Utilization %',
  [HeatmapMetric.OEE]:         'OEE',
  [HeatmapMetric.Downtime]:    'Downtime',
  [HeatmapMetric.Gap]:         'Output Gap',
  [HeatmapMetric.Output]:      'Output',
  [HeatmapMetric.Risk]:        'Risk Level',
};

// ─── Enum Validators ──────────────────────────────────────────────────────────

export function isSeverity(value: string): value is Severity {
  return Object.values(Severity).includes(value as Severity);
}

export function isPlantId(value: string): value is PlantId {
  return Object.values(PlantId).includes(value as PlantId);
}

export function isPageId(value: string): value is PageId {
  return Object.values(PageId).includes(value as PageId);
}

export function isRegion(value: string): value is Region {
  return Object.values(Region).includes(value as Region);
}

export function isTimeHorizon(value: string): value is TimeHorizon {
  return Object.values(TimeHorizon).includes(value as TimeHorizon);
}
