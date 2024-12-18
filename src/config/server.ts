/* eslint-disable sort-keys-fix/sort-keys-fix , typescript-sort-keys/interface */

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    interface ProcessEnv {
      // Tavily search engine
      TAVILY_API_KEY?: string;

      // Google search engine
      GOOGLE_API_KEY?: string;

      // ollama provider
      OLLAMA_URL: string;
      OLLAMA_MODEL_LIST?: string;
    }
  }
}

export const getServerConfig = () => {
  if (typeof process === "undefined") {
    throw new Error(
      "[Server Config] you are importing a server-only module outside of server"
    );
  }

  const OLLAMA_URL = process.env.OLLAMA_URL || "http://127.0.0.1:11434";

  const OLLAMA_MODEL_LIST = process.env.OLLAMA_MODEL_LIST;

  return {
    TAVILY_API_KEY: process.env.TAVILY_API_KEY,
    GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
    OLLAMA_URL,
    OLLAMA_MODEL_LIST,
  };
};
