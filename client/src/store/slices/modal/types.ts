import { ValueOf } from "next/dist/shared/lib/constants";

export const availableModals = {
  auth: "auth",
} as const;

export type Modal = ValueOf<typeof availableModals>;

export interface ModalState {
  opened?: Modal;
}
