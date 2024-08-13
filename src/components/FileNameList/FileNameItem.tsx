import cs from "classnames";
import React, { useState, useRef, useEffect } from "react";

import styles from "./index.module.less";

export interface FileNameItemProps {
  value: string;
  actived: boolean;
  onClick: () => void;
}

export const FileNameItem: React.FC<FileNameItemProps> = (props) => {
  const { value, actived, onClick } = props;
  const [name, setName] = useState(value);

  return (
    <div
      className={cs(styles["tab-item"], actived ? styles.actived : null)}
      onClick={onClick}
    >
      <span>{name}</span>
    </div>
  );
};
