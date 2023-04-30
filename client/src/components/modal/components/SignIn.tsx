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
function Auth() {
  const open = useAction(actions.modal.open);
  const account = useSelector(selectors.auth.account);
  const { listener, payload } = useForm<Record<string, string>>();
  const tryLogin = useAction(actions.auth.signin);
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { username, password } = payload;
    tryLogin({ username, password });
  };
  return (
    <Modal>
      <form action="" className={cx(styles.form)} onSubmit={handleSubmit}>
        {JSON.stringify(account, null, 4)}
        <h2 className={styles["form-title"]}>Sign in in Kanban</h2>
        <Input
          preIcon="User"
          placeholder="Username"
          name="username"
          onChange={listener}
        />
        <Input
          preIcon="Password"
          placeholder="Password"
          name="password"
          type="password"
          onChange={listener}
        />
        <Button icon="NextArrow" className="mx-auto" type="submit">
          Continue
        </Button>
        <p className={styles["form-text"]}>
          or, if you {"don't"} have an account,{" "}
          <span className={styles["form-link"]} onClick={() => open("sign-up")}>
            sign up
          </span>
        </p>
      </form>
    </Modal>
  );
}

export default Auth;
