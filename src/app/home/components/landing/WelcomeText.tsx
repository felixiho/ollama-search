import { Typography } from "antd";
import { createStyles } from "antd-style";

const useStyles = createStyles(({ css }) => ({
  text_center: css`
    text-align: center;
  `,
}));
export default function WelcomeText() {
  const { styles } = useStyles();
  const { Title } = Typography;
  return (
    <Title level={1} className={styles.text_center}>
      What do you want to know?
    </Title>
  );
}
