'use client';

import React from 'react';
import { FilterConfig } from '../../types/filters';
import { useDashboard } from '../../context/DashboardContext';
import { Region, TimeHorizon, PlantId } from '../../enums';

interface FilterBarProps {
  filterConfigs: FilterConfig[];
}

export function FilterBar({ filterConfigs }: FilterBarProps) {
  const { filters, setFilters } = useDashboard();

  function handleChange(type: string, value: string) {
    if (type === 'plant') {
      setFilters({ plant: value as PlantId | 'All' });
    } else if (type === 'region') {
      setFilters({ region: value as Region });
    } else if (type === 'horizon') {
      setFilters({ horizon: value as TimeHorizon });
    }
  }

  const activeValues: Record<string, string> = {
    plant: filters.plant,
    region: filters.region,
    horizon: filters.horizon,
  };

  return (
    <div className="topbar__filters">
      {filterConfigs.map(config => (
        <div key={config.type} className="filter-select">
          <select
            className="filter-select__input"
            id={`filter-${config.type}`}
            name={config.type}
            value={activeValues[config.type] ?? ''}
            onChange={e => handleChange(config.type, e.target.value)}
            aria-label={config.label}
          >
            {config.options.map(opt => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
}
