import { SearchSelectors, useSearchStore } from "@/store/search";
import { Flex, Skeleton, Spin } from "antd";
import { SearchResult } from "./markdown/SearchResult";
import FollowupSearch from "./followup/Index";
import { createStyles } from "antd-style";
import { useEffect, useState } from "react";
import { useHistoryStore } from "@/store/history";
import LoadingSkeleton from "./markdown/Loading";
import { Loader2 } from "lucide-react";


const useStyles = createStyles(({ css, token }) => ({
    results: css` 
        width: 100%;
        background-color: ${token.colorBgBase};
        padding-bottom: 12rem;
    `,
    child: css`
        width: 100%;
        max-width: 640px;
        height: 100%;
    `
}))
export const Search = ({ id }: { id?: string }) => {
    const [allSearchResults, lastResultComplete, loading, createSearchResults, searchId] = useSearchStore((s) => [SearchSelectors.getAllSearchResults(s), SearchSelectors.getLastResultStatus(s), SearchSelectors.getSearchResultLoading(s), s.createResultFromHistory, s.id]);
    const [refreshHistory, getAnswerFromHistory] = useHistoryStore(s => [s.initializeHistory, s.getAnswerById])

    const [routeChanged, setRouteChanged] = useState(false)

    const { styles } = useStyles();

    useEffect(() => {
        if (!id) return
        const initializeAnswer = async () => {
            const answer = await getAnswerFromHistory(id)
            if (answer) {
                createSearchResults(answer)
            }
        }
        initializeAnswer()
    }, [])



    useEffect(() => {
        if (lastResultComplete) {
            refreshHistory()
        }
        if (searchId.length && !id) {
            window.history.pushState(null, '', `/search/${searchId}`);
        }
    }, [lastResultComplete])


    if (id && !allSearchResults.length) {
        return null;
    }
    return (
        <Flex justify="center" wrap className={styles.results}>
            <Flex vertical className={styles.child}  >
                {allSearchResults.map((result, index) => (
                    <SearchResult loading={loading} key={result.id} result={result} isCurrent={index === allSearchResults.length - 1} />
                ))}
                <FollowupSearch />

            </Flex>
        </Flex>
    );
}