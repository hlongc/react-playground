import { useContext, useEffect, useState } from "react";
import { PlaygroundContext } from "../../Context";
import { ContextType } from "../../common";
import styles from "./index.module.less";
import { FileNameItem } from "./FileNameItem";

export default function FileNameList() {
  const {
    files,
    removeFile,
    addFile,
    updateFileName,
    selectedFileName,
    setSelectedFileName,
  } = useContext<ContextType>(PlaygroundContext);

  const [tabs, setTabs] = useState<string[]>([""]);

  useEffect(() => {
    setTabs(Object.keys(files));
  }, [files]);

  return (
    <div className={styles["tabs"]}>
      {tabs.map((fileName, index) => (
        <FileNameItem
          key={fileName + index}
          value={fileName}
          actived={selectedFileName === fileName}
          onClick={() => setSelectedFileName(fileName)}
        />
      ))}
    </div>
  );
}
