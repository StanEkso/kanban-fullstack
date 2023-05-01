import { AppState } from "..";

export const account = (state: AppState) => state.auth.account;
export const loading = (state: AppState) => state.auth.isLoading;
