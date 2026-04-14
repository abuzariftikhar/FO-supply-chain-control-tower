'use client';

import React from 'react';
import { Severity } from '../../enums';
import { cn } from '../../utils/cn';
import { severityPillClasses } from '../../utils/severity-styles';

interface StatusPillProps {
  severity: Severity;
  label: string;
  className?: string;
}

export function StatusPill({ severity, label, className }: StatusPillProps) {
  return (
    <span className={cn(
      'inline-flex items-center px-2 py-[0.2rem] rounded-[20px] text-[0.65rem] font-semibold',
      severityPillClasses[severity],
      className
    )}>
      {label}
    </span>
  );
}
