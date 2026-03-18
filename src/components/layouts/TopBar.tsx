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
    <header className="topbar">
      <div className="topbar__brand">
        <span className="topbar__brand-icon">🏭</span>
        <div className="topbar__brand-text">
          <span className="topbar__brand-name">{config.brand.name}</span>
          <span className="topbar__brand-tagline">{config.brand.tagline}</span>
        </div>
      </div>

      <nav className="topbar__nav" aria-label="Dashboard navigation">
        {config.nav.map(tab => (
          <button
            key={tab.id}
            className={`topbar__tab${activePage === tab.id ? ' topbar__tab--active' : ''}`}
            onClick={() => setActivePage(tab.id as PageId)}
            aria-current={activePage === tab.id ? 'page' : undefined}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </nav>

      <div className="topbar__right">
        <FilterBar filterConfigs={filterConfigs} />

        <SearchBar
          results={searchResults}
          onSearch={onSearch}
          query={searchQuery}
        />

        <div
          className={`topbar__status topbar__status--${config.systemStatus.status}`}
        >
          {SystemStatusIconMap[config.systemStatus.status as SystemStatus]}{' '}
          {config.systemStatus.label}
        </div>
      </div>
    </header>
  );
}
