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
function SignIn() {
  const open = useAction(actions.modal.open);
  const { listener, payload } = useForm<Record<string, string>>();
  const tryLogin = useAction(actions.auth.signin);
  const isLoading = useSelector(selectors.auth.loading);
  const error = useSelector(selectors.error.signIn);
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { username, password } = payload;
    tryLogin({ username, password });
  };
  return (
    <Modal>
      <form action="" className={cx(styles.form)} onSubmit={handleSubmit}>
        <h2 className={styles["form-title"]}>Sign in in Kanban</h2>
        {error && (
          <div className={styles.error}>
            <Icon glyph="Error" />
            <p className={styles["error-text"]}>{error}</p>
          </div>
        )}
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
        {isLoading ? (
          <Button className="mx-auto" type="submit" disabled>
            <Circles width="24" height="24" color="#fff" />
          </Button>
        ) : (
          <Button icon="NextArrow" className="mx-auto" type="submit">
            Continue
          </Button>
        )}
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

export default SignIn;
