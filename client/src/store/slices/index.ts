import { combineReducers } from "redux";

import modal from "./modal";
import auth from "./auth";
import { api } from "../api";
export const reducers = combineReducers({
  modal,
  auth,
  [api.boards.reducerPath]: api.boards.reducer,
});
