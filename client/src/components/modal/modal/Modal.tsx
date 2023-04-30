"use client";

import cx from "classnames";
import { DetailedHTMLProps, HTMLAttributes, MouseEvent, useRef } from "react";
import { useAction } from "@/helpers/hooks";
import { actions } from "@/store";

import styles from "./Modal.module.scss";

export type Props = {
  onClose?: () => void;
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

function Modal({ onClose, children, ...restProps }: Props) {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeModal = useAction(actions.modal.close);

  function handleClick(event: MouseEvent) {
    if (event.target === modalRef.current) {
      if (onClose) {
        onClose();
      } else {
        closeModal();
      }
    }
  }

  return (
    <div className={cx(styles.base, styles.base__opening)} {...restProps}>
      <div className={styles.wrapper} onClick={handleClick} ref={modalRef}>
        <div className={styles.modal}>{children}</div>
      </div>
    </div>
  );
}

export default Modal;
