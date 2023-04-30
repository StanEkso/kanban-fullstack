"use client";

import { Input } from "@/components/ui/Input/Input";
import Modal from "../modal/Modal";
import Button from "@/components/ui/button/Button";
import cx from "classnames";
import styles from "./Auth.module.scss";
import { useAction } from "@/helpers/hooks";
import { actions } from "@/store";
import { useForm } from "@/helpers/hooks/useForm";
import { FormEvent } from "react";
function Auth() {
  const open = useAction(actions.modal.open);
  const { listener, payload } = useForm<Record<string, string>>();
  const tryLogin = useAction(actions.auth.signup);
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { username, password, email, repeatPassword } = payload;
    tryLogin({ username, password, email, repeatPassword });
  };
  return (
    <Modal>
      <form action="" className={cx(styles.form)} onSubmit={handleSubmit}>
        <h2 className={styles["form-title"]}>Sign up in Kanban</h2>
        <Input
          preIcon="User"
          placeholder="Username"
          name="username"
          onChange={listener}
        />
        <Input
          preIcon="Mail"
          placeholder="Email"
          name="email"
          onChange={listener}
        />
        <Input
          preIcon="Password"
          placeholder="Password"
          name="password"
          onChange={listener}
          type="password"
        />
        <Input
          preIcon="Password"
          placeholder="Repeat password"
          name="repeatPassword"
          onChange={listener}
          type="password"
        />
        <Button icon="NextArrow" className="mx-auto" type="submit">
          Continue
        </Button>
        <p className={styles["form-text"]}>
          or, if you already have an account,{" "}
          <span className={styles["form-link"]} onClick={() => open("sign-in")}>
            sign in
          </span>
        </p>
      </form>
    </Modal>
  );
}

export default Auth;
