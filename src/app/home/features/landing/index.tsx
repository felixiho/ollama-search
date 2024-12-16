"use client";
import WelcomeText from "../../components/landing/WelcomeText";
import { Flex } from "antd";
import QuestionBox from "./QuestionBox";
import { createStyles } from "antd-style";

const useStyles = createStyles(({ css }) => ({
  landing: css`
    margin-top: 8rem;
  `,
}));
export default function Landing() {
  const { styles } = useStyles();
  return (
    <Flex className={styles.landing} vertical>
      <WelcomeText />
      <QuestionBox />
    </Flex>
  );
}
