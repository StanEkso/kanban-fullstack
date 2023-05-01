import { Board } from "@/types/board";
import React, { FC } from "react";
import styles from "./BoardCard.module.scss";
import Link from "next/link";

const BoardCard: FC<Board> = ({ title, id }) => {
  return (
    <div className={styles.wrapper}>
      <h3>
        <Link href={`/dashboard/boards/${id}`}>{title}</Link>
      </h3>
    </div>
  );
};

export default BoardCard;
