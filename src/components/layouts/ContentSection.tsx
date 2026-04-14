'use client';

import React from 'react';
import { cn } from '../../utils/cn';

interface ContentSectionProps {
  children: React.ReactNode;
  className?: string;
}

export function ContentSection({ children, className }: ContentSectionProps) {
  return (
    <div className={cn('grid grid-cols-[2fr_1fr] gap-4 mb-4 max-lg:grid-cols-1 [&>*]:min-w-0', className)}>{children}</div>
  );
}
