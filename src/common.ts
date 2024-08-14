export interface File {
  name: string;
  value: string;
  language: string;
  /** 当前文件是否能删除 */
  forbiddenDelete?: boolean;
}

export type Files = File[];

export interface ContextType {
  files: Files;
  setFiles: (files: Files) => void;
  selectedFileName: string;
  setSelectedFileName: (fileName: string) => void;
  addFile: (fileName: string) => void;
  removeFile: (fileName: string) => void;
  updateFileName: (oldFileName: string, newFileName: string) => void;
}
