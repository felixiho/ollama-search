import { Card, Flex, Space } from "antd";
import SearchTextArea from "../../components/search-box/SearchTextArea";
import { createStyles } from "antd-style";
import Models from "../../components/search-box/models";
import SearchEngines from "../../components/search-box/search-engine";

import Upload from "../../components/search-box/upload";

const useStyles = createStyles(({ css, token }) => ({
  box_card: css`
    max-width: 640px;
    width: 100%;
    border-color: ${token.colorBorder};
  `,
}));
export default function QuestionBox() {
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
        <SearchTextArea />
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
