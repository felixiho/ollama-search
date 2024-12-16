import { Button, Tooltip } from "antd";
import { createStyles } from "antd-style";
import { Paperclip } from "lucide-react";

const useStyles = createStyles(({ css }) => ({
  button: css`
    border: none;
  `,
}));
export default function Upload() {
  const { styles } = useStyles();
  return (
    <Tooltip trigger={"hover"} title="Upload file">
      <Button className={styles.button} icon={<Paperclip size={16} />}></Button>
    </Tooltip>
  );
}
