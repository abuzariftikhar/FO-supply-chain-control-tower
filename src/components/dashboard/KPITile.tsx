'use client';

import React from 'react';
import { KPITile as KPITileType } from '../../types/kpi';
import { TrendIndicator } from './TrendIndicator';
import { Badge } from './Badge';
import { cn } from '../../utils/cn';
import { severityTopBarColors, severityTextClasses } from '../../utils/severity-styles';

interface KPITileProps {
  kpi: KPITileType;
  className?: string;
}

export function KPITile({ kpi, className }: KPITileProps) {
  return (
    <div className={cn(
      'bg-card backdrop-blur-[12px] border border-border-subtle rounded-lg p-3.5 transition-all duration-200 ease-in-out relative overflow-hidden hover:border-[rgba(148,163,184,0.25)] hover:-translate-y-px',
      'before:content-[""] before:absolute before:top-0 before:left-0 before:right-0 before:h-[2px]',
      severityTopBarColors[kpi.severity],
      className
    )}>
      <div className="flex justify-between items-center mb-2">
        <span className="text-[0.65rem] uppercase tracking-[0.08em] text-muted font-semibold">{kpi.label}</span>
        <Badge severity={kpi.severity} />
      </div>

      <div className={cn('text-[1.6rem] font-extrabold leading-none mb-1', severityTextClasses[kpi.severity])}>
        {kpi.value}
        <span className="text-[0.9rem] font-normal text-muted">{kpi.unit}</span>
      </div>

      <div className="text-[0.65rem] text-muted mb-1">Target: {kpi.target}</div>

      <div className={cn('text-[0.7rem] font-semibold mb-[0.35rem]', severityTextClasses[kpi.varianceSeverity])}>
        {kpi.variance}
      </div>

      <TrendIndicator trend={kpi.trend} label={kpi.trendLabel} />
    </div>
  );
}
