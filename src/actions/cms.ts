'use server';

import {
  loadDashboardConfig,
  loadAlerts,
  loadKPIs,
  loadHeatmap,
  loadOrders,
  loadSuppliers,
  loadOperations,
  loadPlantProfile,
  loadChart,
  loadActions,
} from '../lib/cms-loader';

import { DashboardConfig } from '../types/dashboard';
import { AlertsData } from '../types/alert';
import { KPIsData } from '../types/kpi';
import { HeatmapData } from '../types/heatmap';
import { OrdersData } from '../types/order';
import { SuppliersData } from '../types/supplier';
import { OperationsData } from '../types/operations';
import { PlantProfile } from '../types/plant';
import { ChartConfig } from '../types/chart';

export async function getConfig(): Promise<DashboardConfig> {
  return loadDashboardConfig();
}

export async function getAlerts(): Promise<AlertsData> {
  return loadAlerts();
}

export async function getKPIs(): Promise<KPIsData> {
  return loadKPIs();
}

export async function getHeatmap(): Promise<HeatmapData> {
  return loadHeatmap();
}

export async function getOrders(): Promise<OrdersData> {
  return loadOrders();
}

export async function getSuppliers(): Promise<SuppliersData> {
  return loadSuppliers();
}

export async function getOperations(): Promise<OperationsData> {
  return loadOperations();
}

export async function getPlantProfile(plantId: string): Promise<PlantProfile> {
  return loadPlantProfile(plantId);
}

export async function getChart(chartId: string): Promise<ChartConfig> {
  return loadChart(chartId);
}

export async function getActions(): Promise<{ actions: unknown[] }> {
  return loadActions();
}
