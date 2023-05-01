"use client";
import React from "react";
import Tabs, { Tab } from "../tabs/Tabs";
import styles from "./SideBar.module.scss";
const tabs: Tab[] = [
  {
    title: "Profile",
    url: "/dashboard/profile",
    icon: "User",
  },
];

const SideBar = () => {
  return (
    <div className={styles.sidebar__wrapper}>
      <Tabs tabs={tabs} />
    </div>
  );
};

export default SideBar;
