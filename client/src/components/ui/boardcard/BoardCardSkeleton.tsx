import { Board } from "@/types/board";
import React, { FC } from "react";
import styles from "./BoardCard.module.scss";
import cx from "classnames";
const BoardCardSkeleton: FC = () => {
  return (
    <div className={styles.wrapper}>
      <h3>Title</h3>
    </div>
  );
};

export default BoardCardSkeleton;
