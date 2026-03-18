'use client';

import React from 'react';
import { ModalData } from '../../types/modal';
import { ModalActionTypeIconMap } from '../../lib/enum-helpers';
import { Badge } from './Badge';
import { Severity } from '../../enums';

interface ActionItemProps {
  action: {
    id: string;
    priority: number;
    severity: string;
    title: string;
    description: string;
    impact: string;
    deadline: string;
    owner: string;
    actions: ModalData['actions'];
  };
  onAction?: (type: string, target: string) => void;
}

export function ActionItem({ action, onAction }: ActionItemProps) {
  return (
    <div className={`action-item action-item--p${action.priority}`}>
      <div className="action-item__priority">{action.priority}</div>
      <div className="action-item__body">
        <div className="action-item__header">
          <span className="action-item__title">{action.title}</span>
          <Badge severity={action.severity as Severity}>
            P{action.priority}
          </Badge>
        </div>
        <p className="action-item__description">{action.description}</p>
        <div className="action-item__meta">
          <span>💰 {action.impact}</span>
          <span>⏰ {action.deadline}</span>
          <span>👤 {action.owner}</span>
        </div>
        <div className="action-item__actions">
          {action.actions.map((btn, i) => (
            <button
              key={i}
              className="btn btn--sm"
              onClick={() => onAction?.(btn.type, btn.target)}
            >
              {ModalActionTypeIconMap[btn.type]} {btn.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
