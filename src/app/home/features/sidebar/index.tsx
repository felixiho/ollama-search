import { Flex, Typography } from "antd";
import { createStyles } from "antd-style";
import { GalleryVerticalEnd, LayoutGrid } from "lucide-react";
import History from "./History";

const { Title } = Typography;

const useStyles = createStyles(({ css, token }) => ({
  nav_items: css`
    margin-top: 2rem;
    margin-right: 0.5rem;
  `,
  nav_child: css`
    padding: 0.5rem 1rem;
    cursor: pointer;
    transition: all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    &:hover {
      background: ${token.colorBgTextHover};
      border-radius: 0.25rem;
    }
  `,
  title: css`
    margin: 0 !important;
  `,
  icon: css`
    margin-right: 0.5rem;
  `,
}));
export default function NavItems() {
  const { styles } = useStyles();

  return (
    <Flex vertical className={styles.nav_items}>
      <Flex align="center" className={styles.nav_child}>
        <LayoutGrid className={styles.icon} size={18} />
        <Title level={4} className={styles.title}>
          {" "}
          Home
        </Title>
      </Flex>
      <Flex align="center" className={styles.nav_child}>
        <GalleryVerticalEnd className={styles.icon} size={18} />
        <Title level={4} className={styles.title}>
          {" "}
          History
        </Title>
      </Flex>

      <History />
    </Flex>
  );
}
