'use client';

import React from 'react';
import { cn } from '../../utils/cn';

interface ChipProps {
  label: string;
  variant?: string;
  className?: string;
}

export function Chip({ label, variant, className }: ChipProps) {
  return (
    <span className={cn('chip', variant ? `chip--${variant}` : '', className)}>
      {label}
    </span>
  );
}
