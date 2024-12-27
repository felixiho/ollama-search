import { StateCreator } from "zustand";
import { SearchStore } from "./store";
import { SearchEngineTypes } from "@/app/home/components/search-box/search-engine/types";
import { nanoid } from 'nanoid'
import { SearchService } from "@/services/Search";
import { SearchResultType, WebSearchType } from "@/app/home/features/search/types";
import { Ollama } from "@/services/models/Ollama";
import { searchReducer, UpdateSearchResults } from "./reducer";
import { IndexedDB } from "@/config/database";
import { DB_NAME, HISTORY_STORE } from "../history/constants";

export interface SearchActionsType {
  search: (searchInput: string, model: string, searchEngine: SearchEngineTypes,) => void;
  searchWeb: (searchService: SearchService) => Promise<WebSearchType>;
  createSearchResult: (searchResult: SearchResultType) => void;
  searchLLM: (answer: SearchResultType, previousAnswer?: string) => Promise<void>;
  updateResult: (payload: UpdateSearchResults) => void;
  updateDataBase: () => void;
}

export const SearchActions: StateCreator<
  SearchStore,
  [],
  [],
  SearchActionsType
> = (set, get) => ({
  async search(searchInput, model, searchEngine) {
    const { searchWeb, searchLLM, loading, loadingWeb, createSearchResult, updateResult, id } = get()
    if (loading || loadingWeb) return;
    if (id.length) {
      set({ searchInput, loadingWeb: true, loading: true, model, searchEngine }, false);
    } else {
      const id = nanoid()
      const controller = new AbortController()
      set({ id, searchInput, loadingWeb: true, loading: true, model, searchEngine, controller }, false);
    }
    const resultId = nanoid()
    const searchResult: SearchResultType = {
      id: resultId,
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
    updateResult({ id: resultId, key: 'searchEngineAnswer', type: 'updateSearchResult', value: webResponse.searchResults })
    updateResult({ id: resultId, key: 'sources', type: 'updateSearchResult', value: webResponse.sources })
    searchResult.searchEngineAnswer = webResponse.searchResults
    searchResult.sources = webResponse.sources
    const answers = get().answer
    if (answers.length > 1) {
      const previousAnswer = answers[answers.length - 2]
      searchLLM(searchResult, previousAnswer.answer)
    } else {
      searchLLM(searchResult)
    }
  },
  async searchLLM(answer, previousAnswer) {
    const { updateResult, updateDataBase } = get()
    set({ loadingWeb: false }, false)
    const ollama = new Ollama(answer.model)
    const ollamaUrl = previousAnswer ? ollama.generateFollowupQueryUrl(answer.query, answer.searchEngineAnswer, previousAnswer) : ollama.generateQueryUrl(answer.query, answer.searchEngineAnswer)
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
    set({ loading: false }, false)
    await updateDataBase()
    updateResult({ id: answer.id, key: 'completedAt', type: 'updateSearchResult', value: Date.now() })
  },

  async updateDataBase() {
    const { id, answer, model, searchEngine } = get()
    const db = new IndexedDB(DB_NAME, HISTORY_STORE)
    await db.openDB()
    const exists = await db.readRecord(id)
    if (exists) {
      await db.updateRecord(id, { ...exists, answer, updatedAt: Date.now() })
    } else {
      await db.createRecord(id, { id, answer, model, searchEngine, createdAt: Date.now(), updatedAt: Date.now() })
    }
  },
  updateResult(payload) {
    const answer = searchReducer(get().answer, payload);
    set({ answer }, false);
  },
  createSearchResult(searchResult) {
    const { answer } = get()
    set({ answer: [...answer, searchResult] }, false)
  },
  async searchWeb(searchService) {
    const { searchInput, controller } = get()
    const webResponse = await searchService.webSearch(searchInput, controller?.signal)
    return webResponse;
  }
});
