'use client';

import React from 'react';
import { HeatmapData, HeatmapCell as HeatmapCellType } from '../../types/heatmap';
import { HeatmapCell } from './HeatmapCell';

interface HeatmapGridProps {
  heatmap: HeatmapData;
}

export function HeatmapGrid({ heatmap }: HeatmapGridProps) {
  return (
    <div className="heatmap-grid">
      <table className="heatmap-table">
        <thead>
          <tr>
            <th className="heatmap-table__corner">Plant</th>
            {heatmap.metrics.map(metric => (
              <th key={metric} className="heatmap-table__metric">
                {metric}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {heatmap.rows.map(row => (
            <tr key={row.plant} className="heatmap-table__row">
              <td className="heatmap-table__plant">{row.plant}</td>
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
