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
    <div className="page page--plant">
      <div className="plant-selector">
        {allPlants.map(p => (
          <button
            key={p.id}
            className={`plant-pill${p.id === plant.id ? ' plant-pill--active' : ''}`}
            onClick={() => onSelectPlant(p.id as PlantId)}
          >
            <span className={`badge badge--${p.overallSeverity}`} />
            {p.id}
          </button>
        ))}
      </div>

      <PlantHeader plant={plant} />
      <KPIGrid kpis={plant.kpis} />

      <ContentSection>
        <div className="content-section__primary">
          <Panel title="📈 Performance Trends (14D)" id="plant-trend-panel">
            <div style={{ height: '300px', position: 'relative' }}>
              <canvas ref={trendCanvasRef} />
            </div>
          </Panel>
        </div>

        <div className="content-section__secondary">
          <Panel title="⚠️ Constraints & Risks" id="constraints-panel">
            {plant.constraints.map(c => (
              <div
                key={c.id}
                className={`constraint-item constraint-item--${c.severity}`}
              >
                <div className="constraint-item__header">
                  <Badge
                    severity={constraintSeverityToSeverity[c.severity as ConstraintSeverity] ?? Severity.Info}
                  >
                    {String(c.severity).toUpperCase()}
                  </Badge>
                  <strong>{c.label}</strong>
                </div>
                <p className="constraint-item__detail">{c.detail}</p>
              </div>
            ))}
          </Panel>

          <Panel title="📊 Risk Decomposition" id="risk-panel">
            {plant.riskDecomposition.map(risk => (
              <div key={risk.category} className="risk-bar">
                <span className="risk-bar__label">{risk.category}</span>
                <div className="risk-bar__track">
                  <div
                    className={`risk-bar__fill risk-bar__fill--${risk.severity}`}
                    style={{
                      width: `${risk.score}%`,
                      backgroundColor: RiskCategoryColorMap[risk.category as RiskCategory],
                    }}
                  />
                </div>
                <span className={`risk-bar__score risk-bar__score--${risk.severity}`}>
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
