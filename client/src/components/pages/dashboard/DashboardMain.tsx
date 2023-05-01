import React from "react";
import styles from "./DashboardMain.module.scss";
type Props = {};

const DashboardMain = (props: Props) => {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles["wrapper-page-title"]}>Dashboard</h1>

      <h2 className={styles["wrapper-title"]}>Boards</h2>
    </div>
  );
};

export default DashboardMain;
