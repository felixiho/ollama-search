import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Typography, Button, Space, message } from 'antd';
import { CopyOutlined, CheckOutlined } from '@ant-design/icons';
import { createStyles } from 'antd-style';

const { Text } = Typography;

export interface CodeProps {
    inline?: boolean;
    className?: string;
    children: React.ReactNode;
}


const useStyles = createStyles(({ css, token }) => ({
    wrapper: css`
    position: relative;
    margin-bottom: ${token.marginMD}px;
  `,
    pre: css`
    background-color: ${token.colorBgContainer};
    border-radius: ${token.borderRadiusLG}px;
    padding: ${token.paddingMD}px ${token.paddingSM}px;
    position: relative;
    overflow: auto;
  `,
    controls: css`
    position: absolute;
    right: ${token.paddingXS}px;
    top: ${token.paddingXS}px;
    gap: ${token.paddingXS}px;
    background-color: ${token.colorBgContainer};
    padding: ${token.paddingXXS}px;
  `,
    language: css`
    font-size: ${token.fontSizeSM}px;
    color: ${token.colorTextSecondary};
  `,
    code: css`
    font-family: ${token.fontFamilyCode};
    font-size: ${token.fontSizeSM}px;
    line-height: 1.5;
  `,
    inlineCode: css`
    margin: 0 ${token.marginXXS}px;
    padding: ${token.paddingXXS}px ${token.paddingXS}px;
    font-size: 0.9em;
    background-color: ${token.colorBgContainer};
    border: 1px solid ${token.colorBorder};
    border-radius: ${token.borderRadiusSM}px;
    font-family: ${token.fontFamilyCode};
  `,
    markdownContainer: css`
    width: 100%;
    & > * {
      margin-bottom: ${token.marginSM}px;
    }
  `
}));

const CodeBlock: React.FC<CodeProps> = ({ children, className }) => {
    const [copied, setCopied] = useState(false);
    const { styles } = useStyles();
    const language = className ? className.replace('language-', '') : '';
    const codeString = String(children).trim();

    const handleCopy = async (): Promise<void> => {
        try {
            await navigator.clipboard.writeText(codeString);
            setCopied(true);
            message.success('Code copied to clipboard');
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            message.error('Failed to copy code');
        }
    };

    return (
        <div className={styles.wrapper}>
            <pre className={styles.pre}>
                <Space className={styles.controls}>
                    {language && (
                        <Text className={styles.language}>
                            {language}
                        </Text>
                    )}
                    <Button
                        type="text"
                        size="small"
                        icon={copied ? <CheckOutlined /> : <CopyOutlined />}
                        onClick={handleCopy}
                    />
                </Space>
                <code className={styles.code}>
                    {children}
                </code>
            </pre>
        </div>
    );
};

const InlineCode: React.FC<CodeProps> = ({ children }) => {
    const { styles } = useStyles();
    return (
        <Text code className={styles.inlineCode}>
            {children}
        </Text>
    );
};


export { InlineCode, CodeBlock }