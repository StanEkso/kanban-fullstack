"use client";

import React, { FC, useState } from "react";

import styles from "./Column.module.scss";
import { Column as IColumn } from "@/types/board";
import {
  useCreateTaskMutation,
  useGetColumnDetailsQuery,
} from "@/store/api/task";
import TaskCard from "../taskcard/TaskCard";
import Button from "../button/Button";
import TaskCardCreate from "../taskcard/TaskCardCreate";

const Column: FC<IColumn> = ({ title, id }) => {
  const { data } = useGetColumnDetailsQuery(id);
  const [isCreating, setIsCreating] = useState(false);
  const [createTask, { data: createdData }] = useCreateTaskMutation();
  return (
    <div className="">
      <div className={styles.container}>
        <h1 className={styles["container-title"]}>{title}</h1>
        {data?.map((v) => (
          <TaskCard key={v.id} {...v} />
        ))}
        {isCreating && (
          <TaskCardCreate
            onSubmit={(v) => {
              console.log("get data", v);
              createTask({ ...v, columnId: id });
            }}
            close={() => setIsCreating(false)}
          />
        )}
        <Button
          theme="secondary"
          className="mr-auto"
          icon="Plus"
          onClick={() => setIsCreating((b) => !b)}
        >
          Add new card
        </Button>
      </div>
    </div>
  );
};

export default Column;
