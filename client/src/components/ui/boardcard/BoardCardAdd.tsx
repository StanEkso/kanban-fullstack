"use client";
import React from "react";

import styles from "./BoardCard.module.scss";
import cx from "classnames";
import { useAction } from "@/helpers/hooks";
import { actions } from "@/store";
const BoardCardAdd = () => {
  const open = useAction(actions.modal.open);
  return (
    <div
      className={cx(styles.wrapper, styles["wrapper-create"])}
      onClick={() => open("create-board")}
    >
      <h3>Add new board</h3>
    </div>
  );
};

export default BoardCardAdd;
