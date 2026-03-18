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

export function DataTable({ columns, rows, title, className }: DataTableProps) {
  return (
    <div className={cn('data-table-wrapper', className)}>
      {title && <h3 className="data-table__title">{title}</h3>}
      <table className="data-table">
        <thead>
          <tr>
            {columns.map(col => (
              <th key={col.key} className="data-table__th">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIdx) => (
            <tr
              key={rowIdx}
              className={`data-table__row data-table__row--${String(row.severity ?? '')}`}
            >
              {columns.map(col => {
                const field = col.field ?? col.key;
                const value = row[field];
                return (
                  <td key={col.key} className="data-table__td">
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
