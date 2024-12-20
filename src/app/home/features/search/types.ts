import { SearchEngineTypes } from "../../components/search-box/search-engine/types";


export type SearchResultType = {
    id: string;
    query: string;
    searchEngine: SearchEngineTypes;
    model: string;
    answer: string;
    searchEngineResult: string;
    createdAt: string;
}