import { historySelectors, useHistoryStore } from "@/store/history";
import { Flex } from "antd";
import { createStyles } from "antd-style";
import Link from "next/link";
import { useEffect } from "react";

const useStyles = createStyles(({ css, token }) => ({
  history: css`
    border-left: 1px solid ${token.colorBorder};
    margin-left: 1.5rem;
    padding-left: 0.25rem;
    max-height: 400px;
    overflow: hidden scroll;
    mask-image: linear-gradient(to right, black 85%, transparent 97%);
    & > a {
      color: ${token.colorTextDescription};
      font-size: 0.9rem;
      padding: 0.5rem 0 0.5rem 0.5rem;
      cursor: pointer;
      transition: all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
      white-space: nowrap;
      &:hover {
        background: ${token.colorBgTextHover};
        border-radius: 0.25rem;
      }
    }
  `,
}));
export default function History() {
  const { styles } = useStyles();
  const [allHistory, initializeHistory] = useHistoryStore((s) => [
    historySelectors.getAllHistory(s),
    s.initializeHistory,
  ]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        await initializeHistory();
      } catch (error) {
        console.error("Failed to initialize history:", error);
      }
    };

    fetchHistory();
  }, [initializeHistory]);

  return (
    <Flex vertical className={styles.history}>
      {allHistory.map((history) => (
        <Link key={history.id} href={`/search/${history.id}`}>
          {history.answer[0].query}
        </Link>
      ))}
    </Flex>
  );
}
