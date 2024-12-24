import { ModelActions, ModelActionsType } from "./action";
import { initialModelState, ModelStoreType } from "./initialState";
import { StateCreator } from "zustand";
import { devtools, persist, subscribeWithSelector } from "zustand/middleware";
import { shallow } from "zustand/shallow";
import { createWithEqualityFn } from "zustand/traditional";

export type ModelStore = ModelStoreType & ModelActionsType;

const createStore: StateCreator<ModelStore, []> = (...params) => ({
  ...initialModelState,
  ...ModelActions(...params),
});

export const useModelStore = createWithEqualityFn<ModelStore>()(
  persist(
    subscribeWithSelector(
      devtools(createStore, {
        name: "Ollama search",
      })
    ), {
    name: 'OLLAMA_MODEL_STORE',
  }),
  shallow
);
