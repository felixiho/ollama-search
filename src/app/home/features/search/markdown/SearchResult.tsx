import { Flex, Typography } from "antd";
import { SearchResultType } from "../types";
import { createStyles } from "antd-style";
import { Markdown } from ".";

const useStyles = createStyles(({ css }) => ({
    result: css`
        width: 100%;
    `,
    title: css`
        padding: 1rem 0;
        text-align: left;
        width: 100%;
    `
}));

export const SearchResult = ({ result }: { result: SearchResultType }) => {
    const { styles } = useStyles();
    const { Title } = Typography;

    return (
        <Flex className={styles.result} vertical>
            <Title className={styles.title} level={3}>{result.query}</Title>
            <Markdown answer={result.answer} />
        </Flex>
    )
}