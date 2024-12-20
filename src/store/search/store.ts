import { StateCreator } from "zustand";
import { devtools, subscribeWithSelector } from "zustand/middleware";
import { shallow } from "zustand/shallow";
import { createWithEqualityFn } from "zustand/traditional";

import { intialSearchState, SearchStoreType } from "./initialState";
import { SearchActions, SearchActionsType } from "./action";

export type SearchStore = SearchStoreType &
  SearchActionsType;

const createStore: StateCreator<SearchStore, []> = (...params) => ({
  ...intialSearchState,
  ...SearchActions(...params),
});

export const useSearchStore = createWithEqualityFn<SearchStore>()(
  subscribeWithSelector(
    devtools(createStore, {
      name: "Ollama search",
    })
  ),
  shallow
);
