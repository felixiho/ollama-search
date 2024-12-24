import { Flex, Typography } from "antd";
import { SearchResultType } from "../types";
import { createStyles } from "antd-style";
import { Markdown } from ".";
import LoadingSkeleton from "./Loading";
import { useEffect, useRef } from "react";

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

export const SearchResult = ({ result, isCurrent }: { result: SearchResultType, isCurrent: boolean }) => {
    const titleRef = useRef<HTMLDivElement>(null);
    const { styles } = useStyles();
    const { Title } = Typography;

    useEffect(() => {
        if (isCurrent && titleRef.current) {
            titleRef.current.scrollIntoView({ behavior: "smooth", block: "start", inline: 'start' });
        }
    }, [result, isCurrent])


    return (
        <Flex className={styles.result} vertical>
            <Title ref={titleRef} className={styles.title} level={3}>{result.query}</Title>
            {
                result.answer.length ?
                    <Markdown answer={result.answer} /> : <LoadingSkeleton />
            }
        </Flex>
    )
}