import { Middleware, configureStore } from "@reduxjs/toolkit";
import * as helpers from "@/helpers";

import * as actions from "./actions";
import { reducers } from "./slices";
import middlewares from "./middlewares";

export { actions };

const store = configureStore({
  reducer: reducers,
  devTools: process.env.NODE_ENV !== "production",
  middleware: middlewares,
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppMiddleware<T = {}> = Middleware<T, AppState, AppDispatch>;
export type Actions = typeof actions;

if (process.env.NODE_ENV === "development" && helpers.common.isClientSide()) {
  (window as any).store = store;
}

export default store;
