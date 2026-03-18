'use client';

import React from 'react';
import { HeatmapCell as HeatmapCellType } from '../../types/heatmap';

interface HeatmapCellProps {
  cell: HeatmapCellType;
}

export function HeatmapCell({ cell }: HeatmapCellProps) {
  return (
    <td
      className={`heatmap-cell heatmap-cell--${cell.severity}`}
      title={cell.tooltip}
    >
      {cell.value}
    </td>
  );
}
