import { combineReducers } from "redux";

import modal from "./modal";
import auth from "./auth";
import error from "./error";
import { api } from "../api";
export const reducers = combineReducers({
  modal,
  auth,
  error,
  [api.boards.reducerPath]: api.boards.reducer,
  [api.column.reducerPath]: api.column.reducer,
  [api.tasks.reducerPath]: api.tasks.reducer,
});
