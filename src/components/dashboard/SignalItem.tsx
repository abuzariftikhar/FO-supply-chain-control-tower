'use client';

import React from 'react';
import { SignalItem as SignalItemType } from '../../types/alert';

interface SignalItemProps {
  signal: SignalItemType;
}

export function SignalItem({ signal }: SignalItemProps) {
  return (
    <div className="flex justify-between items-center py-[0.35rem] border-b border-border-subtle text-[0.7rem] last:border-b-0">
      <span className="text-muted">{signal.label}</span>
      <span className="font-semibold text-text-primary">{signal.value}</span>
    </div>
  );
}
