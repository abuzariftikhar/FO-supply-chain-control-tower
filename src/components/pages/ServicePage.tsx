'use client';

import React from 'react';
import { KPITile } from '../../types/kpi';
import { Order } from '../../types/order';
import { ChartConfig } from '../../types/chart';
import { KPIGrid } from '../dashboard/KPIGrid';
import { ChartWrapper } from '../dashboard/ChartWrapper';
import { DataTable } from '../dashboard/DataTable';
import { Panel } from '../layouts/Panel';
import { ContentSection } from '../layouts/ContentSection';
import { StatusPill } from '../dashboard/StatusPill';
import { Severity } from '../../enums';

interface ServicePageProps {
  kpis: KPITile[];
  orders: Order[];
  otifChart: ChartConfig;
  backorderChart: ChartConfig;
}

const orderColumns = [
  { key: 'id',       label: 'Order #' },
  { key: 'customer', label: 'Customer' },
  { key: 'part',     label: 'Part' },
  { key: 'qty',      label: 'Qty' },
  { key: 'dueDate',  label: 'Due Date' },
  { key: 'plant',    label: 'Plant' },
  { key: 'risk',     label: 'Risk Factor' },
  {
    key: 'status',
    label: 'Status',
    render: (_: unknown, row: Record<string, unknown>) => (
      <StatusPill severity={row.severity as Severity} label={String(row.status)} />
    ),
  },
  { key: 'value', label: 'Value' },
];

export function ServicePage({
  kpis,
  orders,
  otifChart,
  backorderChart,
}: ServicePageProps) {
  return (
    <div className="page page--service">
      <KPIGrid kpis={kpis} />

      <ContentSection>
        <div className="content-section__primary">
          <Panel title="📈 OTIF Trend (14D)" id="otif-panel">
            <ChartWrapper config={otifChart} />
          </Panel>
          <Panel title="📉 Backorder Trend" id="backorder-panel">
            <ChartWrapper config={backorderChart} />
          </Panel>
        </div>
        <div className="content-section__secondary">
          <Panel title="⚠️ Orders at Risk" id="orders-panel">
            <DataTable
              columns={orderColumns}
              rows={orders as unknown as Record<string, unknown>[]}
            />
          </Panel>
        </div>
      </ContentSection>
    </div>
  );
}
