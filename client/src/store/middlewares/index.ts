import { Middleware } from "@reduxjs/toolkit";
import * as helpers from "@/helpers";

const middlewares: Middleware[] = helpers.common.isClientSide()
  ? [
      /* Required middlewares on client */
    ]
  : [];

export const runSagas = () => {
  if (helpers.common.isClientSide()) {
  }
};

export default middlewares;
