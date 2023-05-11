"use client";
import { useAction, useSelector } from "@/helpers/hooks";
import { selectors } from "@/store/selectors";
import React from "react";
import styles from "./ProfilePage.module.scss";
import Loader from "@/components/ui/loader/Loader";
import Button from "@/components/ui/button/Button";
import { actions } from "@/store";
type Props = {};

const ProfilePage = (props: Props) => {
  const account = useSelector(selectors.auth.account);
  const open = useAction(actions.modal.open);
  if (!account) {
    return <Loader />;
  }
  return (
    <div className={styles.container}>
      <h2 className={styles["container-title"]}>Profile</h2>
      <div className={styles["container-values"]}>
        <h3 className={styles["container-item"]}>Setting</h3>
        <p className={styles["container-item"]}>Value</p>
        <h3 className={styles["container-item"]}>Username</h3>
        <p className={styles["container-item-value"]}>{account.username}</p>
        <h3 className={styles["container-item"]}>Email</h3>
        <p className={styles["container-item-value"]}>{account.email}</p>
        <h3 className={styles["container-item"]}>Password</h3>
        <p className={styles["container-item-value"]}>
          <Button onClick={() => open("change-password")}>
            Change password
          </Button>
        </p>
      </div>
    </div>
  );
};

export default ProfilePage;
