import { SupplierRiskLevel, Severity } from '../enums';

export interface Supplier {
  id: string;
  name: string;
  part: string;
  leadTime: string;
  onTime: string;
  riskLevel: SupplierRiskLevel;
  severity: Severity;
  exposure: string;
  alternates: number;
  notes: string;
}

export interface SuppliersData {
  suppliers: Supplier[];
}
