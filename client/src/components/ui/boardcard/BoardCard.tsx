import { Board } from "@/types/board";
import React, { FC } from "react";
import styles from "./BoardCard.module.scss";
import Link from "next/link";

const BoardCard: FC<Board> = ({ title, id }) => {
  return (
    <Link href={`/dashboard/boards/${id}`}>
      <div className={styles.wrapper}>
        <h3>{title}</h3>
      </div>
    </Link>
  );
};

export default BoardCard;
