'use client';

import React from 'react';
import { KPITile } from '../../types/kpi';
import { HeatmapData } from '../../types/heatmap';
import { ChartConfig } from '../../types/chart';
import { KPIGrid } from '../dashboard/KPIGrid';
import { HeatmapGrid } from '../dashboard/HeatmapGrid';
import { ChartWrapper } from '../dashboard/ChartWrapper';
import { Panel } from '../layouts/Panel';
import { ContentSection } from '../layouts/ContentSection';

interface CapacityPageProps {
  kpis: KPITile[];
  heatmap: HeatmapData;
  demandCapacityChart: ChartConfig;
  scheduleChart: ChartConfig;
}

export function CapacityPage({
  kpis,
  heatmap,
  demandCapacityChart,
  scheduleChart,
}: CapacityPageProps) {
  return (
    <div className="page page--capacity">
      <KPIGrid kpis={kpis} />

      <Panel title="🗺️ Capacity Heatmap — Plant × Metric" id="heatmap-panel">
        <HeatmapGrid heatmap={heatmap} />
      </Panel>

      <ContentSection>
        <div className="content-section__primary">
          <Panel title="📊 Demand vs Capacity (14D)" id="demand-capacity-panel">
            <ChartWrapper config={demandCapacityChart} />
          </Panel>
        </div>
        <div className="content-section__secondary">
          <Panel title="📋 Schedule Adherence" id="schedule-panel">
            <ChartWrapper config={scheduleChart} />
          </Panel>
        </div>
      </ContentSection>
    </div>
  );
}
