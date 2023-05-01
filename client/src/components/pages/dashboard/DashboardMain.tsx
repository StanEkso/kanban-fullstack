"use client";
import React from "react";
import styles from "./DashboardMain.module.scss";
import { useGetUserBoardsQuery } from "@/store/api/board";

const DashboardMain = () => {
  const { isLoading, data } = useGetUserBoardsQuery();
  return (
    <div className={styles.wrapper}>
      <h1 className={styles["wrapper-page-title"]}>Dashboard</h1>

      <h2 className={styles["wrapper-title"]}>Boards</h2>
      {data &&
        data.map((v) => (
          <div className="" key={v.id}>
            {v.title}
          </div>
        ))}
    </div>
  );
};

export default DashboardMain;
