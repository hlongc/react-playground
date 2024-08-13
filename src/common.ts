export interface File {
  name: string;
  value: string;
  language: string;
}

export interface Files {
  [key: string]: File;
}

export interface ContextType {
  files: Files;
  setFiles: (files: Files) => void;
  selectedFileName: string;
  setSelectedFileName: (fileName: string) => void;
  addFile: (fileName: string) => void;
  removeFile: (fileName: string) => void;
  updateFileName: (oldFileName: string, newFileName: string) => void;
}
