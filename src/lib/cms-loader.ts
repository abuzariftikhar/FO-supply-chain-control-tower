import path from 'path';
import fs from 'fs/promises';
import { DashboardConfig } from '../types/dashboard';
import { AlertsData } from '../types/alert';
import { KPIsData } from '../types/kpi';
import { HeatmapData } from '../types/heatmap';
import { OrdersData } from '../types/order';
import { SuppliersData } from '../types/supplier';
import { OperationsData } from '../types/operations';
import { PlantProfile } from '../types/plant';
import { ChartConfig } from '../types/chart';

const CMS_ROOT = path.resolve(process.cwd(), 'cms');

async function loadJson<T>(relPath: string): Promise<T> {
  const fullPath = path.join(CMS_ROOT, relPath);
  const raw = await fs.readFile(fullPath, 'utf-8');
  return JSON.parse(raw) as T;
}

export async function loadDashboardConfig(): Promise<DashboardConfig> {
  return loadJson<DashboardConfig>('dashboard-config.json');
}

export async function loadAlerts(): Promise<AlertsData> {
  return loadJson<AlertsData>('alerts.json');
}

export async function loadKPIs(): Promise<KPIsData> {
  return loadJson<KPIsData>('kpis.json');
}

export async function loadHeatmap(): Promise<HeatmapData> {
  return loadJson<HeatmapData>('heatmap.json');
}

export async function loadOrders(): Promise<OrdersData> {
  return loadJson<OrdersData>('orders.json');
}

export async function loadSuppliers(): Promise<SuppliersData> {
  return loadJson<SuppliersData>('suppliers.json');
}

export async function loadOperations(): Promise<OperationsData> {
  return loadJson<OperationsData>('operations.json');
}

export async function loadPlantProfile(plantId: string): Promise<PlantProfile> {
  const fileName = plantId.toLowerCase().replace(/\s+/g, '-') + '.json';
  return loadJson<PlantProfile>(`plant-profiles/${fileName}`);
}

export async function loadAllPlantProfiles(): Promise<PlantProfile[]> {
  const plantIds = ['plant-a', 'plant-b', 'plant-c', 'plant-d'];
  return Promise.all(
    plantIds.map(id => loadJson<PlantProfile>(`plant-profiles/${id}.json`))
  );
}

export async function loadChart(chartId: string): Promise<ChartConfig> {
  return loadJson<ChartConfig>(`charts/${chartId}.json`);
}

export async function loadCharts(chartIds: string[]): Promise<ChartConfig[]> {
  return Promise.all(chartIds.map(id => loadChart(id)));
}

export async function loadActions(): Promise<{ actions: unknown[] }> {
  return loadJson('actions.json');
}
