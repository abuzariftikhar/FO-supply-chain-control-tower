'use client';

import React from 'react';
import { Alert } from '../../types/alert';
import { KPITile } from '../../types/kpi';
import { ChartConfig } from '../../types/chart';
import { AlertWall } from '../dashboard/AlertWall';
import { KPIGrid } from '../dashboard/KPIGrid';
import { ChartWrapper } from '../dashboard/ChartWrapper';
import { ActionItem } from '../dashboard/ActionItem';
import { Panel } from '../layouts/Panel';
import { ContentSection } from '../layouts/ContentSection';
import { useDashboard } from '../../context/DashboardContext';
import { PageId } from '../../enums';
import { ModalActionType } from '../../enums';

interface ExecutivePageProps {
  alerts: Alert[];
  kpis: KPITile[];
  actions: unknown[];
  waterfallChart: ChartConfig;
  capacityChart: ChartConfig;
}

export function ExecutivePage({
  alerts,
  kpis,
  actions,
  waterfallChart,
  capacityChart,
}: ExecutivePageProps) {
  const { setActivePage } = useDashboard();

  function handleAction(type: string, target: string) {
    if (type === ModalActionType.Navigate || type === ModalActionType.Drilldown) {
      const page = target.split('?')[0] as PageId;
      if (Object.values(PageId).includes(page)) {
        setActivePage(page);
      }
    }
  }

  return (
    <div className="min-h-[calc(100vh-64px-2.5rem)]">
      <AlertWall alerts={alerts} />

      <KPIGrid kpis={kpis} />

      <ContentSection>
        <div className="min-w-0">
          <Panel title="🎯 Decision Actions" id="actions-panel">
            {(actions as Array<{
              id: string;
              priority: number;
              severity: string;
              title: string;
              description: string;
              impact: string;
              deadline: string;
              owner: string;
              actions: Array<{ type: ModalActionType; label: string; target: string }>;
            }>).map(action => (
              <ActionItem key={action.id} action={action} onAction={handleAction} />
            ))}
          </Panel>
        </div>

        <div className="min-w-0">
          <Panel title="💹 Revenue Waterfall" id="waterfall-panel">
            <ChartWrapper config={waterfallChart} />
          </Panel>
          <Panel title="📊 Network Capacity vs Demand" id="capacity-chart-panel">
            <ChartWrapper config={capacityChart} />
          </Panel>
        </div>
      </ContentSection>
    </div>
  );
}
