import { createContext, PropsWithChildren, useState } from "react";
import { fileName2Language } from "./utils";
import { ContextType, Files, File } from "./common";
import { initFiles } from "./files";

export const PlaygroundContext = createContext<ContextType>({
  selectedFileName: "App.tsx",
} as ContextType);

export const PlaygroundContextProvider = (props: PropsWithChildren) => {
  const { children } = props;
  const [files, setFiles] = useState<Files>(initFiles);
  const [selectedFileName, setSelectedFileName] = useState<string>("App.tsx");

  const addFile = (name: string) => {
    files[name] = {
      name,
      value: "",
      language: fileName2Language(name),
    };

    setFiles({ ...files });
  };

  const removeFile = (fileName: string) => {
    Reflect.deleteProperty(files, fileName);
    setFiles({ ...files });
  };

  const updateFileName = (oldFileName: string, newFileName: string) => {
    if (!files[oldFileName]) return;
    const { [oldFileName]: oldValue, ...ret } = files;
    const newFile = {
      [newFileName]: {
        ...oldValue,
        name: newFileName,
        language: fileName2Language(newFileName),
      } as File,
    };

    setFiles({ ...ret, ...newFile });
  };

  return (
    <PlaygroundContext.Provider
      value={{
        files,
        setFiles,
        selectedFileName,
        setSelectedFileName,
        addFile,
        removeFile,
        updateFileName,
      }}
    >
      {children}
    </PlaygroundContext.Provider>
  );
};
