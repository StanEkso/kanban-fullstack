"use client";
import React from "react";
import Tabs, { Tab } from "../tabs/Tabs";

const tabs: Tab[] = [
  {
    title: "Profile",
    url: "/dashboard/profile",
    icon: "User",
  },
];

const SideBar = () => {
  return (
    <div className="">
      <Tabs tabs={tabs} />
    </div>
  );
};

export default SideBar;
