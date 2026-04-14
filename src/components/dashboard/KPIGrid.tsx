'use client';

import React from 'react';
import { KPITile as KPITileType } from '../../types/kpi';
import { KPITile } from './KPITile';

interface KPIGridProps {
  kpis: KPITileType[];
}

export function KPIGrid({ kpis }: KPIGridProps) {
  return (
    <section className="grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-3 mb-4" id="kpi-grid">
      {kpis.map(kpi => (
        <KPITile key={kpi.id} kpi={kpi} />
      ))}
    </section>
  );
}
