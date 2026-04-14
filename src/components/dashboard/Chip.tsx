'use client';

import React from 'react';
import { cn } from '../../utils/cn';
import { severityChipClasses } from '../../utils/severity-styles';

interface ChipProps {
  label: string;
  variant?: string;
  className?: string;
}

export function Chip({ label, variant, className }: ChipProps) {
  return (
    <span className={cn(
      'inline-flex items-center px-2 py-[0.15rem] rounded-[20px] text-[0.65rem] font-semibold border',
      variant ? severityChipClasses[variant] : 'bg-card border-border-subtle text-muted',
      className
    )}>
      {label}
    </span>
  );
}
