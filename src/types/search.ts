import { SearchResultType, PageId } from '../enums';

export interface SearchResult {
  id: string;
  type: SearchResultType;
  label: string;
  sublabel?: string;
  page: PageId;
  param?: string;
}

export interface SearchIndex {
  results: SearchResult[];
}
