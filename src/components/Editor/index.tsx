import MonacoEditor, { EditorProps } from "@monaco-editor/react";
import { createATA } from "./ata";
import { editor } from "monaco-editor";
import { PlaygroundContext } from "../../Context";
import { useContext } from "react";
import { ContextType } from "../../common";

export interface EditorFile {
  name: string;
  value: string;
  language: string;
}

interface Props {
  file: EditorFile;
  onChange?: EditorProps["onChange"];
  options?: editor.IStandaloneDiffEditorConstructionOptions;
}

export default function Editor(props: Props) {
  const { onChange, options, file } = props;

  return (
    <MonacoEditor
      height="100%"
      path={file.name}
      language={file.language}
      value={file.value}
      onChange={onChange}
      options={{
        fontSize: 14,
        scrollBeyondLastLine: false,
        minimap: { enabled: false },
        scrollbar: {
          verticalScrollbarSize: 6,
          horizontalScrollbarSize: 6,
        },
        ...options,
      }}
      onMount={(editor, monaco) => {
        const ata = createATA((code, path) => {
          monaco.languages.typescript.typescriptDefaults.addExtraLib(
            code,
            `file://${path}`
          );
        });

        editor.onDidChangeModelContent(() => {
          ata(editor.getValue());
        });

        ata(editor.getValue());

        editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyJ, () => {
          // Format the code in the
          editor.getAction("editor.action.formatDocument")?.run();
        });

        monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
          jsx: monaco.languages.typescript.JsxEmit.Preserve,
          esModuleInterop: true,
        });
      }}
    />
  );
}
