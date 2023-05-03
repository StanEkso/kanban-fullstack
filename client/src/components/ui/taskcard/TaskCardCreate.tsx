"use client";

import { ITaskCreateRequest } from "@/types/board";
import React, { FC, FormEvent } from "react";
import styles from "./TaskCard.module.scss";
import { useForm } from "@/helpers/hooks/useForm";
type Props = {
  onSubmit: (data: ITaskCreateRequest) => void;
  close: () => void;
};

const TaskCardCreate: FC<Props> = ({ onSubmit, close }) => {
  const { payload, listener } = useForm<Record<string, string>>();
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (payload.title?.trim() === "") {
      return close();
    }
    onSubmit({ title: payload.title, columnId: 0 });
  };
  return (
    <div className={styles["container"]}>
      <form onSubmit={handleSubmit}>
        <input
          className={styles["container-input"]}
          type="text"
          placeholder="Enter card name"
          name="title"
          onChange={listener}
          autoFocus={true}
          onBlur={close}
        />
      </form>
    </div>
  );
};

export default TaskCardCreate;
