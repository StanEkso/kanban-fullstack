import { Modal } from "@/store/slices/modal";
import { FC } from "react";
import Auth from "./components/Auth";

export const modalComponents: Record<Modal, FC> = {
  auth: Auth,
};
