import { createContext, PropsWithChildren, useState } from "react";
import { fileName2Language } from "./utils";
import { ContextType, Files } from "./common";
import { initFiles } from "./files";

export const PlaygroundContext = createContext<ContextType>({
  selectedFileName: "main.tsx",
} as ContextType);

export const PlaygroundContextProvider = (props: PropsWithChildren) => {
  const { children } = props;
  const [files, setFiles] = useState<Files>(initFiles);
  const [selectedFileName, setSelectedFileName] = useState<string>("main.tsx");

  const addFile = (name: string) => {
    setFiles([
      ...files,
      { name, value: "", language: fileName2Language(name) },
    ]);
  };

  const removeFile = (fileName: string) => {
    Reflect.deleteProperty(files, fileName);
    setFiles({ ...files });
  };

  const updateFileName = (oldFileName: string, newFileName: string) => {
    const targetIndex = files.findIndex((file) => file.name === oldFileName);
    if (targetIndex === -1) return;
    const oldValue = files[targetIndex];

    files.splice(targetIndex, 1, { ...oldValue, name: newFileName });

    setFiles([...files]);
  };

  return (
    <PlaygroundContext.Provider
      value={
        {
          files,
          setFiles,
          selectedFileName,
          setSelectedFileName,
          addFile,
          removeFile,
          updateFileName,
        } as ContextType
      }
    >
      {children}
    </PlaygroundContext.Provider>
  );
};
