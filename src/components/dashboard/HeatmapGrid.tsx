'use client';

import React from 'react';
import { HeatmapData, HeatmapCell as HeatmapCellType } from '../../types/heatmap';
import { HeatmapCell } from './HeatmapCell';

interface HeatmapGridProps {
  heatmap: HeatmapData;
}

export function HeatmapGrid({ heatmap }: HeatmapGridProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-xs">
        <thead>
          <tr>
            <th className="px-3 py-[0.4rem] text-left text-[0.65rem] font-bold uppercase tracking-[0.06em] text-muted border-b border-border-subtle bg-white/[0.02]">Plant</th>
            {heatmap.metrics.map(metric => (
              <th key={metric} className="px-3 py-[0.4rem] text-center text-[0.65rem] font-bold uppercase tracking-[0.06em] text-muted border-b border-border-subtle bg-white/[0.02]">
                {metric}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {heatmap.rows.map(row => (
            <tr key={row.plant}>
              <td className="px-3 py-2 font-semibold border-r border-border-subtle whitespace-nowrap">{row.plant}</td>
              {row.cells.map((cell: HeatmapCellType, i: number) => (
                <HeatmapCell key={i} cell={cell} />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
