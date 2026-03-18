'use client';

import React from 'react';
import { Severity } from '../../enums';
import { cn } from '../../utils/cn';

interface StatusPillProps {
  severity: Severity;
  label: string;
  className?: string;
}

export function StatusPill({ severity, label, className }: StatusPillProps) {
  return (
    <span className={cn(`status-pill status-pill--${severity}`, className)}>
      {label}
    </span>
  );
}
