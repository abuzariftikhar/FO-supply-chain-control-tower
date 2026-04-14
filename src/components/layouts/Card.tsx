'use client';

import React from 'react';
import { cn } from '../../utils/cn';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return <div className={cn('bg-card border border-border-subtle rounded-lg p-4', className)}>{children}</div>;
}
