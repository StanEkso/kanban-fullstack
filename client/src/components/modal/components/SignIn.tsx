"use client";

import { Input } from "@/components/ui/Input/Input";
import Modal from "../modal/Modal";
import Button from "@/components/ui/button/Button";
import cx from "classnames";
import styles from "./Auth.module.scss";
import { useAction } from "@/helpers/hooks";
import { actions } from "@/store";
function Auth() {
  const open = useAction(actions.modal.open);
  return (
    <Modal>
      <form action="" className={cx(styles.form)}>
        <h2 className={styles["form-title"]}>Sign in in Kanban</h2>
        <Input preIcon="Mail" placeholder="Email" />
        <Input preIcon="Password" placeholder="Password" />
        <Button icon="NextArrow" className="mx-auto">
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