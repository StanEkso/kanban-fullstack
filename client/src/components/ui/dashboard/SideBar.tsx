"use client";
import React, { useState } from "react";
import styles from "./SideBar.module.scss";
import { IconGlyph } from "../Icon";
import Tabs, { Tab } from "../tabs/Tabs";

const tabs: Tab[] = [
  {
    title: "Profile",
    url: "/dashboard/profile",
    icon: "User",
  },
];

const SideBar = () => {
  const [opened, setOpened] = useState(false);
  return (
    <div className="">
      <Tabs tabs={tabs} />
    </div>
  );
};

export default SideBar;
