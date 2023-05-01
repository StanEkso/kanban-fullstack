import { Middleware } from "@reduxjs/toolkit";
import * as helpers from "@/helpers";
import createSagaMiddleware from "redux-saga";
import initializeSagas from "./sagas";
import { api } from "../api";
const sagaMiddleWare = createSagaMiddleware();

const middlewares: Middleware[] = helpers.common.isClientSide()
  ? [sagaMiddleWare, api.boards.middleware]
  : [];

export const runSagas = () => {
  if (helpers.common.isClientSide()) {
    sagaMiddleWare.run(initializeSagas);
  }
};

export default middlewares;
