import { ModelEntry } from "@/app/home/components/search-box/models/types";
import { ModelStore } from "./store";

import useSWR, { SWRResponse } from "swr";
import { StateCreator } from "zustand";
import { modelService } from "@/services/Models";

export interface ModelActionsType {
  setModelList: (models: ModelEntry[]) => void;
  useGetModelList: () => SWRResponse<{ models: ModelEntry[] }>;
  setError: (error: string | undefined) => void;
  setSelectedModel: (key: string) => void;
}

export const ModelActions: StateCreator<
  ModelStore,
  [],
  [],
  ModelActionsType
> = (set, get) => ({
  setError(error) {
    if (typeof error === "string") {
      set({ error }, false);
    }
  },
  setModelList(models) {
    set({ modelList: models, selectedModel: models[0].model }, false);
  },
  useGetModelList: () =>
    useSWR<{ models: ModelEntry[] }>("ollama", modelService.getModelsList, {
      onSuccess: (data) => get().setModelList(data.models),
      onError: (err) => {
        get().setError(err.toString());
      },
      shouldRetryOnError: false,
    }),
  setSelectedModel: (key: string) => {
    set({ selectedModel: key }, false);
  },
});