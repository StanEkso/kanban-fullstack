import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { Modal, ModalState } from "./types";

export const initialState: ModalState = {
  opened: undefined,
};

export const slice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    open: (state, action: PayloadAction<Modal>) => {
      state.opened = action.payload;
    },
    close: (state) => {
      state.opened = undefined;
    },
  },
});

export const actions = {
  ...slice.actions,
};

export default slice.reducer;
