import { combineReducers } from "redux";

import modal from "./modal";
import auth from "./auth";
export const reducers = combineReducers({
  modal,
  auth,
});
