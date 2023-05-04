"use client";

import Modal from "../modal/Modal";
import { useAction, useSelector } from "@/helpers/hooks";
import { actions } from "@/store";
import { selectors } from "@/store/selectors";
import styles from "./Auth.module.scss";
import { Icon } from "@/components/ui/Icon";
import Button from "@/components/ui/button/Button";
import { useRouter } from "next/navigation";

function ChangePasswordSuccess() {
  const close = useAction(actions.modal.close);
  return (
    <Modal>
      <div className={styles["success"]}>
        <Icon glyph="Success" width={64} height={64} />
        <h2>Password succefully changed</h2>
        <Button className="mx-auto" icon="NextArrow" onClick={() => close()}>
          Continue with log in
        </Button>
      </div>
    </Modal>
  );
}

export default ChangePasswordSuccess;
