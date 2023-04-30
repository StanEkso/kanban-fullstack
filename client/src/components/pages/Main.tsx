"use client";

import { useAction } from "@/helpers/hooks";
import { actions } from "@/store";
import React from "react";

const Main = () => {
  const openModal = useAction(actions.modal.open);
  return (
    <div>
      <button onClick={() => openModal("auth")}>Open</button>
    </div>
  );
};

export default Main;
