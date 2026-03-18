'use client';

import { useState, useCallback } from 'react';
import { useDashboard } from '../context/DashboardContext';
import { PlantId, PageId } from '../enums';
import { PlantProfile } from '../types/plant';

export function usePlantDrilldown(plants: PlantProfile[]) {
  const { setActivePage, setSelectedPlant, selectedPlant } = useDashboard();
  const [localPlant, setLocalPlant] = useState<PlantId | null>(
    selectedPlant
  );

  const selectPlant = useCallback(
    (plantId: PlantId) => {
      setLocalPlant(plantId);
      setSelectedPlant(plantId);
      setActivePage(PageId.Plant);
    },
    [setLocalPlant, setSelectedPlant, setActivePage]
  );

  const activePlantData: PlantProfile | null =
    plants.find(p => p.id === (localPlant ?? selectedPlant)) ?? null;

  return { selectedPlant: localPlant ?? selectedPlant, selectPlant, activePlantData };
}
