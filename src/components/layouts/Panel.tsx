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
    <div id={id} className={cn('bg-panel backdrop-blur-[12px] border border-border-subtle rounded-xl shadow-panel mb-4 overflow-hidden', className)}>
      {title && (
        <div className="px-4 py-3 border-b border-border-subtle bg-white/[0.02]">
          <h3 className="text-[0.8rem] font-bold text-muted uppercase tracking-[0.08em]">{title}</h3>
        </div>
      )}
      <div className="p-4">{children}</div>
    </div>
  );
}
