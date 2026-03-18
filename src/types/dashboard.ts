import { PageId, SystemStatus } from '../enums';

export interface NavTab {
  id: PageId;
  label: string;
  icon: string;
}

export interface BrandConfig {
  name: string;
  tagline: string;
  version: string;
}

export interface SystemStatusConfig {
  status: SystemStatus;
  label: string;
  lastUpdated: string;
}

export interface DashboardConfig {
  brand: BrandConfig;
  nav: NavTab[];
  systemStatus: SystemStatusConfig;
}
