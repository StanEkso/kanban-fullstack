import { http } from "@/api";
import { AUTH_TOKEN_KEY } from "@/api/interceptors";
import { actions } from "@/store";
import { ISigninRequestData, ISigninResponseData } from "@/types/auth";
import { PayloadAction } from "@reduxjs/toolkit";
import * as effects from "typed-redux-saga";

function* handleLogin(action: PayloadAction<ISigninRequestData>) {
  try {
    const { data } = yield* effects.call(() =>
      http.post<ISigninResponseData>("/auth/signin", action.payload)
    );
    const { accessToken, ...rest } = data;
    localStorage.setItem(AUTH_TOKEN_KEY, accessToken);
    yield effects.put(actions.auth.login(rest));
  } catch (error) {}
}

export function* initialize() {
  yield* effects.all([effects.takeLatest(actions.auth.signin, handleLogin)]);
}
