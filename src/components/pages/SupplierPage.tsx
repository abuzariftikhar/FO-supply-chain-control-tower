'use client';

import React from 'react';
import { KPITile } from '../../types/kpi';
import { Supplier } from '../../types/supplier';
import { ChartConfig } from '../../types/chart';
import { KPIGrid } from '../dashboard/KPIGrid';
import { ChartWrapper } from '../dashboard/ChartWrapper';
import { DataTable } from '../dashboard/DataTable';
import { Panel } from '../layouts/Panel';
import { ContentSection } from '../layouts/ContentSection';
import { StatusPill } from '../dashboard/StatusPill';
import { Severity } from '../../enums';

interface SupplierPageProps {
  kpis: KPITile[];
  suppliers: Supplier[];
  supplierRiskChart: ChartConfig;
}

const supplierColumns = [
  { key: 'name',      label: 'Supplier' },
  { key: 'part',      label: 'Part / Material' },
  { key: 'leadTime',  label: 'Lead Time' },
  { key: 'onTime',    label: 'On-Time %' },
  { key: 'exposure',  label: 'Exposure' },
  { key: 'alternates',label: 'Alternates' },
  {
    key: 'riskLevel',
    label: 'Risk',
    render: (_: unknown, row: Record<string, unknown>) => (
      <StatusPill
        severity={row.severity as Severity}
        label={String(row.riskLevel).toUpperCase()}
      />
    ),
  },
  { key: 'notes', label: 'Notes' },
];

export function SupplierPage({
  kpis,
  suppliers,
  supplierRiskChart,
}: SupplierPageProps) {
  return (
    <div className="page page--supplier">
      <KPIGrid kpis={kpis} />

      <ContentSection>
        <div className="content-section__primary">
          <Panel title="🗺️ Supplier Risk Matrix" id="supplier-risk-panel">
            <ChartWrapper config={supplierRiskChart} />
          </Panel>
        </div>
        <div className="content-section__secondary">
          <Panel title="🤝 Supplier Exposure" id="supplier-table-panel">
            <DataTable
              columns={supplierColumns}
              rows={suppliers as unknown as Record<string, unknown>[]}
            />
          </Panel>
        </div>
      </ContentSection>
    </div>
  );
}
