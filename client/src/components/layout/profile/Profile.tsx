"use client";
import { Icon } from "@/components/ui/Icon";
import Button from "@/components/ui/button/Button";
import { useAction, useSelector } from "@/helpers/hooks";
import { actions } from "@/store";
import { selectors } from "@/store/selectors";
import React from "react";

const Profile = () => {
  const account = useSelector(selectors.auth.account);
  const open = useAction(actions.modal.open);
  const logout = useAction(actions.auth.logout);
  if (account) {
    return (
      <div className="flex flex-row gap-2 items-center">
        <span>{account.username}</span>
        <Icon glyph="Arrow" />
        <Button onClick={() => logout()}>Logout</Button>
      </div>
    );
  }
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
