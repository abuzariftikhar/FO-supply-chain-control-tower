'use client';

import React from 'react';
import { Severity } from '../../enums';
import { SeverityLabelMap } from '../../lib/enum-helpers';
import { cn } from '../../utils/cn';

interface BadgeProps {
  severity: Severity;
  children?: React.ReactNode;
  className?: string;
}

export function Badge({ severity, children, className }: BadgeProps) {
  const label = children ?? SeverityLabelMap[severity];
  return (
    <span className={cn(`badge badge--${severity}`, className)}>
      {label}
    </span>
  );
}
