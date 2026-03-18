'use client';

import React from 'react';
import { KPITile as KPITileType } from '../../types/kpi';
import { KPITile } from './KPITile';

interface KPIGridProps {
  kpis: KPITileType[];
}

export function KPIGrid({ kpis }: KPIGridProps) {
  return (
    <section className="kpi-grid" id="kpi-grid">
      {kpis.map(kpi => (
        <KPITile key={kpi.id} kpi={kpi} />
      ))}
    </section>
  );
}
