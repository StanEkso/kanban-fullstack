"use client";
import Button from "@/components/ui/button/Button";
import { useAction } from "@/helpers/hooks";
import { actions } from "@/store";
import React from "react";
type Props = {};

const Profile = (props: Props) => {
  const isAuth = false;
  const open = useAction(actions.modal.open);
  return (
    <div className="flex flex-row gap-3">
      <Button theme="secondary" onClick={() => open("sign-in")}>
        Sign in
      </Button>
      <Button theme="primary" onClick={() => open("sign-up")}>
        Sign up
      </Button>
    </div>
  );
};

export default Profile;
