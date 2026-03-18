'use client';

import React from 'react';
import { OperationsData } from '../../types/operations';
import { ChartConfig } from '../../types/chart';
import { ChartWrapper } from '../dashboard/ChartWrapper';
import { DataTable } from '../dashboard/DataTable';
import { Panel } from '../layouts/Panel';
import { ContentSection } from '../layouts/ContentSection';
import { StatusPill } from '../dashboard/StatusPill';
import { Severity } from '../../enums';

interface OpsPageProps {
  operations: OperationsData;
  qualityChart: ChartConfig;
}

const downtimeColumns = [
  { key: 'plant',         label: 'Plant' },
  { key: 'machine',       label: 'Machine' },
  {
    key: 'state',
    label: 'State',
    render: (_: unknown, row: Record<string, unknown>) => (
      <StatusPill severity={row.severity as Severity} label={String(row.state)} />
    ),
  },
  { key: 'downtimeHours', label: 'Downtime (h)' },
  { key: 'reason',        label: 'Reason' },
  { key: 'impact',        label: 'Impact' },
  { key: 'mttr',          label: 'MTTR' },
];

const laborColumns = [
  { key: 'plant',     label: 'Plant' },
  { key: 'shift',     label: 'Shift' },
  { key: 'headcount', label: 'Headcount' },
  { key: 'required',  label: 'Required' },
  {
    key: 'coverage',
    label: 'Coverage',
    render: (_: unknown, row: Record<string, unknown>) => (
      <StatusPill severity={row.severity as Severity} label={String(row.coverage)} />
    ),
  },
  { key: 'notes', label: 'Notes' },
];

const materialColumns = [
  { key: 'plant',       label: 'Plant' },
  { key: 'material',    label: 'Material' },
  { key: 'stockDays',   label: 'Stock (D)' },
  { key: 'safetyStock', label: 'Safety (D)' },
  {
    key: 'impact',
    label: 'Impact',
    render: (_: unknown, row: Record<string, unknown>) => (
      <StatusPill severity={row.severity as Severity} label={String(row.impact)} />
    ),
  },
  { key: 'supplier', label: 'Supplier' },
  { key: 'notes',    label: 'Notes' },
];

export function OpsPage({ operations, qualityChart }: OpsPageProps) {
  return (
    <div className="page page--ops">
      <ContentSection>
        <div className="content-section__col">
          <Panel title="⚙️ Machine Downtime" id="downtime-panel">
            <DataTable
              columns={downtimeColumns}
              rows={operations.downtime as unknown as Record<string, unknown>[]}
            />
          </Panel>
        </div>
        <div className="content-section__col">
          <Panel title="👷 Labor Coverage" id="labor-panel">
            <DataTable
              columns={laborColumns}
              rows={operations.labor as unknown as Record<string, unknown>[]}
            />
          </Panel>
        </div>
        <div className="content-section__col">
          <Panel title="📦 Materials Status" id="materials-panel">
            <DataTable
              columns={materialColumns}
              rows={operations.materials as unknown as Record<string, unknown>[]}
            />
          </Panel>
        </div>
      </ContentSection>

      <ContentSection>
        <div className="content-section__primary">
          <Panel title="🔬 Quality Metrics — First Pass Yield" id="quality-panel">
            <ChartWrapper config={qualityChart} />
          </Panel>
        </div>
      </ContentSection>
    </div>
  );
}
