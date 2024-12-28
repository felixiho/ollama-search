import { Flex, Tag, Typography } from "antd";
import { SearchResultType } from "../types";
import { createStyles } from "antd-style";
import { Markdown } from ".";
import LoadingSkeleton from "./Loading";
import { useEffect, useRef, useState } from "react";

const useStyles = createStyles(({ css }) => ({
    result: css`
        width: 100%;
        margin-bottom: 2rem;
    `,
    title: css`
        padding-top: 1rem;
        text-align: left;
        width: 100%;
        scroll-margin-top: 5rem; 
        margin-top: 1rem;
    `,
    tag: css`
        margin-bottom: 1.5rem;
    `
}));

export const SearchResult = ({ result, isCurrent, loading }: { result: SearchResultType, isCurrent: boolean, loading: boolean }) => {
    const [scrolling, setScrolling] = useState(false)
    const titleRef = useRef<HTMLDivElement>(null);
    const { styles } = useStyles();
    const { Title } = Typography;
    const handleScroll = () => { setScrolling(true) };

    useEffect(() => {
        window.addEventListener('wheel', handleScroll);
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('wheel', handleScroll);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => { 
        if (loading && titleRef.current) {
            titleRef.current.scrollIntoView({ behavior: "smooth", block: "start", inline: 'start' });
        }
    }, [loading])

    useEffect(() => {
        if (scrolling) return;
        if (isCurrent && titleRef.current) {
            titleRef.current.scrollIntoView({ behavior: "smooth", block: "start", inline: 'start' });
        }
    }, [result, isCurrent])


    return (
        <Flex className={styles.result} vertical>
            <Title ref={titleRef} className={styles.title} level={3}>{result.query}</Title>
            <Flex className={styles.tag}>
                <Tag>{result.model}</Tag>
                <Tag>{result.searchEngine}</Tag>
            </Flex>
            {
                result.answer.length ?
                    <Markdown answer={result.answer} /> : <LoadingSkeleton />
            }
        </Flex>
    )
}