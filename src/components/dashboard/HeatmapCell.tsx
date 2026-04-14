'use client';

import React from 'react';
import { HeatmapCell as HeatmapCellType } from '../../types/heatmap';

interface HeatmapCellProps {
  cell: HeatmapCellType;
}

const cellSeverityClasses: Record<string, string> = {
  bad:  'bg-bad-bg text-bad',
  warn: 'bg-warn-bg text-warn',
  good: 'bg-good-bg text-good',
  info: 'bg-info-bg text-info',
};

export function HeatmapCell({ cell }: HeatmapCellProps) {
  return (
    <td
      className={`text-center px-2.5 py-2 text-xs font-bold border border-white/[0.04] cursor-default transition-all duration-200 ease-in-out hover:brightness-[1.2] ${
        cellSeverityClasses[cell.severity] ?? ''
      }`}
      title={cell.tooltip}
    >
      {cell.value}
    </td>
  );
}
