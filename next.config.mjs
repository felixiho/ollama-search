/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    TAVILY_API_KEY: process.env.TAVILY_API_KEY,
    GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
    OLLAMA_URL: process.env.OLLAMA_URL,
    OLLAMA_MODEL_LIST: process.env.OLLAMA_MODEL_LIST,
  },
};

export default nextConfig;
