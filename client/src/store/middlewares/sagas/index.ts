import * as effects from "typed-redux-saga";
import * as helpers from "@/helpers";

import { auth } from "./auth";
function* initializeClient() {
  if (helpers.common.isClientSide()) {
    yield* effects.all([auth.initialize].map(effects.call));
  }
}

export default function* initializeSagas() {
  yield* initializeClient();
}
