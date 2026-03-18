'use client';

import React from 'react';
import { DashboardLayout } from '../components/layouts/DashboardLayout';
import { ExecutivePage } from '../components/pages/ExecutivePage';
import { CapacityPage } from '../components/pages/CapacityPage';
import { ServicePage } from '../components/pages/ServicePage';
import { InventoryPage } from '../components/pages/InventoryPage';
import { SupplierPage } from '../components/pages/SupplierPage';
import { OpsPage } from '../components/pages/OpsPage';
import { PlantPage } from '../components/pages/PlantPage';
import { useDashboard } from '../context/DashboardContext';
import { useDashboardData } from '../hooks/useDashboardData';
import { useSearch } from '../hooks/useSearch';
import { usePlantDrilldown } from '../hooks/usePlantDrilldown';
import { PageId, PlantId } from '../enums';
import { FilterType } from '../enums';
import { FilterConfig } from '../types/filters';

const filterConfigs: FilterConfig[] = [
  {
    type: FilterType.Plant,
    label: 'Plant',
    options: [
      { value: 'All',     label: 'All Plants' },
      { value: 'Plant A', label: 'Plant A' },
      { value: 'Plant B', label: 'Plant B' },
      { value: 'Plant C', label: 'Plant C' },
      { value: 'Plant D', label: 'Plant D' },
    ],
  },
  {
    type: FilterType.Region,
    label: 'Region',
    options: [
      { value: 'All',  label: 'All Regions' },
      { value: 'NA',   label: 'North America' },
      { value: 'EU',   label: 'Europe' },
      { value: 'APAC', label: 'Asia Pacific' },
    ],
  },
  {
    type: FilterType.Horizon,
    label: 'Horizon',
    options: [
      { value: 'Today', label: 'Today' },
      { value: '14D',   label: '14 Days' },
      { value: '30D',   label: '30 Days' },
    ],
  },
];

function DashboardContent() {
  const { activePage } = useDashboard();
  const {
    config, alerts, kpis, heatmap, orders, suppliers,
    operations, plants, charts, actions, isLoading, error,
  } = useDashboardData();

  const { query, setQuery, results } = useSearch({
    alerts: alerts?.alerts ?? [],
    plants,
    orders: orders?.orders ?? [],
    suppliers: suppliers?.suppliers ?? [],
  });

  const { selectedPlant, selectPlant, activePlantData } = usePlantDrilldown(plants);

  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="loading-screen__spinner" />
        <p>Loading Supply Chain Control Tower…</p>
      </div>
    );
  }

  if (error || !config) {
    return (
      <div className="error-screen">
        <p>⚠️ Failed to load dashboard: {error}</p>
      </div>
    );
  }

  function renderPage() {
    switch (activePage) {
      case PageId.Executive:
        return (
          <ExecutivePage
            alerts={alerts?.alerts ?? []}
            kpis={kpis?.kpis ?? []}
            actions={actions}
            waterfallChart={charts['waterfall']}
            capacityChart={charts['demand-vs-capacity']}
          />
        );
      case PageId.Capacity:
        return (
          <CapacityPage
            kpis={kpis?.kpis ?? []}
            heatmap={heatmap!}
            demandCapacityChart={charts['demand-vs-capacity']}
            scheduleChart={charts['schedule']}
          />
        );
      case PageId.Service:
        return (
          <ServicePage
            kpis={kpis?.kpis ?? []}
            orders={orders?.orders ?? []}
            otifChart={charts['otif-trend']}
            backorderChart={charts['backorder']}
          />
        );
      case PageId.Inventory:
        return (
          <InventoryPage
            kpis={kpis?.kpis ?? []}
            dohChart={charts['doh']}
            agingChart={charts['aging']}
            wipChart={charts['wip']}
          />
        );
      case PageId.Supplier:
        return (
          <SupplierPage
            kpis={kpis?.kpis ?? []}
            suppliers={suppliers?.suppliers ?? []}
            supplierRiskChart={charts['supplier-risk']}
          />
        );
      case PageId.Ops:
        return operations ? (
          <OpsPage operations={operations} qualityChart={charts['quality']} />
        ) : null;
      case PageId.Plant: {
        const plant = activePlantData ?? plants[0];
        return plant ? (
          <PlantPage
            plant={plant}
            allPlants={plants}
            onSelectPlant={(id: PlantId) => selectPlant(id)}
          />
        ) : null;
      }
      default:
        return null;
    }
  }

  return (
    <DashboardLayout
      config={config}
      filterConfigs={filterConfigs}
      searchResults={results}
      searchQuery={query}
      onSearch={setQuery}
    >
      {renderPage()}
    </DashboardLayout>
  );
}

export default function Page() {
  return <DashboardContent />;
}
