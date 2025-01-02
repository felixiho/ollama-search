import { SearchEngineTypes } from "../../components/search-box/search-engine/types";

export interface SearchResultType {
  id: string;
  query: string;
  formattedQuery: string;
  searchEngine: SearchEngineTypes;
  model: string;
  answer: string;
  sources: string;
  searchEngineAnswer: string;
  createdAt: number;
  completedAt?: number;
}

export interface SearchResult {
  url: string;
  title: string;
  content: string;
  raw_content?: string;
  score: number;
}

export interface SearchResponse {
  results: SearchResult[];
}

export interface WebSearchType {
  searchResults: string;
  sources: string;
}

export type SearchInput = SearchResponse | SearchResponse[] | SearchResult[];
