'use client';

import { useEffect, useState } from 'react';
import { AlertsData } from '../types/alert';
import { KPIsData } from '../types/kpi';
import { HeatmapData } from '../types/heatmap';
import { OrdersData } from '../types/order';
import { SuppliersData } from '../types/supplier';
import { OperationsData } from '../types/operations';
import { PlantProfile } from '../types/plant';
import { ChartConfig } from '../types/chart';
import { DashboardConfig } from '../types/dashboard';

interface DashboardData {
  config: DashboardConfig | null;
  alerts: AlertsData | null;
  kpis: KPIsData | null;
  heatmap: HeatmapData | null;
  orders: OrdersData | null;
  suppliers: SuppliersData | null;
  operations: OperationsData | null;
  plants: PlantProfile[];
  charts: Record<string, ChartConfig>;
  actions: unknown[];
  isLoading: boolean;
  error: string | null;
}

export function useDashboardData(): DashboardData {
  const [data, setData] = useState<DashboardData>({
    config: null,
    alerts: null,
    kpis: null,
    heatmap: null,
    orders: null,
    suppliers: null,
    operations: null,
    plants: [],
    charts: {},
    actions: [],
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    async function fetchAll() {
      try {
        const [
          config,
          alerts,
          kpis,
          heatmap,
          orders,
          suppliers,
          operations,
          plantA,
          plantB,
          plantC,
          plantD,
          actionsRes,
          ...chartResponses
        ] = await Promise.all([
          fetch('/api/cms/config').then(r => r.json()),
          fetch('/api/cms/alerts').then(r => r.json()),
          fetch('/api/cms/kpis').then(r => r.json()),
          fetch('/api/cms/heatmap').then(r => r.json()),
          fetch('/api/cms/orders').then(r => r.json()),
          fetch('/api/cms/suppliers').then(r => r.json()),
          fetch('/api/cms/operations').then(r => r.json()),
          fetch('/api/cms/plant/plant-a').then(r => r.json()),
          fetch('/api/cms/plant/plant-b').then(r => r.json()),
          fetch('/api/cms/plant/plant-c').then(r => r.json()),
          fetch('/api/cms/plant/plant-d').then(r => r.json()),
          fetch('/api/cms/actions').then(r => r.json()),
          fetch('/api/cms/chart/waterfall').then(r => r.json()),
          fetch('/api/cms/chart/demand-vs-capacity').then(r => r.json()),
          fetch('/api/cms/chart/otif-trend').then(r => r.json()),
          fetch('/api/cms/chart/backorder').then(r => r.json()),
          fetch('/api/cms/chart/doh').then(r => r.json()),
          fetch('/api/cms/chart/aging').then(r => r.json()),
          fetch('/api/cms/chart/supplier-risk').then(r => r.json()),
          fetch('/api/cms/chart/schedule').then(r => r.json()),
          fetch('/api/cms/chart/quality').then(r => r.json()),
          fetch('/api/cms/chart/wip').then(r => r.json()),
        ]);

        const chartIds = [
          'waterfall', 'demand-vs-capacity', 'otif-trend', 'backorder',
          'doh', 'aging', 'supplier-risk', 'schedule', 'quality', 'wip'
        ];
        const charts: Record<string, ChartConfig> = {};
        chartIds.forEach((id, i) => {
          charts[id] = chartResponses[i] as ChartConfig;
        });

        setData({
          config,
          alerts,
          kpis,
          heatmap,
          orders,
          suppliers,
          operations,
          plants: [plantA, plantB, plantC, plantD],
          charts,
          actions: (actionsRes as { actions: unknown[] }).actions,
          isLoading: false,
          error: null,
        });
      } catch (err) {
        setData(prev => ({
          ...prev,
          isLoading: false,
          error: err instanceof Error ? err.message : 'Failed to load dashboard data',
        }));
      }
    }

    fetchAll();
  }, []);

  return data;
}
