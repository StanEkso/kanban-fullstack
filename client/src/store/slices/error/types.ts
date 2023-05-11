import { ValueOf } from "next/dist/shared/lib/constants";

export const errorTypes = {
  signUp: "sign-up",
  signIn: "sign-in",
  createBoard: "create-board",
  changePassword: "change-password",
};

export type ErrorType = ValueOf<typeof errorTypes>;

export interface ErrorState {
  errors: Record<ErrorType, string>;
}

export interface ErrorAddData {
  kind: ErrorType;
  error: string;
}
