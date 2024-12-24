import { SearchSelectors, useSearchStore } from "@/store/search";
import { Flex, Grid } from "antd";
import { SearchResult } from "./markdown/SearchResult";
import FollowupSearch from "./followup/Index";
import { createStyles } from "antd-style";


const useStyles = createStyles(({ css }) => ({
    results: css`
        margin-bottom: 10rem;
    `,
    child: css`
        width: 100%;
        max-width: 674px;
    `
}))
export const Search = () => {

    const [allSearchResults] = useSearchStore((s) => [SearchSelectors.getAllSearchResults(s)]);
    const { styles } = useStyles();
    return (
        <Flex justify="center" wrap className={styles.results}>
            <Flex vertical className={styles.child}  >
                {allSearchResults.map((result) => (
                    <SearchResult key={result.id} result={result} />
                ))}
                <FollowupSearch  />

            </Flex>
        </Flex>
    );
}