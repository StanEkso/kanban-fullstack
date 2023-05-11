import { AppState } from "..";

export const signIn = (state: AppState) => state.error.errors["sign-in"];
export const signUp = (state: AppState) => state.error.errors["sign-up"];
export const changePassword = (state: AppState) =>
  state.error.errors["change-password"];
export const createBoard = (state: AppState) =>
  state.error.errors["create-board"];
