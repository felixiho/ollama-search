import { StateCreator } from "zustand";
import { devtools, subscribeWithSelector } from "zustand/middleware";
import { createWithEqualityFn } from "zustand/traditional";

import { HistoryActions, HistoryActionsType } from "./action";
import { HistoryStoreType, initialHistoryState } from "./initialState";

export type HistoryStore = HistoryStoreType & HistoryActionsType;

const createStore: StateCreator<HistoryStore, []> = (...params) => ({
  ...initialHistoryState,
  ...HistoryActions(...params),
});

export const useHistoryStore = createWithEqualityFn<HistoryStore>()(
  subscribeWithSelector(
    devtools(createStore, {
      name: "Ollama search",
    }),
  ),
);
