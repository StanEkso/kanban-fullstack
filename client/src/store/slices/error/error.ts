import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { ErrorType, ErrorState, ErrorAddData } from "./types";

export const initialState: ErrorState = {
  errors: {},
};

export const slice = createSlice({
  name: "error",
  initialState,
  reducers: {
    append: (state, action: PayloadAction<ErrorAddData>) => {
      state.errors = {
        ...state.errors,
        [action.payload.kind]: action.payload.error,
      };
    },
    clear: (state) => {
      state.errors = {};
    },
    remove: (state, action: PayloadAction<ErrorType>) => {
      delete state.errors[action.payload];
    },
  },
});

export const actions = {
  ...slice.actions,
};

export default slice.reducer;
