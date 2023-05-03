"use client";
import { BoardWithDetails } from "@/types/board";
import React, { FC, useState } from "react";
import styles from "./BoardConcrete.module.scss";
import Column from "@/components/ui/column/Column";
import ColumnCreate from "@/components/ui/column/ColumnCreate";
import { useCreateColumnMutation } from "@/store/api/column";
import Button from "@/components/ui/button/Button";
import ColumnCreateButton from "@/components/ui/column/ColumnCreateButton";

const BoardConcrete: FC<BoardWithDetails> = ({ title, columns, id }) => {
  const [createColumn] = useCreateColumnMutation();
  const [isCreating, setIsCreating] = useState(false);
  return (
    <div className={styles.board__wrapper}>
      <div className={styles["board__wrapper-header"]}>
        <h2 className={styles["board__wrapper-header-title"]}>{title}</h2>
      </div>
      <div className={styles["board__wrapper-columns"]}>
        {columns.map((c) => (
          <Column {...c} key={c.id} />
        ))}
        {isCreating && (
          <ColumnCreate
            onSubmit={(v) => createColumn({ ...v, boardId: id })}
            close={() => setIsCreating(false)}
          />
        )}
        <ColumnCreateButton onClick={() => setIsCreating((b) => !b)} />
      </div>
    </div>
  );
};

export default BoardConcrete;
