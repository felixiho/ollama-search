export enum SearchEngineTypes {
  TAVILY = "tavily",
  GOOGLE = "google",
}

export interface SearchEngineEntry {
  key: SearchEngineTypes;
  label: string;
}
