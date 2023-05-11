import { ValueOf } from "next/dist/shared/lib/constants";

export const availableModals = {
  signUp: "sign-up",
  signIn: "sign-in",
  loginSuccess: "login-success",
  createBoard: "create-board",
  registerSuccess: "register-success",
  changePassword: "change-password",
  changePasswordSuccess: "change-password-success",
} as const;

export type Modal = ValueOf<typeof availableModals>;

export interface ModalState {
  opened?: Modal;
}
