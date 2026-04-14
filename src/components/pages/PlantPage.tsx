'use client';

import React, { useEffect, useRef } from 'react';
import { PlantProfile } from '../../types/plant';
import { PlantId } from '../../enums';
import { PlantHeader } from '../dashboard/PlantHeader';
import { KPIGrid } from '../dashboard/KPIGrid';
import { Panel } from '../layouts/Panel';
import { ContentSection } from '../layouts/ContentSection';
import { Badge } from '../dashboard/Badge';
import { ConstraintSeverity, Severity } from '../../enums';
import { RiskCategoryColorMap } from '../../lib/enum-helpers';
import { RiskCategory } from '../../enums';
import { constraintBorderClasses, riskFillClasses, riskScoreClasses } from '../../utils/severity-styles';
import {
  Chart, CategoryScale, LinearScale, LineElement, PointElement,
  Legend, Filler, LineController, Tooltip,
} from 'chart.js';

Chart.register(
  CategoryScale, LinearScale, LineElement, PointElement,
  Legend, Filler, LineController, Tooltip
);

interface PlantPageProps {
  plant: PlantProfile;
  allPlants: PlantProfile[];
  onSelectPlant: (id: PlantId) => void;
}

const constraintSeverityToSeverity: Record<ConstraintSeverity, Severity> = {
  [ConstraintSeverity.High]:   Severity.Bad,
  [ConstraintSeverity.Medium]: Severity.Warn,
  [ConstraintSeverity.Low]:    Severity.Good,
};

export function PlantPage({ plant, allPlants, onSelectPlant }: PlantPageProps) {
  const trendCanvasRef = useRef<HTMLCanvasElement>(null);
  const trendChartRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (!trendCanvasRef.current) return;
    trendChartRef.current?.destroy();

    trendChartRef.current = new Chart(trendCanvasRef.current, {
      type: 'line',
      data: {
        labels: plant.trend.labels,
        datasets: [
          {
            label: 'Utilization %',
            data: plant.trend.utilization,
            borderColor: '#3b82f6',
            fill: false,
            tension: 0.3,
          },
          {
            label: 'OEE %',
            data: plant.trend.oee,
            borderColor: '#10b981',
            fill: false,
            tension: 0.3,
          },
          {
            label: 'OTIF %',
            data: plant.trend.otif,
            borderColor: '#f59e0b',
            fill: false,
            tension: 0.3,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'bottom', labels: { color: '#94a3b8' } },
        },
        scales: {
          x: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(255,255,255,0.05)' } },
          y: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(255,255,255,0.05)' }, min: 50, max: 100 },
        },
      },
    });

    return () => { trendChartRef.current?.destroy(); };
  }, [plant]);

  return (
    <div className="min-h-[calc(100vh-64px-2.5rem)]">
      <div className="flex gap-2 flex-wrap mb-4">
        {allPlants.map(p => (
          <button
            key={p.id}
            className={`flex items-center gap-[0.4rem] px-3 py-[0.35rem] border rounded-[20px] text-[0.72rem] font-semibold cursor-pointer transition-all duration-200 ease-in-out ${
              p.id === plant.id
                ? 'bg-accent border-accent text-white'
                : 'bg-card border-border-subtle text-muted hover:border-accent hover:text-text-primary'
            }`}
            onClick={() => onSelectPlant(p.id as PlantId)}
          >
            <span className={`inline-flex items-center px-[0.45rem] py-[0.15rem] rounded text-[0.6rem] font-extrabold uppercase tracking-[0.07em] ${
              p.overallSeverity === 'bad' ? 'bg-bad-bg text-bad border border-bad' :
              p.overallSeverity === 'warn' ? 'bg-warn-bg text-warn border border-warn' :
              p.overallSeverity === 'good' ? 'bg-good-bg text-good border border-good' :
              'bg-info-bg text-info border border-info'
            }`} />
            {p.id}
          </button>
        ))}
      </div>

      <PlantHeader plant={plant} />
      <KPIGrid kpis={plant.kpis} />

      <ContentSection>
        <div className="min-w-0">
          <Panel title="📈 Performance Trends (14D)" id="plant-trend-panel">
            <div style={{ height: '300px', position: 'relative' }}>
              <canvas ref={trendCanvasRef} />
            </div>
          </Panel>
        </div>

        <div className="min-w-0">
          <Panel title="⚠️ Constraints & Risks" id="constraints-panel">
            {plant.constraints.map(c => (
              <div
                key={c.id}
                className={`px-3 py-2.5 bg-card border border-border-subtle rounded-lg mb-2 ${
                  constraintBorderClasses[c.severity] ?? ''
                }`}
              >
                <div className="flex items-center gap-2 mb-[0.3rem]">
                  <Badge
                    severity={constraintSeverityToSeverity[c.severity as ConstraintSeverity] ?? Severity.Info}
                  >
                    {String(c.severity).toUpperCase()}
                  </Badge>
                  <strong>{c.label}</strong>
                </div>
                <p className="text-[0.7rem] text-muted leading-[1.4]">{c.detail}</p>
              </div>
            ))}
          </Panel>

          <Panel title="📊 Risk Decomposition" id="risk-panel">
            {plant.riskDecomposition.map(risk => (
              <div key={risk.category} className="flex items-center gap-3 mb-2">
                <span className="text-[0.7rem] font-semibold w-[80px] shrink-0 text-muted">{risk.category}</span>
                <div className="flex-1 h-2 bg-white/5 rounded overflow-hidden">
                  <div
                    className={`h-full rounded transition-[width] duration-[0.6s] ease-in-out ${riskFillClasses[risk.severity] ?? ''}`}
                    style={{
                      width: `${risk.score}%`,
                      backgroundColor: RiskCategoryColorMap[risk.category as RiskCategory],
                    }}
                  />
                </div>
                <span className={`text-[0.7rem] font-bold w-8 text-right ${riskScoreClasses[risk.severity] ?? ''}`}>
                  {risk.score}
                </span>
              </div>
            ))}
          </Panel>
        </div>
      </ContentSection>
    </div>
  );
}
