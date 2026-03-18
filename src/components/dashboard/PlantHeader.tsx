'use client';

import React from 'react';
import { PlantProfile } from '../../types/plant';
import { Badge } from './Badge';
import { TrendIndicator } from './TrendIndicator';
import { Chip } from './Chip';

interface PlantHeaderProps {
  plant: PlantProfile;
}

export function PlantHeader({ plant }: PlantHeaderProps) {
  return (
    <div className={`plant-header plant-header--${plant.overallSeverity}`}>
      <div className="plant-header__info">
        <h2 className="plant-header__name">{plant.name}</h2>
        <div className="plant-header__meta">
          <Chip label={plant.region} />
          <Badge severity={plant.overallSeverity}>
            {plant.overallSeverity === 'bad'
              ? 'CRITICAL'
              : plant.overallSeverity === 'warn'
              ? 'WATCH'
              : plant.overallSeverity === 'good'
              ? 'HEALTHY'
              : 'INFO'}
          </Badge>
          <TrendIndicator
            trend={plant.overallTrend}
            label="Overall Trend"
          />
        </div>
      </div>
    </div>
  );
}
