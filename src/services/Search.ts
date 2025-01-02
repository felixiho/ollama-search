import { SearchEngineTypes } from "@/app/home/components/search-box/search-engine/types";
import { SearchResponse, SearchResult } from "@/app/home/features/search/types";
import { apiFetch } from "@/utils/fetch";

type TavilySearchResult = SearchResponse | SearchResponse[] | SearchResult[];
export class SearchService {
  private model: string;
  private searchEngine: SearchEngineTypes;

  constructor(model: string, searchEngine: SearchEngineTypes) {
    this.model = model;
    this.searchEngine = searchEngine;
  }

  private async tavilySearch(searchInput: string, controller?: AbortSignal) {
    const searchUrl = `/api/tavily?searchInput=${searchInput}`;
    const searchResults = await apiFetch(
      searchUrl,
      { query: searchInput, include_raw_content: true, max_results: 3 },
      controller,
    );
    const formatSearchResults = this.formatTavilyResults(searchResults, 100);
    const sources = this.generateTavilySources(searchResults);
    return {
      searchResults: formatSearchResults,
      sources,
    };
  }
  private googleSearch(searchInput: string) {
    const searchUrl = `/api/google?searchInput=${searchInput}`;
    console.log(searchUrl);
    return {
      searchResults: "",
      sources: "",
    };
  }

  async webSearch(searchInput: string, controller?: AbortSignal) {
    if (this.searchEngine === SearchEngineTypes.TAVILY) {
      return await this.tavilySearch(searchInput, controller);
    } else if (this.searchEngine === SearchEngineTypes.GOOGLE) {
      return await this.googleSearch(searchInput);
    }

    return {
      searchResults: "",
      sources: "",
    };
  }

  private generateTavilySources(searchResults: SearchResponse) {
    return searchResults.results
      .map((source) => `* ${source.title} : ${source.url}`)
      .join("\n");
  }

  private formatTavilyResults(
    searchResponse: TavilySearchResult,
    maxTokensPerSource: number,
    includeRawContent: boolean = true,
  ): string {
    let sourcesList: SearchResult[] = [];

    if (Array.isArray(searchResponse)) {
      sourcesList = searchResponse.reduce((acc: SearchResult[], response) => {
        if ("results" in response) {
          return [...acc, ...(response as SearchResponse).results];
        }
        return [...acc, response as SearchResult];
      }, []);
    } else {
      sourcesList = searchResponse.results;
    }

    const uniqueSources = new Map<string, SearchResult>();
    sourcesList?.forEach((source) => {
      if (!uniqueSources.has(source.url)) {
        uniqueSources.set(source.url, source);
      }
    });

    let formattedText = "Sources:\n\n";

    uniqueSources.forEach((source) => {
      formattedText += `Source ${source.title}:\n===\n`;
      formattedText += `URL: ${source.url}\n===\n`;
      formattedText += `Most relevant content from source: ${source.content}\n===\n`;

      if (includeRawContent) {
        const charLimit = maxTokensPerSource * 4;
        let rawContent = source.raw_content || "";

        if (!rawContent) {
          console.warn(
            `Warning: No raw_content found for source ${source.url}`,
          );
        }

        if (rawContent.length > charLimit) {
          rawContent = `${rawContent.slice(0, charLimit)}... [truncated]`;
        }

        formattedText += `Full source content limited to ${maxTokensPerSource} tokens: ${rawContent}\n\n`;
      }
    });

    return formattedText.trim();
  }
}
