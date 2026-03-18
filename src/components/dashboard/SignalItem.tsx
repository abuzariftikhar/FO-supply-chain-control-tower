'use client';

import React from 'react';
import { SignalItem as SignalItemType } from '../../types/alert';

interface SignalItemProps {
  signal: SignalItemType;
}

export function SignalItem({ signal }: SignalItemProps) {
  return (
    <div className="signal-item">
      <span className="signal-item__label">{signal.label}</span>
      <span className="signal-item__value">{signal.value}</span>
    </div>
  );
}
