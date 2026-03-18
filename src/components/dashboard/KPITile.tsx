'use client';

import React from 'react';
import { KPITile as KPITileType } from '../../types/kpi';
import { TrendIndicator } from './TrendIndicator';
import { Badge } from './Badge';
import { cn } from '../../utils/cn';

interface KPITileProps {
  kpi: KPITileType;
  className?: string;
}

export function KPITile({ kpi, className }: KPITileProps) {
  return (
    <div className={cn(`kpi-tile kpi-tile--${kpi.severity}`, className)}>
      <div className="kpi-tile__header">
        <span className="kpi-tile__label">{kpi.label}</span>
        <Badge severity={kpi.severity} />
      </div>

      <div className="kpi-tile__value">
        {kpi.value}
        <span className="kpi-tile__unit">{kpi.unit}</span>
      </div>

      <div className="kpi-tile__target">Target: {kpi.target}</div>

      <div className={`kpi-tile__variance kpi-tile__variance--${kpi.varianceSeverity}`}>
        {kpi.variance}
      </div>

      <TrendIndicator trend={kpi.trend} label={kpi.trendLabel} />
    </div>
  );
}
