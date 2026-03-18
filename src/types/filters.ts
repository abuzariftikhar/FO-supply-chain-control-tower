import { FilterType, PlantId, Region, TimeHorizon } from '../enums';

export interface FilterOption {
  value: string;
  label: string;
}

export interface FilterConfig {
  type: FilterType;
  label: string;
  options: FilterOption[];
}

export interface ActiveFilters {
  plant: PlantId | 'All';
  region: Region;
  horizon: TimeHorizon;
}
