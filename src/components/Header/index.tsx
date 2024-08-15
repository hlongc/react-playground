import logo from "@/assets/react.svg";
import styles from "./index.module.less";
import { MoonOutlined, SunOutlined } from "@ant-design/icons";
import { PlaygroundContext } from "../../Context";
import { useContext } from "react";

export default function Header() {
  const { theme, setTheme } = useContext(PlaygroundContext);

  return (
    <div className={styles["header"]}>
      <div className={styles["header-left"]}>
        <img src={logo} />
        <span>React Playground</span>
      </div>
      <div>
        {theme === "light" ? (
          <MoonOutlined title="切换暗色主题" onClick={() => setTheme("dark")} />
        ) : (
          <SunOutlined title="切换亮色主题" onClick={() => setTheme("light")} />
        )}
      </div>
    </div>
  );
}
