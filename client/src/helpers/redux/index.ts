import { PayloadActionCreator, Slice, createAction } from "@reduxjs/toolkit";

export function makeActionCreator<N extends string = string>(
  slice: Slice<any, any, N>
) {
  // Protection against possible duplicates for development
  if (process.env.NODE_ENV === "development") {
    const actions: Record<string, true> = {};
    return <P = void, AT extends string = string>(
      type: AT
    ): PayloadActionCreator<P, `${N}/extraActions/${AT}`> => {
      if (actions[type]) {
        throw new Error(`Try to register duplicate of action type: ${type}`);
      }

      actions[type] = true;
      return createAction(`${slice.name}/extraActions/${type}`);
    };
  }

  return <P = void, AT extends string = string>(
    type: AT
  ): PayloadActionCreator<P, `${N}/extraActions/${AT}`> => {
    return createAction(`${slice.name}/extraActions/${type}`);
  };
}
