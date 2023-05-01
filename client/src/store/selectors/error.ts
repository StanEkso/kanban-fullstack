import { AppState } from "..";

export const signIn = (state: AppState) => state.error.errors["sign-in"];
export const signUp = (state: AppState) => state.error.errors["sign-up"];
