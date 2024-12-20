import { SearchEngineTypes } from "@/app/home/components/search-box/search-engine/types";
import { SearchResultType } from "@/app/home/features/search/types";


export interface SearchStoreType {
  id: string;
  searchInput: string;
  answer: SearchResultType[];
  model?: string
  searchEngine?: SearchEngineTypes
  controller?: AbortController
  loading: boolean;
}

export const intialSearchState: SearchStoreType = {
  id: "",
  searchInput: "",
  answer: [],
  loading: true
};
