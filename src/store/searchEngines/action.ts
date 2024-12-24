import { StateCreator } from "zustand";
import { SearchEngineTypes } from "@/app/home/components/search-box/search-engine/types";
import { getServerConfig } from "@/config/server";
import { SearchEngineStore } from "./store";

export interface SearchEnginesActionsType {
  setSelectedSearchEngine: (engine: SearchEngineTypes) => void;
  initializeSearchEngine: () => void;
}

export const SearchEngineActions: StateCreator<
  SearchEngineStore,
  [],
  [],
  SearchEnginesActionsType
> = (set, get) => ({
  initializeSearchEngine() {
    const { selectedSearchEngine } = get()
    if (selectedSearchEngine) return;
    const { TAVILY_API_KEY, GOOGLE_API_KEY } = getServerConfig();
    if (TAVILY_API_KEY) {
      set({ selectedSearchEngine: SearchEngineTypes.TAVILY }, false);
    } else if (GOOGLE_API_KEY) {
      set({ selectedSearchEngine: SearchEngineTypes.GOOGLE }, false);
    }
  },
  setSelectedSearchEngine(engine) {
    const { TAVILY_API_KEY, GOOGLE_API_KEY } = getServerConfig();
    switch (engine) {
      case SearchEngineTypes.TAVILY:
        if (TAVILY_API_KEY) {
          set({ selectedSearchEngine: engine }, false);
        } else {
          set({
            error: "Please add TAVILY_API_KEY to your .env file and try again.",
          });
        }
        break;
      case SearchEngineTypes.GOOGLE:
        if (GOOGLE_API_KEY) {
          set({ selectedSearchEngine: engine }, false);
        } else {
          set({
            error: "Please add GOOGLE_API_KEY to your .env file and try again.",
          });
        }
        break;

      default:
        break;
    }
  },
});
