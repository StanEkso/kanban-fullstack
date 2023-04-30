import { Modal } from "@/store/slices/modal";
import { FC } from "react";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";

export const modalComponents: Record<Modal, FC> = {
  "sign-up": SignUp,
  "sign-in": SignIn,
};
