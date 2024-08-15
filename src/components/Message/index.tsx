import cs from "classnames";
import { useState, useEffect, FC } from "react";

import styles from "./index.module.less";

export interface MessageProps {
  type: "warn" | "error";
  content: string;
}

export const Message: FC<MessageProps> = (props) => {
  const { content, type } = props;
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setVisible(true);
  }, [content]);

  return (
    visible && (
      <div className={cs(styles.msg, styles[type])}>
        <pre dangerouslySetInnerHTML={{ __html: content }}></pre>
        <button className={styles.dismiss} onClick={() => setVisible(false)}>
          ✕
        </button>
      </div>
    )
  );
};
