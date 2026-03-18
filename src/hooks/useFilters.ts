'use client';

import { useCallback } from 'react';
import { useDashboard } from '../context/DashboardContext';
import { PlantId, Region, TimeHorizon } from '../enums';
import { ActiveFilters } from '../types/filters';

export function useFilters() {
  const { filters, setFilters } = useDashboard();

  const setPlant = useCallback(
    (plant: PlantId | 'All') => setFilters({ plant }),
    [setFilters]
  );

  const setRegion = useCallback(
    (region: Region) => setFilters({ region }),
    [setFilters]
  );

  const setHorizon = useCallback(
    (horizon: TimeHorizon) => setFilters({ horizon }),
    [setFilters]
  );

  const resetFilters = useCallback(
    () =>
      setFilters({
        plant: 'All',
        region: Region.All,
        horizon: TimeHorizon.Today,
      } as ActiveFilters),
    [setFilters]
  );

  return { filters, setPlant, setRegion, setHorizon, resetFilters };
}
