import { MachineState, PlantId, LaborCoverage, MaterialImpact, Severity } from '../enums';

export interface DowntimeRecord {
  id: string;
  plant: PlantId;
  machine: string;
  state: MachineState;
  downtimeHours: number;
  reason: string;
  severity: Severity;
  impact: string;
  mttr: string;
}

export interface LaborRecord {
  id: string;
  plant: PlantId;
  shift: string;
  headcount: number;
  required: number;
  coverage: LaborCoverage;
  severity: Severity;
  notes: string;
}

export interface MaterialRecord {
  id: string;
  plant: PlantId;
  material: string;
  stockDays: number;
  safetyStock: number;
  impact: MaterialImpact;
  severity: Severity;
  supplier: string;
  notes: string;
}

export interface OperationsData {
  downtime: DowntimeRecord[];
  labor: LaborRecord[];
  materials: MaterialRecord[];
}
