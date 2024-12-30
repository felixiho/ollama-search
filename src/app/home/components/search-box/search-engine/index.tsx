import { useSearchEngineStore } from "@/store/searchEngines";
import { Button, notification } from "antd";
import type { MenuProps } from "antd";
import { Dropdown, Space } from "antd";
import { createStyles } from "antd-style";
import { useEffect, useMemo } from "react";

const useStyles = createStyles(({ css, token }) => ({
  link: css`
    color: ${token.colorTextBase};
    text-transform: capitalize;
  `,
  active: css`
    color: ${token.colorLinkActive};
  `,
}));

export default function SearchEngines() {
  const [
    searchEngineList,
    error,
    selectedSearchEngine,
    setSelectedSearchEngine,
    initializeSearchEngine,
  ] = useSearchEngineStore((s) => [
    s.searchEngineList,
    s.error,
    s.selectedSearchEngine,
    s.setSelectedSearchEngine,
    s.initializeSearchEngine,
  ]);

  const [api, contextHolder] = notification.useNotification();
  const { styles } = useStyles();

  useEffect(() => {
    initializeSearchEngine();
  }, [initializeSearchEngine]);

  useEffect(() => {
    if (error) {
      console.error("Search engine error:", error);
      api.error({
        message: error,
      });
    }
  }, [error, api.error]);

  const items = useMemo<MenuProps["items"]>(() => {
    let searchEnginesList: MenuProps["items"] = [
      {
        disabled: true,
        key: "header",
        label: "Search Engines",
      },
    ];

    const searchEngines: MenuProps["items"] = searchEngineList.map(
      (engines) => ({
        key: engines.key,
        label: (
          <span
            className={
              selectedSearchEngine === engines.key ? styles.active : ""
            }
          >
            {engines.label}
          </span>
        ),
        disabled: false,
        onClick: () => setSelectedSearchEngine(engines.key),
      }),
    );
    searchEnginesList = [...searchEnginesList, ...searchEngines];

    return searchEnginesList;
  }, [selectedSearchEngine, searchEngineList]);

  if (!items || items.length < 1) return null;
  return (
    <>
      {contextHolder}
      <Dropdown menu={{ items }} trigger={["click"]}>
        <Button className={styles.link} onClick={(e) => e.preventDefault()}>
          <Space>
            {selectedSearchEngine ? selectedSearchEngine : "Search Engines"}
          </Space>
        </Button>
      </Dropdown>
    </>
  );
}
