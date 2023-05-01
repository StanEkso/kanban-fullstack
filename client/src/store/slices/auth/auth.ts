import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { Account, AuthState } from "./types";
import { makeActionCreator } from "@/helpers/redux";
import { ISigninRequestData, ISignupRequestData } from "@/types/auth";

export const initialState: AuthState = {
  account: null,
  isLoading: false,
};

export const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<Account>) => {
      state.account = action.payload;
    },
    logout: (state) => {
      state.account = null;
    },
    startLoad: (state) => {
      state.isLoading = true;
    },
    endLoad: (state) => {
      state.isLoading = false;
    },
  },
});

const createAction = makeActionCreator(slice);

export const actions = {
  ...slice.actions,
  signin: createAction<ISigninRequestData>("signin"),
  signup: createAction<ISignupRequestData>("signup"),
};

export default slice.reducer;
