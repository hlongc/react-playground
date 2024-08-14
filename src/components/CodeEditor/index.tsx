import { useContext } from "react";
import Editor from "../Editor";
import FileNameList from "../FileNameList";
import { ContextType } from "../../common";
import { PlaygroundContext } from "../../Context";
import { debounce, cloneDeep } from "lodash-es";

export default function CodeEditor() {
  const { files, selectedFileName, setFiles } =
    useContext<ContextType>(PlaygroundContext);
  const file = files.find((file) => file.name === selectedFileName)!;

  function onEditorChange(value?: string) {
    const fileIndex = files.findIndex((file) => file.name === selectedFileName);
    const file = cloneDeep(files[fileIndex]);
    file.value = value || "";
    files.splice(fileIndex, 1, file);
    setFiles([...files]);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <FileNameList />
      <Editor file={file} onChange={debounce(onEditorChange, 500)} />
    </div>
  );
}
