import {
  SearchEngineEntry,
  SearchEngineTypes,
} from "@/app/home/components/search-box/search-engine/types";

export interface SearchEngineStoreType {
  selectedSearchEngine: string;
  searchEngineList: SearchEngineEntry[];
  error: string | undefined;
}

export const initialSearchEngineState: SearchEngineStoreType = {
  selectedSearchEngine: "",
  searchEngineList: [
    {
      label: "Tavily",
      key: SearchEngineTypes.TAVILY,
    },
    {
      label: "Google",
      key: SearchEngineTypes.GOOGLE,
    },
  ],
  error: undefined,
};
