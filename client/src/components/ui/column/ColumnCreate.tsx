"use client";

import React, { FC, FormEvent } from "react";

import styles from "./Column.module.scss";
import { IColumnCreateRequest } from "@/types/board";
import { useForm } from "@/helpers/hooks/useForm";

type Props = {
  onSubmit: (v: IColumnCreateRequest) => void;
  close: () => void;
};

const ColumnCreate: FC<Props> = ({ onSubmit, close }) => {
  const { listener, payload, setPayload } = useForm<Record<string, string>>({});
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!payload.title?.trim()) {
      return close();
    }
    onSubmit({ title: payload.title, boardId: 0 });
    setPayload({});
  };
  return (
    <div className="">
      <div className={styles.container}>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className={styles["container-input"]}
            value={payload.title}
            name="title"
            onChange={listener}
            autoFocus
            onBlur={close}
          />
        </form>
      </div>
    </div>
  );
};

export default ColumnCreate;
