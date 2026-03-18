'use client';

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { SearchResult } from '../../types/search';
import { SearchResultType } from '../../enums';
import { SearchResultTypeIconMap } from '../../lib/enum-helpers';
import { useDashboard } from '../../context/DashboardContext';

interface SearchBarProps {
  results: SearchResult[];
  onSearch: (query: string) => void;
  query: string;
}

export function SearchBar({ results, onSearch, query }: SearchBarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { setActivePage, setSelectedPlant } = useDashboard();

  const handleInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onSearch(e.target.value);
      setIsOpen(e.target.value.length >= 2);
    },
    [onSearch]
  );

  function handleSelect(result: SearchResult) {
    setActivePage(result.page);
    if (result.param) {
      setSelectedPlant(result.param as import('../../enums').PlantId);
    }
    setIsOpen(false);
    if (inputRef.current) inputRef.current.value = '';
    onSearch('');
  }

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (!inputRef.current?.closest('.topbar__search')?.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div className="topbar__search">
      <input
        ref={inputRef}
        className="topbar__search-input"
        type="search"
        placeholder="Search plants, alerts, orders…"
        value={query}
        onChange={handleInput}
        onFocus={() => query.length >= 2 && setIsOpen(true)}
        aria-label="Global search"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      />
      {isOpen && results.length > 0 && (
        <ul
          className="topbar__search-results"
          role="listbox"
          aria-label="Search results"
        >
          {results.slice(0, 8).map(result => (
            <li
              key={result.id}
              className="search-result"
              role="option"
              onClick={() => handleSelect(result)}
            >
              <span className="search-result__type">
                {SearchResultTypeIconMap[result.type as SearchResultType]}{' '}
                {result.type}
              </span>
              <span className="search-result__label">{result.label}</span>
              {result.sublabel && (
                <span className="search-result__sublabel">{result.sublabel}</span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
