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
    <div className="flex gap-3 p-3 bg-card border border-border-subtle rounded-lg mb-2">
      <div className="w-7 h-7 rounded-full flex items-center justify-center text-[0.7rem] font-extrabold bg-accent text-white shrink-0">{action.priority}</div>
      <div>
        <div className="flex justify-between items-start gap-2 mb-[0.3rem]">
          <span className="text-[0.8rem] font-bold">{action.title}</span>
          <Badge severity={action.severity as Severity}>
            P{action.priority}
          </Badge>
        </div>
        <p className="text-[0.7rem] text-muted mb-[0.4rem] leading-[1.4]">{action.description}</p>
        <div className="flex gap-3 text-[0.65rem] text-muted mb-[0.4rem]">
          <span>💰 {action.impact}</span>
          <span>⏰ {action.deadline}</span>
          <span>👤 {action.owner}</span>
        </div>
        <div className="flex gap-[0.4rem] flex-wrap">
          {action.actions.map((btn, i) => (
            <button
              key={i}
              className="inline-flex items-center gap-[0.3rem] px-2.5 py-1 rounded-lg border border-border-subtle bg-card text-text-primary text-[0.65rem] font-semibold cursor-pointer transition-all duration-200 ease-in-out whitespace-nowrap hover:bg-white/[0.08] hover:border-[rgba(148,163,184,0.3)]"
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
