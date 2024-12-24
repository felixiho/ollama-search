import { StateCreator } from "zustand";
import { devtools, persist, subscribeWithSelector } from "zustand/middleware";
import { shallow } from "zustand/shallow";
import { createWithEqualityFn } from "zustand/traditional";
import {
  initialSearchEngineState,
  SearchEngineStoreType,
} from "./initialState";
import { SearchEngineActions, SearchEnginesActionsType } from "./action";

export type SearchEngineStore = SearchEngineStoreType &
  SearchEnginesActionsType;

const createStore: StateCreator<SearchEngineStore, []> = (...params) => ({
  ...initialSearchEngineState,
  ...SearchEngineActions(...params),
});

export const useSearchEngineStore = createWithEqualityFn<SearchEngineStore>()(
  persist(
    subscribeWithSelector(
      devtools(createStore, {
        name: "Ollama search",
      })
    ), {
    name: 'OLLAMA_SEARCH_ENGINE_STORE',
  }),
  shallow
);
