"use client";

import { useSelector } from "@/helpers/hooks";
import { selectors } from "@/store/selectors";
import React from "react";
import { modalComponents } from "./modals";

const ModalRoot = () => {
  const opened = useSelector(selectors.modal.opened);
  if (!opened) {
    return null;
  }
  const ModalComponent = modalComponents[opened];
  return <ModalComponent />;
};

export default ModalRoot;
