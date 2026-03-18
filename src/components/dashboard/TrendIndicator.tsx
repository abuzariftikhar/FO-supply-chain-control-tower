'use client';

import React from 'react';
import { TrendDirection } from '../../enums';
import { TrendArrowMap } from '../../lib/enum-helpers';
import { cn } from '../../utils/cn';

interface TrendIndicatorProps {
  trend: TrendDirection;
  label?: string;
  className?: string;
}

export function TrendIndicator({ trend, label, className }: TrendIndicatorProps) {
  return (
    <span className={cn(`trend-indicator trend-indicator--${trend}`, className)}>
      {TrendArrowMap[trend]}
      {label && ` ${label}`}
    </span>
  );
}
