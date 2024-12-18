import { modelSelectors, useModelStore } from "@/store/models";
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
export default function Models() {
  const [useGetModelList, selectedModel, setSelectedModel, modelFetchError] =
    useModelStore((s) => [
      s.useGetModelList,
      s.selectedModel,
      s.setSelectedModel,
      modelSelectors.getModelFetchError(s),
    ]);

  const { styles } = useStyles();
  const [api, contextHolder] = notification.useNotification();
  const { data } = useGetModelList();

  useEffect(() => {
    if (modelFetchError) {
      console.error("Model fetch error:", modelFetchError);
      api.error({
        message:
          "An error occurred retrieving your models. Please make sure you have Ollama installed locally and currently running.",
      });
    }
  }, [modelFetchError, api.error]);

  const items = useMemo<MenuProps["items"]>(() => {
    let modelsList: MenuProps["items"] = [
      {
        disabled: true,
        key: "header",
        label: "Models",
      },
    ];

    if (data && data.models?.length) {
      const modelsFormatted: MenuProps["items"] = data.models.map((m: any) => ({
        key: m.model,
        label: (
          <span className={selectedModel === m.model ? styles.active : ""}>
            {m.name}
          </span>
        ),
        disabled: false,
        onClick: () => setSelectedModel(m.model),
      }));
      modelsList = [...modelsList, ...modelsFormatted];
    }

    return modelsList;
  }, [data, selectedModel]);

  return (
    <>
      {contextHolder}
      <Dropdown menu={{ items }} trigger={["click"]} arrow={true}>
        <Button className={styles.link} onClick={(e) => e.preventDefault()}>
          <Space>{selectedModel ? selectedModel : "Models"}</Space>
        </Button>
      </Dropdown>
    </>
  );
}
