"use client";
import WelcomeText from "../../components/landing/WelcomeText";
import { Flex } from "antd";
import QuestionBox from "./QuestionBox";
import { createStyles } from "antd-style";
import { useSearchStore } from "@/store/search";
import { Search } from "../search";

const useStyles = createStyles(({ css }) => ({
  landing: css`
    margin-top: 8rem;
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
      <WelcomeText />
      <QuestionBox />
    </Flex>
  );
}
