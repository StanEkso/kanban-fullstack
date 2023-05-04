"use client";
import { useForm } from "@/helpers/hooks/useForm";
import React, { FormEvent } from "react";
import styles from "./Auth.module.scss";
import Modal from "../modal/Modal";
import cx from "classnames";
import { Icon } from "@/components/ui/Icon";
import { Input } from "@/components/ui/Input/Input";
import Button from "@/components/ui/button/Button";
import { Circles } from "react-loader-spinner";
import { Toggle } from "@/components/ui/Toggle/Toggle";
import { useCreateBoardMutation } from "@/store/api/board";
import { useAction, useSelector } from "@/helpers/hooks";
import { actions } from "@/store";
import { AxiosError } from "axios";
import { ApiErrorWithDetails } from "@/types/error";
import { selectors } from "@/store/selectors";
import { useRouter } from "next/navigation";

const CreateBoard = () => {
  const { listener, payload, setPayload } = useForm<Record<string, any>>({
    isPublic: false,
  });
  const addError = useAction(actions.error.append);
  const close = useAction(actions.modal.close);
  const [createBoard, { isUninitialized, isSuccess, isLoading, data }] =
    useCreateBoardMutation();
  const error = useSelector(selectors.error.createBoard);
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { isPublic, title, description } = payload;
    createBoard({
      title,
      description,
      isPublic,
    })
      .unwrap()
      .catch((error) => {
        const axiosError = error as AxiosError<ApiErrorWithDetails>;
        const { response } = axiosError;
        const data = response?.data;
        addError({
          kind: "create-board",
          error:
            data?.message?.toString() ?? data?.error ?? "Something went wrong",
        });
      });
  };
  const router = useRouter();
  if (isSuccess && data) {
    router.push(`/dashboard/boards/${data.id}`);
    close();
  }
  return (
    <Modal>
      <form action="" className={cx(styles.form)} onSubmit={handleSubmit}>
        <h2 className={styles["form-title"]}>Create board</h2>
        {error && (
          <div className={styles.error}>
            <Icon glyph="Error" />
            <p className={styles["error-text"]}>{error}</p>
          </div>
        )}
        <Input
          preIcon="File"
          placeholder="Title"
          name="title"
          onChange={listener}
        />
        <Input
          preIcon="Chat"
          placeholder="Description"
          name="description"
          type="text"
          onChange={listener}
        />
        <div className="flex gap-2 items-center px-3">
          <Toggle
            enabled={!!payload["isPublic"]}
            onChange={(v) => {
              setPayload((old) => ({ ...old, isPublic: v }));
            }}
          />
          <span style={{ color: "var(--color-placeholder)" }}>
            Make board public?
          </span>
        </div>
        {isLoading ? (
          <Button className="mx-auto" type="submit" disabled>
            <Circles width="24" height="24" color="#fff" />
          </Button>
        ) : (
          <Button icon="NextArrow" className="mx-auto" type="submit">
            Create
          </Button>
        )}
      </form>
    </Modal>
  );
};

export default CreateBoard;
