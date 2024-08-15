import logo from "@/assets/react.svg";
import styles from "./index.module.less";
import {
  DownloadOutlined,
  MoonOutlined,
  ShareAltOutlined,
  SunOutlined,
} from "@ant-design/icons";
import { PlaygroundContext } from "../../Context";
import { useContext } from "react";
import { message, Space, Tooltip } from "antd";
import copy from "copy-to-clipboard";
import { downloadFiles } from "../../utils";

export default function Header() {
  const { theme, setTheme, files } = useContext(PlaygroundContext);

  return (
    <div className={styles["header"]}>
      <div className={styles["header-left"]}>
        <img src={logo} />
        <span>React Playground</span>
      </div>
      <Space style={{ fontSize: 20 }}>
        <Tooltip title="下载源代码">
          <DownloadOutlined
            style={{ cursor: "pointer" }}
            onClick={async () => {
              await downloadFiles(files);
              message.success("下载完成");
            }}
          />
        </Tooltip>
        <Tooltip title="分享">
          <ShareAltOutlined
            style={{ cursor: "pointer" }}
            onClick={() => {
              copy(window.location.href);
              message.success("链接已复制到剪贴板");
            }}
          />
        </Tooltip>
        <Tooltip title={theme === "light" ? "切换暗色主题" : "切换亮色主题"}>
          {theme === "light" ? (
            <MoonOutlined
              title="切换暗色主题"
              onClick={() => setTheme("dark")}
            />
          ) : (
            <SunOutlined
              title="切换亮色主题"
              onClick={() => setTheme("light")}
            />
          )}
        </Tooltip>
      </Space>
    </div>
  );
}
