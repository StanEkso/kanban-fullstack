"use client";

import Modal from "../modal/Modal";
import { useAction, useSelector } from "@/helpers/hooks";
import { actions } from "@/store";
import { selectors } from "@/store/selectors";
import styles from "./Auth.module.scss";
import { Icon } from "@/components/ui/Icon";
import Button from "@/components/ui/button/Button";
import { useRouter } from "next/navigation";

function RegisterSuccess() {
  const close = useAction(actions.modal.close);
  const open = useAction(actions.modal.open);
  const router = useRouter();
  const nextListener = () => {
    close();
    router.push("/dashboard");
  };
  return (
    <Modal onClose={nextListener}>
      <div className={styles["success"]}>
        <Icon glyph="Success" width={64} height={64} />
        <h2>Registration is completed</h2>
        <div className="flex gap-2">
          <Button
            className="mx-auto"
            icon="Password"
            onClick={() => open("sign-in")}
          >
            Log in
          </Button>
          <Button theme="secondary" onClick={() => close()}>
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default RegisterSuccess;
