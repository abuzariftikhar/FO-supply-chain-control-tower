'use client';

import React from 'react';
import { KPITile } from '../../types/kpi';
import { ChartConfig } from '../../types/chart';
import { KPIGrid } from '../dashboard/KPIGrid';
import { ChartWrapper } from '../dashboard/ChartWrapper';
import { Panel } from '../layouts/Panel';
import { ContentSection } from '../layouts/ContentSection';

interface InventoryPageProps {
  kpis: KPITile[];
  dohChart: ChartConfig;
  agingChart: ChartConfig;
  wipChart: ChartConfig;
}

export function InventoryPage({
  kpis,
  dohChart,
  agingChart,
  wipChart,
}: InventoryPageProps) {
  return (
    <div className="page page--inventory">
      <KPIGrid kpis={kpis} />

      <ContentSection>
        <div className="content-section__primary">
          <Panel title="📅 Days on Hand Trend" id="doh-panel">
            <ChartWrapper config={dohChart} />
          </Panel>
        </div>
        <div className="content-section__secondary">
          <Panel title="📦 Inventory Aging" id="aging-panel">
            <ChartWrapper config={agingChart} />
          </Panel>
          <Panel title="🔧 WIP by Plant" id="wip-panel">
            <ChartWrapper config={wipChart} />
          </Panel>
        </div>
      </ContentSection>
    </div>
  );
}
