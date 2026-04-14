'use client';

import React from 'react';
import { PlantProfile } from '../../types/plant';
import { Badge } from './Badge';
import { TrendIndicator } from './TrendIndicator';
import { Chip } from './Chip';

const plantHeaderBorderClasses: Record<string, string> = {
  bad:  'border-bad/40',
  warn: 'border-warn/40',
  good: 'border-good/40',
};

interface PlantHeaderProps {
  plant: PlantProfile;
}

export function PlantHeader({ plant }: PlantHeaderProps) {
  return (
    <div className={`p-4 bg-panel border border-border-subtle rounded-xl mb-4 ${
      plantHeaderBorderClasses[plant.overallSeverity] ?? ''
    }`}>
      <div>
        <h2 className="text-[1.1rem] font-extrabold mb-[0.4rem]">{plant.name}</h2>
        <div className="flex gap-2 items-center flex-wrap">
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
