import { SearchStore } from "./store";



const getAllSearchResults = (s: SearchStore) => s.answer;

const getSearchResultById = (s: SearchStore, id: string) => s.answer.find((result) => result.id === id);

const getSearchResultLoading = (s: SearchStore) => s.loading;

const getSearchResultWebLoading = (s: SearchStore) => s.loadingWeb;



export const SearchSelectors = {
    getAllSearchResults,
    getSearchResultById,
    getSearchResultLoading,
    getSearchResultWebLoading,
};
