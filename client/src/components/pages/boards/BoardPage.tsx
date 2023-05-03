import { BoardWithDetails } from "@/types/board";
import React, { FC } from "react";
import styles from "./BoardConcrete.module.scss";
import Column from "@/components/ui/column/Column";
type Props = {};

const BoardConcrete: FC<BoardWithDetails> = ({ title, columns }) => {
  console.log(columns);
  return (
    <div className={styles.board__wrapper}>
      <div className={styles["board__wrapper-header"]}>
        <h2 className={styles["board__wrapper-header-title"]}>{title}</h2>
      </div>
      <div className={styles["board__wrapper-columns"]}>
        {columns.map((c) => (
          <Column {...c} key={c.id} />
        ))}
      </div>
    </div>
  );
};

export default BoardConcrete;
