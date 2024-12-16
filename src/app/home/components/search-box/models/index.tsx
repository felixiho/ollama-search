import { Button } from "antd";
import type { MenuProps } from "antd";
import { Dropdown, Space } from "antd";
import { createStyles } from "antd-style";
import { useEffect, useMemo, useState } from "react";

const useStyles = createStyles(({ css, token }) => ({
  link: css`
    color: ${token.colorTextBase};
    text-transform: capitalize;
  `,
}));
export default function Models() {
  const [models, setModels] = useState<MenuProps["items"]>([]);

  // State to track loading and error conditions
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch models from local Ollama
  //todo: move this to store actions
  const fetchOllamaModels = async () => {
    try {
      // Default local Ollama API endpoint
      const response = await fetch("http://localhost:11434/api/tags");

      if (!response.ok) {
        throw new Error("Failed to fetch Ollama models");
      }

      const data = await response.json();

      // Assuming the API returns an array of models with a 'name' property
      setModels(data.models || []);
      console.log(data.models);
      setIsLoading(false);
    } catch (err: any) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  // Fetch models when component mounts
  useEffect(() => {
    fetchOllamaModels();
  }, []);

  const items = useMemo<MenuProps["items"]>(() => {
    let modelsList: MenuProps["items"] = [
      {
        disabled: true,
        key: "header",
        label: "Models",
      },
    ];

    if (models && models.length) {
      const modelsFormatted: MenuProps["items"] = models.map((m: any) => ({
        key: m.model,
        label: m.name,
        disabled: false,
      }));
      modelsList = [...modelsList, ...modelsFormatted];
    }

    return modelsList;
  }, [models]);

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
