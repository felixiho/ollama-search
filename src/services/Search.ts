import { SearchEngineTypes } from "@/app/home/components/search-box/search-engine/types";
import { apiFetch } from "@/utils/fetch";


export class SearchService {
    private model: string;
    private searchEngine: SearchEngineTypes;

    constructor(model: string, searchEngine: SearchEngineTypes) {
        this.model = model;
        this.searchEngine = searchEngine;
    }

    private tavilySearch(searchInput: string) {
        return `api/tavily?searchInput=${searchInput}`;
    }
    private googleSearch(searchInput: string) {
        return `api/google?searchInput=${searchInput}`;
    }

    async webSearch(searchInput: string, controller?: AbortSignal) {
        let searchUrl = "";
        if (this.searchEngine === SearchEngineTypes.TAVILY) {
            searchUrl = this.tavilySearch(searchInput);
        } else if (this.searchEngine === SearchEngineTypes.GOOGLE) {
            searchUrl = this.googleSearch(searchInput);
        }

        return await apiFetch(searchUrl, { query: searchInput }, controller);
    }
}

