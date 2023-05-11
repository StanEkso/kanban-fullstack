"use client";
import React, { useState } from "react";
import Tabs, { Tab } from "../tabs/Tabs";
import styles from "./SideBar.module.scss";
import cx from "classnames";
import { Icon } from "../Icon";
const tabs: Tab[] = [
  {
    title: "Profile",
    url: "/dashboard/profile",
    icon: "User",
  },
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: "Dashboard",
  },
];

const SideBar = () => {
  const [isOpened, setIsOpened] = useState(false);
  return (
    <div
      className={cx(
        styles.wrapper,
        styles[`wrapper-${isOpened ? "opened" : "closed"}`]
      )}
    >
      <Tabs tabs={tabs} opened={isOpened} />
      <div className="mt-auto">
        <Icon
          glyph="NextArrow"
          onClick={() => setIsOpened(!isOpened)}
          style={{ transform: isOpened ? "rotate(180deg)" : "" }}
          className="mr-auto"
        />
      </div>
    </div>
  );
};

export default SideBar;
