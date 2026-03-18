'use client';

import React, { useEffect, useRef } from 'react';
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ScatterController,
  BarController,
  LineController,
} from 'chart.js';
import { ChartConfig } from '../../types/chart';
import { buildChartConfig } from '../../lib/chart-config';

Chart.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ScatterController,
  BarController,
  LineController
);

interface ChartWrapperProps {
  config: ChartConfig;
  className?: string;
}

export function ChartWrapper({ config, className }: ChartWrapperProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const chartConfig = buildChartConfig(config);

    chartRef.current = new Chart(canvasRef.current, {
      type: chartConfig.type as 'bar' | 'line' | 'scatter',
      data: chartConfig.data,
      options: {
        ...chartConfig.options,
        color: '#e2e8f0',
        plugins: {
          ...((chartConfig.options?.plugins as object) ?? {}),
          legend: {
            ...(((chartConfig.options?.plugins as Record<string, unknown>)?.legend as object) ?? {}),
            labels: { color: '#94a3b8' },
          },
          title: { color: '#e2e8f0' },
        },
        scales: Object.fromEntries(
          Object.entries((chartConfig.options?.scales as Record<string, unknown>) ?? {}).map(
            ([k, v]) => [
              k,
              {
                ...(v as object),
                ticks: { color: '#94a3b8' },
                grid: { color: 'rgba(255,255,255,0.05)' },
                title: { ...(((v as Record<string, unknown>)?.title as object) ?? {}), color: '#94a3b8' },
              },
            ]
          )
        ),
      },
    });

    return () => {
      chartRef.current?.destroy();
    };
  }, [config]);

  return (
    <div className={`chart-container ${className ?? ''}`}>
      {config.title && (
        <div className="chart-container__header">
          <h3 className="chart-container__title">{config.title}</h3>
          {config.description && (
            <p className="chart-container__description">{config.description}</p>
          )}
        </div>
      )}
      <div className="chart-container__canvas-wrapper">
        <canvas ref={canvasRef} id={`chart-${config.id}`} />
      </div>
    </div>
  );
}
