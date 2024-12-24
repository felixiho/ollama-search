import { useModelStore } from "@/store/models";
import { useSearchEngineStore } from "@/store/searchEngines";
import { Input, notification } from "antd";
import { createStyles } from "antd-style";
import { useState } from "react";
import { useSearchStore } from "@/store/search";

const { TextArea } = Input;

const useStyles = createStyles(({ css }) => ({
  searchTwo: css`
    border: none;
    outline: none;
    box-shadow: none;

    &:hover,
    &:focus,
    &:focus-within {
      border: none;
      outline: none;
      box-shadow: none;
    }

    & textarea {
      padding: 0;
    }
  `,
}));
export default function SearchTextArea() {
  const { styles } = useStyles();
  const [api, contextHolder] = notification.useNotification();
  const [value, setValue] = useState("");

  const [selectedModel] = useModelStore((s) => [s.selectedModel]);
  const [selectedSearchEngine] = useSearchEngineStore((s) => [s.selectedSearchEngine]);

  const [search] = useSearchStore((s) => [s.search]);


  const handleSearch = () => {
    if (!selectedModel) {
      api.warning({
        message:
          "Please select a model before searching.",
      });
      return false
    }
    if (!selectedSearchEngine) {
      api.warning({
        message:
          "Please select a search engine before searching.",
      });
      return false
    }
    search(value, selectedModel, selectedSearchEngine);
  }

  return (
    <>
      {contextHolder}
      <TextArea
        allowClear
        placeholder="Ask anything..."
        autoSize={{ maxRows: 4, minRows: 3 }}
        size="large"
        onPressEnter={(e) => {
          if (e.shiftKey) {
            return;
          }
          handleSearch()
        }}
        onChange={(e) => setValue(e.target.value)}
        onSubmit={handleSearch}
        style={{
          padding: 0,
        }}
        className={styles.searchTwo}
      />

    </>
  );
}
