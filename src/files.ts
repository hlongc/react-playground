import { Files } from "./common";
import importMap from "./template/import-map.json?raw";
import AppCss from "./template/App.css?raw";
// import 模块的时候加一个 ?raw，就是直接文本的方式引入模块内容。
import App from "./template/App.tsx?raw";
import main from "./template/main.tsx?raw";
import { fileName2Language } from "./utils";

/** app 文件名 */
export const APP_COMPONENT_FILE_NAME = "App.tsx";
/** esm 模块映射文件名 */
export const IMPORT_MAP_FILE_NAME = "import-map.json";
/** app 入口文件名 */
export const ENTRY_FILE_NAME = "main.tsx";

export const initFiles: Files = [
  {
    name: ENTRY_FILE_NAME,
    language: fileName2Language(ENTRY_FILE_NAME),
    value: main,
    forbiddenDelete: true,
  },
  {
    name: APP_COMPONENT_FILE_NAME,
    language: fileName2Language(APP_COMPONENT_FILE_NAME),
    value: App,
    forbiddenDelete: true,
  },
  {
    name: "App.css",
    language: "css",
    value: AppCss,
    forbiddenDelete: true,
  },
  {
    name: IMPORT_MAP_FILE_NAME,
    language: fileName2Language(IMPORT_MAP_FILE_NAME),
    value: importMap,
    forbiddenDelete: true,
  },
];
