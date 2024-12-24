import { Card, Flex, Space } from "antd";
import SearchTextArea from "../../components/search-box/SearchTextArea";
import { createStyles } from "antd-style";
import Models from "../../components/search-box/models";
import SearchEngines from "../../components/search-box/search-engine";

import Upload from "../../components/search-box/upload";

const useStyles = createStyles(({ css }) => ({
  box_card: css`
    max-width: 675px;
    width: 100%;
  `,
}));
export default function QuestionBox({ isFollowup }: { isFollowup?: boolean }) {
  const { styles } = useStyles();
  return (
    <Flex justify="center">
      <Card
        styles={{
          body: {
            padding: "1rem",
          },
        }}
        className={styles.box_card}
      >
        <SearchTextArea isFollowup={isFollowup} />
        <Flex justify="space-between" align="center">
          <Space wrap>
            <Models />
            <SearchEngines />
          </Space>
          <Upload />
        </Flex>
      </Card>
    </Flex>
  );
}
