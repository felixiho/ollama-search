import { ModelEntry } from "@/app/home/components/search-box/models/types";
import { ModelStore } from "./store";

import useSWR, { SWRResponse } from "swr";
import { StateCreator } from "zustand";
import { modelService } from "@/services/models";

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
    set({ error }, false);
  },
  setModelList(models) {
    const { selectedModel } = get();
    if (selectedModel) {
      set({ modelList: models }, false);
      return;
    }
    set({ modelList: models, selectedModel: models[0].model }, false);
  },
  useGetModelList: () =>
    useSWR<{ models: ModelEntry[] }>("ollama", modelService.getModelsList, {
      onSuccess: (data) => {
        const { setModelList, setError } = get();
        setModelList(data.models);
        setError(undefined);
      },
      onError: (err) => {
        get().setError(err.toString());
      },
      shouldRetryOnError: false,
    }),
  setSelectedModel: (key: string) => {
    set({ selectedModel: key }, false);
  },
});
