"use client";

import { createStyles } from "antd-style";
import NavHeader from "../components/navigation/NavHeader";
import Landing from "./landing";
import { useEffect } from "react";
import { useSearchStore } from "@/store/search";

const useStyles = createStyles(({ css, token }) => ({
  page: css`
    background-color: ${token.colorFillTertiary};
    display: flex;
    padding: 0 0.5rem;
  `,
}));

export default function HomePage() {
  const { styles } = useStyles();
  const [reset] = useSearchStore((s) => [s.resetSearch]);

  useEffect(() => {
    reset();
  }, []);

  return (
    <div className={styles.page}>
      <NavHeader />
      <Landing />
    </div>
  );
}
