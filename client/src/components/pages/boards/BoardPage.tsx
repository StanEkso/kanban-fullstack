import { BoardWithDetails } from "@/types/board";
import React, { FC } from "react";
import styles from "./BoardConcrete.module.scss";
type Props = {};

const BoardConcrete: FC<BoardWithDetails> = ({ title }) => {
  return (
    <div className={styles.board__wrapper}>
      <div className={styles["board__wrapper-header"]}>
        <h2 className={styles["board__wrapper-header-title"]}>{title}</h2>
      </div>
    </div>
  );
};

export default BoardConcrete;
