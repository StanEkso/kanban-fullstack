import { instance } from "./axios";
import { setupInterceptors } from "./interceptors";

export const http = setupInterceptors(instance);
export * from "./axios.query";
