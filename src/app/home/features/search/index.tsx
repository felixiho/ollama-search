import { SearchSelectors, useSearchStore } from "@/store/search";
import { Flex } from "antd";
import { SearchResult } from "./SearchResult";


export const Search = () => {

    const [allSearchResults] = useSearchStore((s) => [SearchSelectors.getAllSearchResults(s)]);
    
    return (
        <Flex>
            {allSearchResults.map((result) => (
                <SearchResult key={result.id} result={result} />
            ))}
        </Flex>
    );
}