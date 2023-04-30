import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { Account, AuthState } from "./types";

export const initialState: AuthState = {
  account: null,
};

export const slice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<Account>) => {
      state.account = action.payload;
    },
    logout: (state) => {
      state.account = null;
    },
  },
});

export const actions = {
  ...slice.actions,
};

export default slice.reducer;
