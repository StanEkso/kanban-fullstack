import { AxiosInstance, InternalAxiosRequestConfig } from "axios";
export const AUTH_TOKEN_KEY = "auth-token";
export const setupInterceptors = (instance: AxiosInstance): AxiosInstance => {
  instance.interceptors.request.use(attachToken);
  return instance;
};

const attachToken = (
  config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig => {
  const { headers } = config;
  const accessToken = localStorage.getItem("AUTH_TOKEN_KEY");
  return {
    ...config,
    headers: headers.set("Authorization", `Bearer ${accessToken}`),
  };
};
