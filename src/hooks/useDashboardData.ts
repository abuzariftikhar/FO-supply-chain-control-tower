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
import {
  getConfig,
  getAlerts,
  getKPIs,
  getHeatmap,
  getOrders,
  getSuppliers,
  getOperations,
  getPlantProfile,
  getChart,
  getActions,
} from '../actions/cms';

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
          getConfig(),
          getAlerts(),
          getKPIs(),
          getHeatmap(),
          getOrders(),
          getSuppliers(),
          getOperations(),
          getPlantProfile('plant-a'),
          getPlantProfile('plant-b'),
          getPlantProfile('plant-c'),
          getPlantProfile('plant-d'),
          getActions(),
          getChart('waterfall'),
          getChart('demand-vs-capacity'),
          getChart('otif-trend'),
          getChart('backorder'),
          getChart('doh'),
          getChart('aging'),
          getChart('supplier-risk'),
          getChart('schedule'),
          getChart('quality'),
          getChart('wip'),
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
