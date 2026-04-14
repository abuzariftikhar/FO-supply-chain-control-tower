'use client';

import React from 'react';
import { TrendDirection } from '../../enums';
import { TrendArrowMap } from '../../lib/enum-helpers';
import { cn } from '../../utils/cn';

const trendColorClasses: Record<string, string> = {
  up:   'text-bad',
  down: 'text-warn',
  flat: 'text-muted',
};

interface TrendIndicatorProps {
  trend: TrendDirection;
  label?: string;
  className?: string;
}

export function TrendIndicator({ trend, label, className }: TrendIndicatorProps) {
  return (
    <span className={cn(
      'text-[0.65rem] font-semibold',
      trendColorClasses[trend],
      className
    )}>
      {TrendArrowMap[trend]}
      {label && ` ${label}`}
    </span>
  );
}
