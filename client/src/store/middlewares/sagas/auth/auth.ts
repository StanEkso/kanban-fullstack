import { http } from "@/api";
import { AUTH_TOKEN_KEY } from "@/api/interceptors";
import { actions } from "@/store";
import {
  IGetUserResponseData,
  ISigninRequestData,
  ISigninResponseData,
  ISignupRequestData,
  ISignupResponseData,
} from "@/types/auth";
import { ApiErrorWithDetails } from "@/types/error";
import { PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import * as effects from "typed-redux-saga";

function* handleLogin(action: PayloadAction<ISigninRequestData>) {
  yield effects.put(actions.auth.startLoad());
  yield effects.put(actions.error.remove("sign-in"));
  try {
    const { data } = yield* effects.call(() =>
      http.post<ISigninResponseData>("/auth/signin", action.payload)
    );
    const { accessToken, ...rest } = data;
    localStorage.setItem(AUTH_TOKEN_KEY, accessToken);
    yield effects.put(actions.auth.login(rest));
    yield effects.put(actions.modal.open("login-success"));
  } catch (error) {
    const { response } = error as AxiosError<ApiErrorWithDetails>;
    if (!response) {
      return;
    }
    const { data } = response;
    yield effects.put(
      actions.error.append({ kind: "sign-in", error: data.message.toString() })
    );
  } finally {
    yield effects.put(actions.auth.endLoad());
  }
}

function* handleRegister(action: PayloadAction<ISignupRequestData>) {
  yield effects.put(actions.auth.startLoad());
  yield effects.put(actions.error.remove("sign-up"));
  try {
    const { data } = yield* effects.call(() =>
      http.post<ISignupResponseData>("/auth/signup", action.payload)
    );
    yield effects.put(actions.modal.open("register-success"));
  } catch (error) {
    const { response } = error as AxiosError<ApiErrorWithDetails>;
    if (!response) {
      return;
    }
    const { data } = response;
    yield effects.put(
      actions.error.append({ kind: "sign-up", error: data.message.toString() })
    );
  } finally {
    yield effects.put(actions.auth.endLoad());
  }
}

function* getUser() {
  yield effects.put(actions.auth.startLoad());
  try {
    const accessToken = localStorage.getItem(AUTH_TOKEN_KEY);
    if (!accessToken) {
      return;
    }
    const { data } = yield* effects.call(() =>
      http.get<IGetUserResponseData>("/user/me")
    );
    yield effects.put(actions.auth.login(data));
  } catch (error) {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    yield effects.put(actions.auth.logout());
  } finally {
    yield effects.put(actions.auth.endLoad());
  }
}

function* logout() {
  localStorage.removeItem(AUTH_TOKEN_KEY);
}

export function* initialize() {
  yield getUser();
  yield* effects.all([
    effects.takeLatest(actions.auth.signin, handleLogin),
    effects.takeLatest(actions.auth.signup, handleRegister),
    effects.takeLatest(actions.auth.logout, logout),
  ]);
}
