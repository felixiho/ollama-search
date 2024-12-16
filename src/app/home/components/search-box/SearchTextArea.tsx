import { Input } from "antd";
import { createStyles } from "antd-style";

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
export default function searchTextArea() {
  const { styles } = useStyles();

  return (
    <TextArea
      allowClear
      placeholder="Ask anything..."
      autoSize={{ maxRows: 4, minRows: 3 }}
      size="large"
      style={{
        padding: 0,
      }}
      className={styles.searchTwo}
    />
  );
}
