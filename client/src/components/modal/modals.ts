import { Modal } from "@/store/slices/modal";
import { FC } from "react";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import LoginSuccess from "./components/LoginSuccess";
import CreateBoard from "./components/CreateBoard";

export const modalComponents: Record<Modal, FC> = {
  "sign-up": SignUp,
  "sign-in": SignIn,
  "login-success": LoginSuccess,
  "create-board": CreateBoard,
};
