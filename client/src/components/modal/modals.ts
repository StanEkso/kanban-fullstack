import { Modal } from "@/store/slices/modal";
import { FC } from "react";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import LoginSuccess from "./components/LoginSuccess";
import CreateBoard from "./components/CreateBoard";
import RegisterSuccess from "./components/RegisterSuccess";
import ChangePassword from "./components/ChangePassword";
import ChangePasswordSuccess from "./components/ChangePasswordSuccesfull";

export const modalComponents: Record<Modal, FC> = {
  "sign-up": SignUp,
  "sign-in": SignIn,
  "login-success": LoginSuccess,
  "create-board": CreateBoard,
  "register-success": RegisterSuccess,
  "change-password": ChangePassword,
  "change-password-success": ChangePasswordSuccess,
};
