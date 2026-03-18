'use client';

import { useState, useMemo, useCallback } from 'react';
import { SearchResult } from '../types/search';
import { buildSearchIndex, searchResults } from '../lib/search-index';
import { Alert } from '../types/alert';
import { PlantProfile } from '../types/plant';
import { Order } from '../types/order';
import { Supplier } from '../types/supplier';

export function useSearch(data: {
  alerts: Alert[];
  plants: PlantProfile[];
  orders: Order[];
  suppliers: Supplier[];
}) {
  const [query, setQuery] = useState('');

  const index = useMemo(() => buildSearchIndex(data), [data]);

  const results: SearchResult[] = useMemo(
    () => searchResults(index, query),
    [index, query]
  );

  const clearSearch = useCallback(() => setQuery(''), []);

  return { query, setQuery, results, clearSearch };
}
