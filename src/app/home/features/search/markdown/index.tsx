

import { Anchor, List, Typography } from "antd";
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import { useMemo } from "react";
import { CodeBlock, InlineCode } from "./CodeBlock";

export const Markdown = ({ answer }: { answer: string }) => {
    const { Title, Paragraph } = Typography;

    const components = useMemo(() => {
        return {
            p({ node, ...props }: any) {
                return (
                    <Paragraph  {...props} />
                )
            },
            h1({ node, ...props }: any) {
                return (
                    <Title level={1} {...props} />
                )
            },
            h2({ node, ...props }: any) {
                return (
                    <Title level={2} {...props} />
                )
            },
            h3({ node, ...props }: any) {
                return (
                    <Title level={3} {...props} />
                )
            },
            h4({ node, ...props }: any) {
                return (
                    <Title level={4} {...props} />
                )
            },
            h5({ node, ...props }: any) {
                return (
                    <Title level={5} {...props} />
                )
            },
            h6({ node, ...props }: any) {
                return (
                    <Title level={6} {...props} />
                )
            },
            a({ node, ...props }: any) {
                return (
                    <Anchor {...props} target="_blank" />
                )
            },
            li({ node, ...props }: any) {
                return (
                    <List.Item {...props} />
                )
            },
            ol({ node, ...props }: any) {
                return (
                    <List {...props} />
                )
            },
            ul({ node, ...props }: any) {
                return (
                    <List {...props} />
                )
            },
            code({ inline, className, children }: any) {
                if (inline) {
                    return <InlineCode>{children}</InlineCode>;
                }
                return <CodeBlock className={className}>{children}</CodeBlock>;
            }
        }
    }, [answer])
    return (
        <ReactMarkdown
            components={components}
            rehypePlugins={[rehypeRaw]}
            remarkPlugins={[remarkGfm]}>
            {answer}
        </ReactMarkdown>

    )
}