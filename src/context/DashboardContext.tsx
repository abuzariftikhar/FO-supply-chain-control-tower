'use client';

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from 'react';
import { PageId, PlantId, Region, TimeHorizon } from '../enums';
import { ActiveFilters } from '../types/filters';
import { ModalData } from '../types/modal';

interface DashboardState {
  activePage: PageId;
  selectedPlant: PlantId | null;
  filters: ActiveFilters;
  modal: ModalData | null;
  isModalOpen: boolean;
  searchQuery: string;
}

interface DashboardActions {
  setActivePage: (page: PageId) => void;
  setSelectedPlant: (plant: PlantId | null) => void;
  setFilters: (filters: Partial<ActiveFilters>) => void;
  openModal: (modal: ModalData) => void;
  closeModal: () => void;
  setSearchQuery: (query: string) => void;
}

type DashboardContextType = DashboardState & DashboardActions;

const defaultFilters: ActiveFilters = {
  plant: 'All',
  region: Region.All,
  horizon: TimeHorizon.Today,
};

const DashboardContext = createContext<DashboardContextType | null>(null);

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [activePage, setActivePage] = useState<PageId>(PageId.Executive);
  const [selectedPlant, setSelectedPlant] = useState<PlantId | null>(null);
  const [filters, setFiltersState] = useState<ActiveFilters>(defaultFilters);
  const [modal, setModal] = useState<ModalData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const setFilters = useCallback((partial: Partial<ActiveFilters>) => {
    setFiltersState(prev => ({ ...prev, ...partial }));
  }, []);

  const openModal = useCallback((modalData: ModalData) => {
    setModal(modalData);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setTimeout(() => setModal(null), 300);
  }, []);

  return (
    <DashboardContext.Provider
      value={{
        activePage,
        selectedPlant,
        filters,
        modal,
        isModalOpen,
        searchQuery,
        setActivePage,
        setSelectedPlant,
        setFilters,
        openModal,
        closeModal,
        setSearchQuery,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard(): DashboardContextType {
  const ctx = useContext(DashboardContext);
  if (!ctx) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return ctx;
}
