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
import { PayloadAction } from "@reduxjs/toolkit";
import * as effects from "typed-redux-saga";

function* handleLogin(action: PayloadAction<ISigninRequestData>) {
  yield effects.put(actions.auth.startLoad());
  try {
    const { data } = yield* effects.call(() =>
      http.post<ISigninResponseData>("/auth/signin", action.payload)
    );
    const { accessToken, ...rest } = data;
    localStorage.setItem(AUTH_TOKEN_KEY, accessToken);
    yield effects.put(actions.auth.login(rest));
    yield effects.put(actions.modal.open("login-success"));
  } catch (error) {
  } finally {
    yield effects.put(actions.auth.endLoad());
  }
}

function* handleRegister(action: PayloadAction<ISignupRequestData>) {
  yield effects.put(actions.auth.startLoad());
  try {
    const { data } = yield* effects.call(() =>
      http.post<ISignupResponseData>("/auth/signup", action.payload)
    );
  } catch (error) {
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

export function* initialize() {
  yield getUser();
  yield* effects.all([
    effects.takeLatest(actions.auth.signin, handleLogin),
    effects.takeLatest(actions.auth.signup, handleRegister),
  ]);
}
