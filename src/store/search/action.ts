import { StateCreator } from "zustand";
import { SearchStore } from "./store";
import { SearchEngineTypes } from "@/app/home/components/search-box/search-engine/types";
import { nanoid } from 'nanoid'
import { SearchService } from "@/services/Search";
import { SearchResultType, WebSearchType } from "@/app/home/features/search/types";
import { Ollama } from "@/services/models/Ollama";
import { searchReducer, UpdateSearchResults } from "./reducer";


export interface SearchActionsType {
  search: (searchInput: string, model: string, searchEngine: SearchEngineTypes) => void;
  searchWeb: (searchService: SearchService) => Promise<WebSearchType>;
  createSearchResult: (searchResult: SearchResultType) => void;
  searchLLM: (answer: SearchResultType) => Promise<void>;
  updateResult: (payload: UpdateSearchResults) => void;
}

export const SearchActions: StateCreator<
  SearchStore,
  [],
  [],
  SearchActionsType
> = (set, get) => ({
  async search(searchInput, model, searchEngine) {
    const { searchWeb, searchLLM, createSearchResult, updateResult } = get()
    const id = nanoid()
    const controller = new AbortController()
    set({ id, searchInput, model, searchEngine, controller }, false);


    const searchResult: SearchResultType = {
      id,
      query: searchInput,
      model,
      searchEngine,
      searchEngineAnswer: '',
      sources: '',
      createdAt: Date.now(),
      answer: ''
    }
    createSearchResult(searchResult)

    const searchService = new SearchService(model, searchEngine)
    const webResponse = await searchWeb(searchService)
    updateResult({ id, key: 'searchEngineAnswer', type: 'updateSearchResult', value: webResponse.searchResults })
    updateResult({ id, key: 'sources', type: 'updateSearchResult', value: webResponse.sources })
    searchResult.searchEngineAnswer = webResponse.searchResults
    searchResult.sources = webResponse.sources
    searchLLM(searchResult)
  },
  async searchLLM(answer: SearchResultType) {
    const { updateResult } = get()
    const ollama = new Ollama(answer.model)
    const ollamaUrl = ollama.generateQueryUrl(answer.query, answer.searchEngineAnswer)
    const response = await fetch(ollamaUrl);
    const reader = response.body?.getReader();
    const decoder = new TextDecoder();
    if (!reader) {
      console.error('No response body received from API');
      return;
    }
    let output = '';
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const decoded = decoder.decode(value, { stream: true });
      if (decoded.length) {
        buffer += decoded;
        const chunks = buffer.split('\n');

        for (let i = 0; i < chunks.length - 1; i++) {
          const chunk = chunks[i].trim();
          if (chunk) {
            try {
              const parsed = JSON.parse(chunk);
              output += parsed.response;
              updateResult({
                id: answer.id,
                key: 'answer',
                type: 'updateSearchResult',
                value: output
              });
            } catch (e) {
              console.warn('Failed to parse chunk:', chunk, e);
            }
          }
        }
        buffer = chunks[chunks.length - 1];
      }
    }
    if (buffer.trim()) {
      try {
        const parsed = JSON.parse(buffer);
        output += parsed.response;
        updateResult({
          id: answer.id,
          key: 'answer',
          type: 'updateSearchResult',
          value: output
        });
      } catch (e) {
        console.warn('Failed to parse final chunk:', buffer, e);
      }
    }
    updateResult({ id: answer.id, key: 'completedAt', type: 'updateSearchResult', value: Date.now() })
    set({ loading: false }, false)
  },
  updateResult(payload) {
    const answer = searchReducer(get().answer, payload);
    set({ answer }, false);
  },
  createSearchResult(searchResult) {
    const { answer } = get()
    set({ loadingWeb: false, answer: [...answer, searchResult] }, false)
  },
  async searchWeb(searchService) {
    const { searchInput, controller } = get()
    const webResponse = await searchService.webSearch(searchInput, controller?.signal)
    return webResponse;
  }
});
