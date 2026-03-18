import { AlertGroup, Severity, PlantId, TimeHorizon, ModalActionType } from '../enums';

export interface AlertSignal {
  label: string;
  value: string;
}

// Alias for component usage
export type SignalItem = AlertSignal;

export interface AlertRuleAction {
  type: ModalActionType;
  label: string;
  target: string;
}

export interface Alert {
  id: string;
  group: AlertGroup;
  severity: Severity;
  title: string;
  plant: PlantId;
  kpi: string;
  impact: string;
  horizon: TimeHorizon;
  tags: string[];
  suggestion: string;
  ruleActions: AlertRuleAction[];
  signals: AlertSignal[];
  drillTo: string;
}

export interface AlertsData {
  alerts: Alert[];
}
