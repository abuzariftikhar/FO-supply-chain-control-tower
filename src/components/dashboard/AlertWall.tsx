'use client';

import React from 'react';
import { Alert } from '../../types/alert';
import { AlertGroup as AlertGroupEnum, Severity } from '../../enums';
import { AlertCard } from './AlertCard';

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
    <section className="alert-wall" id="alert-wall">
      <div className="alert-wall__header">
        <h2 className="alert-wall__title">⚡ Alert Wall</h2>
        <span className="badge badge--bad">{alerts.length} Active</span>
      </div>
      <div className="alert-wall__groups">
        {groups.map(group => (
          <div
            key={group.label}
            className={`alert-group alert-group--${group.severity}`}
          >
            <div className="alert-group__header">
              <span className="alert-group__label">{group.label}</span>
              <span className="alert-group__count">{group.alerts.length}</span>
            </div>
            <div className="alert-group__cards">
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
