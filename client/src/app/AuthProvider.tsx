"use client";
import Loader from "@/components/ui/loader/Loader";
import { useSelector } from "@/helpers/hooks";
import { selectors } from "@/store/selectors";
import { useRouter } from "next/navigation";
import React, { FC, PropsWithChildren } from "react";
import { InfinitySpin } from "react-loader-spinner";

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const loading = useSelector(selectors.auth.loading);
  const account = useSelector(selectors.auth.account);
  const router = useRouter();
  if (loading) {
    return <Loader />;
  }
  if (!account) {
    router.push("/");
    return null;
  }
  return <>{children}</>;
};

export default AuthProvider;
