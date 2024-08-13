import Editor from "../Editor";
import FileNameList from "../FileNameList";

export default function CodeEditor() {
  function onEditorChange() {
    console.log(...arguments);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <FileNameList />
      <Editor
        file={{
          name: "guang.tsx",
          value: 'import lodash from "lodash";\n\nconst a = <div>guang</div>',
          language: "typescript",
        }}
        onChange={onEditorChange}
      />
    </div>
  );
}
