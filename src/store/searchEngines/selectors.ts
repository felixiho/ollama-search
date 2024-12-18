import type { SearchEngineStore } from "./store";

const getSearchEngineList = (s: SearchEngineStore) => s.searchEngineList;

const getSelectedSearchEngine = (s: SearchEngineStore) =>
  s.selectedSearchEngine;

const getSearchEngineError = (s: SearchEngineStore) => s.error;

export const searchEngineSelectors = {
  getSearchEngineList,
  getSelectedSearchEngine,
  getSearchEngineError,
};
