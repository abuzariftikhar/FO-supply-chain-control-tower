import { Alert } from '../types/alert';
import { PlantProfile } from '../types/plant';
import { Order } from '../types/order';
import { Supplier } from '../types/supplier';
import { SearchResult } from '../types/search';
import { SearchResultType, PageId } from '../enums';

export function buildSearchIndex(params: {
  alerts: Alert[];
  plants: PlantProfile[];
  orders: Order[];
  suppliers: Supplier[];
}): SearchResult[] {
  const results: SearchResult[] = [];

  // Index plants
  for (const plant of params.plants) {
    results.push({
      id: `plant-${plant.id}`,
      type: SearchResultType.Plant,
      label: plant.name,
      sublabel: `Region: ${plant.region} · Status: ${plant.overallSeverity}`,
      page: PageId.Plant,
      param: plant.id,
    });
  }

  // Index alerts
  for (const alert of params.alerts) {
    results.push({
      id: `alert-${alert.id}`,
      type: SearchResultType.Alert,
      label: alert.title,
      sublabel: `${alert.plant} · ${alert.group} · ${alert.severity}`,
      page: PageId.Executive,
      param: alert.id,
    });
  }

  // Index orders
  for (const order of params.orders) {
    results.push({
      id: `order-${order.id}`,
      type: SearchResultType.Order,
      label: `${order.id} — ${order.customer}`,
      sublabel: `${order.part} · ${order.plant} · Due: ${order.dueDate}`,
      page: PageId.Service,
      param: order.id,
    });
  }

  // Index suppliers
  for (const supplier of params.suppliers) {
    results.push({
      id: `supplier-${supplier.id}`,
      type: SearchResultType.Supplier,
      label: supplier.name,
      sublabel: `${supplier.part} · Risk: ${supplier.riskLevel} · OTD: ${supplier.onTime}`,
      page: PageId.Supplier,
      param: supplier.id,
    });
  }

  return results;
}

export function searchResults(
  index: SearchResult[],
  query: string
): SearchResult[] {
  if (!query || query.trim().length < 2) return [];
  const q = query.toLowerCase();
  return index.filter(
    r =>
      r.label.toLowerCase().includes(q) ||
      (r.sublabel?.toLowerCase().includes(q) ?? false)
  );
}
