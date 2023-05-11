"use client";

import { Input } from "@/components/ui/Input/Input";
import Modal from "../modal/Modal";
import Button from "@/components/ui/button/Button";
import cx from "classnames";
import styles from "./Auth.module.scss";
import { useAction, useSelector } from "@/helpers/hooks";
import { actions } from "@/store";
import { useForm } from "@/helpers/hooks/useForm";
import { FormEvent } from "react";
import { selectors } from "@/store/selectors";
import { Circles } from "react-loader-spinner";
import { Icon } from "@/components/ui/Icon";
function ChangePassword() {
  const open = useAction(actions.modal.open);
  const { listener, payload } = useForm<Record<string, string>>();
  const tryChange = useAction(actions.auth.changePassword);
  const isLoading = useSelector(selectors.auth.loading);
  const error = useSelector(selectors.error.changePassword);
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { currentPassword, newPasswordRepeat, newPassword } = payload;
    tryChange({ currentPassword, newPasswordRepeat, newPassword });
  };
  return (
    <Modal>
      <form action="" className={cx(styles.form)} onSubmit={handleSubmit}>
        <h2 className={styles["form-title"]}>ChangePassword</h2>
        {error && (
          <div className={styles.error}>
            <Icon glyph="Error" />
            <p className={styles["error-text"]}>{error}</p>
          </div>
        )}
        <Input
          preIcon="Password"
          placeholder="Current password"
          name="currentPassword"
          type="password"
          onChange={listener}
        />
        <Input
          preIcon="Password"
          placeholder="New password"
          name="newPassword"
          type="password"
          onChange={listener}
        />
        <Input
          preIcon="Password"
          placeholder="Repeat new password"
          name="newPasswordRepeat"
          type="password"
          onChange={listener}
        />
        {isLoading ? (
          <Button className="mx-auto" type="submit" disabled>
            <Circles width="24" height="24" color="#fff" />
          </Button>
        ) : (
          <Button icon="NextArrow" className="mx-auto" type="submit">
            Change
          </Button>
        )}
      </form>
    </Modal>
  );
}

export default ChangePassword;
