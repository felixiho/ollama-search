import { Flex } from "antd";
import { SearchResultType } from "./types";
import { createStyles } from "antd-style";

const useStyles = createStyles(({ css }) => ({
    result: css`
        max-width: 674px;
    `,
}));

export const SearchResult = ({ result }: { result: SearchResultType }) => {
    const { styles } = useStyles();
    return (
        <Flex className={styles.result} vertical>
            <h1>{result.query}</h1>
            <p>{result.answer}</p>
        </Flex>
    )
}