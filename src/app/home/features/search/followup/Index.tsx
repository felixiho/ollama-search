import { Flex } from "antd";
import { createStyles } from "antd-style";
import QuestionBox from "../../landing/QuestionBox";

const useStyles = createStyles(({ css }) => ({
  followup: css`
    position: fixed;
    bottom: 1rem;
    width: 100%;
    max-width: 640px;
  `,
  search: css`
    width: 100%;
  `,
}));

export default function FollowupSearch() {
  const { styles } = useStyles();

  return (
    <Flex className={styles.followup}>
      <Flex className={styles.search} vertical>
        <QuestionBox />
      </Flex>
    </Flex>
  );
}
