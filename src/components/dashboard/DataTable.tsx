'use client';

import React from 'react';
import { cn } from '../../utils/cn';

interface Column {
  key: string;
  label: string;
  field?: string;
  render?: (value: unknown, row: Record<string, unknown>) => React.ReactNode;
}

interface DataTableProps {
  columns: Column[];
  rows: Record<string, unknown>[];
  title?: string;
  className?: string;
}

const rowSeverityBorderClasses: Record<string, string> = {
  bad:  '[&>td:first-child]:border-l-2 [&>td:first-child]:border-l-bad',
  warn: '[&>td:first-child]:border-l-2 [&>td:first-child]:border-l-warn',
};

export function DataTable({ columns, rows, title, className }: DataTableProps) {
  return (
    <div className={cn('overflow-x-auto', className)}>
      {title && <h3>{title}</h3>}
      <table className="w-full border-collapse text-xs">
        <thead>
          <tr>
            {columns.map(col => (
              <th key={col.key} className="px-3 py-2 text-left text-[0.6rem] font-bold uppercase tracking-[0.06em] text-muted border-b border-border-subtle whitespace-nowrap">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIdx) => (
            <tr
              key={rowIdx}
              className={cn(
                'hover:bg-white/[0.02] last:[&>td]:border-b-0',
                rowSeverityBorderClasses[String(row.severity ?? '')]
              )}
            >
              {columns.map(col => {
                const field = col.field ?? col.key;
                const value = row[field];
                return (
                  <td key={col.key} className="px-3 py-2 border-b border-white/[0.04] align-middle">
                    {col.render
                      ? col.render(value, row)
                      : String(value ?? '')}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
