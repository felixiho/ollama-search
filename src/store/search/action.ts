import { StateCreator } from "zustand";
import { SearchStore } from "./store";
import { SearchEngineTypes } from "@/app/home/components/search-box/search-engine/types";
import { nanoid } from 'nanoid'
import { SearchService } from "@/services/Search";


export interface SearchActionsType {
  search: (searchInput: string, model: string, searchEngine: SearchEngineTypes) => void;
  searchWeb: (searchService: SearchService) => Promise<string>;
}

export const SearchActions: StateCreator<
  SearchStore,
  [],
  [],
  SearchActionsType
> = (set, get) => ({
  async search(searchInput, model, searchEngine) {
    const { searchWeb } = get()
    const id = nanoid()
    const controller = new AbortController()
    set({ id, searchInput, model, searchEngine, controller }, false);

    const searchService = new SearchService(model, searchEngine)
    const webResponse = await searchWeb(searchService)
  },
  async searchWeb(searchService) {
    const { searchInput, controller } = get()
    const webResponse = await searchService.webSearch(searchInput, controller?.signal)
    console.log('webResponse', webResponse)
    return webResponse;
  }
});
