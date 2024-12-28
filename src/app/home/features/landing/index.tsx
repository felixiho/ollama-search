"use client";
import WelcomeText from "../../components/landing/WelcomeText";
import { Flex } from "antd";
import QuestionBox from "./QuestionBox";
import { createStyles } from "antd-style";
import { useSearchStore } from "@/store/search";
import { Search } from "../search";

const useStyles = createStyles(({ css, token }) => ({
  landing: css`
    padding-top: 8rem;
    width: 100%;
    background-color: ${token.colorBgBase};
    border-radius: 0.5rem;
  `,
}));
export default function Landing() {
  const { styles } = useStyles();
  const [searchInput,] = useSearchStore((s) => [s.searchInput,]);

  if (searchInput.length) {
    return <Search />
  }
  return (
    <Flex className={styles.landing} vertical>
      <Flex vertical>
        <WelcomeText />
        <QuestionBox />
      </Flex>
    </Flex>
  );
}
