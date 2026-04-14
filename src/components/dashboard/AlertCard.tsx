'use client';

import React from 'react';
import { Alert } from '../../types/alert';
import { Badge } from './Badge';
import { Chip } from './Chip';
import { useModal } from '../../hooks/useModal';
import { cn } from '../../utils/cn';
import { severityBorderLeftClasses } from '../../utils/severity-styles';

interface AlertCardProps {
  alert: Alert;
  className?: string;
}

export function AlertCard({ alert, className }: AlertCardProps) {
  const { showAlertModal } = useModal();

  return (
    <article
      className={cn(
        'bg-card border border-border-subtle rounded-lg p-3 cursor-pointer transition-all duration-200 ease-in-out hover:border-[rgba(148,163,184,0.3)] hover:-translate-y-px',
        severityBorderLeftClasses[alert.severity],
        className
      )}
      onClick={() => showAlertModal(alert)}
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && showAlertModal(alert)}
    >
      <div className="flex items-center gap-2 mb-[0.4rem] flex-wrap">
        <Badge severity={alert.severity} />
        <div className="flex gap-[0.4rem] flex-wrap flex-1">
          <span className="text-[0.6rem] text-muted bg-white/5 px-[0.4rem] py-[0.1rem] rounded">🏭 {alert.plant}</span>
          <span className="text-[0.6rem] text-muted bg-white/5 px-[0.4rem] py-[0.1rem] rounded">⏱ {alert.horizon}</span>
          <span className="text-[0.6rem] text-muted bg-white/5 px-[0.4rem] py-[0.1rem] rounded">📊 {alert.kpi}</span>
        </div>
      </div>

      <h3 className="text-xs font-bold mb-1 leading-[1.3]">{alert.title}</h3>
      <p className="text-[0.65rem] text-muted mb-[0.35rem]">💰 {alert.impact}</p>

      <div className="flex gap-[0.3rem] flex-wrap mb-[0.4rem]">
        {alert.tags.map(tag => (
          <Chip key={tag} label={tag} variant={alert.severity} />
        ))}
      </div>

      <div className="text-[0.65rem] text-muted bg-white/[0.03] px-2 py-[0.4rem] rounded leading-[1.4]">
        <strong>💡 Suggested Action:</strong> {alert.suggestion}
      </div>
    </article>
  );
}
