'use client';

import React from 'react';
import { DashboardConfig } from '../../types/dashboard';
import { FilterConfig } from '../../types/filters';
import { SearchResult } from '../../types/search';
import { PageId } from '../../enums';
import { useDashboard } from '../../context/DashboardContext';
import { FilterBar } from '../dashboard/FilterBar';
import { SearchBar } from '../dashboard/SearchBar';
import { SystemStatusIconMap } from '../../lib/enum-helpers';
import { SystemStatus } from '../../enums';

import { topbarStatusClasses } from '../../utils/severity-styles';

interface TopBarProps {
  config: DashboardConfig;
  filterConfigs: FilterConfig[];
  searchResults: SearchResult[];
  searchQuery: string;
  onSearch: (q: string) => void;
}

export function TopBar({
  config,
  filterConfigs,
  searchResults,
  searchQuery,
  onSearch,
}: TopBarProps) {
  const { activePage, setActivePage } = useDashboard();

  return (
    <header className="fixed top-0 left-0 right-0 h-[64px] z-100 flex items-center gap-3 px-5 bg-[rgba(10,15,30,0.9)] backdrop-blur-[12px] border-b border-border-subtle">
      <div className="flex items-center gap-2 shrink-0">
        <span className="text-2xl">🏭</span>
        <div>
          <span className="text-[0.875rem] font-bold text-text-primary whitespace-nowrap">{config.brand.name}</span>
          <span className="text-[0.65rem] text-muted block">{config.brand.tagline}</span>
        </div>
      </div>

      <nav className="flex gap-1 flex-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" aria-label="Dashboard navigation">
        {config.nav.map(tab => (
          <button
            key={tab.id}
            className={`px-3 py-1.5 rounded-lg border text-xs font-medium cursor-pointer whitespace-nowrap transition-all duration-200 ease-in-out ${
              activePage === tab.id
                ? 'bg-accent text-white border-transparent'
                : 'bg-transparent text-muted border-transparent hover:bg-card hover:text-text-primary hover:border-border-subtle'
            }`}
            onClick={() => setActivePage(tab.id as PageId)}
            aria-current={activePage === tab.id ? 'page' : undefined}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </nav>

      <div className="flex items-center gap-3 shrink-0">
        <FilterBar filterConfigs={filterConfigs} />

        <SearchBar
          results={searchResults}
          onSearch={onSearch}
          query={searchQuery}
        />

        <div
          className={`text-[0.7rem] px-2.5 py-1 rounded-[20px] whitespace-nowrap border ${
            topbarStatusClasses[config.systemStatus.status] ?? ''
          }`}
        >
          {SystemStatusIconMap[config.systemStatus.status as SystemStatus]}{' '}
          {config.systemStatus.label}
        </div>
      </div>
    </header>
  );
}
