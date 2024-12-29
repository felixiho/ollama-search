"use client";

import { useSearchStore } from "@/store/search";
import { Button, Flex, Typography } from "antd";
import { createStyles } from "antd-style";
import { Plus } from "lucide-react";
import NavItems from "../../features/sidebar";
import { useRouter } from "next/navigation";

const useStyles = createStyles(({ css, token }) => ({
  sidebar: css`
  height: 100%;
  min-height: 100dvh;
  `,
  nav: css`
    width: 100%;
    max-width: 240px; 
    padding-top: 1.5rem; 
    position: fixed;
    background-color: ${token.colorFillTertiary};
    height: 100%;

  `,

  nav_header: css`
      padding-right: 1.5rem;
      padding-left: 1rem;
    `,
  new_search: css`
    margin-top: 1rem;
    padding: 1.3rem;
    border-radius: 2rem;
    `
}));


export default function NavHeader() {
  const { styles } = useStyles();
  const { Title } = Typography;
  const router = useRouter()
  const [reset] = useSearchStore(s => [s.resetSearch])


  const handleNewSearch = () => {
    reset()
    router.push('/')
  }

  return (
    <Flex className={styles.sidebar}>
      <Flex className={styles.nav} vertical  >

        <Flex vertical className={styles.nav_header}>
          <Title level={3}>Ollama Search</Title>

          <Button icon={<Plus />} className={styles.new_search} onClick={handleNewSearch}>New Search </Button>


        </Flex>
        <NavItems />

      </Flex>
    </Flex>
  );
}
