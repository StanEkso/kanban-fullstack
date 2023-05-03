"use client";

import React, { FC } from "react";

import styles from "./Column.module.scss";
import { Column as IColumn } from "@/types/board";
import { useGetColumnDetailsQuery } from "@/store/api/column";

const Column: FC<IColumn> = ({ title, id }) => {
  const { data } = useGetColumnDetailsQuery(id);
  return (
    <div className="">
      <div className={styles.container}>
        <h1 className={styles["container-title"]}>{title}</h1>
      </div>
      {Boolean(data) && <p>{JSON.stringify(data)}</p>}
    </div>
  );
};

export default Column;
