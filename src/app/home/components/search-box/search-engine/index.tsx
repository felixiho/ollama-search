import { Button } from "antd";
import type { MenuProps } from "antd";
import { Dropdown, Space } from "antd";
import { createStyles } from "antd-style";
import { useMemo, useState } from "react";

const useStyles = createStyles(({ css, token }) => ({
  link: css`
    color: ${token.colorTextBase};
    text-transform: capitalize;
  `,
}));

const searchEngines = [
  { name: "Tavily", key: "tavily" },
  { name: "Google", key: "google" },
];
export default function SearchEngines() {
  const [selectedSearchEngine, setSelectedSearchEngine] = useState("");

  const items = useMemo<MenuProps["items"]>(() => {
    let searchEnginesList: MenuProps["items"] = [
      {
        disabled: true,
        key: "header",
        label: "Search Engines",
      },
    ];

    const modelsFormatted: MenuProps["items"] = searchEngines.map((m) => ({
      key: m.key,
      label: m.name,
      disabled: false,
    }));
    searchEnginesList = [...searchEnginesList, ...modelsFormatted];

    return searchEnginesList;
  }, [selectedSearchEngine]);

  const { styles } = useStyles();
  if (!items || items.length < 1) return null;
  return (
    <Dropdown menu={{ items }} trigger={["click"]}>
      <Button className={styles.link} onClick={(e) => e.preventDefault()}>
        <Space>{items[1]?.key}</Space>
      </Button>
    </Dropdown>
  );
}
