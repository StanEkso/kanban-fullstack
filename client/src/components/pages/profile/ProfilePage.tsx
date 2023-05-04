"use client";
import { useSelector } from "@/helpers/hooks";
import { selectors } from "@/store/selectors";
import React from "react";
import styles from "./ProfilePage.module.scss";
import Loader from "@/components/ui/loader/Loader";
type Props = {};

const ProfilePage = (props: Props) => {
  const account = useSelector(selectors.auth.account);
  if (!account) {
    return <Loader />;
  }
  return (
    <div className={styles.container}>
      <h2 className={styles["container-title"]}>Profile</h2>
    </div>
  );
};

export default ProfilePage;
