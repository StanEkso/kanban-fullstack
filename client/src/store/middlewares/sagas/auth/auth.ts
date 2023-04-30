import { PayloadAction } from "@reduxjs/toolkit";
import * as effects from "typed-redux-saga";

export function* initialize() {
  yield* effects.all([]);
}
