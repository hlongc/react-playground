import { useContext } from "react";
import { PlaygroundContext } from "../../Context";
import { ContextType } from "../../common";
import styles from "./index.module.less";
import { FileNameItem } from "./FileNameItem";
import { useMemoizedFn } from "ahooks";
import { APP_COMPONENT_FILE_NAME } from "../../files";

export default function FileNameList() {
  const {
    files,
    removeFile,
    addFile,
    updateFileName,
    selectedFileName,
    setSelectedFileName,
  } = useContext<ContextType>(PlaygroundContext);

  const onEditDone = (oldName: string, newName: string) => {
    if (newName === oldName) return;
    updateFileName(oldName, newName);
    setSelectedFileName(newName);
  };

  const addTab = useMemoizedFn(() => {
    const fileName = `newFile${Math.random().toString(16).slice(2, 6)}.tsx`;
    addFile(fileName);
    setSelectedFileName(fileName);
  });

  const removeTab = useMemoizedFn((fileName: string) => {
    removeFile(fileName);
    setSelectedFileName(APP_COMPONENT_FILE_NAME);
  });

  const leftFiles = files.filter((file) => file.position !== "right");
  const rightFiles = files.filter((file) => file.position === "right");

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div className={styles["tabs"]} style={{ flex: 1 }}>
        {leftFiles.map((file, index) => (
          <FileNameItem
            key={file.name + index}
            value={file.name}
            deleteable={!file.forbiddenDelete}
            editable={!file.forbiddenDelete}
            selected={selectedFileName === file.name}
            creatable={index === leftFiles.length - 1}
            onEditDone={(newName) => onEditDone(file.name, newName)}
            onRemove={() => removeTab(file.name)}
            onAdd={addTab}
            onClick={() => setSelectedFileName(file.name)}
          />
        ))}
      </div>
      <div className={styles["tabs"]}>
        {rightFiles.map((file, index) => (
          <FileNameItem
            key={file.name + index}
            value={file.name}
            deleteable={!file.forbiddenDelete}
            editable={!file.forbiddenDelete}
            selected={selectedFileName === file.name}
            onEditDone={(newName) => onEditDone(file.name, newName)}
            onRemove={() => removeTab(file.name)}
            onClick={() => setSelectedFileName(file.name)}
          />
        ))}
      </div>
    </div>
  );
}
