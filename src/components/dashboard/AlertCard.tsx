'use client';

import React from 'react';
import { Alert } from '../../types/alert';
import { Badge } from './Badge';
import { Chip } from './Chip';
import { useModal } from '../../hooks/useModal';
import { cn } from '../../utils/cn';

interface AlertCardProps {
  alert: Alert;
  className?: string;
}

export function AlertCard({ alert, className }: AlertCardProps) {
  const { showAlertModal } = useModal();

  return (
    <article
      className={cn(`alert-card alert-card--${alert.severity}`, className)}
      onClick={() => showAlertModal(alert)}
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && showAlertModal(alert)}
    >
      <div className="alert-card__header">
        <Badge severity={alert.severity} />
        <div className="alert-card__meta">
          <span className="alert-card__plant">🏭 {alert.plant}</span>
          <span className="alert-card__horizon">⏱ {alert.horizon}</span>
          <span className="alert-card__kpi">📊 {alert.kpi}</span>
        </div>
      </div>

      <h3 className="alert-card__title">{alert.title}</h3>
      <p className="alert-card__impact">💰 {alert.impact}</p>

      <div className="alert-card__tags">
        {alert.tags.map(tag => (
          <Chip key={tag} label={tag} variant={alert.severity} />
        ))}
      </div>

      <div className="alert-card__suggestion">
        <strong>💡 Suggested Action:</strong> {alert.suggestion}
      </div>
    </article>
  );
}
