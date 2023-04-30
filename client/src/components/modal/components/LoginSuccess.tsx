"use client";

import Modal from "../modal/Modal";
import { useAction, useSelector } from "@/helpers/hooks";
import { actions } from "@/store";
import { selectors } from "@/store/selectors";
import styles from "./Auth.module.scss";
import { Icon } from "@/components/ui/Icon";
import Button from "@/components/ui/button/Button";
import { useRouter } from "next/navigation";

function LoginSuccess() {
  const close = useAction(actions.modal.close);
  const account = useSelector(selectors.auth.account);
  const router = useRouter();
  const nextListener = () => {
    close();
    router.push("/dashboard");
  };
  return (
    <Modal onClose={nextListener}>
      <div className={styles["success"]}>
        <Icon glyph="Success" width={64} height={64} />
        <h2>You can now access dashboard</h2>
        <Button className="mx-auto" icon="NextArrow" onClick={nextListener}>
          Continue in dashboard
        </Button>
      </div>
    </Modal>
  );
}

export default LoginSuccess;
