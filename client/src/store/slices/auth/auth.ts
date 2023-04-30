import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { Account, AuthState } from "./types";
import { makeActionCreator } from "@/helpers/redux";
import { ISigninRequestData, ISignupData } from "@/types/auth";

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

const createAction = makeActionCreator(slice);

export const actions = {
  ...slice.actions,
  signin: createAction<ISigninRequestData>("signin"),
  signup: createAction<ISignupData>("signup"),
};

export default slice.reducer;
