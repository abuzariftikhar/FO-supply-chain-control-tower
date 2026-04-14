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
    <div className="relative">
      <input
        ref={inputRef}
        className="bg-card border border-border-subtle rounded-lg text-text-primary px-3 py-[0.35rem] text-xs w-[200px] outline-none transition-all duration-200 ease-in-out focus:border-accent focus:w-[260px] placeholder:text-muted"
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
          className="absolute top-[calc(100%+4px)] left-0 right-0 min-w-[320px] bg-panel backdrop-blur-[12px] border border-border-subtle rounded-lg shadow-panel list-none z-[200] max-h-[300px] overflow-y-auto"
          role="listbox"
          aria-label="Search results"
        >
          {results.slice(0, 8).map(result => (
            <li
              key={result.id}
              className="px-3 py-2 cursor-pointer border-b border-border-subtle transition-all duration-200 ease-in-out last:border-b-0 hover:bg-card"
              role="option"
              onClick={() => handleSelect(result)}
            >
              <span className="text-[0.6rem] text-accent uppercase tracking-[0.05em]">
                {SearchResultTypeIconMap[result.type as SearchResultType]}{' '}
                {result.type}
              </span>
              <span className="text-[0.8rem] font-semibold block">{result.label}</span>
              {result.sublabel && (
                <span className="text-[0.7rem] text-muted block">{result.sublabel}</span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
