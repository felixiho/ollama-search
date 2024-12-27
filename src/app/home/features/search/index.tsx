import { SearchSelectors, useSearchStore } from "@/store/search";
import { Flex } from "antd";
import { SearchResult } from "./markdown/SearchResult";
import FollowupSearch from "./followup/Index";
import { createStyles } from "antd-style";
import { useEffect } from "react";
import { useHistoryStore } from "@/store/history";


const useStyles = createStyles(({ css, token }) => ({
    results: css` 
        width: 100%;
        background-color: ${token.colorBgBase};
  
    `,
    child: css`
        width: 100%;
        max-width: 640px;
    `
}))
export const Search = () => {

    const [allSearchResults, lastResultComplete] = useSearchStore((s) => [SearchSelectors.getAllSearchResults(s), SearchSelectors.getLastResultStatus(s)]);
    const [refreshHistory] = useHistoryStore(s => [s.initializeHistory])

    const { styles } = useStyles();

    useEffect(() => {
        if (lastResultComplete) {
            refreshHistory()
        }
    }, [lastResultComplete])

    return (
        <Flex justify="center" wrap className={styles.results}>
            <Flex vertical className={styles.child}  >
                {allSearchResults.map((result, index) => (
                    <SearchResult key={result.id} result={result} isCurrent={index === allSearchResults.length - 1} />
                ))}
                <FollowupSearch />

            </Flex>
        </Flex>
    );
}