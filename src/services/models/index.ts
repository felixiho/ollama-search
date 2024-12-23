import { ModelEntry } from "@/app/home/components/search-box/models/types";
import { getServerConfig } from "@/config/server";

class ModelService {
  getModelsList = async (): Promise<{ models: ModelEntry[] }> => {
    const { OLLAMA_URL, OLLAMA_MODEL_LIST } = getServerConfig();
    //todo: filter models by ollama model list
    const res = await fetch(`${OLLAMA_URL}/api/tags`);
    return res.json();
  };
}

export const modelService = new ModelService();
