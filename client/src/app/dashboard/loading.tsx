import React from "react";
import styles from "@/components/pages/dashboard/DashboardMain.module.scss";
import BoardCardAdd from "@/components/ui/boardcard/BoardCardAdd";
import BoardCardSkeleton from "@/components/ui/boardcard/BoardCardSkeleton";

const DashboardMainLoading = () => {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles["wrapper-page-title"]}>Dashboard</h1>
      <div className={styles.wrapper__board_container}>
        <h2 className={styles["wrapper-title"]}>Boards</h2>
        <div className={styles["wrapper__board_container-grid"]}>
          {Array.from({ length: 5 }).map((_, i) => (
            <BoardCardSkeleton key={i} />
          ))}
          <BoardCardAdd />
        </div>
      </div>
    </div>
  );
};

export default DashboardMainLoading;
