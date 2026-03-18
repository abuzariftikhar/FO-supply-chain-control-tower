'use client';

import React from 'react';
import { cn } from '../../utils/cn';

interface PanelProps {
  id?: string;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function Panel({ id, title, children, className }: PanelProps) {
  return (
    <div id={id} className={cn('panel', className)}>
      {title && (
        <div className="panel__header">
          <h3 className="panel__title">{title}</h3>
        </div>
      )}
      <div className="panel__body">{children}</div>
    </div>
  );
}
