'use client';

import React from 'react';
import { Severity } from '../../enums';
import { SeverityLabelMap } from '../../lib/enum-helpers';
import { cn } from '../../utils/cn';
import { severityBadgeClasses } from '../../utils/severity-styles';

interface BadgeProps {
  severity: Severity;
  children?: React.ReactNode;
  className?: string;
}

export function Badge({ severity, children, className }: BadgeProps) {
  const label = children ?? SeverityLabelMap[severity];
  return (
    <span className={cn(
      'inline-flex items-center px-[0.45rem] py-[0.15rem] rounded text-[0.6rem] font-extrabold uppercase tracking-[0.07em]',
      severityBadgeClasses[severity],
      className
    )}>
      {label}
    </span>
  );
}
