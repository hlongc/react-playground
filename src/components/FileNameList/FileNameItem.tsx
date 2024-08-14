import cs from "classnames";
import React, { useState } from "react";

import styles from "./index.module.less";

export interface FileNameItemProps {
  value: string;
  selected: boolean;
  onClick: () => void;
}

export const FileNameItem: React.FC<FileNameItemProps> = (props) => {
  const { value, selected, onClick } = props;
  const [name, setName] = useState(value);

  return (
    <div
      className={cs(styles["tab-item"], selected ? styles.selected : null)}
      onClick={onClick}
    >
      <span>{name}</span>
    </div>
  );
};
