import type { ModelStore } from "./store";

const getModelsList = (s: ModelStore) => s.modelList;

const getSelectedModel = (s: ModelStore) => s.selectedModel;

const getModelFetchError = (s: ModelStore) => s.error;

export const modelSelectors = {
  getModelsList,
  getSelectedModel,
  getModelFetchError,
};
