"use client";
import { Icon } from "@/components/ui/Icon";
import Button from "@/components/ui/button/Button";
import Dropdown from "@/components/ui/dropdown/Dropdown";
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
        <Dropdown>
          <Dropdown.Item icon="User" url="/dashboard/profile">
            Profile
          </Dropdown.Item>
          <Dropdown.Item icon="Dashboard" url="/dashboard">
            Dashboard
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item icon="Logout" onClick={logout}>
            Logout
          </Dropdown.Item>
        </Dropdown>
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
