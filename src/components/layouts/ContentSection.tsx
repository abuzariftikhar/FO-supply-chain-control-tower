'use client';

import React from 'react';
import { cn } from '../../utils/cn';

interface ContentSectionProps {
  children: React.ReactNode;
  className?: string;
}

export function ContentSection({ children, className }: ContentSectionProps) {
  return (
    <div className={cn('content-section', className)}>{children}</div>
  );
}
