'use client';

import React from 'react';
import { TopBar } from './TopBar';
import { Modal } from '../dashboard/Modal';
import { useDashboard } from '../../context/DashboardContext';
import { DashboardConfig } from '../../types/dashboard';
import { FilterConfig } from '../../types/filters';
import { SearchResult } from '../../types/search';

interface DashboardLayoutProps {
  config: DashboardConfig;
  filterConfigs: FilterConfig[];
  searchResults: SearchResult[];
  searchQuery: string;
  onSearch: (q: string) => void;
  children: React.ReactNode;
}

export function DashboardLayout({
  config,
  filterConfigs,
  searchResults,
  searchQuery,
  onSearch,
  children,
}: DashboardLayoutProps) {
  const { modal, isModalOpen, closeModal } = useDashboard();

  return (
    <div className="dashboard-layout">
      <TopBar
        config={config}
        filterConfigs={filterConfigs}
        searchResults={searchResults}
        searchQuery={searchQuery}
        onSearch={onSearch}
      />
      <main className="dashboard-main">{children}</main>
      {modal && (
        <Modal modal={modal} isOpen={isModalOpen} onClose={closeModal} />
      )}
    </div>
  );
}
