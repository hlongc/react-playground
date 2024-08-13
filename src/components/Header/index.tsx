import logo from "@/assets/react.svg";
import styles from "./index.module.less";

export default function Header() {
  return (
    <div className={styles["header"]}>
      <img src={logo} />
      <span>React Playground</span>
    </div>
  );
}
