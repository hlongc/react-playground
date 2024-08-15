import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { useMemoizedFn } from "ahooks";
import { fileName2Language, compress, uncompress } from "./utils";
import { ContextType, Files, ThemeType } from "./common";
import { initFiles } from "./files";

export const PlaygroundContext = createContext<ContextType>({
  selectedFileName: "main.tsx",
} as ContextType);

const getFilesFromHash = () => {
  let files: Files | undefined;
  try {
    const hash = uncompress(window.location.hash.slice(1));
    files = JSON.parse(hash);
  } catch (error) {
    console.error("解析hash错误", error);
  }

  return files;
};

export const PlaygroundContextProvider = (props: PropsWithChildren) => {
  const { children } = props;
  const [files, setFiles] = useState<Files>(getFilesFromHash() ?? initFiles);
  const [theme, setTheme] = useState<ThemeType>("light");
  const [selectedFileName, setSelectedFileName] = useState<string>("main.tsx");

  useEffect(() => {
    const hash = compress(JSON.stringify(files));
    window.location.hash = hash;
  }, [files]);

  const addFile = useMemoizedFn((name: string) => {
    setFiles([
      ...files,
      { name, value: "", language: fileName2Language(name) },
    ]);
  });

  const removeFile = useMemoizedFn((fileName: string) => {
    const targetIndex = files.findIndex((file) => file.name === fileName);
    files.splice(targetIndex, 1);
    setFiles([...files]);
  });

  const updateFileName = useMemoizedFn(
    (oldFileName: string, newFileName: string) => {
      const targetIndex = files.findIndex((file) => file.name === oldFileName);
      if (targetIndex === -1) return;
      const oldValue = files[targetIndex];

      files.splice(targetIndex, 1, {
        ...oldValue,
        name: newFileName,
        language: fileName2Language(newFileName),
      });

      setFiles([...files]);
    }
  );

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
          theme,
          setTheme,
        } as ContextType
      }
    >
      {children}
    </PlaygroundContext.Provider>
  );
};
