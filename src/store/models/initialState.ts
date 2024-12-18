import { ModelEntry } from "@/app/home/components/search-box/models/types";

export interface ModelStoreType {
  selectedModel: string;
  modelList: ModelEntry[];
  loading: boolean;
  error: string | undefined;
}

export const initialModelState: ModelStoreType = {
  selectedModel: "",
  modelList: [],
  loading: false,
  error: undefined,
};
