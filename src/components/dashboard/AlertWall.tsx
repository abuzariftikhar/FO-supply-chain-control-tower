'use client';

import React from 'react';
import { Alert } from '../../types/alert';
import { AlertGroup as AlertGroupEnum, Severity } from '../../enums';
import { AlertCard } from './AlertCard';
import { severityBorderClasses } from '../../utils/severity-styles';

interface AlertGroup {
  label: AlertGroupEnum;
  severity: Severity;
  alerts: Alert[];
}

interface AlertWallProps {
  alerts: Alert[];
}

function groupAlerts(alerts: Alert[]): AlertGroup[] {
  const groupMap = new Map<AlertGroupEnum, AlertGroup>();

  for (const alert of alerts) {
    const existing = groupMap.get(alert.group);
    if (existing) {
      existing.alerts.push(alert);
    } else {
      groupMap.set(alert.group, {
        label: alert.group,
        severity: alert.severity,
        alerts: [alert],
      });
    }
  }

  return Array.from(groupMap.values());
}

export function AlertWall({ alerts }: AlertWallProps) {
  const groups = groupAlerts(alerts);

  return (
    <section className="mb-4" id="alert-wall">
      <div className="flex items-center gap-3 mb-3">
        <h2 className="text-base font-bold">⚡ Alert Wall</h2>
        <span className="inline-flex items-center px-[0.45rem] py-[0.15rem] rounded text-[0.6rem] font-extrabold uppercase tracking-[0.07em] bg-bad-bg text-bad border border-bad">{alerts.length} Active</span>
      </div>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-3">
        {groups.map(group => (
          <div
            key={group.label}
            className={`bg-panel backdrop-blur-[12px] border border-border-subtle rounded-xl overflow-hidden ${
              severityBorderClasses[group.severity] ?? ''
            }`}
          >
            <div className="flex justify-between items-center px-3 py-2 border-b border-border-subtle bg-white/[0.02]">
              <span className="text-[0.65rem] font-bold uppercase tracking-[0.08em] text-muted">{group.label}</span>
              <span className="text-[0.65rem] bg-card px-[0.4rem] py-[0.1rem] rounded-[20px] text-muted">{group.alerts.length}</span>
            </div>
            <div className="p-2 flex flex-col gap-2">
              {group.alerts.map(alert => (
                <AlertCard key={alert.id} alert={alert} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
