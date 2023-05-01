"use client";
import React from "react";
import styles from "./DashboardMain.module.scss";
import { useGetUserBoardsQuery } from "@/store/api/board";
import BoardCard from "@/components/ui/boardcard/BoardCard";
import BoardCardAdd from "@/components/ui/boardcard/BoardCardAdd";

const DashboardMain = () => {
  const { isLoading, data } = useGetUserBoardsQuery();
  return (
    <div className={styles.wrapper}>
      <h1 className={styles["wrapper-page-title"]}>Dashboard</h1>
      <div className={styles.wrapper__board_container}>
        <h2 className={styles["wrapper-title"]}>Boards</h2>
        <div className={styles["wrapper__board_container-grid"]}>
          {data && data.map((v) => <BoardCard key={v.id} {...v} />)}
          <BoardCardAdd />
        </div>
      </div>
    </div>
  );
};

export default DashboardMain;
